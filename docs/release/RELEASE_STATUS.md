# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.7 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.7 (47)` after metadata and file selection hardening.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.7`
- release title: `Asgard TV v2.10.7`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.7` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.7 Scope

- Hardened metadata and file selection flow for `ASG-TOR-003`.
- Configured service adapter now normalizes more metadata response shapes.
- Hash/task id extraction now checks add response and original result fields.
- File normalization now includes index, name, path, size, extension and video detection.
- Clear distinction between `no_files_returned` and `no_playable_video_file`.
- Media Task now persists selected file object, not only selected index.
- Media Task now shows total/playable/other file summary.
- Non-playable file selection is blocked with clear task state.
- Metadata diagnostics now include file count, playable count and selected file.
- Player handoff remains routed through `AsMediaTask.openStream()`.

## Included Scope Since 2.9.5

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

- Confirm APK build for 2.10.7.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.7.
- Confirm install on Android TV / Mi Box S.
- Configure a compatible user service.
- Search and create media task.
- Load metadata where service returns files.
- Confirm total/playable/other summary is accurate.
- Select playable file and confirm selected file persists.
- Try selecting non-playable file and confirm readable error state.
- Confirm no-files and no-playable states are readable.
- Confirm Open stream still uses selected playable stream path.
- Confirm remote navigation.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
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
- Metadata/file loading has clear success/error state.
- Selected file persists.
- Media task reliably opens native player when stream URL exists.
- Missing stream, no-files and no-playable states are understandable.
- User-configured service flow requires confirmation where needed.
- Remote navigation works.
- Player works.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
