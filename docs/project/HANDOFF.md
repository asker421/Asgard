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

- Continued engineering work after user said to work.
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-030 — Manual source management`.
- Reason: device QA is unavailable in this chat environment; `NEXT_ACTIONS.md` lists Full source manager after hardened source-backed search.
- Inspected current `main.js` and `qa-stabilization.js`; confirmed old Sources runtime was still textarea-only.
- Added `source-manager.js` as the final runtime layer.
- Added Full Source Manager UI:
  - source cards;
  - status badges;
  - enable / disable;
  - priority increase/decrease;
  - add source form;
  - edit source form;
  - delete source with confirmation;
  - per-source test;
  - test enabled sources;
  - raw TXT editor fallback;
  - reset bundled/default sources;
  - validation before save.
- Added legal-safe notice to Source Manager.
- Loaded `source-manager.js` last in `index.html`, after all legacy overlays, so it overrides older textarea-only Sources screens.
- Bumped Android version to `2.9.9 (39)` for the release trigger.
- Updated changelog and release status for 2.9.9.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/source-manager.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `58985710e260cd224f45248ee024e7363f646338` — `Add full source manager UI`
- `72bc98dbc0b2577c28f10f3dbf1bc1d8e7807d76` — `Load full source manager last`
- version bump commit for `2.9.9 (39)` was created after `build.gradle.kts` update; verify exact SHA through commit history if needed.
- `773e0f0a6326e7c4522dd1abb4123de5b084cd0d` — `Update changelog for 2.9.9 source manager`
- `8ae3474c394a82cdddd6822654bf266014954d8d` — `Update release status for 2.9.9 source manager`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.9.9`
- versionCode: `39`
- expected tag: `v2.9.9`
- expected release: `Asgard TV v2.9.9`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Full Source Manager is code-wired but not runtime-verified on Android TV.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.9.9`.
2. Verify GitHub Releases contains `Asgard TV v2.9.9`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate Source Manager with D-pad.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for `2.9.9`.

Minimum Source Manager test scope:

- Open Sources screen.
- Confirm Source Manager, not old textarea-only screen, is visible.
- Add a valid direct video source.
- Add invalid source and confirm validation blocks it.
- Enable/disable a source.
- Change priority.
- Edit a source.
- Delete a source.
- Test one source.
- Test enabled sources.
- Open raw TXT editor.
- Confirm invalid raw TXT rows are blocked.
- Confirm D-pad focus works on cards, buttons, forms, selects and textareas.

Engineer if device QA is unavailable:

Continue with the next engineering backlog item after Full Source Manager:

1. QR phone import (`ASG-050` / `ASG-051`).
2. Diagnostics expansion (`ASG-090`).
3. AI provider settings (`ASG-064`) only after core playback/search/source manager is stable.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Full Source Manager needs runtime validation with remote/D-pad.
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
