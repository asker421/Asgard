# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Product Owner / Backlog coordination

## Mandatory Pre-flight Refreshed

Refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/HANDOFF.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

- Updated `docs/product/backlog-v2.json` statuses and remaining work.
- Kept main product focus unchanged:

```text
Search movie → find user-configured torrent/media result → select playable video → launch in ExoPlayer
```

- Added explicit `mvp_status: NOT_READY_YET`.
- Added `mvp_remaining_summary` so every chat sees what remains before working MVP.
- Updated `ASG-QA-001` from `TODO` to `QA_IN_PROGRESS` because emulator smoke workflow exists and has multiple workflow patches applied.
- Updated `ASG-092` from `TODO` to `QA_IN_PROGRESS` for the same smoke/validation effort.
- Updated `ASG-006` from `IN_PROGRESS` to `CODE_REVIEW` because global state runtime was implemented, but still needs Android TV runtime QA.
- Updated `ASG-042` from `IN_PROGRESS` to `CODE_REVIEW` because Continue Watching shelf/Resume/Start over was implemented in prior handoff, but still needs runtime QA.
- Did not mark any task DONE.
- Did not modify app code.
- Did not use old `docs/product/backlog.json`.

## Files Changed

- `docs/product/backlog-v2.json`
- `docs/project/HANDOFF.md`

## Recent Commits

- `d8a867a4f33ab0d5eae59c53c875484a069dd537` — `Update backlog statuses and remaining MVP work`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

## What Remains Before Working MVP

1. Verify Android emulator smoke workflow after latest shell compatibility fix.
2. Implement search by movie title against user-configured parser/source.
3. Show normalized torrent/media search results.
4. Convert selected result into playable media task.
5. Load real metadata/files from configured service where applicable.
6. Open selected stream URL in ExoPlayer.
7. Validate on Android TV / Mi Box S or emulator.

## Current Highest Priority

1. `ASG-QA-001` — Verify Android TV build/install smoke test result.
2. `ASG-TOR-SEARCH-001` — Torrent/media search from movie title.
3. `ASG-TOR-SEARCH-002` — Search result to playable media task.
4. `ASG-TOR-005` — Player integration and seeking.
5. `ASG-TOR-003` — Metadata and file selection.
6. `ASG-012` — Unified search results and normalization.

## Updated Status Snapshot

- `ASG-QA-001` → `QA_IN_PROGRESS`
- `ASG-092` → `QA_IN_PROGRESS`
- `ASG-006` → `CODE_REVIEW`
- `ASG-042` → `CODE_REVIEW`
- `ASG-TOR-SEARCH-001` → `TODO`
- `ASG-TOR-SEARCH-002` → `TODO`
- `ASG-TOR-005` → `IN_PROGRESS`
- `ASG-TOR-003` → `IN_PROGRESS`
- `ASG-012` → `IN_PROGRESS`

## Next Recommended Task

QA:

Verify latest Android Emulator Smoke Test run after workflow patch commit `8acb559f228ccf126570bbb0e3eaeb4eefee1fac`.

Engineer:

Implement `ASG-TOR-SEARCH-001`.

Expected result:

- Search screen sends movie title to configured source/parser.
- Results are normalized as torrent/media results.
- Result card shows source, type, quality, size, seeds/peers where available.
- No configured source shows setup error.
- No results shows empty state.
- Broken source shows readable error.

Then implement `ASG-TOR-SEARCH-002`:

- Selected result becomes playable media task.
- Metadata loading starts when applicable.
- Flow can continue to `ASG-TOR-005` player launch.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- GitHub connector did not expose latest Actions run.
- Search-to-player flow depends on user-configured source/parser/service.
- Product must not depend on bundled catalogs.
- Do not mark tasks DONE without QA evidence.

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
