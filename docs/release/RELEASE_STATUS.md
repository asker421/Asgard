# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.9.6 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.9.6 (36)`.

This repository connector does not expose a direct `workflow_dispatch` action. The release is triggered by a push to `main`, because `.github/workflows/release-apk.yml` is configured to run on `push` to `main`.

Expected result if GitHub Actions succeeds:

- tag: `v2.9.6`
- release title: `Asgard TV v2.9.6`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commit.

Do not claim that `2.9.6` release APK is available until GitHub Actions / Releases confirm it.

## Included Scope Since 2.9.5

- TorrServer playable stream preparation helper.
- Search-result action: `TorrServer → ExoPlayer` for torrent/magnet results.
- Torrent screen action: `TorrServer → ExoPlayer` for user media tasks.
- Preserved legal-safe architecture: no bundled catalogs, no P2P engine inside APK, no DRM/Cloudflare/captcha bypass.
- Playback requires user-configured TorrServer and explicit rights confirmation.

## Installation Guide

Non-programmer APK installation guide:

```text
docs/release/INSTALLATION_GUIDE.md
```

The guide covers:

- where to download `asgard-tv-release.apk`;
- how to confirm version/tag/release metadata;
- USB install;
- Send file to TV install;
- ADB install;
- handling signature/update failure by uninstalling old APK;
- basic post-install smoke test;
- bug report template.

## Missing Before Demo APK

- Confirm APK build for 2.9.6.
- Confirm release asset `asgard-tv-release.apk` exists for v2.9.6.
- Confirm install on Android TV / Mi Box S.
- Confirm remote navigation.
- Confirm ExoPlayer playback.
- Confirm TorrServer handoff failure states when TorrServer is not configured.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Real source search hardened.
- QR import implemented.
- User-provided media handoff flow verified with real configured TorrServer.
- Continue Watching UX complete.
- Full diagnostics.
- Changelog.

## Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- No critical crash.
- Basic source/parser screens work.
- QA smoke test passed.
- Changelog exists.
