# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

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

### Known limitation

- Native POST bridge for service API is still not committed because full `MainActivity.kt` update was blocked by the tool. If metadata changes from `Metadata API missing` to service/network failure, next fix must add native POST bridge in Android.

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

### Known limitation

- Movie metadata provider is still limited. Current Home metadata uses TVMaze series/episode data. Proper movie metadata needs a configured provider such as TMDB and should be added as a settings-driven feature.

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
- Each card shows:
  - title;
  - source count;
  - best source type;
  - quality where available;
  - seed/peer chips where available;
  - poster placeholder or poster image if available.
- Added two-level selection flow:
  1. choose movie/series card;
  2. choose a specific source/variant.
- Variant selection screen shows source options with quality/source/size/seed metadata where available.
- Primary actions are now user-facing:
  - `▶ Включить лучший`;
  - `Выбрать источник`;
  - `▶ Включить этот вариант`.
- Raw actions like `Create task`, `Open link`, and unclear link-first UI are no longer the main search UX.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## Older releases

See Git history for `2.10.24` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.27`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
