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
            .filter { it.urlTemplate.contains("{query}") || it.type !in listOf("search_template", "json", "api", "torznab", "jacred", "rss", "xml") }
            .sortedBy { it.priority }

        val jobs = enabledSources.map { source ->
            async(dispatcher) {
                runCatching {
                    val parser = ParserFactory.create(source.type)
                    val results = parser.search(source, query)
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
