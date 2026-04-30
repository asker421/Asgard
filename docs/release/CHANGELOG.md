# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.13 — Safe QR import confirmation flow

Expected release:

```text
Tag: v2.10.13
Release: Asgard TV v2.10.13
Asset: asgard-tv-release.apk
versionCode: 53
```

### Added / Changed

- Hardened `qr-import.js` for `ASG-050`.
- TV confirmation now requires entering the active 6-digit PIN.
- HTTP(S) links can be imported only as disabled user source rows.
- Imported link rows are disabled by default until the user reviews and enables them in Source Manager.
- JSON wrapper supports `sources_txt` and `link` preview/handling.
- Unsupported or sensitive payload types remain preview-only.
- Session remains one-time with expiry and local TV confirmation.
- No silent import, no silent APK install, no bundled catalogs, no embedded source lists, no bypass features.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.12 — Continue Watching runtime UX

- Added `continue-watching.js` runtime layer for `ASG-042`.
- Home Continue Watching shelf now uses saved progress items from `AsStore.progress()`.
- Added Resume, Start over, Remove and Info actions.

## Previous releases

See Git history for older release details from `2.10.11` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.13`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
