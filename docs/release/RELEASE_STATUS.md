# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.14 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.14`
- versionCode: `54`
- tag: `v2.10.14`
- release title: `Asgard TV v2.10.14`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.14 Scope

- Added `diagnostics-v2.js` runtime layer for `ASG-090`.
- Diagnostics screen now uses a unified troubleshooting view.
- Added sections for Network, Player, Cache/Storage, Permissions, Version/Release, Source setup and Warnings.
- Diagnostics includes native bridge method availability, source counts, parser/service status, saved progress/tasks, release asset expectation and local storage counters.
- Added Copy JSON action.
- Added links to Source diagnostics and Setup wizard.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.14` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.14.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.14.
- Confirm install on Android TV / Mi Box S.
- Open Diagnostics screen.
- Confirm Network / Player / Cache / Permissions / Version / Source setup sections render.
- Confirm Copy JSON works or falls back to alert.
- Confirm Source diagnostics link works.
- Confirm Setup wizard link works.
- Confirm D-pad focus works on diagnostics actions.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Diagnostics provide actionable troubleshooting info.
- Search and source setup work with user-configured sources.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
