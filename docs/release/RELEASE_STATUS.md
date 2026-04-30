# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.8 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.8 (48)` after streaming readiness implementation.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.8`
- release title: `Asgard TV v2.10.8`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.8` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.8 Scope

- Added separate streaming readiness runtime layer for `ASG-TOR-004`.
- Media Task screen now gets a Streaming readiness panel.
- Added Prepare stream action.
- Added Open stream action through readiness preflight.
- Added Cancel preparation action.
- Added clear states for ready / not ready / service missing / preparing / cancelled / failed.
- Added native bridge vs browser fallback indicator.
- Added configured service readiness indicator for tasks that need external preparation.
- Existing `AsMediaTask.openStream()` remains intact; readiness layer wraps around it without replacing source architecture.
- No bundled catalogs, embedded source lists, or bypass features added.

## Included Scope Since 2.9.5

- Metadata and file selection hardening.
- Player handoff hardening.
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

- Confirm APK build for 2.10.8.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.8.
- Confirm install on Android TV / Mi Box S.
- Create direct playable media task and confirm Streaming readiness shows ready.
- Create configured-service media task without service URL and confirm service missing state.
- Configure service and prepare stream.
- Confirm preparing / ready / failed states are readable.
- Confirm Cancel changes state to cancelled.
- Confirm Open stream still opens native PlayerActivity when stream URL exists.
- Confirm remote navigation.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Streaming readiness runtime-verified.
- Metadata/file selection runtime-verified.
- Media task-to-player runtime-verified.
- Media search-to-task runtime-verified.
- Media search-to-player runtime-verified.
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
- Streaming readiness states are understandable.
- Metadata/file loading has clear success/error state.
- Selected file persists.
- Media task reliably opens native player when stream URL exists.
- Missing service, missing stream, no-files and no-playable states are understandable.
- User-configured service flow requires confirmation where needed.
- Remote navigation works.
- Player works.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
