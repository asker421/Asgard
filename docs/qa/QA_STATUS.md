# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

`ASG-QA-001 — Android TV build/install smoke test` is **RUN_TRIGGERED / VERIFICATION PENDING**.

Static inspection confirms the Android emulator smoke workflow exists and is configured to:

- build the debug APK;
- start an Android emulator;
- install the APK;
- launch `com.asgard.tv`;
- collect activity dump, logcat and screenshot;
- fail on crash / ANR indicators;
- upload `android-emulator-smoke-artifacts`.

The workflow was force-triggered by a workflow-file commit:

```text
be671178d74cb117423fb925b0a72053e96f897b — Trigger Android emulator smoke test for 2.10.9
```

GitHub connector did not expose the live workflow run/status for that SHA. Therefore this QA pass cannot claim PASS or FAIL for emulator execution.

Physical Android TV / Mi Box S QA remains **BLOCKED / NOT COMPLETED** from this chat environment.

## Mandatory Pre-flight Used

Refreshed:

```text
docs/project/CHAT_PROTOCOL.md
docs/product/backlog-v2.json
docs/project/PROJECT_STATE.md
docs/project/HANDOFF.md
docs/project/DECISIONS.md
docs/project/NEXT_ACTIONS.md
docs/project/BACKLOG_V2_MIGRATION.md
docs/prompts/QA_CHAT_PROMPT.md
```

Active backlog:

```text
docs/product/backlog-v2.json
```

Selected task:

```text
ASG-QA-001 — Run Android TV build/install smoke test
```

Reason:

`ASG-QA-001` is the current critical gate after the stream/media task flow was code-wired through `2.10.9`.

## Emulator Smoke Workflow

Workflow:

```text
.github/workflows/android-emulator-smoke.yml
```

Current force-trigger commit:

```text
be671178d74cb117423fb925b0a72053e96f897b
```

Current verification status:

```text
RUN_TRIGGERED
LIVE STATUS UNKNOWN THROUGH CONNECTOR
MANUAL GITHUB ACTIONS CHECK REQUIRED
```

## What Was Verified Statically

| Area | Static Result | Evidence / Notes | Recommended backlog status |
|---|---|---|---|
| Workflow exists | PASS | `.github/workflows/android-emulator-smoke.yml` exists. | Keep `ASG-QA-001` QA_IN_PROGRESS / pending |
| Workflow triggers | PASS | `workflow_dispatch` and `push` to `main` for `android/**` and workflow path. | Keep pending |
| APK build step | STATIC PASS | Runs `cd android`, `chmod +x ./gradlew`, `./gradlew --no-daemon :app:assembleDebug`. | Runtime CI pass needed |
| Emulator launch step | STATIC PASS | Uses `reactivecircus/android-emulator-runner@v2`, API 35, `tv_1080p`. | Runtime CI pass needed |
| APK install step | STATIC PASS | Runs `adb install -r app-debug.apk`. | Runtime CI pass needed |
| App launch step | STATIC PASS | Runs `adb shell monkey -p com.asgard.tv -c android.intent.category.LAUNCHER 1`. | Runtime CI pass needed |
| Crash/ANR detection | STATIC PASS | Checks logcat for FATAL EXCEPTION / ANR / process crash indicators. | Artifact review needed |
| Artifact upload | STATIC PASS | Uploads `android-emulator-smoke-artifacts`. | Artifact review needed |

## Runtime Smoke Status

| Area | Status | Notes |
|---|---|---|
| APK builds in CI | RUN_TRIGGERED / UNKNOWN | Connector did not expose latest Actions status. |
| APK installs in emulator | RUN_TRIGGERED / UNKNOWN | Requires workflow pass. |
| App launches in emulator | RUN_TRIGGERED / UNKNOWN | Requires workflow pass. |
| No instant crash/ANR | RUN_TRIGGERED / UNKNOWN | Requires logcat artifact review. |
| Screenshot captured | RUN_TRIGGERED / UNKNOWN | Requires artifact review. |
| Android TV / Mi Box S physical install | BLOCKED | Requires real device. |
| 15-minute stability | BLOCKED | Requires emulator/device long run. |

## Manual GitHub Check Required

Open:

```text
GitHub → asker421/Asgard → Actions → Android Emulator Smoke Test
```

Check latest run after commit:

```text
be671178d74cb117423fb925b0a72053e96f897b
```

If green, inspect artifact:

```text
android-emulator-smoke-artifacts
```

Required files:

```text
activity.txt
logcat.txt
launch.png
```

PASS only if:

- workflow is green;
- APK build step passed;
- APK install step passed;
- launch command passed;
- `activity.txt` contains `com.asgard.tv`;
- `logcat.txt` has no crash / ANR for `com.asgard.tv`;
- screenshot confirms the app rendered.

## Recommendation

Do not mark `ASG-QA-001`, `ASG-001`, `ASG-002`, `ASG-040`, or media playback tasks DONE from this QA pass.

Recommended status:

```text
ASG-QA-001: QA_IN_PROGRESS / RUN_TRIGGERED
```

Next action:

1. Verify the GitHub Actions run manually.
2. If it passed, update this file with CI PASS evidence.
3. If it failed, inspect job logs and fix the first failing step.
4. Continue with physical Android TV / Mi Box S smoke test when available.

## QA Rule

A task can move to DONE only when:

- acceptance criteria passed;
- no critical crash;
- remote navigation works;
- user-facing errors are understandable;
- for TV UI tasks, focus behavior is verified.
