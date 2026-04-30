# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

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
- No pirated catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, paid auth bypass, or embedded P2P engine were added.

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
- No pirated catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or embedded P2P engine were added.

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
3. GitHub Releases contains matching tag, for example `v2.10.21`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
