# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

BLOCKED / NOT COMPLETED for physical Android TV QA.

Static repository QA has been performed for version `2.9.4 (34)`.

## Current Risk

The app has a strong early-alpha foundation, but it has not yet been verified as a stable Android TV build on real hardware.

Latest inspected Android version from `android/app/build.gradle.kts`:

- versionName: `2.9.4`
- versionCode: `34`

GitHub workflow inspection:

- `Build APK` workflow exists and is configured for `push` to `main` and `workflow_dispatch`.
- Build workflow sets Java 17, Android SDK 35, Gradle 8.10.2 and runs `./gradlew :app:assembleDebug`.
- Gradle wrapper properties point to `gradle-8.10.2-bin.zip`.
- The connector did not return workflow runs for the latest inspected commits, so build success for `2.9.4` is not verified in this QA update.

## Static QA Run — 2026-04-30

### Scope

Repository-level smoke readiness inspection using GitHub file reads/search. No physical/emulator interaction was possible inside this chat environment.

### Device / Emulator

None.

### Build / Version

`2.9.4 (34)` from `android/app/build.gradle.kts`.

### Static Result Summary

| Area | Static Result | Evidence / Notes | Recommended backlog status |
|---|---|---|---|
| APK build configuration | STATIC PASS / RUNTIME BLOCKED | Build workflow and wrapper are present and configured for SDK 35, Java 17, Gradle 8.10.2. Latest workflow run was not visible through connector. | Keep QA needed |
| APK install | BLOCKED | Requires emulator/device. | Keep QA needed |
| Offline launch | BLOCKED | Requires emulator/device. Local WebView assets exist. | Keep QA needed |
| Remote navigation | FAIL / HIGH RISK | Repository search did not confirm explicit Web UI `keydown` handling for Arrow/Enter navigation. Runtime may rely on default WebView focus only. | `ASG-002` must not be DONE |
| Focus visibility | BLOCKED | CSS likely has visible focus, but runtime remote traversal is unverified. | QA needed |
| Back behavior | FAIL / HIGH RISK | `MainActivity` calls `window.asgardBack`; `nav.js` forwards to `AsUI.back`, but inspected `ui.js` does not define `AsUI.back` or `AsUI.history`. Back may become no-op depending on runtime patch state. | `ASG-002` BUG_FOUND risk |
| Home screen | STATIC PASS | Home/open demo catalog exists via base and patch scripts. | Needs runtime QA |
| Mock/open catalog | STATIC PASS | Open/public demo streams exist in `content-fix.js`. | READY_FOR_QA still needs device QA |
| Search screen | STATIC PASS / QA NEEDED | `source-search.js` patches Search to use parser/source-backed flow and enabled sources. | `ASG-011` CODE_REVIEW / QA needed |
| Source-backed search | STATIC PASS / QA NEEDED | `sources.js` and `source-search.js` implement parsing, active parser fallback, reports and source results. Needs real configured parser/source QA. | `ASG-012` remains IN_PROGRESS |
| Detail page | STATIC PASS | `content-fix.js` patches demo detail pages. | Needs runtime QA |
| Watch -> native ExoPlayer | STATIC PASS / QA NEEDED | `content-fix.js` routes Watch to `AsgardBridge.openPlayer()` when Android bridge exists. | Needs APK runtime QA |
| ExoPlayer | STATIC PASS / QA NEEDED | `PlayerActivity` validates URL, creates Media3 ExoPlayer, uses controller, handles player errors, seek and progress save. | `ASG-040` READY_FOR_QA |
| Play/pause | STATIC PASS / QA NEEDED | `PlayerActivity.dispatchKeyEvent()` toggles play/pause on Enter/DPAD_CENTER. | QA needed |
| Seek | STATIC PASS / QA NEEDED | DPAD left/right and media rewind/fast-forward seek with duration clamp. | QA needed |
| Progress save | STATIC PASS / QA NEEDED | Saves valid progress when duration is known. Needs restart/resume QA. | `ASG-042` remains IN_PROGRESS |
| Sources screen | STATIC PASS / QA NEEDED | `qa-stabilization.js` patches Sources screen to preview/save/reset. | QA needed |
| TXT parser | STATIC PASS | `sources.js` validates TXT-style rows, comments, source types and search_template query placeholder. | QA needed |
| Parser settings | STATIC PASS / QA NEEDED | `index.html` loads `parser-settings.js`; Search references it. Needs runtime QA. | QA needed |
| Configured media service | BLOCKED | Requires user-configured service/TorrServer. | Keep IN_PROGRESS |
| User-provided media validation | STATIC PASS / QA NEEDED | Kotlin picker/import foundation and JS torrent validation exist. Real metadata/service handoff not verified. | Keep IN_PROGRESS |
| File picker | STATIC PASS / QA NEEDED | `MainActivity.pickTorrentFile()` uses `ACTION_OPEN_DOCUMENT`. Needs Android TV QA. | QA needed |
| Media diagnostics | STATIC PASS / QA NEEDED | Source/torrent diagnostics foundations exist. Needs runtime QA. | QA needed |
| Update screen | STATIC PASS / QA NEEDED | Update scripts/workflow exist; runtime/network behavior unverified. | QA needed |
| 15-minute stability | BLOCKED | Requires device/emulator. | Keep QA needed |

## Required Physical Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | BLOCKED | Workflow file exists, but latest run/result not visible through connector. |
| APK installs on Android TV / Mi Box S | TODO | Requires emulator/device. |
| App opens without internet | TODO | Requires emulator/device. |
| Remote navigation works | TODO | High-risk: verify Arrow/Enter behavior carefully. |
| Focus visible everywhere | TODO | Requires screen-by-screen TV QA. |
| Back behavior works | TODO | High-risk: verify Back from Home/Search/Details/Sources/Settings/Player. |
| Home screen opens | TODO | Requires APK/browser runtime verification. |
| Mock catalog works | TODO | Requires runtime verification. |
| Search opens | TODO | Requires runtime verification. |
| Detail page opens | TODO | Requires runtime verification. |
| ExoPlayer opens video | TODO | Requires Android APK runtime test. |
| Play/pause works | TODO | Requires Android APK runtime test. |
| Seek works | TODO | Requires Android APK runtime test. |
| Progress saves | TODO | Requires Android APK runtime test and restart check. |
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

Documentation and repository-level smoke readiness check.

### Device / Emulator

None. No Android TV emulator or Mi Box S was available inside this chat environment.

### Build / Version

`2.9.4 (34)` from `android/app/build.gradle.kts`.

### Result

BLOCKED for full physical QA.

### Findings

- Build and release workflow definitions are present.
- No latest workflow run result was available through the connector for the inspected commits.
- No APK install, launch, D-pad, Back, ExoPlayer or 15-minute stability result can be claimed from this chat session.
- Static inspection found high-risk areas: remote key handling and Back stack/history.

### Recommendation

Do not mark any backlog item DONE from this QA pass.

Recommended next action:

1. Run `Build APK` or `Release APK` workflow manually if push workflow did not run.
2. Download `asgard-tv-release.apk` or `asgard-tv-debug-apk`.
3. Install on Android TV emulator or Mi Box S.
4. Execute the full smoke checklist above.
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
