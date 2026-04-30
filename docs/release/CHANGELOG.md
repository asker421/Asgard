# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.17 — Search result to persistent media task

Expected release:

```text
Tag: v2.10.17
Release: Asgard TV v2.10.17
Asset: asgard-tv-release.apk
versionCode: 57
```

### Added / Changed

- Added `media-task-creation-v2.js` runtime layer for `ASG-TOR-SEARCH-002`.
- Selected normalized search result now converts through a stricter persistent media task creation path.
- Direct playable result becomes `stream_ready` task with stream URL.
- Torrent/magnet/torrent-file result becomes `metadata_pending` task.
- Link-only/non-playable result is blocked with readable error state instead of creating broken task.
- Torrent/magnet-like result requires explicit rights confirmation.
- Task opens immediately after creation.
- Creation diagnostics now show normalized input type, target presence and validation result.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Code-wired only. Android TV runtime QA is still pending.

## 2.10.16 — Title media search MVP layer

- Added `title-media-search.js` runtime layer for `ASG-TOR-SEARCH-001`.
- Search screen now presents explicit movie/series title search path.

## Previous releases

See Git history for older release details from `2.10.15` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.17`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
