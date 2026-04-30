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

- Continued engineering work after user said "Дальше".
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-TOR-003 — Metadata and file selection`.
- Reason: `ASG-TOR-005` was code-wired in `2.10.6`, and handoff / `NEXT_ACTIONS.md` list metadata/files as the next main flow step.
- Inspected `torrserver-adapter.js` and `media-task.js`.
- Hardened configured service metadata adapter:
  - normalizes more response shapes;
  - extracts hash/task id from add response and original result fields;
  - normalizes file index, name, path, size, extension and video detection;
  - distinguishes `no_files_returned` from `no_playable_video_file`;
  - returns selected file details where available.
- Hardened Media Task file-selection flow:
  - persists selected file object, not only selected index;
  - shows file summary: total / playable / other;
  - blocks non-playable file selection with clear task state;
  - stores `no_files_returned` and `no_playable_video_file` states;
  - metadata diagnostics now include file count, playable count and selected file;
  - player handoff remains routed through `AsMediaTask.openStream()`.
- Bumped Android version to `2.10.7 (47)` for the release trigger.
- Updated changelog and release status for 2.10.7.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/torrserver-adapter.js`
- `android/app/src/main/assets/web/media-task.js`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- configured service metadata normalization commit was created after `torrserver-adapter.js` update; verify exact SHA through commit history if needed.
- media task selected-file persistence commit was created after `media-task.js` update; verify exact SHA through commit history if needed.
- `324f29bb5971a26683cbefcea66707617c05a851` — `Bump version for metadata selection release`
- changelog update commit for `2.10.7` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `da25b82ea14b0aaa2cf58c5c82e5c468e0ba49c7` — `Update release status for 2.10.7 metadata selection`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.7`
- versionCode: `47`
- expected tag: `v2.10.7`
- expected release: `Asgard TV v2.10.7`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Metadata and file selection are code-wired but not runtime-verified with real configured service responses.

## Current Highest Priority

1. `ASG-QA-001` — Android TV build/install smoke test.
2. Runtime QA for `ASG-TOR-SEARCH-001`, `ASG-TOR-SEARCH-002`, `ASG-TOR-005`, and `ASG-TOR-003`.
3. `ASG-TOR-004` — Streaming-first playback.
4. `ASG-TOR-006` — Buffer, cache and diagnostics.

## Next Recommended Task

QA:

Run Android TV smoke test for `2.10.7`.

Minimum metadata/file-selection QA scope:

- Configure compatible user source/service.
- Search and create media task.
- Load metadata where service returns files.
- Confirm total/playable/other summary is accurate.
- Select playable file and confirm selected file persists.
- Try selecting non-playable file and confirm readable error state.
- Confirm no-files and no-playable states are readable.
- Confirm Open stream still uses selected playable stream path.
- Confirm D-pad focus works on file list and task actions.

Engineer if device QA is unavailable:

Implement `ASG-TOR-004 — Streaming-first playback` next.

Expected direction:

- Add clearer streaming readiness states before player launch.
- Add buffer/loading/no-peers/no-service states where applicable.
- Keep player handoff via `AsMediaTask.openStream()`.
- Avoid embedding prohibited catalogs or engines.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Metadata/file selection depends on real user-configured service responses.
- Need runtime QA before marking `ASG-TOR-003` DONE.
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
