# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

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

### Not completed in this patch

- Metadata-driven Home screen was attempted, but the GitHub tool blocked the large runtime file. Home still needs a smaller safe metadata-only patch in the next step.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.24 — Auto metadata and default parser discovery

Expected release:

```text
Tag: v2.10.24
Release: Asgard TV v2.10.24
Asset: asgard-tv-release.apk
versionCode: 64
```

### Added / Changed

- Fixed media task flow so magnet/torrent metadata loading starts automatically after media task creation.
- Added `autoMetadata=true` task flag and automatic metadata loading trigger after search result conversion.
- Added default parser candidate to `parsers.json`:

```text
Default JacRed/Torznab Parser → http://pape85e.tsarea.tv:8880
```

- Improved parser discovery:
  - ignores placeholder parser URLs like `USER_CONFIGURED_*`;
  - includes bundled enabled default parser candidates;
  - saves active parser automatically when detected;
  - fills default TorrServer URL from bundled parser config if missing.
- Added `search-parser-runtime-v4.js`:
  - default/active parser is tested automatically during search;
  - search no longer depends only on manually entered parser URL;
  - parser results and source results are merged and deduplicated;
  - search UI is patched to use parser results even if manual source/parser setup is incomplete.
- Updated TorrServer adapter to prefer native POST bridge if available; Android Kotlin native POST bridge was attempted but not committed because the tool blocked the full `MainActivity.kt` update. The adapter still falls back to browser fetch for POST when native POST is unavailable.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

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

## Older releases

See Git history for `2.10.22` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.25`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
