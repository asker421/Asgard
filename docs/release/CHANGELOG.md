# Asgard TV — Changelog

Last updated: 2026-04-30

This changelog documents release-facing changes only. It does not replace the formal backlog source of truth:

```text
docs/product/backlog.json
```

If the backlog JSON is truncated by the GitHub connector, do not overwrite it. Use the prioritized status layer and handoff documents for safe updates.

## 2.9.6 — Release trigger / TorrServer handoff package

Expected release:

```text
Tag: v2.9.6
Release: Asgard TV v2.9.6
Asset: asgard-tv-release.apk
versionCode: 36
```

### Added

- Release trigger for `2.9.6` through version bump in `android/app/build.gradle.kts`.
- Release status updated for expected `v2.9.6` release.

### Included from 2.9.5 scope

- TorrServer playable stream preparation helper.
- Search-result action: `TorrServer → ExoPlayer` for torrent/magnet results.
- Torrent screen action: `TorrServer → ExoPlayer` for user media tasks.
- Rights confirmation before TorrServer playback handoff.
- Error states for missing TorrServer URL, add failure, missing task hash, no playable video file and general exceptions.

### Safety / Legal

- No bundled catalogs were added.
- No P2P engine was added inside the APK.
- No DRM, Cloudflare or captcha bypass was added.
- Playback path requires user-configured TorrServer and user-provided content.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

Required before marking done:

- Confirm GitHub Actions `Release APK` run succeeds.
- Confirm GitHub Release `v2.9.6` exists.
- Confirm `asgard-tv-release.apk` exists and downloads.
- Install on Android TV emulator or Mi Box S.
- Validate D-pad, Back, Search, Sources, Details, native ExoPlayer and TorrServer handoff.

## 2.9.5 — TorrServer → ExoPlayer handoff

Expected release:

```text
Tag: v2.9.5
Release: Asgard TV v2.9.5
Asset: asgard-tv-release.apk
versionCode: 35
```

### Added

- `AsTorrServerAdapter.preparePlayableFromResult(result)`.
- Metadata/files extraction normalization for TorrServer responses.
- Largest supported video file selection.
- Stream URL generation through configured TorrServer.
- Search UI action for torrent/magnet results: `TorrServer → ExoPlayer`.
- Torrent task UI action: `TorrServer → ExoPlayer`.

### Notes

This is code-wired but not QA-verified with a real configured TorrServer in this chat environment.

## 2.9.4 — TV UX P0 fixes / release baseline

Expected release:

```text
Tag: v2.9.4
Release: Asgard TV v2.9.4
Asset: asgard-tv-release.apk
versionCode: 34
```

### Added / Changed

- D-pad key handling in `input.js`.
- Navigation history via `AsUI.history`, `AsUI.nav()` and `AsUI.back()`.
- Watch flow handoff to native ExoPlayer through `AsgardBridge.openPlayer()`.
- Search flow combining mock/open catalog and enabled user sources.
- Sources screen real Preview / Save / Reset flow.
- Top-level menu cleanup and experimental screens moved into Settings.
- Demo badges for partially implemented screens.

### QA status

Not verified on real Android TV / Mi Box S in this chat environment.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.9.6`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

## Stable release rule

Do not call any release stable until:

- full smoke test passed;
- no critical crash;
- Android TV D-pad focus works;
- Back behavior works;
- native ExoPlayer works;
- Sources/Search work;
- user-facing errors are understandable;
- QA status is updated with evidence.
