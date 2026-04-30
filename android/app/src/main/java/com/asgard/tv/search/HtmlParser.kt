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
            val selectorResults = document.select(selectors.item)
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
                        priority = source.priority,
                        year = selectors.year?.let { element.extract(it) },
                        quality = selectors.quality?.let { element.extract(it) } ?: inferQuality(title + " " + link),
                        size = selectors.size?.let { element.extract(it) }
                    )
                }

            val deepResults = extractExplicitMediaAndP2p(source, html, query)
            (selectorResults + deepResults).distinctBy { it.link }.take(120)
        }
    }

    private fun extractExplicitMediaAndP2p(source: SourceConfig, html: String, query: String): List<MediaItem> {
        val q = query.trim().lowercase()
        val patterns = listOf(
            Regex("""https?://[^\s\"'<>\\]+?\.(?:mp4|m3u8|webm|mkv)(?:\?[^\s\"'<>\\]*)?""", RegexOption.IGNORE_CASE),
            Regex("""magnet:\?[^\s\"'<>\\]+""", RegexOption.IGNORE_CASE),
            Regex("""https?://[^\s\"'<>\\]+?\.torrent(?:\?[^\s\"'<>\\]*)?""", RegexOption.IGNORE_CASE)
        )
        return patterns
            .flatMap { pattern -> pattern.findAll(html).map { it.value } }
            .distinct()
            .filter { link -> q.isBlank() || source.name.lowercase().contains(q) || source.notes.lowercase().contains(q) || link.lowercase().contains(q) || isPlayableOrP2p(link) }
            .map { link ->
                MediaItem(
                    title = source.name,
                    link = link,
                    description = "Explicit media/P2P URL found in source HTML",
                    posterUrl = null,
                    sourceName = source.name,
                    sourceType = source.type,
                    priority = source.priority,
                    quality = inferQuality(link)
                )
            }
    }

    private fun isPlayableOrP2p(link: String): Boolean {
        val url = link.lowercase()
        return url.startsWith("magnet:?") || url.endsWith(".torrent") ||
            url.contains(".torrent?") || url.endsWith(".mp4") || url.contains(".mp4?") ||
            url.endsWith(".m3u8") || url.contains(".m3u8?") ||
            url.endsWith(".webm") || url.contains(".webm?") ||
            url.endsWith(".mkv") || url.contains(".mkv?")
    }
}

data class HtmlSelectorConfig(
    val item: String,
    val title: String,
    val link: String,
    val description: String?,
    val poster: String?,
    val year: String?,
    val quality: String?,
    val size: String?
) {
    companion object {
        fun fromNotes(notes: String): HtmlSelectorConfig {
            val map = notes.parseKeyValueNotes()
            return HtmlSelectorConfig(
                item = map["item"] ?: "a[href]",
                title = map["title"] ?: "self",
                link = map["link"] ?: "self@href",
                description = map["description"],
                poster = map["poster"],
                year = map["year"],
                quality = map["quality"],
                size = map["size"]
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
