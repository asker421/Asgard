# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.15 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.15`
- versionCode: `55`
- tag: `v2.10.15`
- release title: `Asgard TV v2.10.15`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.15 Scope

- Updated `docs/release/INSTALLATION_GUIDE.md` for `ASG-101`.
- Guide now targets non-programmer installation and update flow.
- Added APK download and release verification steps.
- Added Android TV / Mi Box S / TV Box installation methods.
- Added update-failure recovery when signatures differ.
- Added first-launch checklist.
- Added setup path through Settings → Search setup wizard → Sources → Parser/service → Search.
- Added Continue Watching test.
- Added QR import test.
- Added Diagnostics test and bug report template.
- This is a documentation/release-guide update; no app runtime code was changed.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.15` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.15.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.15.
- Confirm install on Android TV / Mi Box S.
- Confirm guide steps match actual latest GitHub Release.
- Confirm Search setup wizard, Diagnostics, QR import and Continue Watching flows behave as documented.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Installation/update guide is accurate.
- Diagnostics provide actionable troubleshooting info.
- Search and source setup work with user-configured sources.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
