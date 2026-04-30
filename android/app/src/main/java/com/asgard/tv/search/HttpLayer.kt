package com.asgard.tv.search

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException
import java.net.URLEncoder
import java.util.concurrent.TimeUnit

class UserAgentInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .header(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            )
            .header("Accept", "text/html,application/json,application/xml,text/xml,application/rss+xml,*/*")
            .header("Accept-Language", "en-US,en;q=0.9,ru;q=0.8,az;q=0.7")
            .build()
        return chain.proceed(request)
    }
}

object HttpClientProvider {
    val client: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor(UserAgentInterceptor())
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(25, TimeUnit.SECONDS)
            .writeTimeout(15, TimeUnit.SECONDS)
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

object HttpFetcher {
    suspend fun get(url: String): String = withContext(Dispatchers.IO) {
        val request = Request.Builder().url(url).get().build()
        HttpClientProvider.client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("HTTP ${response.code} for $url")
            response.body?.string() ?: throw IOException("Empty response body for $url")
        }
    }
}
