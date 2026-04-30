# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.4 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Current Workflow Setup

- `Build APK` workflow exists and builds `android/app/build/outputs/apk/debug/app-debug.apk` as artifact `asgard-tv-debug-apk`.
- `Release APK` workflow exists and builds debug APK, renames it to `asgard-tv-release.apk`, and creates/updates GitHub Release tag from `versionName`.
- Expected latest release asset name: `asgard-tv-release.apk`.

## Release Trigger

2026-04-30: Release trigger requested for `2.10.4 (44)` after media search from movie title implementation.

This repository connector does not expose a direct `workflow_dispatch` action. The release is triggered by a push to `main`, because `.github/workflows/release-apk.yml` is configured to run on `push` to `main`.

Expected result if GitHub Actions succeeds:

- tag: `v2.10.4`
- release title: `Asgard TV v2.10.4`
- APK asset: `asgard-tv-release.apk`

## Current Verification Status

Release verification is PENDING after release-trigger commits.

Do not claim that `2.10.4` release APK is available until GitHub Actions / Releases confirm it.

## New in 2.10.4 Scope

- Main media search runtime layer for `ASG-TOR-SEARCH-001`.
- Search screen now focuses on movie title/query → user-configured sources/parsers → normalized media/torrent results.
- Result normalization into playable, torrent, magnet and link groups.
- Result ranking by playable type, quality, seeders and source ranking.
- Source summary with total, playable, torrent, magnet, links, errors and source count.
- Direct playable result action: open native ExoPlayer.
- Torrent/magnet result actions: create media task and configured service → ExoPlayer.
- Detail page action: Find media sources.
- Diagnostics per result.
- Legal-safe notice: user-configured sources only, no bundled prohibited catalogs.

## Included Scope Since 2.9.5

- Global TV-friendly state component runtime.
- TV-first first launch onboarding flow.
- Unified Diagnostics Health Dashboard.
- Secure QR import runtime layer.
- Full TV-friendly Source Manager screen.
- Hardened source-backed search runtime layer.
- Real Continue Watching shelf from storage.
- TorrServer playable stream preparation helper.
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

- Confirm APK build for 2.10.4.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.4.
- Confirm install on Android TV / Mi Box S.
- Configure at least one user source/parser.
- Search a movie title and confirm grouped media results.
- Confirm direct playable result opens ExoPlayer.
- Confirm torrent/magnet result requires rights confirmation.
- Confirm media task creation works.
- Confirm configured service handoff works or fails with understandable error.
- Confirm remote navigation.
- Confirm no first-launch crash.

## Missing Before Stable 1.0

- Full smoke test passed.
- Mi Box S validation passed.
- Media search-to-player runtime-verified.
- Global state components runtime-verified.
- First launch onboarding runtime-verified.
- Diagnostics dashboard runtime-verified.
- QR import runtime-verified.
- Full source manager runtime-verified.
- Continue Watching UX runtime-verified.

## Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Media search from title works with user-configured sources.
- Selected playable result opens native player.
- Torrent/magnet result routes to safe configured service flow with confirmation.
- Remote navigation works.
- Player works.
- Source manager works on TV remote.
- Source-backed search handles valid, empty and broken sources.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
