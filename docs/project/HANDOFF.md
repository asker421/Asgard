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

### ASG-TOR-SEARCH-001 — Torrent/media search from movie title

- Selected task: `ASG-TOR-SEARCH-001`.
- Reason: `NEXT_ACTIONS.md` defines the MVP path as Search movie → user-configured media result → file selection → ExoPlayer.
- Inspected:
  - `sources.js`
  - `media-search.js`
  - `search-normalization-v2.js`
- Found that `media-search.js` already called `AsSources.searchContent(query)`, but UX still looked like generic source search and did not clearly handle no configured source/parser state.
- Added `title-media-search.js` as a late runtime layer:
  - makes Search screen explicitly movie/series title based;
  - checks for enabled user-configured sources or parser URL before querying;
  - no configured source now shows setup actions instead of silent empty results;
  - result view shows source, type, rights status, quality, size, seed/peer data where available;
  - summary shows query, total, playable, torrent, magnet, link, errors and source count;
  - actions remain compatible with existing flow: Watch, Create media task, Prepare stream, Open link, Diagnostics;
  - preserves legal-safe architecture: no bundled catalogs, no embedded source lists, no engines, no bypass features.
- Loaded `title-media-search.js` after `search-normalization-v2.js` and before media task/readiness layers.
- Bumped Android version to `2.10.16 (56)` for release trigger.
- Updated changelog and release status for `2.10.16`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains QA_IN_PROGRESS / pending.
- Android emulator smoke workflow must still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA is still not completed.

## Files Changed

- `android/app/src/main/assets/web/title-media-search.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- title media search runtime commit was created after `title-media-search.js` creation; verify exact SHA through commit history if needed.
- `1f8cd6325fdef8ae509d820ea29e7598b66756c5` — `Load title media search runtime`
- version bump commit was created after `android/app/build.gradle.kts` update; verify exact SHA through commit history if needed.
- changelog update commit was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `519f3242c37a82a9c5f6a9291d6213c0ddf36537` — `Update release status for 2.10.16 title media search`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.16`
- versionCode: `56`
- expected tag: `v2.10.16`
- expected release: `Asgard TV v2.10.16`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

`ASG-QA-001` remains the main gate.

Manual GitHub Actions verification is still required because connector did not expose reliable live Actions status.

## Current Highest Priority

1. Verify latest Android Emulator Smoke Test run in GitHub Actions.
2. Verify release `v2.10.16` and `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Search screen:
   - no configured source shows setup state;
   - configured safe demo source returns playable result;
   - configured parser/source returns normalized media result;
   - summary counters are understandable;
   - result actions still work.
4. Continue MVP flow: selected result → media task.

## Next Recommended Task

Engineer:

Implement `ASG-TOR-SEARCH-002 — Search result to playable media task`.

Expected result:

- selected normalized search result becomes persistent media task;
- direct playable URL creates stream-ready task;
- torrent/magnet/file result creates metadata-pending task;
- user confirmation is required for torrent/magnet-like result;
- task screen opens immediately after creation;
- failures show readable state.

QA:

Verify Android Emulator Smoke Test and `v2.10.16` release asset.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- GitHub connector did not expose latest Actions run.
- Search result quality depends on user-configured sources/parsers.
- Release APK availability must still be verified in GitHub Releases.
- Do not mark tasks DONE without QA evidence.
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
