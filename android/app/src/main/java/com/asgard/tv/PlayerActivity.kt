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
        val playerView = PlayerView(this)
        setContentView(playerView)
        val url = intent.getStringExtra("url") ?: ""
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

    override fun onDestroy() {
        player?.release()
        player = null
        super.onDestroy()
    }
}
