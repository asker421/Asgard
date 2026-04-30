# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.27 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.27`
- versionCode: `67`
- tag: `v2.10.27`
- release title: `Asgard TV v2.10.27`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.27 Scope

- Fixed the visible playback blocker `Metadata API missing` at runtime level.
- Added `metadata-api-compat-v10.js`:
  - guarantees `AsMediaTask.loadMetadata()` exists before one-click playback calls it;
  - delegates to `AsMetadataFilesV2.load()` when available;
  - returns a clear `metadata_loader_missing` diagnostic instead of crashing the flow.
- Added `search-timeout-v11.js`:
  - wraps source/parser search in a 14-second guard;
  - prevents infinite loading when a parser/source hangs;
  - returns a clear timeout diagnostic instead of leaving Search stuck forever.
- Updated `index.html` to load:

```text
search-timeout-v11.js
metadata-api-compat-v10.js
```

- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Carried from 2.10.26

- Home metadata runtime is loaded after demo fallback.
- Home metadata force layer attempts to override demo/mock Home.
- Details enrichment can show cast/actors from TVMaze where available.

## Carried from 2.10.25

- Search results are grouped into movie/series cards instead of raw links/text rows.
- Each card has `▶ Включить лучший` and `Выбрать источник`.
- Source variant selection screen lists quality/source/size/seed metadata where available.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.27` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.27.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.27.
- Confirm install on Android TV / Mi Box S.
- Search a title.
- Confirm Search no longer hangs indefinitely; timeout should show diagnostic by ~14 seconds.
- Select a magnet/torrent source variant.
- Press `▶ Включить этот вариант`.
- Confirm the previous `Metadata API missing` error no longer appears.
- If metadata still fails, capture the new exact error text; likely next blocker is service POST/network.

## Known Risk

Native POST bridge for service API is still not committed. The full `MainActivity.kt` update with `nativePostJson` was blocked by the tool safety check. If service metadata still fails after 2.10.27, the next fix should add a small safe native POST bridge in Android and route service POST calls through it.

Movie metadata is still limited: the current metadata Home uses TVMaze series/episode data. A proper movie metadata provider such as TMDB requires a configured API key and should be added as a settings-driven feature.

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
