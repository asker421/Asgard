# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.19 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.19`
- versionCode: `59`
- tag: `v2.10.19`
- release title: `Asgard TV v2.10.19`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.19 Scope

- Added `metadata-files-v2.js` runtime layer for `ASG-TOR-003`.
- Metadata/file selection now has stricter file normalization.
- Configured service file responses are normalized from multiple common response shapes.
- Largest playable video file is auto-selected when available.
- File list persists on media task.
- Selected file persists with index/path/size/extension metadata.
- Stream URL is generated/kept when configured service supports it.
- No files / no playable video / service missing states now produce readable task states.
- File diagnostics now show file count, playable count, selected file and stream readiness.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.19` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.19.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.19.
- Confirm install on Android TV / Mi Box S.
- Configure service URL.
- Create metadata-pending media task.
- Load metadata and confirm file list appears.
- Confirm largest playable file is auto-selected.
- Confirm manual file selection persists.
- Confirm no files / no playable file / service missing states are readable.
- Confirm selected stream opens player when stream URL is ready.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Movie title search works with user-configured sources.
- Search result can become media task.
- Metadata/files load from configured service.
- Playable video file can be selected.
- Stream-ready media task opens native player.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
