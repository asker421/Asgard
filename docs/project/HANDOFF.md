# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Mandatory Pre-flight Refreshed

For the latest engineering task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. `docs/prompts/ENGINEER_CHAT_PROMPT.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### ASG-TOR-005 — Player integration and seeking

- Selected task: `ASG-TOR-005`.
- Reason: `ASG-TOR-SEARCH-002` was code-wired and the next MVP step is media task → `PlayerActivity` handoff / seeking / resume.
- Inspected:
  - `PlayerActivity.kt`
  - `MainActivity.kt`
  - `media-task.js`
  - previous media task creation / readiness layers
- Found a key handoff issue:
  - current Android bridge `openPlayer(url,title,startPosition)` always derived `itemId` from title;
  - therefore media task progress/resume could be stored under title instead of stable task id.
- Added `player-handoff-v2.js` as a late runtime layer:
  - overrides `AsMediaTask.openStream`, `resume`, `startOver` and `diag`;
  - checks stream URL before player launch;
  - blocks unsupported URL schemes before native player handoff;
  - missing stream URL shows readable error with Prepare stream / Load metadata / Diagnostics actions;
  - Resume and Start over use the same task id based handoff path;
  - diagnostics report bridge availability, `openPlayerWithItem` support, URL readiness and saved progress.
- Updated `MainActivity.kt`:
  - added private `openPlayerInternal(url,title,startPosition,itemId)`;
  - preserved legacy `openPlayer(url,title,startPosition)`;
  - added new bridge method `openPlayerWithItem(url,title,startPosition,itemId)`;
  - new bridge method passes stable item id into `PlayerActivity`.
- Loaded `player-handoff-v2.js` after `media-task-creation-v2.js` and before readiness/diagnostics layers.
- Bumped Android version to `2.10.18 (58)` for release trigger.
- Updated changelog and release status for `2.10.18`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### Previous MVP flow work preserved

- `title-media-search.js` remains the Search screen runtime.
- `media-task-creation-v2.js` remains the Search result → persistent media task creation runtime.
- `streaming-readiness.js` and `stream-diagnostics.js` still run after task/player layers.

### QA gate status preserved

- `ASG-QA-001` remains QA_IN_PROGRESS / pending.
- Android emulator smoke workflow must still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA is still not completed.

## Files Changed

- `android/app/src/main/assets/web/player-handoff-v2.js`
- `android/app/src/main/java/com/asgard/tv/MainActivity.kt`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `bac0f61b71b7bc14acaff5191f38fb0b2f9ad362` — `Add player handoff v2 runtime`
- `5f0e39e820c6d462d00777d43b190dad38c294d0` — `Add stable item id player bridge`
- load commit was created after `index.html` update; verify exact SHA through commit history if needed.
- version bump commit was created after `android/app/build.gradle.kts` update; verify exact SHA through commit history if needed.
- `79c036336efd514fb6077b2923dd2b998ae502df` — `Update changelog for 2.10.18 player handoff`
- `0360cc12aab45fa3b68311626b8aba9e5bb0ceec` — `Update release status for 2.10.18 player handoff`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.18`
- versionCode: `58`
- expected tag: `v2.10.18`
- expected release: `Asgard TV v2.10.18`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

`ASG-QA-001` remains the main gate.

Manual GitHub Actions verification is still required because connector did not expose reliable live Actions status.

## Current Highest Priority

1. Verify latest Android Emulator Smoke Test run in GitHub Actions.
2. Verify release `v2.10.18` and `asgard-tv-release.apk` after Actions completes.
3. Runtime QA media task → player:
   - stream-ready task opens `PlayerActivity`;
   - progress saves under stable task id;
   - Resume starts from saved position;
   - Start over starts from zero;
   - missing stream URL shows readable error;
   - bad/unsupported stream does not crash app.
4. Continue MVP flow: metadata / file selection from configured service.

## Next Recommended Task

Engineer:

Implement or harden `ASG-TOR-003 — Metadata and file selection`.

Expected result:

- configured service metadata/files are normalized reliably;
- file list persists on task;
- playable video file selection is clear;
- selected file generates/keeps stream URL where service supports it;
- no files / no playable file / service missing states are readable.

QA:

Verify Android Emulator Smoke Test and `v2.10.18` release asset.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- GitHub connector did not expose latest Actions run.
- Player handoff is code-wired but not runtime-verified.
- Release APK availability must still be verified in GitHub Releases.
- Do not mark tasks DONE without QA evidence.
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
