# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Product Owner / UX/UI coordination

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

Important note: `docs/product/backlog.json` may be truncated by the GitHub connector. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Continued from project protocol after user asked to work further.
- Checked latest visible commit history through GitHub connector.
- Confirmed recent visible Android version from `android/app/build.gradle.kts` is `2.9.4 (34)`.
- Inspected `Build APK` workflow and confirmed it is configured for `push` to `main` and `workflow_dispatch`.
- Inspected `Release APK` workflow and confirmed it is configured for `push` to `main`, `v*` tags and `workflow_dispatch`.
- Confirmed release workflow reads `versionName/versionCode` from `android/app/build.gradle.kts`, builds debug APK and uploads it as `asgard-tv-release.apk`.
- Attempted to fetch workflow runs for recent commits through the connector, but no workflow runs were returned.
- Updated QA status to reflect that full smoke QA is BLOCKED / NOT COMPLETED until actual Actions result and Android TV device/emulator testing are available.
- Updated release status to version `2.9.4` and clarified release verification is still blocked.
- Did not mark any backlog item DONE.
- Did not overwrite `docs/product/backlog.json`.

## Files Changed

- `docs/qa/QA_STATUS.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Current Product Status

Early alpha / working prototype.

Current verification status:

- Repository workflow definitions exist.
- Latest Android build configuration says `2.9.4 (34)`.
- Latest GitHub Actions run result was not available through the connector.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Release APK availability for `2.9.4` must be checked directly in GitHub Actions / Releases before communicating it as available.

## Current Highest Priority

1. `ASG-QA-001 — Run Android TV build/install smoke test`.
2. Verify GitHub Actions build/release result for `2.9.4`.
3. Download APK artifact or release asset.
4. Install on Android TV emulator or Mi Box S.
5. Validate D-pad, Enter, Back, Home/Search/Sources/Details and Watch → native ExoPlayer.
6. Update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED per row.

## Next Recommended Task

QA / Release:

Check GitHub Actions and Releases directly in the repository UI.

Expected locations:

- GitHub → Actions → `Build APK` → latest run → artifact `asgard-tv-debug-apk`.
- GitHub → Actions → `Release APK` → latest run.
- GitHub → Releases → latest release → `asgard-tv-release.apk`.

If no workflow ran after latest commits, manually run `Build APK` and `Release APK` via `workflow_dispatch`.

Then run smoke test:

- APK builds.
- APK installs.
- App launches.
- App opens without internet.
- D-pad focus works.
- Enter activates focused item.
- Back behavior works.
- Home opens.
- Search opens and shows results/summary.
- Sources preview/save works.
- Details opens.
- Watch opens native ExoPlayer.
- Play/pause/seek work.
- Update screen opens.
- App survives 15 minutes.

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- GitHub connector did not return latest workflow run results for inspected commits.
- No evidence yet of completed Android TV / Mi Box S physical QA.
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
