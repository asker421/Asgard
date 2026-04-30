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
    val priority: Int,
    val year: String? = null,
    val quality: String? = null,
    val size: String? = null
)

enum class ProviderStatus {
    OK,
    EMPTY,
    DISABLED,
    INVALID_CONFIG,
    AUTH_REQUIRED,
    UNSUPPORTED,
    NETWORK_ERROR,
    TIMEOUT,
    PROVIDER_PROTECTED,
    HUMAN_VERIFICATION_REQUIRED,
    PARSE_ERROR
}

class ProviderProtectedException(message: String) : Exception(message)
class HumanVerificationRequiredException(message: String) : Exception(message)
class ProviderTimeoutException(message: String) : Exception(message)
