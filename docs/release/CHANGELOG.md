# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.19 — Metadata and file selection v2

Expected release:

```text
Tag: v2.10.19
Release: Asgard TV v2.10.19
Asset: asgard-tv-release.apk
versionCode: 59
```

### Added / Changed

- Added `metadata-files-v2.js` runtime layer for `ASG-TOR-003`.
- Metadata/file selection now has stricter file normalization.
- Configured service file responses are normalized from multiple common response shapes.
- Largest playable video file is auto-selected when available.
- File list persists on media task.
- Selected file persists with index/path/size/extension metadata.
- Stream URL is generated/kept when configured service supports it.
- No files / no playable video / service missing states now produce readable task states.
- File diagnostics now show file count, playable count, selected file and stream readiness.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Code-wired only. Android TV runtime QA is still pending.

## 2.10.18 — Player handoff with stable task id

- Added `player-handoff-v2.js` runtime layer for `ASG-TOR-005`.
- Added Android bridge method `openPlayerWithItem(url, title, startPosition, itemId)`.

## Previous releases

See Git history for older release details from `2.10.17` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.19`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
