# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.29 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.29`
- versionCode: `69`
- tag: `v2.10.29`
- release title: `Asgard TV v2.10.29`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.29 Scope

- Added a new Android TV UX layer for a more familiar media-center experience while preserving Asgard branding/colors.
- Added `lampa-style-v15.css`:
  - compact left icon rail;
  - larger TV-safe cards;
  - sticky topbar/search layout;
  - grid search results;
  - detail layout with poster, metadata and source side-panel;
  - season/source blocks optimized for D-pad focus.
- Added `lampa-ux-v15.js`:
  - Search results render as movie/series cards;
  - each card opens a source-selection detail screen;
  - source choices appear in a side panel with source, quality, size, seeds/peers and direct play action;
  - details/seasons are visually grouped into TV-friendly blocks;
  - flow is now: catalog/search card → detail/source selection → play selected source.
- Updated `index.html` to load:

```text
lampa-style-v15.css
lampa-ux-v15.js
```

- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Carried from 2.10.28

- TMDB metadata provider foundation.
- TMDB-driven Home setup/metadata runtime.
- Resilient metadata/files loader.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.29` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.29.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.29.
- Confirm install on Android TV / Mi Box S.
- Confirm compact left rail renders correctly.
- Confirm Search shows grid cards.
- Confirm selecting a card opens detail/source-selection panel.
- Confirm source list is readable and D-pad focusable.
- Confirm play selected source still routes through metadata/files/stream flow.

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
