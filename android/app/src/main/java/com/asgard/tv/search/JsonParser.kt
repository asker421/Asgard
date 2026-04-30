package com.asgard.tv.search

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import org.json.JSONTokener

class JsonParser : BaseParser {
    override suspend fun search(source: SourceConfig, query: String): List<MediaItem> {
        val url = SearchUrlBuilder.build(source.urlTemplate, query)
        val jsonRaw = HttpFetcher.get(url)
        val config = JsonMappingConfig.fromNotes(source.notes)

        return withContext(Dispatchers.Default) {
            val root = JSONTokener(jsonRaw).nextValue()
            val items = root.resolveArray(config.itemsPath)
            items.take(80).mapNotNull { item ->
                val title = item.resolveString(config.titlePath)?.takeIf { it.isNotBlank() }
                val link = item.resolveString(config.linkPath)?.takeIf { it.isNotBlank() }
                if (title == null || link == null) return@mapNotNull null
                MediaItem(
                    title = title,
                    link = link,
                    description = config.descriptionPath?.let { item.resolveString(it) },
                    posterUrl = config.posterPath?.let { item.resolveString(it) },
                    sourceName = source.name,
                    sourceType = source.type,
                    priority = source.priority
                )
            }
        }
    }
}

data class JsonMappingConfig(
    val itemsPath: String,
    val titlePath: String,
    val linkPath: String,
    val descriptionPath: String?,
    val posterPath: String?
) {
    companion object {
        fun fromNotes(notes: String): JsonMappingConfig {
            val map = notes.parseKeyValueNotes()
            return JsonMappingConfig(
                itemsPath = map["items"] ?: "results",
                titlePath = map["title"] ?: "title",
                linkPath = map["link"] ?: "url",
                descriptionPath = map["description"] ?: map["desc"] ?: "description",
                posterPath = map["poster"] ?: map["poster_url"]
            )
        }
    }
}

private fun Any.resolveArray(path: String): List<JSONObject> {
    val value = resolvePath(path)
    return when (value) {
        is JSONArray -> buildList {
            for (i in 0 until value.length()) {
                val obj = value.opt(i)
                if (obj is JSONObject) add(obj)
            }
        }
        is JSONObject -> listOf(value)
        else -> if (this is JSONArray) buildList {
            for (i in 0 until this@resolveArray.length()) {
                val obj = this@resolveArray.opt(i)
                if (obj is JSONObject) add(obj)
            }
        } else emptyList()
    }
}

private fun Any.resolveString(path: String): String? {
    val value = resolvePath(path)
    return when (value) {
        null, JSONObject.NULL -> null
        else -> value.toString()
    }
}

private fun Any.resolvePath(path: String): Any? {
    if (path.isBlank()) return this
    var current: Any? = this
    for (part in path.split(".")) {
        if (current == null) return null
        current = when (current) {
            is JSONObject -> current.opt(part)
            is JSONArray -> {
                val index = part.toIntOrNull() ?: return null
                if (index in 0 until current.length()) current.opt(index) else null
            }
            else -> return null
        }
    }
    return current
}
