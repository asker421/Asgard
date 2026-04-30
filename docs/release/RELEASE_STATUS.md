# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.11 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.11`
- versionCode: `51`
- tag: `v2.10.11`
- release title: `Asgard TV v2.10.11`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.11 Scope

- Added `setup-wizard.js` runtime layer for `ASG-080`.
- Settings screen now gets a `Search setup wizard` card.
- Wizard gives a TV-friendly path through Sources, Parser/service, Test setup and Search.
- Shows enabled sources count, parser status, service status and legal-safe notice.
- Links directly to Source Manager, Parser & service settings and Search.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.11` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.11.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.11.
- Confirm install on Android TV / Mi Box S.
- Open Settings and confirm `Search setup wizard` card appears.
- Confirm wizard steps render with D-pad focus.
- Confirm Source Manager, Parser/service and Search links work.
- Confirm Test setup shows readable setup status.
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
