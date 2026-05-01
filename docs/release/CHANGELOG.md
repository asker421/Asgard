# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

## 2.10.29 — Android TV UX refresh

Expected release:

```text
Tag: v2.10.29
Release: Asgard TV v2.10.29
Asset: asgard-tv-release.apk
versionCode: 69
```

### Added / Changed

- Added `lampa-style-v15.css`.
- Added `lampa-ux-v15.js`.
- Added compact TV navigation rail.
- Improved poster cards and focus states.
- Improved Search layout with grid cards.
- Improved source selection screen with source, quality, size and seed/peer metadata.
- Improved Details layout with poster, metadata and source/season sections.
- Updated `index.html` to load the new style and runtime layer.
- Preserved Asgard colors, package/applicationId and branding.
- No unauthorized catalogs, protected-provider circumvention, paid-access circumvention, or embedded P2P engine were added.

### QA status

Code-wired only. Build and Android TV runtime QA are still pending.

## 2.10.28 — TMDB metadata and resilient stream loader

- Added `metadata-loader-v12.js`.
- Added `metadata-provider-v13.js`.
- Added `home-tmdb-v14.js`.
- Home can use TMDB metadata when a user-provided API key is configured.
- Metadata/files loading now retries and reports clearer states.

## 2.10.27 — Metadata API compatibility and search timeout

- Added metadata API compatibility shim.
- Added search timeout guard.

## Older releases

See Git history for earlier release details.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.29`.
4. Release contains asset:

```text
asgard-tv-release.apk
```

5. APK downloads successfully.
6. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
