# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.9.8 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.9.8 (38)` after hardened source-backed search implementation.

This repository connector does not expose a direct `workflow_dispatch` action. The release is triggered by a push to `main`, because `.github/workflows/release-apk.yml` is configured to run on `push` to `main`.

Expected result if GitHub Actions succeeds:

- tag: `v2.9.8`
- release title: `Asgard TV v2.9.8`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.9.8` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.9.8 Scope

- Added source-backed search hardening runtime layer.
- Safer HTML link parsing with invalid URL protection.
- Result dedupe by URL / magnet / title key.
- Result ranking by playable type, query match, quality, size, seeders and source priority.
- Result grouping by classification: playable, torrent, magnet, link and not playable.
- Expanded source search summary with errors and empty counters.
- Sequential source querying so one failing source does not hide all other results.

## Included Scope Since 2.9.5

- Real Continue Watching shelf from storage.
- TorrServer playable stream preparation helper.
- Search-result action: `TorrServer → ExoPlayer` for torrent/magnet results.
- Torrent screen action: `TorrServer → ExoPlayer` for user media tasks.
- Preserved legal-safe architecture: no bundled catalogs, no P2P engine inside APK, no DRM/Cloudflare/captcha bypass.
- Playback requires user-configured TorrServer and explicit rights confirmation.

## Release Documentation

Installation guide:

```text
docs/release/INSTALLATION_GUIDE.md
```

Changelog:

```text
docs/release/CHANGELOG.md
```

## Missing Before Demo APK

- Confirm APK build for 2.9.8.
- Confirm release asset `asgard-tv-release.apk` exists for v2.9.8.
- Confirm install on Android TV / Mi Box S.
- Confirm remote navigation.
- Confirm ExoPlayer playback.
- Confirm Continue Watching appears after player progress is saved.
- Confirm source-backed search shows results and errors correctly.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Source-backed search runtime-verified.
- QR import implemented.
- User-provided media handoff flow verified with real configured service.
- Continue Watching UX runtime-verified.
- Full diagnostics.

## Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Continue Watching works after real playback.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- Basic source/parser screens work.
- QA smoke test passed.
- Changelog exists.
