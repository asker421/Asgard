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

### Stream diagnostics work

- Continued engineering work after user said "Дальше".
- Selected task: `ASG-TOR-006 — Buffer, cache and diagnostics`.
- Reason: `ASG-TOR-004` was code-wired in `2.10.8`, and handoff listed buffer/cache/diagnostics as the next engineering item.
- Added `stream-diagnostics.js`:
  - installs after `streaming-readiness.js` / `media-task.js`;
  - adds local Stream diagnostics panel to Media Task screen;
  - reports task state, stream state, URL readiness, URL scheme, selected file, file count, native bridge availability, configured service status, saved progress, storage information and last player open result;
  - adds Copy JSON action;
  - adds Refresh diagnostics action;
  - adds Clear snapshot action;
  - diagnostics are local/task-based;
  - does not add embedded source lists, catalogs, engines, or bypass features.
- Loaded `stream-diagnostics.js` last in `index.html`.
- Bumped Android version to `2.10.9 (49)` for the release trigger.
- Updated changelog and release status for 2.10.9.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### Existing CI smoke note preserved

- Android emulator smoke workflow exists.
- Prior smoke failure was Gradle wrapper validation in `setup-gradle@v4`, before app build/install.
- Workflow was patched to remove the failing `setup-gradle@v4` step from emulator smoke.
- Latest CI run result is still not confirmed in this chat.

## Files Changed

- `android/app/src/main/assets/web/stream-diagnostics.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `6bce947e95a6fdf74b450ef712626a8e654db0a9` — `Add stream diagnostics runtime layer`
- stream diagnostics load commit was created after `index.html` update; verify exact SHA through commit history if needed.
- `f4dee1d7eab36f7f969ef02bf76e847fcb2f7322` — `Bump version for stream diagnostics release`
- `7e9c748fbe6b9a85af7997801ed7bad3918ad9c9` — `Update changelog for 2.10.9 stream diagnostics`
- `d0b1ac88c50c841620d162a02d1295a93f97c695` — `Update release status for 2.10.9 stream diagnostics`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.9`
- versionCode: `49`
- expected tag: `v2.10.9`
- expected release: `Asgard TV v2.10.9`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Stream diagnostics are code-wired but not runtime-verified.
- Android emulator smoke workflow should be rechecked after latest commits.

## Current Highest Priority

1. `ASG-QA-001` — Android TV build/install smoke test.
2. Verify `Android Emulator Smoke Test` run result after latest commits.
3. Runtime QA for the full title-search -> media task -> file selection -> readiness -> player path.
4. `ASG-042` — Continue Watching runtime QA.
5. `ASG-012` — Unified search results and normalization hardening if QA exposes result issues.

## Next Recommended Task

QA:

Run Android TV smoke test for `2.10.9`.

Minimum stream diagnostics QA scope:

- Create direct playable media task.
- Confirm Stream diagnostics panel renders.
- Confirm Copy JSON works or falls back to alert.
- Confirm Refresh updates after Prepare stream / Open stream.
- Confirm Clear snapshot works.
- Confirm storage info appears when Android bridge supports it.
- Confirm D-pad focus works on diagnostics buttons.

Engineer if device QA is unavailable:

Implement `ASG-012 — Unified search results and normalization hardening` next, or improve source setup UX under `ASG-080` if search setup is still too technical.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Diagnostics depend on runtime task state and Android bridge support for storage info.
- Need runtime QA before marking `ASG-TOR-006` DONE.
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
