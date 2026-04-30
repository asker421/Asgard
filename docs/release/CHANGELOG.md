# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.23 — Search UI, media task fix, default service URL

Expected release:

```text
Tag: v2.10.23
Release: Asgard TV v2.10.23
Asset: asgard-tv-release.apk
versionCode: 63
```

### Added / Changed

- Added default TorrServer/service URL:

```text
http://pape85e.tsarea.tv:8880
```

- Added `media-task-api-fix-v3.js` as a late runtime patch.
- Fixed search result → media task conversion so `Create media task` no longer calls the old `torrent_task_api_unavailable` stub.
- Reorganized Search UI:
  - search results now appear immediately under the search bar;
  - setup and diagnostics are below the result list in compact expandable blocks;
  - result cards now explain the result type: direct playable, TorrServer-required torrent/magnet, or normal web link;
  - results are grouped as direct playable, torrent files, magnet links, then other links.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.22 — Native source search hardening

Expected release:

```text
Tag: v2.10.22
Release: Asgard TV v2.10.22
Asset: asgard-tv-release.apk
versionCode: 62
```

### Added / Changed

- Hardened native source search with safe provider guard detection.
- Provider protection and human-verification pages are now returned as source diagnostics instead of being parsed as normal media pages.
- Added per-source timeout handling in `SearchManager` so one stuck provider does not block other enabled sources.
- Added provider statuses in native reports:
  - `ok`
  - `empty`
  - `auth_required`
  - `provider_protected`
  - `human_verification_required`
  - `timeout`
  - `parse_error`
  - `network_error`
- Enriched native `MediaItem` with optional `year`, `quality`, and `size` fields.
- Added safe explicit URL extraction from HTML/script text for direct media links and user-configured P2P references that are already present in source HTML.
- Enriched JSON/API parser metadata mapping for `year`, `quality`, and `size` through `notes`.
- Enriched Torznab/JacRed parser metadata extraction for year, quality and size/enclosure length.
- Exposed provider status and enriched metadata through `NativeSearchJson` for WebView diagnostics/UI.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No protected-provider circumvention, no automated human-verification solving, no unauthorized catalogs, no paid-access circumvention, and no embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.21 — Native sources.txt search engine integration

Expected release:

```text
Tag: v2.10.21
Release: Asgard TV v2.10.21
Asset: asgard-tv-release.apk
versionCode: 61
```

### Added / Changed

- Added native Kotlin source search engine under `android/app/src/main/java/com/asgard/tv/search/`.
- Added `SourceConfig` and `MediaItem` models for 8-column `sources.txt` parsing.
- Added safe `sources.txt` parser for exactly 8-column source rows.
- Added OkHttp network layer with realistic browser User-Agent.
- Added coroutine-based parallel `SearchManager` using `async/awaitAll` and per-source error isolation.
- Added native parser factory and parser implementations:
  - `search_template` via Jsoup HTML parsing;
  - `json` / `api` via flexible JSONObject path parsing;
  - `torznab` / `jacred` / `rss` / `xml` via XML item parsing.
- Added direct media source handling for `direct_video`, `hls`, `direct_stream` and direct `.mp4/.m3u8/.webm/.mkv` links.
- Added `NativeSourceBridge` exposed to WebView as `AsgardNativeSearch`.
- Added `native-search-runtime.js` to try native search first and fall back to existing JS search if native search fails.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and runtime QA are still pending.

## 2.10.20 — Visible demo catalog and enabled legal resources

Expected release:

```text
Tag: v2.10.20
Release: Asgard TV v2.10.20
Asset: asgard-tv-release.apk
versionCode: 60
```

### Added / Changed

- Enabled bundled legal/public demo video sources in `sources.txt` so the app can be tested immediately.
- Added `demo-catalog-runtime.js` as final runtime layer.
- Home screen now has guaranteed visible demo movies after all runtime overrides.
- Catalog screen now has guaranteed visible legal demo movies after all runtime overrides.
- Demo cards open details and native player through current bridge where available.
- Demo content uses open/public sample streams only:
  - Big Buck Bunny;
  - Sintel;
  - Tears of Steel;
  - Elephants Dream;
  - For Bigger Blazes;
  - For Bigger Escapes.
- Added `streaming-first-v2.js` runtime layer while working on `ASG-TOR-004`; it improves selected stream readiness lifecycle, but runtime QA is still pending.
- Fixed accidental Gradle syntax typo from the version bump before release verification.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Android TV runtime QA is still pending.

## 2.10.19 — Metadata and file selection v2

- Added `metadata-files-v2.js` runtime layer for `ASG-TOR-003`.
- Metadata/file selection now has stricter file normalization.

## Previous releases

See Git history for older release details from `2.10.18` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.23`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
