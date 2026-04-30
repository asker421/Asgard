# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.12 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.12`
- versionCode: `52`
- tag: `v2.10.12`
- release title: `Asgard TV v2.10.12`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.12 Scope

- Added `continue-watching.js` runtime layer for `ASG-042`.
- Home Continue Watching shelf now uses saved progress items from `AsStore.progress()`.
- Added TV-friendly empty state when no saved progress exists.
- Added Resume action from saved position.
- Added Start over action from position 0.
- Added Remove action for individual progress items.
- Added Info diagnostics action for saved progress item.
- Continue Watching cards show progress bar, percent and timecode.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.12` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.12.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.12.
- Confirm install on Android TV / Mi Box S.
- Start a video and exit player after progress is saved.
- Confirm Continue Watching shows saved item.
- Confirm Resume opens player from saved position.
- Confirm Start over opens player from zero.
- Confirm Remove deletes only selected progress item.
- Confirm empty state is readable and D-pad focus works.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Continue Watching works with saved progress.
- Search and source setup work with user-configured sources.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
