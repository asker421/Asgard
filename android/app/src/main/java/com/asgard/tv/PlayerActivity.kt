package com.asgard.tv

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import org.json.JSONArray
import org.json.JSONObject

class PlayerActivity : Activity() {
    private var player: ExoPlayer? = null
    private var itemId: String = ""
    private var title: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val playerView = PlayerView(this)
        setContentView(playerView)
        val url = intent.getStringExtra("url") ?: ""
        title = intent.getStringExtra("title") ?: url
        itemId = intent.getStringExtra("itemId") ?: title
        val startPosition = intent.getLongExtra("startPosition", 0L)
        player = ExoPlayer.Builder(this).build().also { p ->
            playerView.player = p
            if (url.isNotBlank()) {
                p.setMediaItem(MediaItem.fromUri(Uri.parse(url)))
                p.prepare()
                if (startPosition > 0L) p.seekTo(startPosition)
                p.playWhenReady = true
            }
        }
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        val p = player ?: return super.dispatchKeyEvent(event)
        if (event.action == KeyEvent.ACTION_DOWN) {
            when (event.keyCode) {
                KeyEvent.KEYCODE_DPAD_LEFT -> { p.seekTo((p.currentPosition - 10_000).coerceAtLeast(0)); return true }
                KeyEvent.KEYCODE_DPAD_RIGHT -> { p.seekTo(p.currentPosition + 10_000); return true }
                KeyEvent.KEYCODE_MEDIA_REWIND -> { p.seekTo((p.currentPosition - 60_000).coerceAtLeast(0)); return true }
                KeyEvent.KEYCODE_MEDIA_FAST_FORWARD -> { p.seekTo(p.currentPosition + 60_000); return true }
                KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_ENTER -> { if (p.isPlaying) p.pause() else p.play(); return true }
            }
        }
        return super.dispatchKeyEvent(event)
    }

    override fun onPause() {
        saveProgress()
        super.onPause()
    }

    override fun onDestroy() {
        saveProgress()
        player?.release()
        player = null
        super.onDestroy()
    }

    private fun saveProgress() {
        val p = player ?: return
        if (itemId.isBlank()) return
        val prefs = getSharedPreferences("asgard_store", MODE_PRIVATE)
        val all = JSONArray(prefs.getString("watch_progress", "[]"))
        val next = JSONArray()
        for (i in 0 until all.length()) {
            val item = all.getJSONObject(i)
            if (item.optString("itemId") != itemId) next.put(item)
        }
        val obj = JSONObject()
        obj.put("itemId", itemId)
        obj.put("title", title)
        obj.put("position", p.currentPosition)
        obj.put("duration", p.duration)
        obj.put("updatedAt", System.currentTimeMillis())
        next.put(obj)
        prefs.edit().putString("watch_progress", next.toString()).apply()
    }
}
