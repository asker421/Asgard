package com.asgard.tv

import android.app.Activity
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

class PlayerActivity : Activity() {
    private var player: ExoPlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val view = PlayerView(this)
        setContentView(view)
        val url = intent.getStringExtra("url") ?: ""
        player = ExoPlayer.Builder(this).build().also { p ->
            view.player = p
            if (url.isNotBlank()) {
                p.setMediaItem(MediaItem.fromUri(Uri.parse(url)))
                p.prepare()
                p.playWhenReady = true
            }
        }
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        val p = player ?: return super.dispatchKeyEvent(event)
        if (event.action == KeyEvent.ACTION_DOWN) {
            when (event.keyCode) {
                KeyEvent.KEYCODE_DPAD_LEFT -> { p.seekTo((p.currentPosition - 10000).coerceAtLeast(0)); return true }
                KeyEvent.KEYCODE_DPAD_RIGHT -> { p.seekTo(p.currentPosition + 10000); return true }
                KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_ENTER -> { if (p.isPlaying) p.pause() else p.play(); return true }
            }
        }
        return super.dispatchKeyEvent(event)
    }

    override fun onDestroy() {
        player?.release()
        super.onDestroy()
    }
}
