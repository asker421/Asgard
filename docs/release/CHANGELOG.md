# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.16 — Title media search MVP layer

Expected release:

```text
Tag: v2.10.16
Release: Asgard TV v2.10.16
Asset: asgard-tv-release.apk
versionCode: 56
```

### Added / Changed

- Added `title-media-search.js` runtime layer for `ASG-TOR-SEARCH-001`.
- Search screen now presents explicit movie/series title search path.
- Search now checks whether user-configured sources/parser exist before querying.
- No configured source shows setup actions instead of silent empty results.
- Results are rendered as user-configured media results with source, type, quality, size, seeds/peers where available.
- Search summary shows query, total, playable, torrent, magnet, link, errors and source count.
- Result actions continue to support Watch, Create media task, Prepare stream, Open link and Diagnostics.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Code-wired only. Android TV runtime QA is still pending.

## 2.10.15 — Simple installation and update guide

- Updated `docs/release/INSTALLATION_GUIDE.md` for `ASG-101`.
- Guide now targets non-programmer installation and update flow.

## Previous releases

See Git history for older release details from `2.10.14` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.16`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
