# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.16 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.16`
- versionCode: `56`
- tag: `v2.10.16`
- release title: `Asgard TV v2.10.16`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.16 Scope

- Added `title-media-search.js` runtime layer for `ASG-TOR-SEARCH-001`.
- Search screen now presents explicit movie/series title search path.
- Search now checks whether user-configured sources/parser exist before querying.
- No configured source shows setup actions instead of silent empty results.
- Results are rendered as user-configured media results with source, type, quality, size, seeds/peers where available.
- Search summary shows query, total, playable, torrent, magnet, link, errors and source count.
- Result actions continue to support Watch, Create media task, Prepare stream, Open link and Diagnostics.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.16` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.16.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.16.
- Confirm install on Android TV / Mi Box S.
- Open Search screen.
- Confirm no configured source shows setup state.
- Configure safe demo source and search movie title.
- Confirm results show source/type/quality/size/seeds where available.
- Confirm result actions still work.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Movie title search works with user-configured sources.
- Search result can become media task.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
