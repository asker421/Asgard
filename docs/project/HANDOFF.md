# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Mandatory Pre-flight Refreshed

For the latest QA automation task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
8. `docs/qa/QA_STATUS.md`

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### Prior engineering work in current handoff lineage

- Selected task: `ASG-TOR-003 — Metadata and file selection`.
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

### QA automation work completed

- User asked whether app could be installed/tested on a cloud emulator.
- Added GitHub Actions workflow:

```text
.github/workflows/android-emulator-smoke.yml
```

- The workflow builds debug APK, starts Android emulator, installs APK, launches `com.asgard.tv`, captures activity/logcat/screenshot artifacts and fails on crash/ANR indicators.
- This is an automated install/launch/no-crash gate, not a full manual Android TV remote QA.
- Updated `docs/qa/QA_STATUS.md` to document the new emulator smoke workflow and its limitations.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/torrserver-adapter.js`
- `android/app/src/main/assets/web/media-task.js`
- `android/app/build.gradle.kts`
- `.github/workflows/android-emulator-smoke.yml`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `324f29bb5971a26683cbefcea66707617c05a851` — `Bump version for metadata selection release`
- `da25b82ea14b0aaa2cf58c5c82e5c468e0ba49c7` — `Update release status for 2.10.7 metadata selection`
- `66c8bf184026d1e7a5f3bb2854565eee1ccec460` — `Add Android emulator smoke test workflow`
- `bf559a257219a143d65b7bee77a59c65797c15e8` — `Document Android emulator smoke workflow`
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

- Automated emulator smoke workflow exists.
- Workflow run result is not yet confirmed in this chat.
- Release should be triggered by push to `main`.
- GitHub connector did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S manual runtime QA has been completed in this session.
- Metadata and file selection are code-wired but not runtime-verified with real configured service responses.

## Current Highest Priority

1. Open GitHub Actions and verify `Android Emulator Smoke Test` run result.
2. If it passes, download/check `android-emulator-smoke-artifacts`:
   - `activity.txt`
   - `logcat.txt`
   - `launch.png`
3. Update `docs/qa/QA_STATUS.md` with CI PASS/FAIL based on the actual run.
4. Continue physical Android TV/Mi Box S smoke test.
5. Runtime QA for `ASG-TOR-SEARCH-001`, `ASG-TOR-SEARCH-002`, `ASG-TOR-005`, and `ASG-TOR-003`.

## Next Recommended Task

QA:

Run / inspect `Android Emulator Smoke Test` for current main.

Minimum CI smoke expectations:

- APK builds.
- Emulator starts.
- APK installs.
- `com.asgard.tv` launches.
- `activity.txt` shows app activity/package.
- `logcat.txt` has no `FATAL EXCEPTION`, ANR or `Process: com.asgard.tv` crash.
- `launch.png` is captured.

Manual QA still required after CI smoke:

- D-pad focus traversal.
- Back behavior by screen.
- Search / media task / player handoff.
- Configured service metadata/files.
- ExoPlayer playback and progress.
- 15-minute stability.

Engineer if CI smoke fails:

- Inspect uploaded `logcat.txt` and `activity.txt`.
- Fix only the failing install/launch/crash area.
- Preserve package/applicationId and legal-safe source architecture.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- Emulator workflow might fail because Android emulator startup can be slow or because TV profile availability differs on GitHub runner.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Metadata/file selection depends on real user-configured service responses.
- Need runtime QA before marking `ASG-QA-001`, `ASG-TOR-003`, or player handoff tasks DONE.
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
