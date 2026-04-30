# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.20 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.20`
- versionCode: `60`
- tag: `v2.10.20`
- release title: `Asgard TV v2.10.20`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.20 Scope

- Enabled bundled legal/public direct demo video sources in `sources.txt`.
- Added `demo-catalog-runtime.js` as final runtime layer.
- Home screen now has guaranteed visible demo movies after all runtime overrides.
- Catalog screen now has guaranteed visible legal demo movies after all runtime overrides.
- Demo cards open Details and native player through current bridge where available.
- Demo content uses open/public sample streams only.
- Added `streaming-first-v2.js` runtime layer while working on `ASG-TOR-004`; it improves selected stream readiness lifecycle, but runtime QA is still pending.
- Fixed Gradle `JavaVersion.VERSION_17` syntax after accidental typo during version bump.
- No pirated catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or embedded P2P engine were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.20` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.20.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.20.
- Confirm install on Android TV / Mi Box S.
- Open Home and confirm demo movies are visible immediately.
- Open Catalog and confirm demo movies are visible immediately.
- Open a demo Details page.
- Press Watch and confirm native PlayerActivity opens.
- Confirm Search sees enabled demo direct video sources.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Home/Catalog show testable demo content.
- Remote navigation works.
- Player works.
- Movie title search works with user-configured or bundled legal demo sources.
- Search result can become media task.
- Metadata/files load from configured service where applicable.
- Playable video file can be selected.
- Stream-ready media task opens native player.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
