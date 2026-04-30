# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.11 — TV setup wizard

Expected release:

```text
Tag: v2.10.11
Release: Asgard TV v2.10.11
Asset: asgard-tv-release.apk
versionCode: 51
```

### Added / Changed

- Added `setup-wizard.js` runtime layer for `ASG-080`.
- Settings screen now gets a `Search setup wizard` card.
- Wizard explains the minimum setup path for a non-programmer:
  - overview;
  - sources;
  - parser/service;
  - test setup;
  - open Search.
- Shows enabled sources count, parser status, service status and legal-safe notice.
- Links directly to Source Manager, Parser & service settings, Test setup and Search.
- Does not add bundled catalogs, embedded source lists, engines, or bypass features.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.10 — Unified search normalization v2

- Added `search-normalization-v2.js` runtime layer for `ASG-012`.
- Unified result schema for Search screen.
- Better kind, quality, size, seed and scoring normalization.

## Previous releases

See Git history for older release details from `2.10.9` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.11`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
