package com.asgard.tv.search

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.supervisorScope
import kotlinx.coroutines.withTimeout

class SearchManager(
    private val sources: List<SourceConfig>,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO,
    private val errorLogger: SearchErrorLogger = NoOpSearchErrorLogger,
    private val perSourceTimeoutMs: Long = 25_000L
) {
    suspend fun search(query: String): SearchReport = supervisorScope {
        val enabledSources = sources
            .filter { it.enabled }
            .filter { it.urlTemplate.startsWith("http://") || it.urlTemplate.startsWith("https://") || it.urlTemplate.startsWith("magnet:?") }
            .sortedBy { it.priority }

        val jobs = enabledSources.map { source ->
            async(dispatcher) {
                runCatching {
                    if (source.authRequired) {
                        return@async SourceSearchReport(
                            sourceName = source.name,
                            sourceType = source.type,
                            priority = source.priority,
                            ok = false,
                            status = ProviderStatus.AUTH_REQUIRED,
                            error = "Source requires authentication and is skipped by native engine",
                            resultCount = 0,
                            results = emptyList()
                        )
                    }

                    val results = withTimeout(perSourceTimeoutMs) {
                        when {
                            isDirectMediaSource(source) -> searchDirectMediaSource(source, query)
                            source.type in setOf("search_template", "json", "api", "torznab", "jacred", "rss", "xml") && source.urlTemplate.contains("{query}") -> ParserFactory.create(source.type).search(source, query)
                            else -> emptyList()
                        }
                    }
                    SourceSearchReport(
                        sourceName = source.name,
                        sourceType = source.type,
                        priority = source.priority,
                        ok = true,
                        status = if (results.isEmpty()) ProviderStatus.EMPTY else ProviderStatus.OK,
                        error = null,
                        resultCount = results.size,
                        results = results
                    )
                }.getOrElse { error ->
                    errorLogger.log(source, error)
                    SourceSearchReport(
                        sourceName = source.name,
                        sourceType = source.type,
                        priority = source.priority,
                        ok = false,
                        status = error.toProviderStatus(),
                        error = error.message ?: error.javaClass.simpleName,
                        resultCount = 0,
                        results = emptyList()
                    )
                }
            }
        }

        val reports = jobs.awaitAll().sortedWith(compareBy<SourceSearchReport> { it.priority }.thenBy { it.sourceName })
        val results = reports
            .flatMap { it.results }
            .sortedWith(compareBy<MediaItem> { it.priority }.thenBy { it.sourceName })
            .distinctBy { it.link }

        SearchReport(
            ok = true,
            sourceCount = enabledSources.size,
            reportsOk = reports.count { it.ok },
            reports = reports,
            results = results
        )
    }

    private fun Throwable.toProviderStatus(): ProviderStatus {
        return when (this) {
            is ProviderProtectedException -> ProviderStatus.PROVIDER_PROTECTED
            is HumanVerificationRequiredException -> ProviderStatus.HUMAN_VERIFICATION_REQUIRED
            is ProviderTimeoutException -> ProviderStatus.TIMEOUT
            is kotlinx.coroutines.TimeoutCancellationException -> ProviderStatus.TIMEOUT
            is org.json.JSONException -> ProviderStatus.PARSE_ERROR
            is org.xml.sax.SAXException -> ProviderStatus.PARSE_ERROR
            else -> ProviderStatus.NETWORK_ERROR
        }
    }

    private fun isDirectMediaSource(source: SourceConfig): Boolean {
        val url = source.urlTemplate.lowercase()
        return source.type in setOf("direct_video", "hls", "direct_stream", "magnet", "torrent_url") ||
            url.startsWith("magnet:?") || url.endsWith(".torrent") ||
            url.endsWith(".mp4") || url.endsWith(".m3u8") || url.endsWith(".webm") || url.endsWith(".mkv")
    }

    private fun searchDirectMediaSource(source: SourceConfig, query: String): List<MediaItem> {
        val normalizedQuery = query.trim().lowercase()
        val haystack = listOf(source.name, source.urlTemplate, source.notes).joinToString(" ").lowercase()
        if (normalizedQuery.isNotBlank() && !haystack.contains(normalizedQuery)) return emptyList()
        return listOf(
            MediaItem(
                title = source.name,
                link = source.urlTemplate,
                description = source.notes,
                posterUrl = null,
                sourceName = source.name,
                sourceType = source.type,
                priority = source.priority,
                quality = inferQuality(source.urlTemplate + " " + source.notes)
            )
        )
    }
}

data class SearchReport(
    val ok: Boolean,
    val sourceCount: Int,
    val reportsOk: Int,
    val reports: List<SourceSearchReport>,
    val results: List<MediaItem>
)

data class SourceSearchReport(
    val sourceName: String,
    val sourceType: String,
    val priority: Int,
    val ok: Boolean,
    val status: ProviderStatus = if (ok) ProviderStatus.OK else ProviderStatus.NETWORK_ERROR,
    val error: String?,
    val resultCount: Int,
    val results: List<MediaItem>
)

interface SearchErrorLogger {
    fun log(source: SourceConfig, throwable: Throwable)
}

object NoOpSearchErrorLogger : SearchErrorLogger {
    override fun log(source: SourceConfig, throwable: Throwable) = Unit
}

internal fun inferQuality(raw: String?): String? {
    val text = raw.orEmpty().lowercase()
    return when {
        "2160" in text || "4k" in text -> "4K"
        "1080" in text -> "1080p"
        "720" in text -> "720p"
        "480" in text -> "480p"
        "hdr" in text -> "HDR"
        else -> null
    }
}
