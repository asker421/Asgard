# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

STATIC QA COMPLETED for `2.9.8 (38)`.

PHYSICAL ANDROID TV QA remains BLOCKED / NOT COMPLETED from this chat environment.

## Current Risk

The app has a strong early-alpha foundation, but it has not yet been verified as a stable Android TV build on real Android TV hardware or emulator through this QA pass.

Latest inspected Android version from `android/app/build.gradle.kts`:

- versionName: `2.9.8`
- versionCode: `38`

## Mandatory Pre-flight Used

Active backlog:

`docs/product/backlog-v2.json`

Selected task:

`ASG-QA-001 — Run Android TV build/install smoke test`

Reason:

It is the first item in `current_next_tasks`, and `NEXT_ACTIONS.md` requires Android TV build/install smoke testing before claiming release readiness.

## Static QA Run — 2026-04-30

### Scope

Repository-level smoke readiness inspection using GitHub file reads/search. No physical Android TV emulator or Mi Box S interaction was possible inside this chat environment.

### Device / Emulator

None.

### Build / Version

`2.9.8 (38)` from `android/app/build.gradle.kts`.

### Static Result Summary

| Area | Static Result | Evidence / Notes | Recommended backlog status |
|---|---|---|---|
| APK build configuration | STATIC PASS / RUNTIME BLOCKED | `Build APK` workflow uses Java 17, Android SDK 35, Gradle 8.10.2 and `./gradlew :app:assembleDebug`; wrapper points to `gradle-8.10.2-bin.zip`. Latest workflow run/result was not visible through connector. | Keep `ASG-QA-001` TODO / QA needed |
| APK install | BLOCKED | Requires Android TV emulator or Mi Box S. | Keep QA needed |
| Offline launch | BLOCKED | Requires emulator/device; local WebView assets exist. | Keep QA needed |
| Remote navigation | STATIC PASS / RUNTIME QA NEEDED | `input.js` now explicitly handles ArrowUp/Down/Left/Right, Enter/NumpadEnter, Backspace/Escape, uses visible focusable elements, `getBoundingClientRect()`, `scrollIntoView()` and prevents default for handled keys. | `ASG-002` remains READY_FOR_QA, not DONE |
| Focus visibility | STATIC PASS / RUNTIME QA NEEDED | Focusable refresh and movement exist; visual focus still needs screen-by-screen TV QA. | QA needed |
| Back behavior | STATIC PASS / RUNTIME QA NEEDED | `ui.js` defines `history`, `nav()`, `back()` and `window.asgardBack=function(){return AsUI.back()}`; Android `MainActivity` calls `window.asgardBack`. | `ASG-002` remains READY_FOR_QA, not DONE |
| Home screen | STATIC PASS | Home/open demo catalog exists through `content-fix.js`. | Needs runtime QA |
| Mock/open catalog | STATIC PASS | Open/public demo streams exist in `content-fix.js`; no bundled prohibited catalogs found in this inspected path. | READY_FOR_QA still needs device QA |
| Search screen | STATIC PASS / QA NEEDED | `index.html` loads `source-search-hardening.js` before source search UI; `source-search.js` patches Search to use parser/source-backed flow and enabled sources. | `ASG-011` CODE_REVIEW / QA needed |
| Source-backed search hardening | STATIC PASS / QA NEEDED | `source-search-hardening.js` adds safe URL handling, dedupe, ranking, grouping, summary/error counters and isolated source query errors. Needs real configured source/parser QA. | `ASG-012` remains IN_PROGRESS |
| Detail page | STATIC PASS | `content-fix.js` patches demo detail pages and Watch buttons. | Needs runtime QA |
| Watch -> native ExoPlayer | STATIC PASS / QA NEEDED | `content-fix.js` routes Watch to `AsgardBridge.openPlayer()` when Android bridge exists. | Needs APK runtime QA |
| Native bridge | STATIC PASS | `MainActivity` exposes `AsgardBridge` with `openPlayer`, `nativeFetch`, source persistence, torrent tasks, watch progress, favorites/history and version info. | Runtime QA needed |
| ExoPlayer | STATIC PASS / QA NEEDED | `PlayerActivity` validates URL, creates Media3 ExoPlayer, uses controller, handles player errors, D-pad play/pause/seek and saves valid progress. | `ASG-040` READY_FOR_QA |
| Play/pause | STATIC PASS / QA NEEDED | `PlayerActivity.dispatchKeyEvent()` toggles play/pause on Enter/DPAD_CENTER. | QA needed |
| Seek | STATIC PASS / QA NEEDED | DPAD left/right and media rewind/fast-forward seek with duration clamp. | QA needed |
| Progress save | STATIC PASS / QA NEEDED | Saves valid progress when duration is known; `content-fix.js` reads stored progress for Continue Watching shelf. Needs restart/resume QA. | `ASG-042` remains IN_PROGRESS |
| Continue Watching | STATIC PASS / QA NEEDED | `content-fix.js` builds Continue Watching from `AsStore.progress()` and offers Resume / Start over. Needs real playback progress test. | `ASG-042` remains IN_PROGRESS |
| Sources screen | STATIC PASS / QA NEEDED | Previous runtime layers wire Sources preview/save/reset; current static scope did not execute UI. | QA needed |
| TXT parser | STATIC PASS | `sources.js` parser foundation exists per backlog and prior inspection; runtime invalid/valid row test needed. | QA needed |
| Parser settings | STATIC PASS / QA NEEDED | `index.html` loads parser/settings layers; Search references parser settings. Needs runtime QA. | QA needed |
| Configured media service / TorrServer | STATIC PASS / RUNTIME BLOCKED | TorrServer adapter/handoff files exist, but no configured service endpoint was available in this chat. | Keep IN_PROGRESS |
| User-provided media validation | STATIC PASS / QA NEEDED | Kotlin picker/import foundation and JS torrent validation exist. Real metadata/service handoff not verified. | Keep IN_PROGRESS |
| File picker | STATIC PASS / QA NEEDED | `MainActivity.pickTorrentFile()` uses `ACTION_OPEN_DOCUMENT`. Needs Android TV QA. | QA needed |
| Media diagnostics | STATIC PASS / QA NEEDED | Source/torrent diagnostics foundations exist. Needs runtime QA. | QA needed |
| Update screen | STATIC PASS / QA NEEDED | Release status and update scripts exist; runtime/network behavior unverified. | QA needed |
| 15-minute stability | BLOCKED | Requires device/emulator. | Keep QA needed |

