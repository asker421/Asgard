# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Mandatory Pre-flight Refreshed

For the latest engineering task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. `docs/prompts/ENGINEER_CHAT_PROMPT.md`

Active backlog for current and future chats:

`docs/product/backlog-v2.json`

The old `docs/product/backlog.json` is historical/large and may be truncated by the connector. Do not use it as active backlog.

## Work Completed

- Continued engineering work after user said "дальше".
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-090 — Diagnostics screen expansion`.
- Reason: device QA is unavailable in this chat environment; after QR import prototype, handoff listed Diagnostics expansion as the next engineering item.
- Inspected existing `source-diagnostics.js`; confirmed Diagnostics screen was mainly source-only diagnostics.
- Added `diagnostics-health.js` as a unified health dashboard runtime layer.
- Added Diagnostics Health Dashboard covering:
  - Android bridge presence;
  - bridge methods such as `openPlayer` and `nativeFetch`;
  - app version report;
  - device storage report where bridge support exists;
  - source configuration summary;
  - parser/service settings summary with masked API key status;
  - QR import module/session state;
  - local storage counters for sources, progress, favorites, history and media tasks;
  - static warnings;
  - raw health JSON report;
  - Copy JSON action;
  - source diagnostics shortcut.
- Loaded `diagnostics-health.js` last in `index.html`, after older diagnostics overlays, so it overrides source-only diagnostics as the active Diagnostics screen.
- Bumped Android version to `2.10.1 (41)` for the release trigger.
- Updated changelog and release status for 2.10.1.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/diagnostics-health.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `2dc1b7891ebee2d1836a51f2a33e2f530f39e4ef` — `Add unified diagnostics health dashboard`
- `8dcfcc7aeee567b006b0c1e20d861e412365bda1` — `Load unified diagnostics dashboard last`
- `363eb2310683c0dd961f042b8e4ebc64ac043527` — `Bump version for diagnostics dashboard release`
- `5af446707daae4bc7fde31113d63ab56c6e9f2f3` — `Update changelog for 2.10.1 diagnostics`
- `30fe1f22feaa5511a08b1f620584f1ab90eb4637` — `Update release status for 2.10.1 diagnostics`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.1`
- versionCode: `41`
- expected tag: `v2.10.1`
- expected release: `Asgard TV v2.10.1`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Diagnostics Health Dashboard is code-wired but not runtime-verified on Android TV.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.10.1`.
2. Verify GitHub Releases contains `Asgard TV v2.10.1`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate Diagnostics dashboard with D-pad.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for `2.10.1`.

Minimum Diagnostics test scope:

- Open Diagnostics screen.
- Confirm Health Dashboard is visible, not old source-only diagnostics.
- Confirm Version panel is readable.
- Confirm Android bridge panel detects bridge in APK.
- Confirm Storage panel shows counts.
- Confirm Sources panel shows total/enabled/invalid.
- Confirm QR import panel shows module/session state.
- Confirm warnings are understandable.
- Confirm Copy JSON works or falls back safely.
- Confirm D-pad focus works on panels/buttons.

Engineer if device QA is unavailable:

Continue with the next engineering backlog item after Diagnostics expansion:

1. First launch onboarding (`ASG-005`).
2. Global loading/empty/error/retry states (`ASG-006`).
3. AI provider settings (`ASG-064`) only after core playback/search/source manager is stable.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Diagnostics dashboard needs runtime validation with remote/D-pad.
- Some diagnostics depend on Android bridge and will show browser-preview warnings outside APK.
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

When reviewing runtime behavior, inspect `index.html` load order and the late patch scripts, not only base `main.js`/`ui.js`.
