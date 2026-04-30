# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.14 — Unified Diagnostics v2

Expected release:

```text
Tag: v2.10.14
Release: Asgard TV v2.10.14
Asset: asgard-tv-release.apk
versionCode: 54
```

### Added / Changed

- Added `diagnostics-v2.js` runtime layer for `ASG-090`.
- Diagnostics screen now uses a unified troubleshooting view.
- Added sections for Network, Player, Cache/Storage, Permissions, Version/Release, Source setup and Warnings.
- Diagnostics includes native bridge method availability, source counts, parser/service status, saved progress/tasks, release asset expectation and local storage counters.
- Added Copy JSON action.
- Added links to Source diagnostics and Setup wizard.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.13 — Safe QR import confirmation flow

- Hardened `qr-import.js` for `ASG-050`.
- TV confirmation now requires entering the active 6-digit PIN.
- HTTP(S) links import only as disabled user source rows.

## Previous releases

See Git history for older release details from `2.10.12` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.14`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
