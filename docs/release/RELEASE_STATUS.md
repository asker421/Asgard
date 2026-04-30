# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.28 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.28`
- versionCode: `68`
- tag: `v2.10.28`
- release title: `Asgard TV v2.10.28`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.28 Scope

- Added `metadata-loader-v12.js` for more resilient service metadata/files loading:
  - retries metadata/files several times instead of failing after one attempt;
  - extracts torrent hash from magnet btih where possible;
  - uses service list/get fallback when add response does not immediately return hash;
  - selects the largest supported video file;
  - builds stream URL only after file selection is available;
  - returns clearer states such as `metadata_pending`, `hash_pending`, `no_playable_video_file`, and `stream_ready`.
- Added `metadata-provider-v13.js`:
  - TMDB metadata provider foundation;
  - supports `ru-RU` language and region settings;
  - supports trending movies, now playing movies, trending series, details, cast and seasons;
  - requires user-configured TMDB API key.
- Added `home-tmdb-v14.js`:
  - Home no longer pretends that random English TVMaze data is a real movie/top chart;
  - if TMDB key is missing, Home shows a clear metadata setup state instead of fake top charts;
  - if TMDB key is configured, Home shows real TMDB `ru-RU` metadata cards;
  - Details can show cast and season grouping for series;
  - `▶ Включить фильм` routes title into Search/source selection flow.
- Updated `index.html` to load:

```text
metadata-loader-v12.js
metadata-provider-v13.js
home-tmdb-v14.js
```

- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Carried from 2.10.27

- `Metadata API missing` compatibility shim.
- Search timeout guard around long source/parser calls.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.28` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.28.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.28.
- Confirm install on Android TV / Mi Box S.
- Open Home without TMDB key and confirm it shows metadata setup state, not fake charts.
- Enter TMDB API key and confirm Home shows Russian metadata cards where available.
- Open a series details page and confirm seasons/cast appear where available.
- Select a magnet/torrent source variant and confirm metadata loader retries before showing failure.
- Confirm stream opens only when stream URL is ready.

## Known Risk

Native POST bridge for service API is still not committed. If service metadata still fails with service/network/POST/CORS errors, the next fix should add a small safe native POST bridge in Android and route service POST calls through it.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Home/Catalog show metadata or safe fallback.
- Remote navigation works.
- Player works.
- Movie title search works with user-configured or bundled legal demo sources.
- Search result can become a playable media task.
- Metadata/files load from configured service where applicable.
- Playable video file can be selected.
- Stream-ready media task opens native player.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
