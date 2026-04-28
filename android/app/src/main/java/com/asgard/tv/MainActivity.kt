package com.asgard.tv

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.os.StatFs
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast

class MainActivity : Activity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this)
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.addJavascriptInterface(AsgardBridge(), "AsgardBridge")
        setContentView(webView)
        webView.loadUrl("file:///android_asset/web/index.html")
    }

    override fun onBackPressed() {
        webView.evaluateJavascript("window.asgardBack && window.asgardBack();", null)
    }

    inner class AsgardBridge {
        @JavascriptInterface fun showToast(message: String) {
            runOnUiThread { Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show() }
        }

        @JavascriptInterface fun readAsset(fileName: String): String {
            return try { assets.open("web/$fileName").bufferedReader().use { it.readText() } } catch (_: Exception) { "" }
        }

        @JavascriptInterface fun openPlayer(url: String, title: String, startPosition: Long) {
            val intent = Intent(this@MainActivity, PlayerActivity::class.java)
            intent.putExtra("url", url)
            intent.putExtra("title", title)
            intent.putExtra("startPosition", startPosition)
            startActivity(intent)
        }

        @JavascriptInterface fun getDeviceStorageInfo(): String {
            val stat = StatFs(filesDir.absolutePath)
            val total = stat.totalBytes
            val free = stat.availableBytes
            return "{\"totalBytes\":$total,\"freeBytes\":$free,\"cacheDir\":\"${cacheDir.absolutePath}\"}"
        }
    }
}
