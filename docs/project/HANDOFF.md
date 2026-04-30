# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Required Files Read

Read and used for this session:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/CHAT_PROTOCOL.md`
5. `docs/project/HANDOFF.md`
6. `docs/project/DECISIONS.md`
7. `docs/project/NEXT_ACTIONS.md`
8. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
9. `docs/prompts/QA_CHAT_PROMPT.md`
10. `docs/prompts/PO_CHAT_PROMPT.md`
11. `docs/prompts/UX_UI_CHAT_PROMPT.md`
12. `docs/qa/QA_STATUS.md`
13. `docs/release/RELEASE_STATUS.md`
14. `.github/workflows/build-apk-final.yml`
15. `.github/workflows/release-apk.yml`
16. `android/app/build.gradle.kts`
17. `android/app/src/main/assets/web/torrent.js`
18. `android/app/src/main/assets/web/torrserver-adapter.js`
19. `android/app/src/main/assets/web/stream.js`
20. `android/app/src/main/assets/web/qa-stabilization-fix.js`

Important note: `docs/product/backlog.json` may be truncated by the GitHub connector. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Continued engineering work from `NEXT_ACTIONS.md`: user-provided media metadata/playback handoff.
- Inspected current torrent/user-media files.
- Found that streaming UI previously stopped at placeholder buffering and blocked ExoPlayer until a real P2P engine.
- Preserved the legal-safe architecture: no bundled catalogs, no APK P2P engine, no bypasses.
- Added TorrServer helper path to prepare playable stream:
  - validate configured TorrServer URL;
  - add magnet/torrent URL to TorrServer;
  - fetch metadata/files;
  - select largest supported video file;
  - generate TorrServer stream URL;
  - hand off stream URL to native ExoPlayer.
- Wired search torrent/magnet results to `TorrServer → ExoPlayer` action with rights confirmation.
- Wired Torrent screen tasks to `TorrServer → ExoPlayer` action with rights confirmation.
- Bumped Android version to `2.9.5 (35)` for the new release scope.
- Updated release status for 2.9.5.
- Did not mark any backlog item DONE.
- Did not overwrite `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/torrserver-adapter.js`
- `android/app/src/main/assets/web/qa-stabilization-fix.js`
- `android/app/src/main/assets/web/stream.js`
- `android/app/build.gradle.kts`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Commits From This Session

- `c11df55bc9afd2c6d9492bd8f1526be9c42a94eb` — `Add TorrServer playable stream preparation`
- `4001a654540916b307d43d15da46a90fc5452834` — `Wire search torrent results to TorrServer ExoPlayer handoff`
- `df376cd8af449cb5c2c981da57a84d0a087142d1` — `Add TorrServer ExoPlayer handoff to Torrent screen`
- `21eec7a3d5c1e5892913e5389e16f03f566d8504` — `Bump version for TorrServer handoff release`
- `0b7eb2b68017e188c9b66d8a07331be8a23bc602` — `Update release status for 2.9.5 TorrServer handoff`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.9.5`
- versionCode: `35`
- expected tag: `v2.9.5`
- expected release: `Asgard TV v2.9.5`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- TorrServer handoff is code-wired but not verified against a real configured TorrServer.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` run for `2.9.5`.
2. Verify GitHub Releases contains `Asgard TV v2.9.5`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install on Android TV emulator or Mi Box S.
5. Configure TorrServer URL in Settings → Parser & TorrServer.
6. Test Search result `TorrServer → ExoPlayer` action with a lawful user-provided result.
7. Test Torrent screen `TorrServer → ExoPlayer` action with a lawful user-provided magnet/torrent task.
8. Update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED.

## Next Recommended Task

QA / Engineer:

Run the 2.9.5 smoke test with a real or test TorrServer.

Minimum added test scope for 2.9.5:

- TorrServer URL empty → understandable `torrserver_not_configured` error.
- TorrServer connection test works or fails gracefully.
- Torrent/magnet search result shows `TorrServer → ExoPlayer`.
- Rights confirmation appears before TorrServer handoff.
- TorrServer add failure shows understandable diagnostics.
- Metadata with no video file shows `no_playable_video_file`.
- Metadata with video file opens native ExoPlayer via stream URL.

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- No real TorrServer endpoint was tested in this chat environment.
- Do not mark any backlog item DONE until acceptance criteria and Definition of Done are verified.
- Do not add bundled prohibited catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or silent APK installation.

## Notes for Next Chat

Before doing implementation or QA work, read:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/CHAT_PROTOCOL.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/HANDOFF.md`
8. The relevant role prompt under `docs/prompts/`

Do not use `docs/BACKLOG.md`.

When reviewing runtime behavior, inspect `index.html` load order and the late patch scripts, not only base `main.js`/`ui.js`.
