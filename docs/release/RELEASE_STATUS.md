# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.9 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.9`
- versionCode: `49`
- tag: `v2.10.9`
- release title: `Asgard TV v2.10.9`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.9 Scope

- Added `stream-diagnostics.js` runtime layer.
- Media Task screen now gets a local Stream diagnostics panel.
- Diagnostics report includes task state, stream state, URL readiness, URL scheme, selected file, file count, native bridge availability, configured service status, saved progress, storage information and last player open result.
- Added Copy JSON action.
- Added Refresh diagnostics action.
- Added Clear snapshot action.
- Diagnostics are local/task-based.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.9` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.9.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.9.
- Confirm install on Android TV / Mi Box S.
- Confirm Stream diagnostics panel renders on Media Task screen.
- Confirm Copy JSON works or falls back to alert.
- Confirm Refresh updates after stream preparation/open player.
- Confirm Clear snapshot works.
- Confirm D-pad focus works on diagnostics buttons.
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
