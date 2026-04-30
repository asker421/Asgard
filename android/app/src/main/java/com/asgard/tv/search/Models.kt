package com.asgard.tv.search

data class SourceConfig(
    val name: String,
    val type: String,
    val urlTemplate: String,
    val language: String,
    val enabled: Boolean,
    val priority: Int,
    val authRequired: Boolean,
    val notes: String
)

data class MediaItem(
    val title: String,
    val link: String,
    val description: String? = null,
    val posterUrl: String? = null,
    val sourceName: String,
    val sourceType: String,
    val priority: Int
)
