package com.asgard.tv.search

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.supervisorScope

class SearchManager(
    private val sources: List<SourceConfig>,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO,
    private val errorLogger: SearchErrorLogger = NoOpSearchErrorLogger
) {
    suspend fun search(query: String): SearchReport = supervisorScope {
        val enabledSources = sources
            .filter { it.enabled }
            .filter { !it.authRequired }
            .filter { it.urlTemplate.startsWith("http://") || it.urlTemplate.startsWith("https://") }
            .sortedBy { it.priority }

        val jobs = enabledSources.map { source ->
            async(dispatcher) {
                runCatching {
                    val results = when {
                        isDirectMediaSource(source) -> searchDirectMediaSource(source, query)
                        source.type in setOf("search_template", "json", "api", "torznab", "jacred", "rss", "xml") && source.urlTemplate.contains("{query}") -> ParserFactory.create(source.type).search(source, query)
                        else -> emptyList()
                    }
                    SourceSearchReport(
                        sourceName = source.name,
                        sourceType = source.type,
                        priority = source.priority,
                        ok = true,
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

    private fun isDirectMediaSource(source: SourceConfig): Boolean {
        val url = source.urlTemplate.lowercase()
        return source.type in setOf("direct_video", "hls", "direct_stream") ||
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
                priority = source.priority
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
