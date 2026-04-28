package com.asgard.tv

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.os.Bundle
import android.os.StatFs
import android.provider.OpenableColumns
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
    private val torrentPickerRequestCode = 2101

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefs = getSharedPreferences("asgard_store", MODE_PRIVATE)
        webView = WebView(this)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: android.webkit.WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return true
                if (url.startsWith("file:///android_asset/")) return false
                return openExternalUrlInternal(url)
            }
        }
        webView.webChromeClient = WebChromeClient()
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.addJavascriptInterface(AsgardBridge(), "AsgardBridge")
        setContentView(webView)
        webView.loadUrl("file:///android_asset/web/index.html")
        handleIncomingTorrentIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleIncomingTorrentIntent(intent)
    }

    override fun onBackPressed() {
        webView.evaluateJavascript("window.asgardBack && window.asgardBack();", null)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == torrentPickerRequestCode) {
            if (resultCode == RESULT_OK && data?.data != null) {
                persistTorrentFileImport(data.data!!, "picker")
                webView.evaluateJavascript("window.AsApp && AsApp.onTorrentFilePicked && AsApp.onTorrentFilePicked();", null)
            } else {
                showToast("Torrent file selection cancelled")
            }
        }
    }

    private fun handleIncomingTorrentIntent(intent: Intent?) {
        val uri = intent?.data ?: return
        val action = intent.action ?: return
        if (action == Intent.ACTION_VIEW || action == Intent.ACTION_SEND) {
            persistTorrentFileImport(uri, "intent")
        }
    }

    private fun persistTorrentFileImport(uri: Uri, source: String) {
        val obj = JSONObject()
        obj.put("type", "torrent_file")
        obj.put("source", source)
        obj.put("uri", uri.toString())
        obj.put("name", queryDisplayName(uri))
        obj.put("sizeBytes", querySize(uri))
        obj.put("status", "metadata_pending")
        obj.put("rightsStatus", "User Source / Unknown Rights")
        obj.put("createdAt", System.currentTimeMillis())
        prefs.edit().putString("pending_torrent_file_import", obj.toString()).apply()
    }

    private fun queryDisplayName(uri: Uri): String {
        return try {
            contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                if (cursor.moveToFirst() && nameIndex >= 0) cursor.getString(nameIndex) else uri.lastPathSegment ?: "selected.torrent"
            } ?: (uri.lastPathSegment ?: "selected.torrent")
        } catch (_: Exception) {
            uri.lastPathSegment ?: "selected.torrent"
        }
    }

    private fun querySize(uri: Uri): Long {
        return try {
            contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
                if (cursor.moveToFirst() && sizeIndex >= 0) cursor.getLong(sizeIndex) else -1L
            } ?: -1L
        } catch (_: Exception) {
            -1L
        }
    }

    private fun showToast(message: String) {
        runOnUiThread { Toast.makeText(this, message, Toast.LENGTH_SHORT).show() }
    }

    private fun openExternalUrlInternal(url: String): Boolean {
        return try {
            val parsed = Uri.parse(url)
            val scheme = parsed.scheme ?: return true
            if (scheme != "http" && scheme != "https") return true
            val intent = Intent(Intent.ACTION_VIEW, parsed)
            startActivity(intent)
            true
        } catch (_: Exception) {
            true
        }
    }

    private fun getVersionNameCompat(): String {
        return try {
            packageManager.getPackageInfo(packageName, 0).versionName ?: "unknown"
        } catch (_: Exception) {
            "unknown"
        }
    }

    private fun getVersionCodeCompat(): Long {
        return try {
            val info = packageManager.getPackageInfo(packageName, 0)
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) info.longVersionCode else @Suppress("DEPRECATION") info.versionCode.toLong()
        } catch (_: Exception) {
            -1L
        }
    }

    inner class AsgardBridge {
        @JavascriptInterface fun showToast(message: String) {
            this@MainActivity.showToast(message)
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
            obj.put("versionName", getVersionNameCompat())
            obj.put("versionCode", getVersionCodeCompat())
            obj.put("packageName", packageName)
            obj.put("repo", "asker421/Asgard")
            return obj.toString()
        }

        @JavascriptInterface fun openExternalUrl(url: String): Boolean {
            return openExternalUrlInternal(url)
        }

        @JavascriptInterface fun pickTorrentFile(): Boolean {
            return try {
                val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
                intent.addCategory(Intent.CATEGORY_OPENABLE)
                intent.type = "*/*"
                intent.putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("application/x-bittorrent", "application/octet-stream", "application/torrent"))
                startActivityForResult(intent, torrentPickerRequestCode)
                true
            } catch (_: Exception) {
                showToast("Cannot open file picker")
                false
            }
        }

        @JavascriptInterface fun getPendingTorrentFileImport(): String = prefs.getString("pending_torrent_file_import", "{}") ?: "{}"

        @JavascriptInterface fun clearPendingTorrentFileImport(): Boolean {
            prefs.edit().remove("pending_torrent_file_import").apply()
            return true
        }

        @JavascriptInterface fun openPlayer(url: String, title: String, startPosition: Long) {
            val intent = Intent(this@MainActivity, PlayerActivity::class.java)
            intent.putExtra("url", url)
            intent.putExtra("title", title)
            intent.putExtra("itemId", title.ifBlank { url })
            intent.putExtra("startPosition", startPosition)
            startActivity(intent)
        }

        @JavascriptInterface fun getTorrentTasks(): String = prefs.getString("torrent_tasks", "[]") ?: "[]"

        @JavascriptInterface fun saveTorrentTasks(tasksJson: String): Boolean {
            JSONArray(tasksJson)
            prefs.edit().putString("torrent_tasks", tasksJson).apply()
            return true
        }

        @JavascriptInterface fun addTorrentTask(taskJson: String): Boolean {
            val task = JSONObject(taskJson)
            val id = task.optString("id", task.optString("infoHash", "task_" + System.currentTimeMillis()))
            val all = JSONArray(prefs.getString("torrent_tasks", "[]"))
            val next = JSONArray()
            for (i in 0 until all.length()) {
                val old = all.getJSONObject(i)
                if (old.optString("id") != id) next.put(old)
            }
            task.put("id", id)
            task.put("updatedAt", System.currentTimeMillis())
            if (!task.has("createdAt")) task.put("createdAt", System.currentTimeMillis())
            if (!task.has("status")) task.put("status", "metadata_pending")
            next.put(task)
            prefs.edit().putString("torrent_tasks", next.toString()).apply()
            return true
        }

        @JavascriptInterface fun updateTorrentTask(taskJson: String): Boolean = addTorrentTask(taskJson)

        @JavascriptInterface fun removeTorrentTask(taskId: String): Boolean {
            val all = JSONArray(prefs.getString("torrent_tasks", "[]"))
            val next = JSONArray()
            for (i in 0 until all.length()) {
                val item = all.getJSONObject(i)
                if (item.optString("id") != taskId) next.put(item)
            }
            prefs.edit().putString("torrent_tasks", next.toString()).apply()
            return true
        }

        @JavascriptInterface fun clearTorrentTasks(): Boolean {
            prefs.edit().putString("torrent_tasks", "[]").apply()
            return true
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
