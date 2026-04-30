# Asgard TV — Changelog

Last updated: 2026-04-30

This changelog documents release-facing changes only. It does not replace the formal backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector. Do not use it as active backlog.

## 2.10.2 — First Launch Onboarding

Expected release:

```text
Tag: v2.10.2
Release: Asgard TV v2.10.2
Asset: asgard-tv-release.apk
versionCode: 42
```

### Added

- TV-first first launch onboarding flow.
- Six onboarding steps explaining Asgard TV, Sources, native ExoPlayer, QR import, Experimental screens and starting points.
- Skip action.
- Back/Next step navigation.
- Completion flag in localStorage.
- Reopen onboarding card in Settings.
- Onboarding is loaded as the final runtime layer so it can intercept first Home render after all overlays.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

Required before marking done:

- Fresh install / clear data.
- Confirm onboarding appears before Home.
- Navigate all steps with D-pad.
- Confirm Skip goes to Home.
- Confirm completion persists across restart.
- Confirm Settings → Reopen onboarding works.

## 2.10.1 — Unified Diagnostics Health Dashboard

Expected release:

```text
Tag: v2.10.1
Release: Asgard TV v2.10.1
Asset: asgard-tv-release.apk
versionCode: 41
```

### Added

- Unified Diagnostics Health Dashboard.
- Android bridge presence and method check.
- App version report.
- Device storage report where bridge support exists.
- Source configuration summary.
- Parser/service settings summary with masked API key status.
- QR import module/session state.
- Local storage counters for sources, progress, favorites, history and media tasks.
- Static warnings for missing bridge, invalid source rows, no enabled sources and missing player bridge.
- Raw health report JSON.
- Copy JSON action.
- Source diagnostics shortcut preserved.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.0 — Secure QR import prototype

Expected release:

```text
Tag: v2.10.0
Release: Asgard TV v2.10.0
Asset: asgard-tv-release.apk
versionCode: 40
```

### Added

- Secure QR import runtime layer.
- One-time local import session.
- 6-digit PIN.
- 10-minute expiry.
- Session URL preview using `asgard://import?...`.
- Paste/simulate phone payload area until real phone bridge is implemented.
- Payload preview before import.
- TV confirmation before import.
- Sources TXT payload import into saved sources.
- JSON and link payload preview-only states until schema/flow are finalized.
- No silent import.
- No personal data/cookies/tokens should be pasted.

### Safety / Legal

- Import is local/user-controlled.
- TV confirmation is required before saving.
- Session expires.
- No silent APK install or source install.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.9.9 — Full Source Manager

Expected release:

```text
Tag: v2.9.9
Release: Asgard TV v2.9.9
Asset: asgard-tv-release.apk
versionCode: 39
```

### Added

- Full TV-friendly Source Manager screen.
- Source cards with status, type, priority, language and rights badge.
- Enable / disable source action.
- Priority increase / decrease actions.
- Add source form with validation.
- Edit source form with validation.
- Delete source action with confirmation.
- Per-source Test action.
- Test enabled sources action.
- Raw TXT editor preserved as advanced fallback.
- Reset bundled/default sources action.
- Manager is loaded as the final runtime layer so it overrides older textarea-only Sources screens.

### Safety / Legal

- No bundled prohibited catalogs were added.
- Source management remains user-controlled.
- UI includes legal-safe notice for user-added sources.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.9.8 — Hardened source-backed search

Expected release:

```text
Tag: v2.9.8
Release: Asgard TV v2.9.8
Asset: asgard-tv-release.apk
versionCode: 38
```

### Added

- Runtime hardening layer for source-backed search.
- Safer HTML link parsing with invalid URL protection.
- Result dedupe by URL / magnet / title key.
- Result ranking by playable type, query match, quality, size, seeders and source priority.
- Result grouping by classification: playable, torrent, magnet, link and not playable.
- Expanded search summary with source/report/error/empty counters.
- Sequential source querying to avoid one failing source hiding all others.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.9.7 — Real Continue Watching shelf

Expected release:

```text
Tag: v2.9.7
Release: Asgard TV v2.9.7
Asset: asgard-tv-release.apk
versionCode: 37
```

### Added

- Home `Continue Watching` shelf now reads real saved watch progress from `AsStore.progress()` instead of demo-only hardcoded progress values.
- Continue Watching cards now show calculated progress percent from saved `position/duration`.
- Added `Resume` action that opens native ExoPlayer with saved position.
- Added `Start over` action that opens native ExoPlayer from position 0.
- Added empty state when no saved progress exists.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

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
3. GitHub Releases contains matching tag, for example `v2.10.2`.
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
