# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Mandatory Pre-flight Refreshed

For the latest QA request, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
8. `docs/qa/QA_STATUS.md`

Active backlog for current and future chats:

`docs/product/backlog-v2.json`

The old `docs/product/backlog.json` is historical/large and may be truncated by the connector. Do not use it as active backlog.

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
- Ran static repository QA / smoke-readiness inspection for `2.9.8 (38)` after user requested tests.
- Updated `docs/qa/QA_STATUS.md` with static QA results and physical QA TODO/BLOCKED rows.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Static QA Results Added

Static QA was repository-only. No Android TV emulator or Mi Box S was available inside this chat environment.

Summary:

- Build workflow and Gradle wrapper configuration: STATIC PASS / runtime run not visible through connector.
- Current version: `2.9.8 (38)` from `android/app/build.gradle.kts`.
- Web UI D-pad handling: STATIC PASS; `input.js` handles ArrowUp/Down/Left/Right, Enter/NumpadEnter, Backspace/Escape with visible focusable filtering and spatial movement via `getBoundingClientRect()`.
- Back behavior: STATIC PASS; `ui.js` defines `history`, `nav()`, `back()` and `window.asgardBack=function(){return AsUI.back()}`; `MainActivity` calls `window.asgardBack`.
- Home/open demo catalog: STATIC PASS.
- Watch → native ExoPlayer handoff: STATIC PASS / APK runtime QA needed.
- Native ExoPlayer implementation: STATIC PASS / device QA needed.
- Continue Watching: STATIC PASS / runtime QA needed.
- Search/source search hardening: STATIC PASS / runtime QA needed.
- Full physical Android TV QA remains BLOCKED / NOT COMPLETED.

## Files Changed

- `android/app/src/main/assets/web/source-search-hardening.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `78da2b368bc96b704ec455728a05f673c3d6b65e` — `Harden source-backed search runtime`
- `816d97527984d4ca1229614516767c06c1eb5f61` — `Load source search hardening script`
- `c4d26e1ad1f0bc5ccfe3550df81c34659ce4e65a` — `Bump version for hardened source search release`
- `53c8165a0ac965107c27c70a806202ad30297aaf` — `Update changelog for 2.9.8 hardened search`
- `82d0e087343a4424206cc4dd3b15d18ee539b6cb` — `Update release status for 2.9.8 hardened search`
- `ecdfb0d836950596b16b444560feae71092bd877` — `Update QA status for 2.9.8 static smoke run`
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

- Static repository QA is recorded in `docs/qa/QA_STATUS.md`.
- Full physical Android TV QA is still BLOCKED / not completed.
- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Source-backed search hardening is code-wired but not runtime-verified with real user sources.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.9.8`.
2. Verify GitHub Releases contains `Asgard TV v2.9.8`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate remote navigation, Back behavior, native ExoPlayer playback, Continue Watching and source-backed search.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for 2.9.8.

Minimum physical smoke test scope:

- APK builds in GitHub Actions.
- APK installs on Android TV emulator / Mi Box S.
- App launches.
- App opens without internet.
- D-pad arrows move focus.
- Enter activates focused item.
- Back works from Home/Search/Details/Sources/Settings/Player.
- Home opens.
- Search opens and shows results/summary.
- Sources preview/save works.
- Details opens.
- Watch opens native ExoPlayer.
- Play/pause/seek work.
- Progress saves after restart.
- Continue Watching appears.
- Resume works.
- Start over works.
- Update screen opens.
- App survives 15 minutes use.

Minimum source-search test scope:

- Add one valid direct video source.
- Add one broken/invalid source.
- Search and verify source result appears.
- Verify broken source error appears but does not break results.
- Verify duplicate results are not repeated.
- Verify playable direct result opens native player.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- No real TorrServer endpoint was tested in this chat environment.
- Hardened source search needs runtime validation with valid, empty and broken sources.
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
