package com.asgard.tv.search

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.w3c.dom.Element
import org.w3c.dom.Node
import java.io.ByteArrayInputStream
import javax.xml.XMLConstants
import javax.xml.parsers.DocumentBuilderFactory

class TorznabParser : BaseParser {
    override suspend fun search(source: SourceConfig, query: String): List<MediaItem> {
        val url = SearchUrlBuilder.build(source.urlTemplate, query)
        val xmlRaw = HttpFetcher.get(url)

        return withContext(Dispatchers.Default) {
            val document = secureDocumentBuilderFactory()
                .newDocumentBuilder()
                .parse(ByteArrayInputStream(xmlRaw.toByteArray(Charsets.UTF_8)))
            document.documentElement.normalize()
            val items = document.getElementsByTagName("item")

            buildList {
                for (i in 0 until items.length.coerceAtMost(100)) {
                    val item = items.item(i) as? Element ?: continue
                    val title = item.childText("title")?.takeIf { it.isNotBlank() }
                    val link = item.extractTorrentOrMagnetLink()
                    if (title.isNullOrBlank() || link.isNullOrBlank()) continue
                    add(
                        MediaItem(
                            title = title,
                            link = link,
                            description = item.childText("description"),
                            posterUrl = item.extractPosterUrl(),
                            sourceName = source.name,
                            sourceType = source.type,
                            priority = source.priority,
                            year = item.extractTorznabAttr("year"),
                            quality = item.extractTorznabAttr("quality") ?: inferQuality(title),
                            size = item.extractTorznabAttr("size") ?: item.extractEnclosureLength()
                        )
                    )
                }
            }
        }
    }

    private fun secureDocumentBuilderFactory(): DocumentBuilderFactory {
        return DocumentBuilderFactory.newInstance().apply {
            isNamespaceAware = true
            setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)
            trySetFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
            trySetFeature("http://xml.org/sax/features/external-general-entities", false)
            trySetFeature("http://xml.org/sax/features/external-parameter-entities", false)
            trySetFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false)
            isExpandEntityReferences = false
        }
    }

    private fun DocumentBuilderFactory.trySetFeature(name: String, value: Boolean) {
        runCatching { setFeature(name, value) }
    }
}

private fun Element.childText(tagName: String): String? {
    val nodes = getElementsByTagName(tagName)
    if (nodes.length == 0) return null
    return nodes.item(0)?.textContent?.trim()
}

private fun Element.extractTorrentOrMagnetLink(): String? {
    extractTorznabAttr("magneturl")?.let { return it }
    extractTorznabAttr("magnet")?.let { return it }

    val enclosures = getElementsByTagName("enclosure")
    for (i in 0 until enclosures.length) {
        val element = enclosures.item(i) as? Element ?: continue
        val url = element.getAttribute("url")?.trim()
        if (!url.isNullOrBlank()) return url
    }

    childText("link")?.takeIf { it.isNotBlank() }?.let { return it }
    childText("guid")?.takeIf { it.isNotBlank() }?.let { return it }
    return null
}

private fun Element.extractPosterUrl(): String? {
    return extractTorznabAttr("coverurl")
        ?: extractTorznabAttr("poster")
        ?: extractTorznabAttr("posterurl")
        ?: extractTorznabAttr("banner")
}

private fun Element.extractEnclosureLength(): String? {
    val enclosures = getElementsByTagName("enclosure")
    for (i in 0 until enclosures.length) {
        val element = enclosures.item(i) as? Element ?: continue
        val length = element.getAttribute("length")?.trim()
        if (!length.isNullOrBlank()) return length
    }
    return null
}

private fun Element.extractTorznabAttr(name: String): String? {
    val nodes = getElementsByTagNameNS("*", "attr")
    for (i in 0 until nodes.length) {
        val node = nodes.item(i)
        if (node.nodeType != Node.ELEMENT_NODE) continue
        val element = node as Element
        val attrName = element.getAttribute("name")
        val attrValue = element.getAttribute("value")
        if (attrName.equals(name, ignoreCase = true) && attrValue.isNotBlank()) {
            return attrValue.trim()
        }
    }
    return null
}
