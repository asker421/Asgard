package com.asgard.tv.search

interface BaseParser {
    suspend fun search(source: SourceConfig, query: String): List<MediaItem>
}

object ParserFactory {
    fun create(type: String): BaseParser {
        return when (type.lowercase()) {
            "search_template" -> HtmlParser()
            "json", "api" -> JsonParser()
            "torznab", "jacred", "rss", "xml" -> TorznabParser()
            else -> UnsupportedParser(type)
        }
    }
}

class UnsupportedParser(private val type: String) : BaseParser {
    override suspend fun search(source: SourceConfig, query: String): List<MediaItem> = emptyList()
}
