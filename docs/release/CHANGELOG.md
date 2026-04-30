# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.10 — Unified search normalization v2

Expected release:

```text
Tag: v2.10.10
Release: Asgard TV v2.10.10
Asset: asgard-tv-release.apk
versionCode: 50
```

### Added / Changed

- Added `search-normalization-v2.js` runtime layer for `ASG-012`.
- Unified result schema for Search screen: title, source, kind, URL fields, quality, size, seeders, peers, rights status and score.
- Better kind detection for direct playable, torrent file, magnet and link results.
- Better quality detection from title/description/metadata.
- Better size normalization and TV-readable size labels.
- Better scoring by result type, title match, quality, size and seeders.
- Search summary now uses unified counters.
- Result diagnostics now include normalized fields and raw result snapshot.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.9 — Stream diagnostics snapshot

- Added `stream-diagnostics.js` runtime layer.
- Media Task screen now gets a local Stream diagnostics panel.
- Added Copy JSON, Refresh diagnostics and Clear snapshot actions.

## Previous releases

See Git history for older release details from `2.10.8` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.10`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
