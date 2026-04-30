# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer

## Required Files Read

Read and used for this session:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/CHAT_PROTOCOL.md`
5. `docs/project/HANDOFF.md`
6. `docs/project/DECISIONS.md`
7. `docs/project/NEXT_ACTIONS.md`
8. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
9. `docs/qa/QA_STATUS.md`

Important note: `docs/product/backlog.json` was returned truncated by the GitHub connector during this session. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Performed required project-memory read for the Engineer role.
- Confirmed formal backlog source of truth remains `docs/product/backlog.json`.
- Confirmed safe status guidance is `docs/product/backlog-prioritized-status-2026-04-30.json` because `backlog.json` may be truncated by the GitHub connector.
- Rechecked current Android/web runtime architecture from repository files.
- Confirmed `index.html` loads multiple runtime patch layers after the base scripts, including:
  - `nav.js`
  - `content-fix.js`
  - `source-search.js`
  - `source-diagnostics.js`
  - `parser-settings.js`
  - `updates-ui.js`
  - `qa-stabilization.js`
  - `qa-stabilization-fix.js`
- Confirmed current Android app version from `android/app/build.gradle.kts` is `versionName = "2.9.4"`, `versionCode = 34`.
- Confirmed current HEAD inspected in this session: `774c234c317b8a698a152c67eb547dad0866688b` (`Bump Asgard TV version to 2.9.4`).
- No application code was changed in this session.
- No backlog status was changed in this session.

## Files Changed

- `docs/project/HANDOFF.md`

## Current Product Status

Early alpha / working prototype.

Important current facts from project docs and repository inspection:

- QA smoke test is still not completed in repository evidence.
- Stable release is not ready.
- Highest priority remains Android TV APK build/install smoke test.
- Physical Android TV / Mi Box S validation is still not evidenced in repository.
- Media/source features must remain user-provided and legal-source only.
- `input.js` by itself only refreshes focusable elements and does not implement keydown handling, but later patch layers (`nav.js`, `qa-stabilization.js`, `qa-stabilization-fix.js`, and related scripts) must be considered when assessing runtime behavior because they are loaded after base scripts.
- `content-fix.js` patches the demo/open catalog and routes Watch actions to native `AsgardBridge.openPlayer()` when running inside Android APK.
- `source-search.js` patches Search to use parser/source-backed search and enabled user sources.
- `qa-stabilization.js` patches Sources preview/save behavior and adds demo/not-implemented markings for some mock screens.

## Current Highest Priority

1. `ASG-QA-001 — Run Android TV build/install smoke test`.
2. Validate remote navigation on Android TV emulator or Mi Box S.
3. Validate native ExoPlayer playback with demo video.
4. Validate Search and Sources flows after the current runtime patch layers.
5. Then continue user-provided media metadata/playback handoff flow.

## Next Recommended Task

QA / Engineer:

Run a real build/install smoke test for the latest APK (`versionName 2.9.4`, `versionCode 34`) and update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED per area.

Minimum test scope:

- APK builds.
- APK installs.
- App launches.
- App opens without internet.
- D-pad focus works at runtime with all patch scripts loaded.
- Enter activates focused item.
- Back behavior works.
- Home opens.
- Search opens and shows results/summary.
- Sources preview/save works.
- Details opens.
- Watch opens native ExoPlayer.
- Play/pause/seek work.
- Update screen opens.
- App survives 15 minutes use.

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- No repository evidence yet of completed Android TV / Mi Box S physical QA.
- GitHub combined status/workflow lookup for current HEAD returned no visible statuses/runs in this session; verify build result in GitHub Actions UI.
- Do not mark any backlog item DONE until acceptance criteria and Definition of Done are verified.
- Do not add bundled prohibited catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or silent APK installation.

## Notes for Next Chat

Before doing implementation or QA work, read:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/CHAT_PROTOCOL.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/HANDOFF.md`
8. The relevant role prompt under `docs/prompts/`

Do not use `docs/BACKLOG.md`.

When reviewing UI/runtime behavior, do not judge only `main.js` or `input.js` in isolation. `index.html` loads later patch scripts that override or extend base behavior.
