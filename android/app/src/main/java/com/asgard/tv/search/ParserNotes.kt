package com.asgard.tv.search

internal fun String.parseKeyValueNotes(): Map<String, String> {
    if (isBlank()) return emptyMap()
    return split(";")
        .mapNotNull { pair ->
            val index = pair.indexOf("=")
            if (index == -1) return@mapNotNull null
            val key = pair.substring(0, index).trim()
            val value = pair.substring(index + 1).trim()
            if (key.isBlank() || value.isBlank()) null else key to value
        }
        .toMap()
}
