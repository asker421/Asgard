# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

STATIC APP TEST COMPLETED for `2.10.6 (46)`.

ANDROID EMULATOR SMOKE WORKFLOW ADDED, but the workflow run result is not yet verified in this chat.

PHYSICAL ANDROID TV / MI BOX S QA remains BLOCKED / NOT COMPLETED from this chat environment.

## Current Risk

The app has a strong early-alpha foundation and the core runtime paths are increasingly code-wired, but it has not yet been verified as a stable Android TV build on real Android TV hardware or emulator through a completed CI run.

Latest inspected Android version from `android/app/build.gradle.kts`:

- versionName: `2.10.6`
- versionCode: `46`

## Mandatory Pre-flight Used

Active backlog:

`docs/product/backlog-v2.json`

Selected task:

`ASG-QA-001 — Run Android TV build/install smoke test`

Reason:

User requested app testing and agreed to CI/cloud-emulator style testing. This is the QA task for Android TV build/install/runtime smoke validation.

## Emulator Smoke Workflow

Added workflow:

```text
.github/workflows/android-emulator-smoke.yml
```

Purpose:

- Build debug APK.
- Start Android emulator in GitHub Actions.
- Install APK.
- Launch `com.asgard.tv`.
- Wait for startup.
- Capture active activity dump.
- Capture logcat.
- Capture screenshot.
- Fail the job if `FATAL EXCEPTION`, ANR, or crash indicators for `com.asgard.tv` are detected.
- Upload artifacts as `android-emulator-smoke-artifacts`.

Limitations:

- This is not a full manual Android TV remote QA.
- It does not verify every D-pad focus path.
- It does not verify media playback quality, configured TorrServer, QR import, or 15-minute manual stability.
- It is a first automated install/launch/no-crash gate.

## Static App Test — 2026-04-30

### Scope

Repository-level app smoke test using GitHub file reads/search. No physical Android TV emulator or Mi Box S interaction was possible inside this chat environment.

### Device / Emulator

None for the static test. CI emulator workflow was added but not yet confirmed as completed.

### Build / Version

`2.10.6 (46)` from `android/app/build.gradle.kts`.

### Static Result Summary

| Area | Static Result | Evidence / Notes | Recommended backlog status |
|---|---|---|---|
| APK build configuration | STATIC PASS / CI RUN PENDING | `Build APK` workflow uses Java 17, Android SDK 35, Gradle 8.10.2 and `./gradlew :app:assembleDebug`; new `Android Emulator Smoke Test` workflow builds and installs APK in emulator. Latest run/result not yet verified. | Keep `ASG-QA-001` TODO / QA needed |
| APK install | CI WORKFLOW ADDED / RUN PENDING | New emulator smoke workflow performs `adb install -r app-debug.apk`. | Keep QA needed until run passes |
| App launch | CI WORKFLOW ADDED / RUN PENDING | New emulator smoke workflow launches `com.asgard.tv` with `monkey`. | Keep QA needed until run passes |
| No instant crash/ANR | CI WORKFLOW ADDED / RUN PENDING | New workflow checks logcat for crash/ANR indicators and uploads logs/screenshots. | Keep QA needed until run passes |
| Offline launch | BLOCKED | Requires completed emulator/device run; local WebView assets exist. | Keep QA needed |
| Runtime script load order | STATIC PASS | `index.html` loads base scripts and late runtime layers including `source-manager.js`, `qr-import.js`, `diagnostics-health.js`, `onboarding.js`, `states.js`, `media-search.js`, and `media-task.js`. | Runtime QA needed |
| Remote navigation | STATIC PASS / RUNTIME QA NEEDED | `input.js` explicitly handles ArrowUp/Down/Left/Right, Enter/NumpadEnter, Backspace/Escape, visible focusable elements, `getBoundingClientRect()`, `scrollIntoView()` and prevents default for handled keys. | `ASG-002` remains READY_FOR_QA, not DONE |
| Focus visibility | STATIC PASS / RUNTIME QA NEEDED | Focusable refresh and movement exist; visual focus still needs screen-by-screen TV QA. | QA needed |
| Back behavior | STATIC PASS / RUNTIME QA NEEDED | `ui.js` defines `history`, `nav()`, `back()` and `window.asgardBack=function(){return AsUI.back()}`; Android `MainActivity` calls `window.asgardBack`; `MainActivity` exposes `exitApp()`. | `ASG-002` remains READY_FOR_QA, not DONE |
| Home screen | STATIC PASS | Home/open demo catalog exists through runtime layer. | Needs runtime QA |
| Mock/open catalog | STATIC PASS | Open/public demo streams exist; no bundled prohibited catalog behavior found in inspected path. | READY_FOR_QA still needs device QA |
| Search screen | STATIC PASS / QA NEEDED | Current app includes source search and media search runtime layers; backlog focus is search movie -> configured media/torrent result -> player. | Runtime QA needed |
| Media search flow | STATIC PASS / QA NEEDED | Handoff and `index.html` indicate `media-search.js` is loaded; `media-task.js` patches `AsMediaSearch.createTask()`. Needs runtime search test with configured source/parser. | `ASG-TOR-SEARCH-001/002` need QA |
| Media task creation | STATIC PASS / QA NEEDED | `media-task.js` can create persistent tasks from selected search results, detect input type, preserve diagnostics, and render task screen. | `ASG-TOR-SEARCH-002` QA needed |
| Direct playable media task | STATIC PASS / QA NEEDED | `media-task.js` sets direct_video task to `stream_ready` and opens native player via `AsgardBridge.openPlayer()` when stream URL exists. | Runtime QA needed |
| Configured service metadata | STATIC PASS / RUNTIME BLOCKED | `media-task.js` can call `AsTorrServerAdapter.preparePlayableFromResult()` and render metadata/files, but no service endpoint was available in this chat. | `ASG-TOR-003` remains IN_PROGRESS |
| File selection | STATIC PASS / QA NEEDED | `media-task.js` renders file rows and selected file state from service metadata. Needs real service response QA. | `ASG-TOR-003` QA needed |
| Player stream handoff | STATIC PASS / QA NEEDED | `media-task.js` calls `openNative()` -> `AsgardBridge.openPlayer()`; `MainActivity.openPlayer()` starts `PlayerActivity`. | `ASG-TOR-005` still needs runtime QA |
| Native bridge | STATIC PASS | `MainActivity` exposes `AsgardBridge` with `openPlayer`, `nativeFetch`, source persistence, torrent tasks, watch progress, favorites/history, version info and `exitApp`. | Runtime QA needed |
| ExoPlayer | STATIC PASS / QA NEEDED | `PlayerActivity` validates URL, creates Media3 ExoPlayer, uses controller, handles player errors, D-pad play/pause/seek and saves valid progress. | `ASG-040` READY_FOR_QA |
| Play/pause | STATIC PASS / QA NEEDED | `PlayerActivity.dispatchKeyEvent()` toggles play/pause on Enter/DPAD_CENTER. | QA needed |
| Seek | STATIC PASS / QA NEEDED | DPAD left/right and media rewind/fast-forward seek with duration clamp. | QA needed |
| Progress save | STATIC PASS / QA NEEDED | Saves valid progress when duration is known; Continue Watching wiring exists from prior layers. Needs restart/resume QA. | `ASG-042` remains IN_PROGRESS |
| Sources / parser settings | STATIC PASS / QA NEEDED | Source/parser/settings layers are loaded. Needs valid/invalid configured source QA. | QA needed |
| TXT parser | STATIC PASS / QA NEEDED | Parser foundation exists; runtime invalid/valid row test needed. | QA needed |
| QR import | STATIC PASS / QA NEEDED | `qr-import.js` is loaded, but real phone end-to-end flow was not executed. | `ASG-050` remains IN_PROGRESS |
| Diagnostics health | STATIC PASS / QA NEEDED | `diagnostics-health.js` is loaded; runtime checks not executed here. | QA needed |
| Update screen | STATIC PASS / QA NEEDED | Release/update docs and update scripts exist; runtime/network behavior unverified. | QA needed |
| 15-minute stability | BLOCKED | Requires device/emulator long run. | Keep QA needed |

