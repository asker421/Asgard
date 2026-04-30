# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

BLOCKED / NOT COMPLETED.

## Current Risk

The app has a strong early-alpha foundation, but it has not yet been verified as a stable Android TV build on real hardware.

Latest inspected Android version from `android/app/build.gradle.kts`:

- versionName: `2.9.4`
- versionCode: `34`

GitHub workflow inspection:

- `Build APK` workflow exists and is configured for `push` to `main` and `workflow_dispatch`.
- `Release APK` workflow exists and is configured for `push` to `main`, `v*` tags and `workflow_dispatch`.
- The connector did not return workflow runs for the latest inspected commits, so build success for `2.9.4` is not verified in this QA update.

## Required Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | BLOCKED | Workflow file exists, but latest run/result not visible through connector. |
| APK installs on Android TV / Mi Box S | TODO | Requires emulator/device. |
| App opens without internet | TODO | Requires emulator/device. |
| Remote navigation works | TODO | Requires Android TV remote/emulator D-pad validation. |
| Focus visible everywhere | TODO | Requires screen-by-screen TV QA. |
| Back behavior works | TODO | Requires runtime test after recent `AsUI.back()` changes. |
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

BLOCKED for full QA.

### Findings

- Build and release workflow definitions are present.
- No latest workflow run result was available through the connector for the inspected commits.
- No APK install, launch, D-pad, Back, ExoPlayer or 15-minute stability result can be claimed.

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
