# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.15 — Simple installation and update guide

Expected release:

```text
Tag: v2.10.15
Release: Asgard TV v2.10.15
Asset: asgard-tv-release.apk
versionCode: 55
```

### Added / Changed

- Updated `docs/release/INSTALLATION_GUIDE.md` for `ASG-101`.
- Guide now targets non-programmer installation and update flow.
- Added APK download and release verification steps.
- Added Android TV / Mi Box S / TV Box installation methods.
- Added update-failure recovery when signatures differ.
- Added first-launch checklist.
- Added setup path through Settings → Search setup wizard → Sources → Parser/service → Search.
- Added Continue Watching test.
- Added QR import test.
- Added Diagnostics test and bug report template.
- No app runtime code was changed in this release.

### QA status

Guide updated. APK/runtime QA is still pending.

## 2.10.14 — Unified Diagnostics v2

- Added `diagnostics-v2.js` runtime layer for `ASG-090`.
- Diagnostics screen now uses a unified troubleshooting view.

## Previous releases

See Git history for older release details from `2.10.13` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.15`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
