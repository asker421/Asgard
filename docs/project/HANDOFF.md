# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

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

### ASG-012 — Unified search results and normalization hardening

- Selected task: `ASG-012 — Unified search results and normalization`.
- Reason: `ASG-QA-001` was triggered/patched but live workflow status was not available through connector, and previous handoff allowed continuing engineering work while QA gate remains pending.
- Inspected:
  - `source-search-hardening.js`
  - `media-search.js`
- Found search normalization duplicated across layers:
  - `source-search-hardening.js` ranked/classified source results;
  - `media-search.js` normalized again and could lose fields.
- Added `search-normalization-v2.js` as a late runtime layer:
  - unified result schema: title, description, sourceName, sourceType, sourcePriority, kind, classification, url, magnetUrl, torrentUrl, quality, sizeBytes, sizeLabel, seeders, peers, rightsStatus, requiresUserConfirmation, raw snapshot, score;
  - kind detection for direct playable, torrent file, magnet and link results;
  - quality detection from title/description/metadata;
  - size normalization and TV-readable size labels;
  - scoring by result type, title match, quality, size, seeders, peers and source priority;
  - dedupe by URL / magnet / torrent / title key;
  - grouped result sections for Search screen;
  - unified search summary counters;
  - diagnostics now include normalized fields plus raw result snapshot.
- Loaded `search-normalization-v2.js` after `media-search.js` and before media task/readiness/diagnostics layers.
- Bumped Android version to `2.10.10 (50)` for release trigger.
- Updated changelog and release status for `2.10.10`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending.
- Android emulator smoke workflow has been patched and force-triggered in previous work, but connector did not expose a live pass/fail run.
- Manual GitHub Actions verification is still required before claiming runtime QA PASS.

## Files Changed

- `android/app/src/main/assets/web/search-normalization-v2.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- search normalization runtime commit was created after `search-normalization-v2.js` creation; verify exact SHA through commit history if needed.
- `b1189e1dd95b5aaa8f17a11f621af1df3801bd77` — `Load search normalization v2`
- `6e9addfdf17a988d09370d8148f9b44f8c6c9068` — `Bump version for search normalization release`
- `8d88db76db15a5ff1690442c9b486e20b72b7244` — `Update changelog for 2.10.10 search normalization`
- `82e69c0387ce9d81da3ee918bcf7b5a454f24562` — `Update release status for 2.10.10 search normalization`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.10`
- versionCode: `50`
- expected tag: `v2.10.10`
- expected release: `Asgard TV v2.10.10`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- Search normalization v2 is code-wired.
- Runtime QA is not verified.
- Android emulator smoke workflow should still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA still not completed.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after the latest workflow patches.
2. Verify release `v2.10.10` and asset `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Search screen with user-configured sources:
   - unified summary counters;
   - grouping;
   - diagnostics;
   - Create media task still works;
   - direct playable still opens player;
   - no-result and error states remain readable.
4. Continue physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and then test `2.10.10` Search normalization flow.

Engineer if device QA remains unavailable:

Improve source setup UX under `ASG-080`, because main flow still depends on user-configured sources/services and may be too technical for non-programmer use.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- Search normalization v2 depends on runtime load order.
- Need runtime QA before marking `ASG-012` DONE.
- Do not mark `ASG-QA-001`, `ASG-001`, `ASG-002`, `ASG-040`, or media playback tasks DONE until CI/manual QA evidence exists.
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
