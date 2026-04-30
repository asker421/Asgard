# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.22 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.22`
- versionCode: `62`
- tag: `v2.10.22`
- release title: `Asgard TV v2.10.22`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.22 Scope

- Hardened native source search with safe provider guard detection.
- Provider protection and human-verification pages are now returned as source diagnostics instead of being parsed as normal media pages.
- Added per-source timeout handling in `SearchManager` so one stuck provider does not block other enabled sources.
- Added native provider statuses:
  - `ok`
  - `empty`
  - `auth_required`
  - `provider_protected`
  - `human_verification_required`
  - `timeout`
  - `parse_error`
  - `network_error`
- Enriched native `MediaItem` with optional `year`, `quality`, and `size` fields.
- Added safe explicit URL extraction from HTML/script text for direct media links and user-configured P2P references already present in source HTML.
- Enriched JSON/API parser metadata mapping for `year`, `quality`, and `size` through `notes`.
- Enriched Torznab/JacRed parser metadata extraction for year, quality and size/enclosure length.
- Exposed provider status and enriched metadata through `NativeSearchJson` for WebView diagnostics/UI.
- No package/applicationId or branding changes.
- No protected-provider circumvention, no automated human-verification solving, no unauthorized catalogs, no paid-access circumvention, and no embedded P2P engine were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.22` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.22.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.22.
- Confirm install on Android TV / Mi Box S.
- Open Home and confirm demo movies are visible immediately.
- Open Catalog and confirm demo movies are visible immediately.
- Open a demo Details page.
- Press Watch and confirm native PlayerActivity opens.
- Confirm Search sees enabled demo direct video sources through native-first search.
- Confirm provider diagnostics show protected/human-verification/timeouts clearly.
- Confirm native search fallback does not break old JS search.
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
