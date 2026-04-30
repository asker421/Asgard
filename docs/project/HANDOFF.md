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

- Continued engineering work after user asked to continue.
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-006 — Global loading/empty/error/retry states`.
- Reason: device QA is unavailable in this chat environment; after First launch onboarding, handoff listed Global loading/empty/error/retry states as the next engineering item.
- Inspected current `style.css` and runtime layer structure.
- Added `states.js` as a global runtime state helper.
- Added shared TV-friendly state components:
  - loading;
  - empty;
  - error;
  - success;
  - retry/action buttons;
  - safe async wrapper.
- Patched Search flow to show loading, empty and error states.
- Patched Update check flow to show loading and error states.
- Patched Sources diagnostics area to show empty placeholder when no output exists.
- Loaded `states.js` last in `index.html`, after all runtime overlays, so it can patch final screen functions.
- Updated `style.css` with state-card styling and focus support.
- Bumped Android version to `2.10.3 (43)` for the release trigger.
- Updated changelog and release status for 2.10.3.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/states.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/src/main/assets/web/style.css`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `eaf368ca16491f360214ef3914f31bc90870711a` — `Add global state components runtime`
- `532dbadc300fcf99cb3b1b510ea151ca3f5b58a3` — `Load global states runtime last`
- style update commit for state cards was created after `style.css` update; verify exact SHA through commit history if needed.
- version bump commit for `2.10.3 (43)` was created after `build.gradle.kts` update; verify exact SHA through commit history if needed.
- `856783c65d9b94d00f1ef87ab746c088d2d156fc` — `Update changelog for 2.10.3 global states`
- `3062d446473072668862e94db400d85cb7bacb3c` — `Update release status for 2.10.3 global states`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.3`
- versionCode: `43`
- expected tag: `v2.10.3`
- expected release: `Asgard TV v2.10.3`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Global state components are code-wired but not runtime-verified on Android TV.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.10.3`.
2. Verify GitHub Releases contains `Asgard TV v2.10.3`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate global state components with D-pad.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for `2.10.3`.

Minimum Global States test scope:

- Search while sources are empty.
- Search with a broken source.
- Confirm loading state appears.
- Confirm empty state appears.
- Confirm error state appears.
- Confirm retry/action buttons focus and activate with D-pad.
- Check Updates with network unavailable or failing endpoint.
- Open Sources and confirm empty diagnostics placeholder.
- Confirm state cards are readable from TV distance.

Engineer if device QA is unavailable:

Continue with the next engineering backlog item after Global States:

1. AI provider settings (`ASG-064`) only after core playback/search/source manager is stable.
2. Privacy and secure API key storage (`ASG-082`) before real AI/API features.
3. Favorites / History full screens (`ASG-070`, `ASG-072`).

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Global state components need runtime validation with remote/D-pad.
- Some state patches depend on late runtime load order and must be checked in APK.
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
