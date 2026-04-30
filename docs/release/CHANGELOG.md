# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.28 — TMDB metadata and resilient stream loader

Expected release:

```text
Tag: v2.10.28
Release: Asgard TV v2.10.28
Asset: asgard-tv-release.apk
versionCode: 68
```

### Added / Changed

- Added `metadata-loader-v12.js`.
- Metadata/files loading is more resilient:
  - retries several times instead of failing after one attempt;
  - extracts torrent hash from magnet btih where possible;
  - uses service list/get fallback when add response does not immediately return hash;
  - selects the largest supported video file;
  - builds stream URL only after file selection is available;
  - returns clearer states such as `metadata_pending`, `hash_pending`, `no_playable_video_file`, and `stream_ready`.
- Added `metadata-provider-v13.js`.
- Added TMDB metadata provider foundation with `ru-RU` language and region settings.
- Supports trending movies, now playing movies, trending series, details, cast and seasons.
- Added `home-tmdb-v14.js`.
- Home no longer pretends random English TVMaze data is a real movie/top chart.
- Without TMDB API key, Home shows a clear setup state instead of fake top charts.
- With TMDB API key, Home shows real TMDB `ru-RU` metadata cards.
- Details can show cast and season grouping for series.
- `▶ Включить фильм` routes title into Search/source selection flow.
- Updated `index.html` to load new runtime layers.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### Known limitation

- Native POST bridge for service API is still not committed. If service metadata still fails with service/network/POST/CORS errors, next fix must add native POST bridge in Android.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.27 — Metadata API compatibility and search timeout

Expected release:

```text
Tag: v2.10.27
Release: Asgard TV v2.10.27
Asset: asgard-tv-release.apk
versionCode: 67
```

### Added / Changed

- Added `metadata-api-compat-v10.js`.
- Fixed visible playback blocker where one-click playback could fail with `Metadata API missing`.
- Compatibility layer guarantees `AsMediaTask.loadMetadata()` exists before one-click playback calls it.
- Compatibility layer delegates to `AsMetadataFilesV2.load()` when available and returns a readable `metadata_loader_missing` diagnostic if the loader is still unavailable.
- Added `search-timeout-v11.js`.
- Search is now wrapped by a 14-second guard to prevent indefinite loading when a parser/source hangs.
- Timeout now returns a readable diagnostic report instead of leaving the user stuck on loading.
- Updated `index.html` to load the new runtime layers.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.26 — Metadata Home actually enabled and enriched

Expected release:

```text
Tag: v2.10.26
Release: Asgard TV v2.10.26
Asset: asgard-tv-release.apk
versionCode: 66
```

### Added / Changed

- Fixed Home screen remaining on demo/mock content.
- `home-metadata-v7.js` is now actually loaded by `index.html` after `demo-catalog-runtime.js`.
- Added `home-metadata-force-v8.js` to force metadata Home over demo fallback when the current screen is Home.
- Added `home-metadata-enrich-v9.js` to enrich Details with actor/cast cards from TVMaze where available.
- Home now shows metadata cards for series/episodes instead of only demo videos as the primary screen.
- Home cards include poster, title, episode/date, genres and rating where available.
- Details now include summary/description, genre/date/rating chips and actors/cast where available.
- `▶ Включить фильм` on metadata cards routes to Search by title. Playback links are still resolved only from user-configured/search sources.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.25 — Search cards and source variant selection

Expected release:

```text
Tag: v2.10.25
Release: Asgard TV v2.10.25
Asset: asgard-tv-release.apk
versionCode: 65
```

### Added / Changed

- Added `search-card-groups-v6.js`.
- Search results are now grouped into movie/series cards instead of raw text/link rows.
- Each card groups multiple variants by cleaned title.
- Added two-level selection flow:
  1. choose movie/series card;
  2. choose a specific source/variant.
- Primary actions are now user-facing:
  - `▶ Включить лучший`;
  - `Выбрать источник`;
  - `▶ Включить этот вариант`.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## Older releases

See Git history for `2.10.24` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.28`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
