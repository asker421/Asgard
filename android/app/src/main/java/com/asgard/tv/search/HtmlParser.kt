package com.asgard.tv.search

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jsoup.Jsoup
import org.jsoup.nodes.Element

class HtmlParser : BaseParser {
    override suspend fun search(source: SourceConfig, query: String): List<MediaItem> {
        val url = SearchUrlBuilder.build(source.urlTemplate, query)
        val html = HttpFetcher.get(url)
        val selectors = HtmlSelectorConfig.fromNotes(source.notes)

        return withContext(Dispatchers.Default) {
            val document = Jsoup.parse(html, url)
            document.select(selectors.item)
                .take(80)
                .mapNotNull { element ->
                    val title = element.extract(selectors.title)?.takeIf { it.isNotBlank() }
                    val link = element.extract(selectors.link)?.takeIf { it.isNotBlank() }
                    if (title == null || link == null) return@mapNotNull null
                    MediaItem(
                        title = title,
                        link = link,
                        description = selectors.description?.let { element.extract(it) },
                        posterUrl = selectors.poster?.let { element.extract(it) },
                        sourceName = source.name,
                        sourceType = source.type,
                        priority = source.priority
                    )
                }
        }
    }
}

data class HtmlSelectorConfig(
    val item: String,
    val title: String,
    val link: String,
    val description: String?,
    val poster: String?
) {
    companion object {
        fun fromNotes(notes: String): HtmlSelectorConfig {
            val map = notes.parseKeyValueNotes()
            return HtmlSelectorConfig(
                item = map["item"] ?: "a[href]",
                title = map["title"] ?: "self",
                link = map["link"] ?: "self@href",
                description = map["description"],
                poster = map["poster"]
            )
        }
    }
}

private fun Element.extract(selectorExpression: String): String? {
    val selector = selectorExpression.substringBefore("@").trim()
    val attr = selectorExpression.substringAfter("@", missingDelimiterValue = "").trim()

    val target = when (selector) {
        "self", ":self", "" -> this
        else -> selectFirst(selector)
    } ?: return null

    return if (attr.isBlank()) {
        target.text().trim()
    } else {
        when (attr.lowercase()) {
            "href", "src" -> target.absUrl(attr).ifBlank { target.attr(attr) }.trim()
            "text" -> target.text().trim()
            "html" -> target.html().trim()
            else -> target.attr(attr).trim()
        }
    }
}
