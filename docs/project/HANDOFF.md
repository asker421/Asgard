# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

## Mandatory Pre-flight Refreshed

For the latest emulator smoke shell-compatibility fix, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

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

- User reported recurring workflow error:

```text
Error: The process '/usr/bin/sh' failed with exit code 2
```

- Inspected `.github/workflows/android-emulator-smoke.yml`.
- Found emulator runner script still used:

```text
set -euo pipefail
```

- Interpreted likely cause: `reactivecircus/android-emulator-runner` executes the `script` through `/usr/bin/sh`, and `pipefail` is not POSIX `sh` compatible.
- Updated emulator smoke workflow:

```text
set -euo pipefail
```

to:

```text
set -eu
```

- This preserves fail-fast behavior for command failures/unset variables while avoiding shell-incompatible `pipefail`.
- Did not change app code.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### Previous QA workflow fixes preserved

- Previous failure: `gradle/actions/setup-gradle@v4` rejected unknown `android/gradle/wrapper/gradle-wrapper.jar` checksum.
- Previous fix: removed `setup-gradle@v4` from emulator smoke workflow and kept build via repository wrapper.
- Previous artifact warning: `No files were found with the provided path: smoke-artifacts`.
- Previous fix: create smoke artifact dir before build/emulator and upload absolute `${{ github.workspace }}/smoke-artifacts`.

### Previous diagnostics work preserved

- `2.10.14` diagnostics v2 runtime exists.
- `diagnostics-v2.js` is loaded after earlier diagnostics layers.
- Release expectation remains `2.10.14 (54)` unless version changed after this handoff.

## Files Changed

- `.github/workflows/android-emulator-smoke.yml`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `8acb559f228ccf126570bbb0e3eaeb4eefee1fac` — `Fix sh-incompatible pipefail in emulator smoke`
- `c1da510e3fd6aa302d42992fd256d695aeeab7bc` — `Record sh compatibility fix for emulator smoke`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation from prior handoff:

- versionName: `2.10.14`
- versionCode: `54`
- expected tag: `v2.10.14`
- expected release: `Asgard TV v2.10.14`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- Android emulator smoke workflow exists.
- Gradle wrapper validation failure was patched.
- Artifact upload missing-directory warning was patched.
- `/usr/bin/sh` exit code 2 likely from `pipefail` was patched.
- New run after commit `8acb559f228ccf126570bbb0e3eaeb4eefee1fac` must be checked in GitHub Actions.
- GitHub connector did not expose live Actions run/status.
- No Android TV / Mi Box S runtime QA has been completed in this session.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after commit `8acb559f228ccf126570bbb0e3eaeb4eefee1fac`.
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

Continue with project backlog, but keep `ASG-QA-001` as pending.

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
