# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

## Mandatory Pre-flight Refreshed

For the latest CI smoke artifact hardening task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
9. `docs/qa/QA_STATUS.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### ASG-QA-001 — Android TV build/install smoke test

- Selected task: `ASG-QA-001 — Run Android TV build/install smoke test`.
- Reason: current reported issue was inside the Android emulator smoke workflow artifact collection.
- User reported GitHub Actions warning:

```text
Run actions/upload-artifact@v4
Warning: No files were found with the provided path: smoke-artifacts. No artifacts will be uploaded.
```

- Interpreted as artifact directory not guaranteed to exist if the emulator step failed before creating it, or path resolution mismatch.
- Updated `.github/workflows/android-emulator-smoke.yml`:
  - added `SMOKE_ARTIFACTS_DIR: ${{ github.workspace }}/smoke-artifacts`;
  - added `Prepare smoke artifact directory` before build/emulator steps;
  - writes `README.txt` before any later step can fail;
  - changed artifact upload path to absolute `${{ github.workspace }}/smoke-artifacts`;
  - added additional diagnostic files from emulator script:
    - `emulator-step.txt`
    - `adb-devices.txt`
    - `adb-install.txt`
    - `monkey-launch.txt`
    - `activity.txt`
    - `logcat.txt`
    - `launch.png`
    - `success.txt` or `failure.txt`
- Updated `docs/qa/QA_STATUS.md` to record the artifact warning and fix.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### Previous CI smoke fixes preserved

- Previous failure: `gradle/actions/setup-gradle@v4` rejected unknown `android/gradle/wrapper/gradle-wrapper.jar` checksum.
- Previous fix: removed `setup-gradle@v4` from emulator smoke workflow and kept build via repository wrapper.

### Previous stream diagnostics work preserved

- `2.10.9` stream diagnostics runtime exists.
- `stream-diagnostics.js` is loaded after media task/readiness layers.
- Release expectation remains `2.10.9 (49)`.

## Files Changed

- `.github/workflows/android-emulator-smoke.yml`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `789da66bc825dbde521bbb9b0809b531a823b422` — `Fix emulator smoke Gradle wrapper validation failure`
- `b8eb579c67b39c98fef89a3502f8375f1239030b` — `Ensure emulator smoke artifacts are always available`
- `4b509b6369ae171d94101b23557235138eaa8b06` — `Record artifact directory hardening for emulator smoke`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.9`
- versionCode: `49`
- expected tag: `v2.10.9`
- expected release: `Asgard TV v2.10.9`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED
```

Current verification status:

- Android emulator smoke workflow exists.
- Gradle wrapper validation failure was patched.
- Artifact upload missing-directory warning was patched.
- New run after commit `b8eb579c67b39c98fef89a3502f8375f1239030b` must be checked in GitHub Actions.
- GitHub connector did not expose live Actions run/status.
- No Android TV / Mi Box S runtime QA has been completed in this session.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after commit `b8eb579c67b39c98fef89a3502f8375f1239030b`.
2. If workflow is green, inspect `android-emulator-smoke-artifacts`:
   - `README.txt`
   - `emulator-step.txt`
   - `adb-devices.txt`
   - `adb-install.txt`
   - `monkey-launch.txt`
   - `activity.txt`
   - `logcat.txt`
   - `launch.png`
   - `success.txt` or `failure.txt`
3. If workflow fails, inspect uploaded artifacts and the first failing step logs.
4. After CI smoke result is known, update `docs/qa/QA_STATUS.md`.
5. Then continue with physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test run result.

PASS criteria:

- workflow green;
- APK build step passed;
- APK install step passed;
- launch command passed;
- `activity.txt` contains `com.asgard.tv`;
- `logcat.txt` has no crash / ANR for `com.asgard.tv`;
- screenshot confirms app rendered.

Engineer if smoke fails:

Fix the first failing workflow/app step only, then trigger smoke again.

Engineer if device QA remains unavailable and CI run cannot be read through connector:

Continue with `ASG-012 — Unified search results and normalization hardening`, but keep QA gate as pending.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- Emulator workflow may still fail at later build/emulator/install/launch steps; artifacts should now be available for diagnosis.
- Do not mark `ASG-QA-001`, `ASG-001`, `ASG-002`, `ASG-040`, or media playback tasks DONE until CI/manual QA evidence exists.
- Do not add bundled prohibited catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or silent APK installation.

## Notes for Next Chat

Before every implementation, QA, release or product task, run mandatory pre-flight from `docs/project/CHAT_PROTOCOL.md`.

Read:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. Relevant role prompt under `docs/prompts/`

Do not use `docs/BACKLOG.md`.
Do not use old `docs/product/backlog.json` as active backlog.
