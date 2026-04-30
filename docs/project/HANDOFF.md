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

- Continued engineering work after user said "Дальше".
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-TOR-SEARCH-002 — Search result to playable media task`.
- Reason: `ASG-TOR-SEARCH-001` was code-wired in `2.10.4`, and `backlog-v2.json` / handoff list `ASG-TOR-SEARCH-002` as the next Critical item.
- Inspected `torrent.js` and `store.js`.
- Added `media-task.js` as a persistent media task runtime layer.
- Added task creation from selected media search result:
  - persistent task ID;
  - input type detection;
  - source/title/quality/size/seeds metadata;
  - rights confirmation flag;
  - direct URL stream-ready task state;
  - metadata-pending state for configured service paths;
  - raw result diagnostics.
- Added Media Task screen:
  - task status;
  - source and target URL;
  - metadata loading action;
  - file list rendering;
  - selected file state;
  - open stream action;
  - per-task diagnostics.
- Patched Media Search `Create media task` action so it opens the Media Task screen instead of only showing an alert.
- Loaded `media-task.js` last in `index.html`, after `media-search.js`, so it can patch the final Media Search runtime.
- Bumped Android version to `2.10.5 (45)` for the release trigger.
- Updated changelog and release status for 2.10.5.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/media-task.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `3a28adfd735aefcca8dc2a4d6ae851642193defb` — `Add persistent media task flow`
- media-task load commit was created after `index.html` update; verify exact SHA through commit history if needed.
- `a0a16d133e609fc0d37b0bb94a55f19d297775e8` — `Bump version for media task release`
- `0eaeadbca1ee09494fd9ff44962a6729d5c11877` — `Update changelog for 2.10.5 media task`
- `9dc5cc6fbf5ad7a76da5b24d8711ab6446eff98f` — `Update release status for 2.10.5 media task`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.5`
- versionCode: `45`
- expected tag: `v2.10.5`
- expected release: `Asgard TV v2.10.5`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Media task flow is code-wired but not runtime-verified with real user-configured source/parser/service.

## Current Highest Priority

1. `ASG-TOR-005` — Player integration and seeking.
2. `ASG-TOR-003` — Metadata and file selection.
3. `ASG-QA-001` — Android TV build/install smoke test.
4. Runtime QA for `ASG-TOR-SEARCH-001` and `ASG-TOR-SEARCH-002`.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-005` next.

Expected direction:

- Ensure selected task stream URL is reliably sent to `PlayerActivity`.
- Add clear missing-stream / service-failure states.
- Ensure direct playable task opens native ExoPlayer.
- Ensure configured service task opens native ExoPlayer when stream URL exists.
- Preserve rights confirmation for user-configured media where needed.

QA:

Run Android TV smoke test for `2.10.5`.

Minimum media task QA scope:

- Search with a user-configured source.
- Select direct playable result.
- Create media task.
- Confirm task screen opens and persists.
- Confirm direct playable task opens ExoPlayer.
- Select a configured service result.
- Confirm rights prompt.
- Confirm metadata loading shows success or understandable error.
- Confirm file list appears when service returns files.
- Confirm selected file persists.
- Confirm Open stream opens ExoPlayer or reports clear missing stream URL error.
- Confirm D-pad focus works on task screen.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Media task flow depends on user-configured source/parser/service.
- `ASG-TOR-005` still needs player integration hardening for task stream handoff.
- `ASG-TOR-003` still needs stronger metadata/file-selection handling with real service responses.
- Do not mark any backlog item DONE until acceptance criteria and Definition of Done are verified.
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
