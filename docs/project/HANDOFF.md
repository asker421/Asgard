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

- Continued engineering work after user asked to act further.
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-050 / ASG-051 — QR phone import + QR security`.
- Reason: device QA is unavailable in this chat environment; after Full Source Manager, `NEXT_ACTIONS.md` lists QR phone import as the next engineering focus.
- Inspected existing `main.js`; confirmed QR import was still a placeholder/demo screen.
- Added `qr-import.js` as a safe runtime layer.
- Added secure local QR/session import prototype:
  - one-time token;
  - 6-digit PIN;
  - 10-minute expiry;
  - `asgard://import?...` session URL preview;
  - paste/simulate phone payload area until real phone bridge/server is implemented;
  - payload preview before import;
  - TV confirmation before import;
  - sources TXT payload import into saved sources;
  - JSON and link payload preview-only states until schema/flow are finalized;
  - invalid/unsupported payload rejection;
  - no silent import.
- Loaded `qr-import.js` last in `index.html`, after older overlays, so it overrides the placeholder QR screen.
- Bumped Android version to `2.10.0 (40)` for the release trigger.
- Updated changelog and release status for 2.10.0.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/qr-import.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `25081bde8214767e799ddb49d31388ab4e302bf3` — `Add secure QR import session prototype`
- `6b1b5d5dad076fac4b2b40c4cd9c7f1a836be7bf` — `Load QR import runtime layer last`
- `63e2e6a9654cdd3f3b7bb85ab93574e79bdeaba4` — `Bump version for QR import release`
- `e05f664e1d8eb3a329a0e8b763ae62182b5e8a1f` — `Update changelog for 2.10.0 QR import`
- `e94033aeff755832aae9a14a34c54a54ee4c0572` — `Update release status for 2.10.0 QR import`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.0`
- versionCode: `40`
- expected tag: `v2.10.0`
- expected release: `Asgard TV v2.10.0`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- QR import is code-wired but not runtime-verified on Android TV.
- The QR feature is currently a local/offline prototype with paste/simulated phone payload; real phone web bridge/server is not implemented yet.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.10.0`.
2. Verify GitHub Releases contains `Asgard TV v2.10.0`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate QR import with D-pad.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for `2.10.0`.

Minimum QR import test scope:

- Open QR import screen.
- Confirm QR import screen is not old placeholder.
- Create QR session.
- Confirm PIN and expiry are visible.
- Confirm session URL preview is visible.
- Paste valid sources.txt row.
- Preview payload.
- Confirm import on TV.
- Verify imported source appears in Source Manager.
- Verify expired session blocks import.
- Verify invalid payload is rejected.
- Confirm D-pad focus works on buttons and textarea.

Engineer if device QA is unavailable:

Continue with the next engineering backlog item after QR import prototype:

1. Diagnostics expansion (`ASG-090`).
2. First launch onboarding (`ASG-005`).
3. AI provider settings (`ASG-064`) only after core playback/search/source manager is stable.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- QR import needs runtime validation with remote/D-pad.
- Real phone web bridge/server is not implemented yet; current QR import is local prototype with paste/simulated payload.
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
