# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Product Owner / Engineering coordination

## Mandatory Pre-flight Refreshed

Refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. `docs/prompts/PO_CHAT_PROMPT.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Product Decision

User changed the main product priority.

The fastest path to a working version is now:

**Search movie → find user-configured torrent/media result → select playable video file → launch in ExoPlayer.**

QA/build smoke test remains critical, but it should run in parallel or immediately after the MVP flow. It should not block engineering from completing the search-to-player path.

## Work Completed

- Updated `docs/product/backlog-v2.json` with new product focus.
- Added new high-priority tasks:
  - `ASG-TOR-SEARCH-001` — Torrent/media search from movie title.
  - `ASG-TOR-SEARCH-002` — Search result to playable media task.
- Reordered `current_next_tasks` so the first items are:
  1. `ASG-TOR-SEARCH-001`
  2. `ASG-TOR-SEARCH-002`
  3. `ASG-TOR-005`
  4. `ASG-TOR-003`
  5. `ASG-QA-001`
- Updated task priorities so AI, onboarding, watchlist, profiles and polish are deferred until after the working search-to-player MVP.
- Updated `docs/project/NEXT_ACTIONS.md` with the same MVP definition and engineering flow.
- Did not modify code.
- Did not use old `docs/product/backlog.json`.

## Files Changed

- `docs/product/backlog-v2.json`
- `docs/project/NEXT_ACTIONS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `65e32089b801f7bc32b89e2dca46d51ecbae28e6` — `Prioritize torrent search to player workflow`
- `900bbc330b7bad23f3c68339a5b40af4b3c4d92d` — `Prioritize torrent search to player path`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

The main MVP is not general polish anymore. The main MVP is a single working end-to-end user flow:

1. User searches a movie title.
2. App queries configured user source/parser.
3. App shows torrent/media results.
4. User selects a result.
5. App loads metadata/files or obtains stream URL.
6. User selects playable video file if needed.
7. App opens selected video in ExoPlayer.
8. Player starts playback or shows a clear failure reason.
9. App does not crash on no source, no result, metadata failure or player failure.

## Current Highest Priority

1. `ASG-TOR-SEARCH-001` — Torrent/media search from movie title.
2. `ASG-TOR-SEARCH-002` — Search result to playable media task.
3. `ASG-TOR-005` — Player integration and seeking.
4. `ASG-TOR-003` — Metadata and file selection.
5. `ASG-QA-001` — Android TV build/install smoke test.
6. `ASG-012` — Unified search results and normalization.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-SEARCH-001` first.

Expected engineering direction:

- Use existing Search screen/source-search foundation.
- Use user-configured source/parser only.
- Return normalized result objects containing as much as available: title, source, type, quality, size, seeds/peers, magnet/link/file URL.
- Add result actions that can hand off to `ASG-TOR-SEARCH-002`.
- If no source/parser is configured, show a clear setup error.
- If no results, show a clear empty state.

Then implement `ASG-TOR-SEARCH-002`:

- Convert selected result into a media task.
- Route magnet/link/file result to configured service/adapter where applicable.
- Show metadata loading/error state.
- Continue to `ASG-TOR-005` for ExoPlayer launch.

## QA Focus After Implementation

- Search with no configured source.
- Search with broken configured source.
- Search with configured source returning no results.
- Search with valid result.
- Select result.
- Metadata/file selection appears or stream URL is created.
- Launch player.
- Back behavior works.
- D-pad focus works across all result/action/error states.

## Blockers / Risks

- No physical Android TV / Mi Box S QA confirmed yet.
- Search-to-player flow depends on user-configured source/parser/service.
- Product must not depend on bundled catalogs.
- Error states are critical because many user sources/services may fail.
- Do not mark tasks DONE without QA.

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
