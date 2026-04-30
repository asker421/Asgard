# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.21 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.21`
- versionCode: `61`
- tag: `v2.10.21`
- release title: `Asgard TV v2.10.21`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.21 Scope

- Native Kotlin search engine for `sources.txt` integrated under `android/app/src/main/java/com/asgard/tv/search/`.
- Native parser supports 8-column source rows:

```text
name | type | url_template | language | enabled | priority | auth_required | notes
```

- Native parser implementations added for:
  - `search_template` through OkHttp + Jsoup;
  - `json` / `api` through JSONObject path parsing;
  - `torznab` / `jacred` / `rss` / `xml` through XML item parsing;
  - direct media sources through `direct_video`, `hls`, `direct_stream` and direct media extensions.
- Parallel source querying via Kotlin Coroutines.
- Per-source failure isolation so one failed source does not crash the whole search.
- Native bridge exposed to WebView as `AsgardNativeSearch`.
- Web runtime wrapper `native-search-runtime.js` tries native search first and falls back to current JS search.
- Added OkHttp / Jsoup / Coroutines dependencies.
- No package/applicationId or branding changes.
- No pirated catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, paid auth bypass, or embedded P2P engine were added.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.21` release APK is available until GitHub Actions / Releases confirm it.

Connector check after commit `b9607a6b0e27a0b1ad4161cab3d77de61e880a8d` returned no commit statuses and no workflow runs yet.

## Missing Before Demo APK

- Confirm APK build for 2.10.21.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.21.
- Confirm install on Android TV / Mi Box S.
- Open Home and confirm demo movies are visible immediately.
- Open Catalog and confirm demo movies are visible immediately.
- Open a demo Details page.
- Press Watch and confirm native PlayerActivity opens.
- Confirm Search sees enabled demo direct video sources through native-first search.
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
