package com.asgard.tv

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.widget.Toast
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackException
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import org.json.JSONArray
import org.json.JSONObject

class PlayerActivity : Activity() {
    private var player: ExoPlayer? = null
    private var itemId: String = ""
    private var title: String = ""
    private var lastSavedAt: Long = 0L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val playerView = PlayerView(this)
        playerView.useController = true
        setContentView(playerView)

        val url = intent.getStringExtra("url") ?: ""
        title = intent.getStringExtra("title") ?: url
        itemId = intent.getStringExtra("itemId") ?: title
        val startPosition = intent.getLongExtra("startPosition", 0L).coerceAtLeast(0L)

        if (url.isBlank() || !(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("file://") || url.startsWith("content://"))) {
            Toast.makeText(this, "Bad video URL", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        player = ExoPlayer.Builder(this).build().also { p ->
            playerView.player = p
            p.addListener(object : Player.Listener {
                override fun onPlayerError(error: PlaybackException) {
                    Toast.makeText(this@PlayerActivity, "Player error: ${error.errorCodeName}", Toast.LENGTH_LONG).show()
                    saveProgress()
                }

                override fun onPlaybackStateChanged(playbackState: Int) {
                    if (playbackState == Player.STATE_READY || playbackState == Player.STATE_ENDED) saveProgress()
                }
            })
            try {
                p.setMediaItem(MediaItem.fromUri(Uri.parse(url)))
                p.prepare()
                if (startPosition > 0L) p.seekTo(startPosition)
                p.playWhenReady = true
            } catch (e: Exception) {
                Toast.makeText(this, "Cannot open video: ${e.message}", Toast.LENGTH_LONG).show()
                finish()
            }
        }
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        val p = player ?: return super.dispatchKeyEvent(event)
        if (event.action == KeyEvent.ACTION_DOWN) {
            when (event.keyCode) {
                KeyEvent.KEYCODE_DPAD_LEFT -> { seekBy(-10_000); return true }
                KeyEvent.KEYCODE_DPAD_RIGHT -> { seekBy(10_000); return true }
                KeyEvent.KEYCODE_MEDIA_REWIND -> { seekBy(-60_000); return true }
                KeyEvent.KEYCODE_MEDIA_FAST_FORWARD -> { seekBy(60_000); return true }
                KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_ENTER -> { if (p.isPlaying) p.pause() else p.play(); saveProgress(); return true }
            }
        }
        return super.dispatchKeyEvent(event)
    }

    private fun seekBy(deltaMs: Long) {
        val p = player ?: return
        val duration = p.duration
        val target = p.currentPosition + deltaMs
        val clamped = if (duration != C.TIME_UNSET && duration > 0) target.coerceIn(0L, duration) else target.coerceAtLeast(0L)
        p.seekTo(clamped)
        saveProgressThrottled()
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

    private fun saveProgressThrottled() {
        val now = System.currentTimeMillis()
        if (now - lastSavedAt > 10_000L) saveProgress()
    }

    private fun saveProgress() {
        val p = player ?: return
        if (itemId.isBlank()) return
        val position = p.currentPosition
        val duration = p.duration
        if (position < 0L) return
        if (duration == C.TIME_UNSET || duration <= 0L) return
        lastSavedAt = System.currentTimeMillis()
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
        obj.put("position", position)
        obj.put("duration", duration)
        obj.put("updatedAt", System.currentTimeMillis())
        next.put(obj)
        prefs.edit().putString("watch_progress", next.toString()).apply()
    }
}
