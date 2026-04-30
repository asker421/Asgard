# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.23 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.23`
- versionCode: `63`
- tag: `v2.10.23`
- release title: `Asgard TV v2.10.23`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.23 Scope

- Fixed search result → media task conversion fallback.
- Added `media-task-api-fix-v3.js` as a late runtime patch so `Create media task` no longer calls the old `torrent_task_api_unavailable` stub.
- Added default TorrServer/service URL:

```text
http://pape85e.tsarea.tv:8880
```

- Search UI reorganized:
  - results now appear immediately under the search bar;
  - setup/diagnostics blocks are moved below results into compact expandable sections;
  - result cards now show what each result means: direct playable, TorrServer-required torrent/magnet, or normal web link;
  - result groups are ordered as direct playable, torrent files, magnet links, then other links.
- No package/applicationId or branding changes.
- No unauthorized catalogs, no protected-provider circumvention, no paid-access circumvention, and no embedded P2P engine were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.23` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.23.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.23.
- Confirm install on Android TV / Mi Box S.
- Open Search.
- Confirm results appear directly under the search box.
- Confirm result cards are understandable and grouped.
- Confirm `Create media task` no longer shows `torrent_task_api_unavailable`.
- Confirm default TorrServer URL is prefilled in Parser & TorrServer settings.
- Confirm Home/Catalog still show demo movies.
- Confirm native PlayerActivity still opens for direct playable demo sources.

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
