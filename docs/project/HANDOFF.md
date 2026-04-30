# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

## Mandatory Pre-flight Refreshed

For the latest QA status update, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. Relevant role prompt / QA status context from repository

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### ASG-QA-001 — Android TV build/install smoke test

- User confirmed: Android Emulator Smoke Test passed successfully in GitHub Actions.
- Recorded CI emulator smoke result in `docs/qa/QA_STATUS.md`.
- CI emulator smoke is now considered PASS for:
  - APK build in CI;
  - emulator workflow completion;
  - APK install/launch/no-instant-crash gate according to the successful workflow result.
- Physical Android TV / Mi Box S manual QA is still not completed.
- Did not mark `ASG-QA-001` fully DONE because manual Android TV remote/player/stability QA remains required.

### Previous MVP flow work preserved

- `title-media-search.js` remains the Search screen runtime.
- `media-task-creation-v2.js` remains the Search result → persistent media task creation runtime.
- `player-handoff-v2.js` remains the media task → native player handoff runtime.
- `streaming-readiness.js` and `stream-diagnostics.js` still run after task/player layers.

## Files Changed

- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `f78476bab57cdea2be213b5d23d594b6034da8e0` — `Record successful emulator smoke test`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation from prior handoff:

- versionName: `2.10.18`
- versionCode: `58`
- expected tag: `v2.10.18`
- expected release: `Asgard TV v2.10.18`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / MANUAL_TV_QA_REQUIRED
```

What is now verified:

- CI emulator smoke workflow passed by user confirmation.
- APK build/install/launch/no-instant-crash gate is passed in CI emulator.

What is still not verified:

- Full remote D-pad focus traversal.
- Back behavior across all screens.
- Native ExoPlayer real playback quality on Android TV device.
- Configured source/parser/TorrServer flows.
- QR import runtime flow.
- 15-minute manual stability.
- Mi Box S physical compatibility.

## Current Highest Priority

1. Download or inspect `android-emulator-smoke-artifacts` from the passed workflow run if available.
2. Verify `activity.txt`, `logcat.txt`, and `launch.png` for evidence completeness.
3. Run manual Android TV / Mi Box S QA:
   - D-pad focus traversal;
   - Enter activation;
   - Back behavior;
   - player launch/play/pause/seek;
   - Search → task → player flow;
   - 15-minute stability.
4. Continue MVP engineering flow: metadata / file selection from configured service.

## Next Recommended Task

QA:

Run manual Android TV / Mi Box S smoke test and update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED rows.

Engineer:

Continue `ASG-TOR-003 — Metadata and file selection` if device QA remains unavailable.

Expected engineering result:

- configured service metadata/files are normalized reliably;
- file list persists on task;
- playable video file selection is clear;
- selected file generates/keeps stream URL where service supports it;
- no files / no playable file / service missing states are readable.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- Player handoff is code-wired but not runtime-verified manually.
- Release APK availability must still be verified in GitHub Releases if distributing.
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
