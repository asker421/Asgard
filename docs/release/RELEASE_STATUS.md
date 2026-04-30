# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.6 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.6 (46)` after player handoff hardening.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.6`
- release title: `Asgard TV v2.10.6`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.6` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.6 Scope

- Hardened Media Task → PlayerActivity handoff for `ASG-TOR-005`.
- Media task now passes stable task ID into native player handoff where supported.
- Added Resume action based on saved watch progress for media task ID.
- Added Start over action from position 0.
- Added explicit stream URL readiness detection.
- Added player handoff diagnostics.
- Missing stream URL now renders a clear state-card error.
- Player bridge failure now renders a clear state-card error.
- Direct playable task can open native player through the same task flow.
- Browser fallback remains available outside Android APK.

## Included Scope Since 2.9.5

- Persistent media task runtime layer.
- Main media search runtime layer.
- Global TV-friendly state component runtime.
- TV-first first launch onboarding flow.
- Unified Diagnostics Health Dashboard.
- Secure QR import runtime layer.
- Full TV-friendly Source Manager screen.
- Hardened source-backed search runtime layer.
- Real Continue Watching shelf from storage.
- User-configured service handoff helper.
- Preserved legal-safe architecture: no bundled catalogs, no embedded restricted source lists, no bypass features.
- Playback requires user-configured source/service and explicit rights confirmation where needed.

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

- Confirm APK build for 2.10.6.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.6.
- Confirm install on Android TV / Mi Box S.
- Create direct playable media task.
- Open stream and confirm native PlayerActivity starts.
- Exit player and confirm progress is saved against task ID.
- Reopen task and confirm Resume appears.
- Confirm Resume starts from saved position.
- Confirm Start over starts from 0.
- Confirm missing stream URL shows readable error state.
- Confirm bridge/player failure is shown clearly.
- Confirm remote navigation.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Media task-to-player runtime-verified.
- Media search-to-task runtime-verified.
- Media search-to-player runtime-verified.
- Metadata/file selection runtime-verified.
- Global state components runtime-verified.
- Full source manager runtime-verified.
- Continue Watching UX runtime-verified.

## Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Media search from title works with user-configured sources.
- Selected result becomes a persistent media task.
- Media task reliably opens native player when stream URL exists.
- Missing stream and bridge errors are understandable.
- Resume and Start over work from saved progress.
- User-configured service flow requires confirmation where needed.
- Remote navigation works.
- Player works.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
