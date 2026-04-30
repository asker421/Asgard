# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.5 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.5 (45)` after persistent media task flow implementation.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.5`
- release title: `Asgard TV v2.10.5`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.5` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.5 Scope

- Persistent media task runtime layer for `ASG-TOR-SEARCH-002`.
- Selected media search result can become a saved media task.
- Media task screen with status, source, target URL, selected file and diagnostics.
- Metadata loading action.
- Direct playable URL tasks are immediately stream-ready.
- User-configured service results can load metadata/files where available.
- File list rendering when metadata/files are available.
- Select file action.
- Open stream action.
- Per-task diagnostics.
- Media Search `Create media task` action now opens the media task screen.

## Included Scope Since 2.9.5

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

- Confirm APK build for 2.10.5.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.5.
- Confirm install on Android TV / Mi Box S.
- Search with a user-configured source.
- Select a direct playable result and create task.
- Confirm task is persistent and stream-ready.
- Confirm metadata loading shows success or understandable error.
- Confirm file list appears when the configured service returns files.
- Confirm selected file persists.
- Confirm Open stream opens ExoPlayer or reports a clear missing stream URL error.
- Confirm remote navigation.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
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
- Metadata/file loading has clear success/error state.
- Selected playable result opens native player or clearly explains why not.
- User-configured service flow requires confirmation where needed.
- Remote navigation works.
- Player works.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
