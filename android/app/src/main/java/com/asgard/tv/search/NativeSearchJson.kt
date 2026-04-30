package com.asgard.tv.search

import org.json.JSONArray
import org.json.JSONObject

object NativeSearchJson {
    fun toJson(report: SearchReport): String {
        val root = JSONObject()
        root.put("ok", report.ok)
        root.put("native", true)
        root.put("sourceCount", report.sourceCount)
        root.put("reportsOk", report.reportsOk)
        root.put("results", JSONArray(report.results.map { it.toJson() }))
        root.put("reports", JSONArray(report.reports.map { it.toJsonWithoutResults() }))
        root.put("summary", buildSummary(report.results))
        return root.toString()
    }

    fun errorToJson(error: Throwable): String {
        val root = JSONObject()
        root.put("ok", false)
        root.put("native", true)
        root.put("sourceCount", 0)
        root.put("reportsOk", 0)
        root.put("results", JSONArray())
        root.put("reports", JSONArray())
        root.put("error", error.javaClass.simpleName + ": " + (error.message ?: "native search error"))
        root.put("summary", buildSummary(emptyList()))
        return root.toString()
    }

    private fun MediaItem.toJson(): JSONObject {
        val classification = classify(sourceType, link)
        return JSONObject().apply {
            put("id", "native_" + sourceName + "_" + link.hashCode())
            put("title", title)
            put("url", link)
            put("link", link)
            put("description", description ?: "")
            put("posterUrl", posterUrl ?: "")
            put("sourceName", sourceName)
            put("sourceType", sourceType)
            put("type", when (classification) {
                "playable" -> if (link.lowercase().contains(".m3u8")) "hls" else "direct_video"
                "magnet" -> "magnet"
                "torrent" -> "torrent_url"
                else -> sourceType
            })
            put("classification", classification)
            put("rightsStatus", "User Source / Unknown Rights")
            put("requiresUserConfirmation", classification == "magnet" || classification == "torrent")
        }
    }

    private fun SourceSearchReport.toJsonWithoutResults(): JSONObject {
        return JSONObject().apply {
            put("source", sourceName)
            put("sourceName", sourceName)
            put("type", sourceType)
            put("priority", priority)
            put("ok", ok)
            put("error", error ?: "")
            put("resultCount", resultCount)
        }
    }

    private fun buildSummary(results: List<MediaItem>): JSONObject {
        val summary = JSONObject()
        summary.put("total", results.size)
        summary.put("playable", results.count { classify(it.sourceType, it.link) == "playable" })
        summary.put("magnet", results.count { classify(it.sourceType, it.link) == "magnet" })
        summary.put("torrent", results.count { classify(it.sourceType, it.link) == "torrent" })
        summary.put("link", results.count { classify(it.sourceType, it.link) == "link" })
        summary.put("not_playable", results.count { classify(it.sourceType, it.link) == "not_playable" })
        return summary
    }

    private fun classify(type: String, rawUrl: String): String {
        val url = rawUrl.lowercase()
        return when {
            type == "magnet" || url.startsWith("magnet:?") -> "magnet"
            type in setOf("torrent_file", "torrent_url", "torznab", "jacred") || url.endsWith(".torrent") || url.contains(".torrent?") -> "torrent"
            type in setOf("direct_video", "hls", "direct_stream") || url.endsWith(".mp4") || url.endsWith(".m3u8") || url.endsWith(".webm") || url.endsWith(".mkv") || url.contains(".mp4?") || url.contains(".m3u8?") -> "playable"
            url.startsWith("http://") || url.startsWith("https://") -> "link"
            else -> "not_playable"
        }
    }
}
