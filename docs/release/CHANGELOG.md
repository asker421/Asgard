# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.12 — Continue Watching runtime UX

Expected release:

```text
Tag: v2.10.12
Release: Asgard TV v2.10.12
Asset: asgard-tv-release.apk
versionCode: 52
```

### Added / Changed

- Added `continue-watching.js` runtime layer for `ASG-042`.
- Home Continue Watching shelf now uses saved progress items from `AsStore.progress()`.
- Added TV-friendly empty state when no saved progress exists.
- Added Resume action from saved position.
- Added Start over action from position 0.
- Added Remove action for individual progress items.
- Added Info diagnostics action for saved progress item.
- Continue Watching cards show progress bar, percent and timecode.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.11 — TV setup wizard

- Added `setup-wizard.js` runtime layer for `ASG-080`.
- Settings screen now gets a `Search setup wizard` card.
- Wizard explains the minimum setup path for a non-programmer.

## Previous releases

See Git history for older release details from `2.10.10` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.12`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
