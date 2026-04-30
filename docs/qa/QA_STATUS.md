# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

STATIC APP TEST COMPLETED for latest inspected code.

ANDROID EMULATOR SMOKE WORKFLOW EXISTS, but latest run is not yet verified as passing.

PHYSICAL ANDROID TV / MI BOX S QA remains BLOCKED / NOT COMPLETED from this chat environment.

## Current Risk

The app has a strong early-alpha foundation and the core runtime paths are increasingly code-wired, but it has not yet been verified as a stable Android TV build on real Android TV hardware or emulator through a completed CI run.

## Mandatory Pre-flight Used

Active backlog:

`docs/product/backlog-v2.json`

Selected task:

`ASG-QA-001 — Run Android TV build/install smoke test`

Reason:

User reported a failed GitHub Actions smoke run. The failure blocked the Android emulator smoke test before APK build/install, so fixing this is part of `ASG-QA-001`.

## Emulator Smoke Workflow

Workflow:

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

## Latest CI Issue — 2026-04-30

### Failure

The workflow failed in `gradle/actions/setup-gradle@v4` before building the APK:

```text
Found unknown Gradle Wrapper JAR files:
cc6aedaaf085917fce96d98ed8574ac9bd1295e62db696496671ed6a1409d7a6 android/gradle/wrapper/gradle-wrapper.jar
At least one Gradle Wrapper Jar failed validation
```

### Interpretation

This was not an application crash and not a Kotlin/Gradle compilation error.

It was a Gradle Wrapper JAR validation block from `setup-gradle@v4`.

### Fix applied

Updated only the Android emulator smoke workflow:

- Removed `gradle/actions/setup-gradle@v4` from `.github/workflows/android-emulator-smoke.yml`.
- Kept build execution through repository wrapper:

```text
cd android
chmod +x ./gradlew
./gradlew --no-daemon :app:assembleDebug
```

### Current status

A new workflow-triggering commit was created after this fix.

The new run must be checked in GitHub Actions. If it still fails, inspect the next failing step logs.

## Static App Test Summary

| Area | Static Result | Evidence / Notes | Recommended backlog status |
|---|---|---|---|
| APK build configuration | STATIC PASS / CI RUN PENDING | Emulator smoke workflow now avoids the wrapper-validation blocker and builds via `./gradlew --no-daemon :app:assembleDebug`. Latest run result not yet verified. | Keep `ASG-QA-001` TODO / QA needed |
| APK install | CI WORKFLOW ADDED / RUN PENDING | Emulator smoke workflow performs `adb install -r app-debug.apk`. | Keep QA needed until run passes |
| App launch | CI WORKFLOW ADDED / RUN PENDING | Emulator smoke workflow launches `com.asgard.tv` with `monkey`. | Keep QA needed until run passes |
| No instant crash/ANR | CI WORKFLOW ADDED / RUN PENDING | Workflow checks logcat for crash/ANR indicators and uploads logs/screenshots. | Keep QA needed until run passes |
| Runtime script load order | STATIC PASS | `index.html` loads base scripts and late runtime layers. | Runtime QA needed |
| Remote navigation | STATIC PASS / RUNTIME QA NEEDED | `input.js` explicitly handles D-pad keys. | `ASG-002` remains READY_FOR_QA, not DONE |
| Back behavior | STATIC PASS / RUNTIME QA NEEDED | `ui.js` and `MainActivity` provide Back bridge/history. | `ASG-002` remains READY_FOR_QA, not DONE |
| Native bridge | STATIC PASS | `MainActivity` exposes `openPlayer`, `nativeFetch`, persistence APIs and `exitApp`. | Runtime QA needed |
| ExoPlayer | STATIC PASS / QA NEEDED | `PlayerActivity` validates URL, opens Media3 ExoPlayer, handles errors and saves progress. | `ASG-040` READY_FOR_QA |
| Media task/player handoff | STATIC PASS / QA NEEDED | Media task runtime is code-wired to native player handoff. | Runtime QA needed |
| 15-minute stability | BLOCKED | Requires device/emulator long run. | Keep QA needed |

## Required Runtime Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | RUN PENDING | Re-run `Android Emulator Smoke Test` after validation fix. |
| APK installs in CI emulator | TODO | Requires workflow pass. |
| App launches in CI emulator | TODO | Requires workflow pass. |
| No instant crash/ANR | TODO | Requires workflow pass and artifact review. |
| APK installs on Android TV / Mi Box S | TODO | Requires real device/manual emulator. |
| App opens without internet | TODO | Requires emulator/device run. |
| Remote navigation works | TODO | Verify Arrow/Enter behavior on real Android TV WebView. |
| Back behavior works | TODO | Verify Back from Home/Search/Details/Sources/Settings/Player. |
| ExoPlayer opens video | TODO | Requires Android APK runtime test. |
| App survives 15 minutes use | TODO | Requires device/emulator stability test. |

## Recommendation

Do not mark any backlog item DONE from this QA pass until the emulator workflow run passes and/or real device QA is completed.

Next action:

1. Open GitHub Actions.
2. Run or wait for `Android Emulator Smoke Test` after commit fixing Gradle validation.
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
