# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.25 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.25`
- versionCode: `65`
- tag: `v2.10.25`
- release title: `Asgard TV v2.10.25`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.25 Scope

- Search results are now grouped into film/series cards instead of being shown as raw links/text rows.
- Added `search-card-groups-v6.js`:
  - groups multiple source results by cleaned title;
  - each card shows poster placeholder, title, source count, best source type, quality and seed/peer chips when available;
  - each card has primary action `▶ Включить лучший`;
  - each card has `Выбрать источник` to open a detailed list of available variants;
  - source selection screen lists each variant with quality/source/size/seed/peer metadata;
  - variant action is `▶ Включить этот вариант`.
- Search flow now matches target UX:
  - first choose movie/series card;
  - then choose source/variant;
  - then one-click playback flow prepares direct stream or service-based metadata/files.
- Preserved package/applicationId `com.asgard.tv` and branding `Asgard TV`.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Carried from 2.10.24

- Magnet/torrent metadata loading starts automatically after media task creation.
- Default parser candidate exists in `parsers.json`:

```text
Default JacRed/Torznab Parser → http://pape85e.tsarea.tv:8880
```

- Parser discovery ignores placeholder URLs like `USER_CONFIGURED_*`.
- Default/active parser is tested automatically during search.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.25` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.25.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.25.
- Confirm install on Android TV / Mi Box S.
- Open Search.
- Search a title.
- Confirm results appear as film/series cards, not raw links.
- Open a card with `Выбрать источник`.
- Confirm source variants are listed with quality/source/size/seed metadata where available.
- Press `▶ Включить этот вариант`.
- Confirm direct playable opens PlayerActivity or service metadata/files starts automatically.
- Confirm HTML/web pages are not opened directly in PlayerActivity as video.

## Known Risk

Native POST bridge for service API is still not confirmed. If service metadata still fails, the next fix should add a small safe native POST bridge in `MainActivity.kt` or a separate bridge class, then route service POST calls through it.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Home/Catalog show testable demo content or metadata fallback.
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
