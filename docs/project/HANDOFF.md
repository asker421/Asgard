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

### ASG-TOR-003 — Metadata and file selection

- Selected task: `ASG-TOR-003`.
- Reason: `ASG-TOR-005` was code-wired and the next MVP gap is configured service metadata/files → selected playable video → stream URL.
- Inspected:
  - `media-task.js`
  - `torrserver-adapter.js`
- Found current metadata/file logic existed but was mixed into base task UI and depended on service response shape.
- Added `metadata-files-v2.js` as a late runtime layer:
  - overrides `AsMediaTask.loadMetadata` and `AsMediaTask.selectFile`;
  - normalizes files from multiple common configured-service response shapes;
  - normalizes file index, name, path, size, extension and video/playable status;
  - auto-selects the largest playable video file when available;
  - persists `files`, `selectedFile`, `selectedFileIndex`, `taskHash`, service result and `streamUrl` where available;
  - shows readable states for service missing, no files, no playable video, file selected and stream ready;
  - adds `Metadata & file selection` panel to Media Task screen;
  - adds diagnostics for file count, playable count, selected file and stream readiness;
  - preserves legal-safe architecture: no bundled catalogs, no embedded source lists, no engines, no bypass features.
- Loaded `metadata-files-v2.js` after `media-task-creation-v2.js` and before `player-handoff-v2.js`.
- Bumped Android version to `2.10.19 (59)` for release trigger.
- Updated changelog and release status for `2.10.19`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA status preserved

- `ASG-QA-001` has CI emulator smoke PASS by user confirmation from prior work.
- Manual Android TV / Mi Box S QA is still not completed.
- `ASG-TOR-003` is code-wired only and requires runtime QA with a configured service.

## Files Changed

- `android/app/src/main/assets/web/metadata-files-v2.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- metadata files runtime commit was created after `metadata-files-v2.js` creation; verify exact SHA through commit history if needed.
- load commit was created after `index.html` update; verify exact SHA through commit history if needed.
- version bump commit was created after `android/app/build.gradle.kts` update; verify exact SHA through commit history if needed.
- changelog update commit was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `d8adb5562c5a13bd038f75ac5403d9ae0c2599c2` — `Update release status for 2.10.19 metadata files`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.19`
- versionCode: `59`
- expected tag: `v2.10.19`
- expected release: `Asgard TV v2.10.19`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / MANUAL_TV_QA_REQUIRED
```

What is now verified:

- CI emulator smoke workflow passed by user confirmation.
- APK build/install/launch/no-instant-crash gate is passed in CI emulator.

What is still not verified:

- Full remote D-pad focus traversal.
- Back behavior across all screens.
- Native ExoPlayer real playback quality on Android TV device.
- Configured source/parser/TorrServer flows.
- Metadata/file selection with a real configured service.
- QR import runtime flow.
- 15-minute manual stability.
- Mi Box S physical compatibility.

## Current Highest Priority

1. Verify release `v2.10.19` and `asgard-tv-release.apk` after Actions completes.
2. Runtime QA metadata/files:
   - configure service URL;
   - create metadata-pending media task;
   - load metadata;
   - confirm files appear;
   - confirm largest playable file is auto-selected;
   - confirm manual file selection persists;
   - confirm stream URL is ready where service supports it;
   - confirm no files / no playable / service missing states are readable.
3. Run manual Android TV / Mi Box S QA for Search → media task → metadata → player flow.

## Next Recommended Task

QA:

Run manual Android TV / Mi Box S smoke test and update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED rows.

Engineer if device QA remains unavailable:

Harden `ASG-TOR-004 — Streaming-first playback` around readiness/buffer states after metadata selection, or perform a release verification pass for `2.10.19`.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- Metadata/file selection is code-wired but not runtime-verified with a real configured service.
- Release APK availability must still be verified in GitHub Releases if distributing.
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
