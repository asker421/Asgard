# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.10 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.10`
- versionCode: `50`
- tag: `v2.10.10`
- release title: `Asgard TV v2.10.10`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.10 Scope

- Added `search-normalization-v2.js` runtime layer for `ASG-012`.
- Unified result schema for Search screen.
- Better detection for direct playable, torrent file, magnet and link results.
- Better quality/size/seed normalization.
- Better scoring and grouping for TV search results.
- Result diagnostics now include normalized fields and raw result snapshot.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.10` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.10.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.10.
- Confirm install on Android TV / Mi Box S.
- Search with user-configured sources.
- Confirm unified search summary counters are accurate.
- Confirm result grouping is correct.
- Confirm Create media task still works after normalization.
- Confirm diagnostics include normalized and raw fields.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Search and source setup work with user-configured sources.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
