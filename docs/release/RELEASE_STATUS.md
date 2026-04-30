# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.17 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.17`
- versionCode: `57`
- tag: `v2.10.17`
- release title: `Asgard TV v2.10.17`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.17 Scope

- Added `media-task-creation-v2.js` runtime layer for `ASG-TOR-SEARCH-002`.
- Selected normalized search result now converts through a stricter persistent media task creation path.
- Direct playable result becomes `stream_ready` task with stream URL.
- Torrent/magnet/torrent-file result becomes `metadata_pending` task.
- Link-only/non-playable result is blocked with readable error state instead of creating broken task.
- Torrent/magnet-like result requires explicit rights confirmation.
- Task opens immediately after creation.
- Creation diagnostics now show normalized input type, target presence and validation result.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.17` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.17.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.17.
- Confirm install on Android TV / Mi Box S.
- Search with configured source.
- Select direct playable result and confirm stream-ready task is created.
- Select torrent/magnet-like result and confirm rights confirmation appears.
- Confirm metadata-pending task opens immediately after creation.
- Confirm link-only result is blocked with readable state.
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
