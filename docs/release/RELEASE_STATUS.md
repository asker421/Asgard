# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.24 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.24`
- versionCode: `64`
- tag: `v2.10.24`
- release title: `Asgard TV v2.10.24`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.24 Scope

- Fixed media task flow so magnet/torrent metadata loading starts automatically after media task creation.
- Added `autoMetadata=true` task flag and immediate metadata loading trigger after search result conversion.
- Added default parser candidate to `parsers.json`:

```text
Default JacRed/Torznab Parser → http://pape85e.tsarea.tv:8880
```

- Improved parser discovery:
  - ignores placeholder parser URLs like `USER_CONFIGURED_*`;
  - includes bundled enabled default parser candidates;
  - saves active parser automatically when detected;
  - fills default TorrServer URL from bundled parser config if missing.
- Added `search-parser-runtime-v4.js`:
  - default/active parser is tested automatically during search;
  - search no longer depends only on manually entered parser URL;
  - parser results and source results are merged and deduplicated;
  - search UI is patched to use parser results even if manual source/parser setup is incomplete.
- Updated TorrServer adapter to prefer native POST bridge if available; Android Kotlin native POST bridge was attempted but not committed because the tool blocked the full `MainActivity.kt` update. The adapter still falls back to browser fetch for POST when native POST is unavailable.
- No package/applicationId or branding changes.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.24` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.24.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.24.
- Confirm install on Android TV / Mi Box S.
- Open Search.
- Confirm default parser appears or is used automatically.
- Search a title and confirm parser/source results appear.
- Select a magnet/torrent result.
- Confirm media task is created.
- Confirm metadata loading starts automatically without pressing a separate button.
- Confirm task eventually shows files or a clear service error.
- Confirm direct playable still opens PlayerActivity.

## Known Risk

Native POST bridge for service API could not be committed in this pass because the full Android file update was blocked by the tool. If TorrServer metadata still fails, the next fix should add a small safe native POST bridge in `MainActivity.kt` or a separate bridge class, then route TorrServer `POST /torrents` through it.

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
