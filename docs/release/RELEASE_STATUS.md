# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.26 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.26`
- versionCode: `66`
- tag: `v2.10.26`
- release title: `Asgard TV v2.10.26`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.26 Scope

- Fixed Home screen not changing from demo/mock content.
- `home-metadata-v7.js` is now actually loaded by `index.html` after `demo-catalog-runtime.js`.
- Added `home-metadata-force-v8.js` to force metadata Home over demo fallback when the current screen is Home.
- Added `home-metadata-enrich-v9.js` to enrich Details with cast/actors from TVMaze where available.
- Home now uses metadata cards for new/current series and upcoming episodes instead of showing only demo videos as the primary screen.
- Home cards show poster, title, episode/date, genres, rating where available.
- Details screen shows:
  - description/summary;
  - genre chips;
  - rating chip where available;
  - date chip;
  - actors/cast cards where available;
  - clear `▶ Включить фильм` action.
- `▶ Включить фильм` on a metadata card routes to Search using the title. Playback links are still resolved only from user-configured/search sources.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Carried from 2.10.25

- Search results are grouped into movie/series cards instead of raw links/text rows.
- Each card has `▶ Включить лучший` and `Выбрать источник`.
- Source variant selection screen lists quality/source/size/seed metadata where available.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.26` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.26.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.26.
- Confirm install on Android TV / Mi Box S.
- Open Home.
- Confirm Home is not Big Buck Bunny/Sintel/Tears of Steel demo-only screen.
- Confirm Home shows metadata cards with poster/title/episode/date/rating/genres where available.
- Open a metadata card.
- Confirm Details shows summary, rating, genre/date chips and cast/actors where available.
- Press `▶ Включить фильм`.
- Confirm it routes to Search and searches by title.
- Confirm Search results are still grouped into film/series cards.

## Known Risk

Native POST bridge for service API is still not confirmed. If service metadata still fails, the next fix should add a small safe native POST bridge in `MainActivity.kt` or a separate bridge class, then route service POST calls through it.

Movie metadata is still limited: the current metadata Home uses TVMaze series/episode data. A proper movie metadata provider such as TMDB requires a configured API key and should be added as a separate settings-driven feature.

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
