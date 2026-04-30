# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

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
9. `docs/prompts/QA_CHAT_PROMPT.md`
10. `docs/prompts/PO_CHAT_PROMPT.md`
11. `docs/prompts/UX_UI_CHAT_PROMPT.md`
12. `docs/qa/QA_STATUS.md`
13. `docs/release/RELEASE_STATUS.md`
14. `.github/workflows/build-apk-final.yml`
15. `.github/workflows/release-apk.yml`
16. `android/app/build.gradle.kts`
17. `android/app/src/main/assets/web/sources.js`
18. `android/app/src/main/assets/web/source-search-hardening.js`
19. `android/app/src/main/assets/web/index.html`
20. `android/app/src/main/assets/web/content-fix.js`
21. `docs/release/CHANGELOG.md`

Important note: `docs/product/backlog.json` may be truncated by the GitHub connector. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Continued engineering work after user said to act.
- Took next engineering backlog item after Continue Watching: Harden source-backed search.
- Inspected existing `sources.js` and found working base source search with areas to harden.
- Added `source-search-hardening.js` as a late-safe runtime patch.
- Added the hardening script to `index.html` load order after `sources.js`.
- Hardened HTML parsing against invalid URLs.
- Added result dedupe by URL / magnet / title key.
- Added result ranking by playable type, query match, quality, size, seeders and source priority.
- Added grouping by classification: playable, torrent, magnet, link and not playable.
- Added expanded summary counters for errors, empty sources and source count.
- Changed source querying flow to collect source reports sequentially so a single broken source does not hide all other source results.
- Bumped Android version to `2.9.8 (38)` for the next release trigger.
- Updated changelog and release status for 2.9.8.
- Did not mark any backlog item DONE.
- Did not overwrite `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/source-search-hardening.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `78da2b368bc96b704ec455728a05f673c3d6b65e` — `Harden source-backed search runtime`
- `816d97527984d4ca1229614516767c06c1eb5f61` — `Load source search hardening script`
- `c4d26e1ad1f0bc5ccfe3550df81c34659ce4e65a` — `Bump version for hardened source search release`
- `53c8165a0ac965107c27c70a806202ad30297aaf` — `Update changelog for 2.9.8 hardened search`
- `82d0e087343a4424206cc4dd3b15d18ee539b6cb` — `Update release status for 2.9.8 hardened search`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.9.8`
- versionCode: `38`
- expected tag: `v2.9.8`
- expected release: `Asgard TV v2.9.8`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Source-backed search hardening is code-wired but not runtime-verified with real user sources.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` run for `2.9.8`.
2. Verify GitHub Releases contains `Asgard TV v2.9.8`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install on Android TV emulator or Mi Box S.
5. Add one valid direct video source and one broken source.
6. Search and verify results, dedupe, source errors and playable action.
7. Update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED.

## Next Recommended Task

Engineer if no device QA is available:

Continue with the next engineering backlog item after hardened source-backed search:

1. Full source manager.
2. QR phone import.
3. AI provider integration.

QA if device is available:

Run the 2.9.8 smoke test on Android TV emulator or Mi Box S.

Minimum test scope:

- APK installs.
- App launches.
- D-pad focus works.
- Search opens and returns demo result.
- Sources invalid row is blocked.
- Sources valid direct source saves.
- Search shows valid result and broken-source error.
- Duplicate results are not repeated.
- Playable result opens native player.
- App survives 15 minutes.

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Hardened source search needs runtime validation with valid, empty and broken sources.
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

When reviewing runtime behavior, inspect `index.html` load order and the late patch scripts, not only base `main.js`/`ui.js`.