## Required Physical Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | BLOCKED | Workflow file exists, but latest run/result not visible through connector. |
| APK installs on Android TV / Mi Box S | TODO | Requires emulator/device. |
| App opens without internet | TODO | Requires emulator/device. |
| Remote navigation works | TODO | Verify Arrow/Enter behavior on real Android TV WebView. |
| Focus visible everywhere | TODO | Requires screen-by-screen TV QA. |
| Back behavior works | TODO | Verify Back from Home/Search/Details/Sources/Settings/Player. |
| Home screen opens | TODO | Requires APK/browser runtime verification. |
| Mock catalog works | TODO | Requires runtime verification. |
| Search opens | TODO | Requires runtime verification. |
| Detail page opens | TODO | Requires runtime verification. |
| ExoPlayer opens video | TODO | Requires Android APK runtime test. |
| Play/pause works | TODO | Requires Android APK runtime test. |
| Seek works | TODO | Requires Android APK runtime test. |
| Progress saves | TODO | Requires Android APK runtime test and restart check. |
| Continue Watching appears | TODO | Requires playback progress + Home return. |
| Resume works | TODO | Requires Continue Watching runtime test. |
| Start over works | TODO | Requires Continue Watching runtime test. |
| Sources screen opens | TODO | Requires runtime verification. |
| TXT parser works | TODO | Requires invalid/valid source-row test. |
| Parser settings open | TODO | Requires runtime verification. |
| Configured media service test works | TODO | Requires user-configured service or mock failure-state test. |
| User-provided media validation works | TODO | Requires runtime test. |
| File picker opens where supported | TODO | Requires Android APK runtime test. |
| Media diagnostics screen opens | TODO | Requires runtime verification. |
| Update screen opens | TODO | Requires runtime verification. |
| App survives 15 minutes use | TODO | Requires device/emulator stability test. |

## Latest QA Attempt — 2026-04-30

### Scope

Static repository smoke readiness check for current 2.9.8 code.

### Device / Emulator

None. No Android TV emulator or Mi Box S was available inside this chat environment.

### Build / Version

`2.9.8 (38)` from `android/app/build.gradle.kts`.

### Result

STATIC PASS for several core code paths, but BLOCKED for full physical QA.

### Findings

- Build workflow and Gradle wrapper definitions are present and look correct.
- Latest workflow run/result was not available through the connector.
- D-pad and Back are now implemented in inspected Web assets, unlike earlier static QA state.
- Watch → native ExoPlayer, PlayerActivity controls, and Continue Watching storage wiring are present statically.
- No APK install, launch, real D-pad traversal, Back runtime behavior, ExoPlayer playback or 15-minute stability result can be claimed from this chat session.

### Recommendation

Do not mark any backlog item DONE from this QA pass.

Recommended next action:

1. Run `Build APK` or `Release APK` workflow manually if push workflow did not run.
2. Download `asgard-tv-release.apk` or `asgard-tv-debug-apk`.
3. Install on Android TV emulator or Mi Box S.
4. Execute the full physical smoke checklist above.
5. Update this file with PASS / FAIL / BLOCKED per row.

## QA Rule

A task can move to DONE only when:

- acceptance criteria passed;
- no critical crash;
- remote navigation works;
- user-facing errors are understandable;
- for TV UI tasks, focus behavior is verified.

## QA Output Format

For each tested area, write:

- Test date
- Device/emulator
- Build/version
- Result: PASS / FAIL / BLOCKED
- Evidence / notes
- Recommended backlog status
