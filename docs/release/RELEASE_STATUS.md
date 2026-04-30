# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.3 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.3 (43)` after global loading/empty/error/retry state implementation.

This repository connector does not expose a direct `workflow_dispatch` action. The release is triggered by a push to `main`, because `.github/workflows/release-apk.yml` is configured to run on `push` to `main`.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.3`
- release title: `Asgard TV v2.10.3`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.3` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.3 Scope

- Global TV-friendly state component runtime.
- Shared loading state.
- Shared empty state.
- Shared error state.
- Shared success state.
- Retry/action button support.
- Search loading, empty and error patch.
- Update check loading and error patch.
- Source diagnostics empty placeholder patch.
- State-card focus styling.
- Premium TV CSS for state cards.

## Included Scope Since 2.9.5

- TV-first first launch onboarding flow.
- Unified Diagnostics Health Dashboard.
- Secure QR import runtime layer.
- Full TV-friendly Source Manager screen.
- Hardened source-backed search runtime layer.
- Real Continue Watching shelf from storage.
- TorrServer playable stream preparation helper.
- Search-result action: `TorrServer → ExoPlayer` for torrent/magnet results.
- Torrent screen action: `TorrServer → ExoPlayer` for user media tasks.
- Preserved legal-safe architecture: no bundled catalogs, no P2P engine inside APK, no DRM/Cloudflare/captcha bypass.
- Playback requires user-configured service and explicit rights confirmation.

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

- Confirm APK build for 2.10.3.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.3.
- Confirm install on Android TV / Mi Box S.
- Confirm loading/empty/error/retry states render correctly.
- Confirm state-card D-pad focus and action buttons.
- Confirm search empty and broken-source states.
- Confirm update-check error state.
- Confirm first launch onboarding appears after fresh install / clear data.
- Confirm remote navigation.
- Confirm ExoPlayer playback.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Global state components runtime-verified.
- First launch onboarding runtime-verified.
- Diagnostics dashboard runtime-verified.
- QR import runtime-verified.
- Full source manager runtime-verified.
- Source-backed search runtime-verified.
- User-provided media handoff flow verified with real configured service.
- Continue Watching UX runtime-verified.

## Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Global loading/empty/error/retry states work.
- First launch onboarding works.
- Remote navigation works.
- Player works.
- Diagnostics health dashboard works.
- QR import works with TV confirmation.
- Continue Watching works after real playback.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- Basic source/parser screens work.
- QA smoke test passed.
- Changelog exists.
