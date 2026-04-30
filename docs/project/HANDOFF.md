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

- Continued engineering work after user asked to take the next task.
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-TOR-005 — Player integration and seeking`.
- Reason: `ASG-TOR-SEARCH-002` was code-wired in `2.10.5`, and `NEXT_ACTIONS.md` lists stream URL -> `PlayerActivity` as the next main flow step.
- Inspected `media-task.js` and `PlayerActivity.kt`.
- Confirmed `PlayerActivity` already accepts `url`, `title`, `itemId`, and `startPosition` and saves watch progress by `itemId`.
- Hardened Media Task -> PlayerActivity handoff:
  - stable task ID is now used as player `itemId` where bridge supports it;
  - Resume action uses saved progress for task ID;
  - Start over action opens at position `0`;
  - direct playable task opens native player through same task flow;
  - stream URL readiness detection added;
  - unsupported URL scheme detection added;
  - missing stream URL renders state-card error;
  - player bridge failure renders state-card error;
  - diagnostics now include bridge availability, stream URL presence and saved progress.
- Bumped Android version to `2.10.6 (46)` for the release trigger.
- Updated changelog and release status for 2.10.6.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/media-task.js`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `1b080406c60ed93072c5f784b11876ac13c9664a` — `Harden media task player handoff`
- `4468ad537439b5dba4dc5d1b3c2913c212c19d59` — `Bump version for player handoff release`
- `5b80d6b6bdfcbb28245fd030608895a1853a296a` — `Update changelog for 2.10.6 player handoff`
- `5876d4060e599456d5f899317106be8bbd5448b6` — `Update release status for 2.10.6 player handoff`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.6`
- versionCode: `46`
- expected tag: `v2.10.6`
- expected release: `Asgard TV v2.10.6`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Player handoff is code-wired but not runtime-verified in Android APK.

## Current Highest Priority

1. `ASG-TOR-003` — Metadata and file selection.
2. `ASG-QA-001` — Android TV build/install smoke test.
3. Runtime QA for `ASG-TOR-SEARCH-001`, `ASG-TOR-SEARCH-002`, and `ASG-TOR-005`.
4. `ASG-TOR-004` — Streaming-first playback.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-003` next.

Expected direction:

- Strengthen metadata/file-selection handling.
- Normalize configured service responses more reliably.
- Persist selected file details.
- Improve no-files / no-playable-video states.
- Keep player handoff stable and reuse `AsMediaTask.openStream()`.

QA:

Run Android TV smoke test for `2.10.6`.

Minimum player handoff QA scope:

- Search with a user-configured source.
- Select direct playable result.
- Create media task.
- Open stream and confirm native PlayerActivity starts.
- Exit player and confirm progress is saved against task ID.
- Reopen task and confirm Resume appears.
- Confirm Resume starts from saved position.
- Confirm Start over starts from 0.
- Confirm missing stream URL shows readable error state.
- Confirm bridge/player failure is shown clearly.
- Confirm D-pad focus works on task screen.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Media task flow depends on user-configured source/parser/service.
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