## Required Physical / Runtime Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | RUN PENDING | Emulator smoke workflow added; verify GitHub Actions result. |
| APK installs on Android TV / Mi Box S | TODO | CI emulator install is automated, but real TV/Mi Box S install still needed. |
| App opens without internet | TODO | Requires emulator/device run. |
| Remote navigation works | TODO | Verify Arrow/Enter behavior on real Android TV WebView. |
| Focus visible everywhere | TODO | Requires screen-by-screen TV QA. |
| Back behavior works | TODO | Verify Back from Home/Search/Details/Sources/Settings/Player. |
| Home screen opens | TODO | Requires APK/browser runtime verification. |
| Mock catalog works | TODO | Requires runtime verification. |
| Search opens | TODO | Requires runtime verification. |
| Media search returns configured results | TODO | Requires configured source/parser. |
| Search result creates media task | TODO | Requires media search runtime QA. |
| Direct playable media task opens ExoPlayer | TODO | Requires Android APK runtime test. |
| Configured service task loads metadata/files | TODO | Requires configured service/TorrServer. |
| Selected file persists | TODO | Requires service metadata result. |
| Stream URL opens ExoPlayer | TODO | Requires service/direct playable URL. |
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
| QR import opens | TODO | Requires runtime verification. |
| Diagnostics screen opens | TODO | Requires runtime verification. |
| Update screen opens | TODO | Requires runtime verification. |
| App survives 15 minutes use | TODO | Requires device/emulator stability test. |

## Latest QA Attempt — 2026-04-30

### Scope

Static repository smoke readiness check for current 2.10.6 code plus CI emulator smoke workflow creation.

### Device / Emulator

GitHub Actions emulator workflow added, run result not yet confirmed.

### Build / Version

`2.10.6 (46)` from `android/app/build.gradle.kts`.

### Result

STATIC PASS for core code paths.

CI EMULATOR SMOKE RUN PENDING.

FULL PHYSICAL QA BLOCKED.

### Findings

- Build workflow and Gradle wrapper definitions are present and look correct.
- New Android emulator smoke workflow was added to install and launch APK in CI and collect artifacts.
- Latest workflow run/result was not available through the connector yet.
- D-pad and Back are implemented in inspected Web assets.
- Native bridge includes `exitApp()`, `openPlayer()`, source/torrent/progress persistence and native fetch.
- PlayerActivity has ExoPlayer, URL validation, D-pad controls, error Toast and progress save.
- Media task flow is code-wired for direct playable result -> task -> native player, and for configured service metadata where service exists.
- No completed CI emulator result, real APK install, launch, real D-pad traversal, Back runtime behavior, ExoPlayer playback, real configured source/service test or 15-minute stability result can be claimed from this chat session.

### Recommendation

Do not mark any backlog item DONE from this QA pass until the emulator workflow run passes and/or real device QA is completed.

Recommended next action:

1. Open GitHub Actions.
2. Run or wait for `Android Emulator Smoke Test`.
3. Inspect `android-emulator-smoke-artifacts`:
   - `activity.txt`
   - `logcat.txt`
   - `launch.png`
4. If workflow passes, update this file with CI PASS for build/install/launch/no-crash.
5. Continue with manual Android TV/Mi Box S smoke checklist.

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
