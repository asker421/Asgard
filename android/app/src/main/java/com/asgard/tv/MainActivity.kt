package com.asgard.tv

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.os.Bundle
import android.os.StatFs
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var webView: WebView
    private lateinit var prefs: SharedPreferences

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefs = getSharedPreferences("asgard_store", MODE_PRIVATE)
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

        @JavascriptInterface fun readConfig(): String = readAsset("config.txt")

        @JavascriptInterface fun readSourcesTxt(): String {
            return prefs.getString("sources_txt", null) ?: readAsset("sources.txt")
        }

        @JavascriptInterface fun saveSourcesTxt(text: String): Boolean {
            prefs.edit().putString("sources_txt", text).apply()
            return true
        }

        @JavascriptInterface fun resetSourcesTxt(): Boolean {
            prefs.edit().remove("sources_txt").apply()
            return true
        }

        @JavascriptInterface fun getAppVersionInfo(): String {
            val obj = JSONObject()
            obj.put("versionName", "1.9.0")
            obj.put("versionCode", 19)
            obj.put("packageName", packageName)
            obj.put("repo", "asker421/Asgard")
            return obj.toString()
        }

        @JavascriptInterface fun openExternalUrl(url: String): Boolean {
            return try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
                true
            } catch (_: Exception) {
                false
            }
        }

        @JavascriptInterface fun openPlayer(url: String, title: String, startPosition: Long) {
            val intent = Intent(this@MainActivity, PlayerActivity::class.java)
            intent.putExtra("url", url)
            intent.putExtra("title", title)
            intent.putExtra("itemId", title.ifBlank { url })
            intent.putExtra("startPosition", startPosition)
            startActivity(intent)
        }

        @JavascriptInterface fun saveWatchProgress(itemId: String, position: Long, duration: Long, title: String): Boolean {
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
            return true
        }

        @JavascriptInterface fun getWatchProgress(itemId: String): String {
            val all = JSONArray(prefs.getString("watch_progress", "[]"))
            for (i in 0 until all.length()) {
                val item = all.getJSONObject(i)
                if (item.optString("itemId") == itemId) return item.toString()
            }
            return "{}"
        }

        @JavascriptInterface fun getAllWatchProgress(): String = prefs.getString("watch_progress", "[]") ?: "[]"

        @JavascriptInterface fun addToFavorites(itemJson: String): Boolean {
            val item = JSONObject(itemJson)
            val id = item.optString("id", item.optString("title"))
            val all = JSONArray(prefs.getString("favorites", "[]"))
            val next = JSONArray()
            for (i in 0 until all.length()) {
                val old = all.getJSONObject(i)
                if (old.optString("id") != id) next.put(old)
            }
            item.put("id", id)
            item.put("updatedAt", System.currentTimeMillis())
            next.put(item)
            prefs.edit().putString("favorites", next.toString()).apply()
            return true
        }

        @JavascriptInterface fun removeFromFavorites(itemId: String): Boolean {
            val all = JSONArray(prefs.getString("favorites", "[]"))
            val next = JSONArray()
            for (i in 0 until all.length()) {
                val item = all.getJSONObject(i)
                if (item.optString("id") != itemId) next.put(item)
            }
            prefs.edit().putString("favorites", next.toString()).apply()
            return true
        }

        @JavascriptInterface fun getFavorites(): String = prefs.getString("favorites", "[]") ?: "[]"

        @JavascriptInterface fun addHistory(itemJson: String): Boolean {
            val item = JSONObject(itemJson)
            val id = item.optString("id", item.optString("title"))
            val all = JSONArray(prefs.getString("history", "[]"))
            val next = JSONArray()
            for (i in 0 until all.length()) {
                val old = all.getJSONObject(i)
                if (old.optString("id") != id) next.put(old)
            }
            item.put("id", id)
            item.put("updatedAt", System.currentTimeMillis())
            next.put(item)
            prefs.edit().putString("history", next.toString()).apply()
            return true
        }

        @JavascriptInterface fun getHistory(): String = prefs.getString("history", "[]") ?: "[]"

        @JavascriptInterface fun clearHistory(): Boolean {
            prefs.edit().putString("history", "[]").apply()
            return true
        }

        @JavascriptInterface fun getDeviceStorageInfo(): String {
            val stat = StatFs(filesDir.absolutePath)
            val obj = JSONObject()
            obj.put("totalBytes", stat.totalBytes)
            obj.put("freeBytes", stat.availableBytes)
            obj.put("cacheDir", cacheDir.absolutePath)
            return obj.toString()
        }
    }
}
