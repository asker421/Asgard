package com.asgard.tv.search

object SourcesConfigParser {

    fun parse(rawText: String): List<SourceConfig> {
        return rawText
            .lineSequence()
            .mapIndexedNotNull { index, rawLine ->
                val line = rawLine.trim()
                if (line.isBlank() || line.startsWith("#")) return@mapIndexedNotNull null

                val columns = line.split("|").map { it.trim() }
                if (columns.size != 8) return@mapIndexedNotNull null

                val enabled = columns[4].toFlexibleBooleanOrNull() ?: false
                val authRequired = columns[6].toFlexibleBooleanOrNull() ?: false
                val priority = columns[5].toIntOrNull() ?: (index + 1000)

                SourceConfig(
                    name = columns[0],
                    type = columns[1].lowercase(),
                    urlTemplate = columns[2],
                    language = columns[3],
                    enabled = enabled,
                    priority = priority,
                    authRequired = authRequired,
                    notes = columns[7]
                )
            }
            .toList()
    }

    private fun String.toFlexibleBooleanOrNull(): Boolean? {
        return when (trim().lowercase()) {
            "true", "1", "yes", "y", "enabled" -> true
            "false", "0", "no", "n", "disabled" -> false
            else -> null
        }
    }
}
