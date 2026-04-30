# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.18 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.18`
- versionCode: `58`
- tag: `v2.10.18`
- release title: `Asgard TV v2.10.18`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.18 Scope

- Added `player-handoff-v2.js` runtime layer for `ASG-TOR-005`.
- Added Android bridge method `openPlayerWithItem(url, title, startPosition, itemId)`.
- Media task player handoff now prefers stable task id for progress/resume tracking.
- Missing stream URL now shows readable error with Prepare stream / Load metadata / Diagnostics actions.
- Unsupported URL scheme is blocked before player handoff.
- Resume and Start over now use the same task id path.
- Player handoff diagnostics now show bridge availability, item id support, URL readiness and saved progress.
- Legacy `openPlayer(url,title,startPosition)` remains as fallback.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.18` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.18.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.18.
- Confirm install on Android TV / Mi Box S.
- Create stream-ready task.
- Open stream and confirm `PlayerActivity` starts.
- Confirm progress saves under stable media task id.
- Confirm Resume starts from saved position.
- Confirm Start over starts from zero.
- Confirm missing stream URL shows readable error.
- Confirm bad/unsupported stream does not crash app.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- Movie title search works with user-configured sources.
- Search result can become media task.
- Stream-ready media task opens native player.
- Player saves progress with stable task id.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
