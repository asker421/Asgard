package com.asgard.tv.search

import android.webkit.JavascriptInterface
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking

class NativeSourceBridge(
    private val readSources: () -> String
) {
    @JavascriptInterface
    fun searchSources(query: String): String {
        return try {
            val sources = SourcesConfigParser.parse(readSources())
            val report = runBlocking(Dispatchers.IO) {
                SearchManager(sources).search(query)
            }
            NativeSearchJson.toJson(report)
        } catch (error: Throwable) {
            NativeSearchJson.errorToJson(error)
        }
    }
}
