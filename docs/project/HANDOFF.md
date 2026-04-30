# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

QA / Release / Engineer coordination

## Mandatory Pre-flight Refreshed

For the latest QA task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. `docs/prompts/QA_CHAT_PROMPT.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### ASG-QA-001 — Android TV build/install smoke test

- Selected task: `ASG-QA-001 — Run Android TV build/install smoke test`.
- Reason: after `2.10.9`, Android TV build/install smoke test is the critical gate before claiming runtime readiness.
- Inspected `.github/workflows/android-emulator-smoke.yml`.
- Confirmed workflow statically performs:
  - debug APK build through repository Gradle wrapper;
  - Android emulator startup;
  - APK install;
  - app launch via `monkey`;
  - activity dump capture;
  - logcat capture;
  - screenshot capture;
  - crash / ANR grep;
  - artifact upload.
- Connector did not expose live workflow runs/statuses for the latest commit.
- Forced a fresh smoke workflow run by changing the workflow trigger note.
- Force-trigger commit:

```text
be671178d74cb117423fb925b0a72053e96f897b — Trigger Android emulator smoke test for 2.10.9
```

- `get_commit_combined_status` returned no statuses for that commit.
- `fetch_commit_workflow_runs` returned no workflow runs for that commit.
- Therefore CI result is still not verified through connector.
- Updated `docs/qa/QA_STATUS.md` as `RUN_TRIGGERED / VERIFICATION PENDING`.
- Did not mark any backlog item DONE.

### Previous stream diagnostics work preserved

- `2.10.9` stream diagnostics runtime exists.
- `stream-diagnostics.js` is loaded after media task/readiness layers.
- Release expectation remains `2.10.9 (49)`.

## Files Changed

- `.github/workflows/android-emulator-smoke.yml`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `be671178d74cb117423fb925b0a72053e96f897b` — `Trigger Android emulator smoke test for 2.10.9`
- `3d4afa4ce31894c6b505a56dd96a74a5fd54b09b` — `Update QA status for triggered emulator smoke`
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
ASG-QA-001: RUN_TRIGGERED / VERIFICATION PENDING
```

Current verification status:

- GitHub Actions run was triggered by workflow-file commit.
- GitHub connector did not expose live Actions run/status.
- Manual GitHub Actions check is required.
- No Android TV / Mi Box S runtime QA has been completed in this session.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after commit `be671178d74cb117423fb925b0a72053e96f897b`.
2. If workflow is green, inspect `android-emulator-smoke-artifacts`:
   - `activity.txt`
   - `logcat.txt`
   - `launch.png`
3. If workflow fails, inspect the first failing step logs.
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
