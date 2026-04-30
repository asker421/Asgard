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

### ASG-TOR-SEARCH-002 — Search result to playable media task

- Selected task: `ASG-TOR-SEARCH-002`.
- Reason: `ASG-TOR-SEARCH-001` was code-wired and the next MVP step is selected search result → persistent media task.
- Inspected:
  - `media-task.js`
  - `title-media-search.js`
  - `search-normalization-v2.js`
- Found that `media-task.js` already had `createFromResult`, but it did not strongly guard invalid/link-only results and did not show a clear creation summary before task handoff.
- Added `media-task-creation-v2.js` as a late runtime layer:
  - overrides only the Search → Create media task path;
  - normalizes selected result target and input type;
  - validates missing/unsupported/link-only results before task creation;
  - direct playable result creates `stream_ready` task with `streamUrl`;
  - torrent/magnet/torrent-file result creates `metadata_pending` task;
  - torrent/magnet-like result requires explicit rights confirmation;
  - created task is persisted through existing `AsStore.updateTorrentTask` or local fallback;
  - created task opens immediately;
  - creation diagnostics show normalized input type, target presence and validation result;
  - preserves legal-safe architecture: no bundled catalogs, no embedded source lists, no engines, no bypass features.
- Loaded `media-task-creation-v2.js` immediately after `media-task.js` and before readiness/diagnostics layers.
- Bumped Android version to `2.10.17 (57)` for release trigger.
- Updated changelog and release status for `2.10.17`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### Previous ASG-TOR-SEARCH-001 work preserved

- `title-media-search.js` remains loaded after `search-normalization-v2.js`.
- Search screen remains movie/series title based.
- No configured source still shows setup actions.

### QA gate status preserved

- `ASG-QA-001` remains QA_IN_PROGRESS / pending.
- Android emulator smoke workflow must still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA is still not completed.

## Files Changed

- `android/app/src/main/assets/web/media-task-creation-v2.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- media task creation runtime commit was created after `media-task-creation-v2.js` creation; verify exact SHA through commit history if needed.
- load commit was created after `index.html` update; verify exact SHA through commit history if needed.
- version bump commit was created after `android/app/build.gradle.kts` update; verify exact SHA through commit history if needed.
- changelog update commit was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `7502c18f65f7b86ffda945aa8fc35a564529f589` — `Update release status for 2.10.17 media task creation`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.17`
- versionCode: `57`
- expected tag: `v2.10.17`
- expected release: `Asgard TV v2.10.17`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

`ASG-QA-001` remains the main gate.

Manual GitHub Actions verification is still required because connector did not expose reliable live Actions status.

## Current Highest Priority

1. Verify latest Android Emulator Smoke Test run in GitHub Actions.
2. Verify release `v2.10.17` and `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Search → Media task:
   - direct playable result creates stream-ready task;
   - torrent/magnet result asks for rights confirmation;
   - torrent/magnet result creates metadata-pending task;
   - link-only result is blocked with readable state;
   - created task opens immediately;
   - task persists after screen navigation.
4. Continue MVP flow: media task → player handoff / seeking.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-005 — Player integration and seeking`.

Expected result:

- selected stream-ready task opens `PlayerActivity` reliably;
- missing stream URL shows readable error;
- resume/start-over use stable task id;
- player handoff diagnostics are clear;
- bad/unsupported stream does not crash app.

QA:

Verify Android Emulator Smoke Test and `v2.10.17` release asset.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- GitHub connector did not expose latest Actions run.
- Search result quality depends on user-configured sources/parsers.
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
