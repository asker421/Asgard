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

- Continued engineering work after user asked to check the next priority task and implement it.
- Completed mandatory pre-flight before starting the task.
- Fresh `backlog-v2.json` showed changed product focus:
  - `Search movie -> find user-configured torrent/media result -> select playable video -> launch in ExoPlayer`.
- Selected task: `ASG-TOR-SEARCH-001 — Torrent/media search from movie title`.
- Reason: it is the first item in `current_next_tasks` and is marked Critical.
- Inspected existing `source-search.js` and `qa-stabilization-fix.js`.
- Added `media-search.js` as the final runtime layer for the Search screen.
- Implemented media search path:
  - Search screen focused on movie title/query;
  - uses enabled user-configured sources/parsers through `AsSources.searchContent(query)`;
  - normalizes results into playable, torrent, magnet and link groups;
  - ranks results by playable type, quality, seeders and source rank;
  - shows summary counters: total, playable, torrent, magnet, links, errors, source count;
  - shows legal-safe notice: user-configured sources only, no bundled prohibited catalogs;
  - direct playable result action opens native ExoPlayer;
  - torrent/magnet result actions create media task or route to configured service -> ExoPlayer;
  - detail page gets `Find media sources` action;
  - per-result diagnostics added.
- Loaded `media-search.js` last in `index.html`, after all runtime overlays, so it becomes active Search screen.
- Bumped Android version to `2.10.4 (44)` for the release trigger.
- Updated changelog and release status for 2.10.4.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/media-search.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `34d637b524173047835ead78aed31d4bc7c61de8` — `Implement media search from movie title`
- `6d566dadca39e2d428dcdb1170202211563c5ace` — `Load media search runtime last`
- `10467f9150aeec59f2a0807293a1e025a7054436` — `Bump version for media search release`
- `c7886d755e65846c16f28160c573fbc1618c11c7` — `Update changelog for 2.10.4 media search`
- `8a7b517f6899495d3ae9f37db71aed819967247d` — `Update release status for 2.10.4 media search`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.4`
- versionCode: `44`
- expected tag: `v2.10.4`
- expected release: `Asgard TV v2.10.4`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Media search is code-wired but not runtime-verified with real user-configured source/parser/service.

## Current Highest Priority

1. `ASG-TOR-SEARCH-002` — Search result to playable media task.
2. `ASG-TOR-005` — Player integration and seeking.
3. `ASG-TOR-003` — Metadata and file selection.
4. `ASG-QA-001` — Android TV build/install smoke test.
5. Runtime QA for `ASG-TOR-SEARCH-001`.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-SEARCH-002` next.

Expected direction:

- Convert selected media search result into a persistent media task.
- Route magnet/link/file result to configured service/adapter where applicable.
- Show metadata loading/error state.
- Persist task state and selected result diagnostics.
- Continue to `ASG-TOR-005` for ExoPlayer launch and seeking behavior.

QA:

Run Android TV smoke test for `2.10.4`.

Minimum media search QA scope:

- Open Search.
- Confirm new Media Search screen is visible.
- Search with no configured source and confirm understandable empty/setup state.
- Add valid user source/parser.
- Search a movie title.
- Confirm grouped results appear.
- Confirm direct playable result opens native ExoPlayer.
- Confirm torrent/magnet result requires rights confirmation.
- Confirm Create media task works.
- Confirm configured service -> ExoPlayer works or fails with understandable error.
- Confirm D-pad focus works on result cards/actions.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Media search depends on user-configured source/parser/service.
- `ASG-TOR-SEARCH-002` still needs stronger task creation/metadata state wiring.
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
