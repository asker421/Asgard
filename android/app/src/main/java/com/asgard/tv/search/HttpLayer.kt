package com.asgard.tv.search

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException
import java.net.SocketTimeoutException
import java.net.URLEncoder
import java.util.concurrent.TimeUnit

class UserAgentInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .header(
                "User-Agent",
                "Mozilla/5.0 (Linux; Android 12; Android TV) AppleWebKit/537.36 " +
                    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 AsgardTV"
            )
            .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,text/plain;q=0.7,*/*;q=0.6")
            .header("Accept-Language", "en-US,en;q=0.9,ru;q=0.8,az;q=0.7")
            .header("Cache-Control", "no-cache")
            .header("Pragma", "no-cache")
            .build()
        return chain.proceed(request)
    }
}

object HttpClientProvider {
    val client: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor(UserAgentInterceptor())
            .connectTimeout(12, TimeUnit.SECONDS)
            .readTimeout(18, TimeUnit.SECONDS)
            .writeTimeout(12, TimeUnit.SECONDS)
            .callTimeout(25, TimeUnit.SECONDS)
            .followRedirects(true)
            .followSslRedirects(true)
            .build()
    }
}

object SearchUrlBuilder {
    fun build(template: String, query: String): String {
        val encodedQuery = URLEncoder.encode(query, Charsets.UTF_8.name())
        return template
            .replace("{query}", encodedQuery)
            .replace("{page}", "1")
            .replace("{year}", "")
            .replace("{quality}", "")
            .replace("{category}", "")
    }
}

object ProviderGuard {
    fun check(body: String, statusCode: Int, url: String) {
        val text = body.lowercase()
        val humanCheckMarkers = listOf(
            "captcha",
            "verify you are human",
            "human verification"
        )
        val protectedPageMarkers = listOf(
            "checking your browser",
            "just a moment",
            "security check",
            "browser verification",
            "ddos protection"
        )

        if (humanCheckMarkers.any { text.contains(it) } || statusCode == 429) {
            throw HumanVerificationRequiredException("Human verification required for provider: $url")
        }
        if ((statusCode == 403 || statusCode == 503) && protectedPageMarkers.any { text.contains(it) }) {
            throw ProviderProtectedException("Provider protection page detected: $url")
        }
    }
}

object HttpFetcher {
    suspend fun get(url: String): String = withContext(Dispatchers.IO) {
        val request = Request.Builder().url(url).get().build()
        try {
            HttpClientProvider.client.newCall(request).execute().use { response ->
                val body = response.body?.string() ?: ""
                ProviderGuard.check(body, response.code, url)
                if (!response.isSuccessful) throw IOException("HTTP ${response.code} for $url")
                body
            }
        } catch (e: SocketTimeoutException) {
            throw ProviderTimeoutException("Timeout while loading $url")
        }
    }
}
