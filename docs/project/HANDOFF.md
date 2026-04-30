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
21. `docs/release/CHANGELOG.md`
22. `docs/qa/QA_STATIC_REVIEW_2_9_6.md`

Important note: `docs/product/backlog.json` may be truncated by the GitHub connector. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Continued engineering/release work.
- Previously added TorrServer helper path to prepare playable stream.
- Previously wired search and Torrent screen actions to configured-service handoff with rights confirmation.
- Bumped Android version to `2.9.6 (36)` for the next release trigger.
- Updated release status for 2.9.6.
- Added release changelog covering 2.9.4, 2.9.5 and 2.9.6.
- Updated release status to reference changelog and installation guide.
- Added static QA review for `2.9.6`.
- Did not mark any backlog item DONE.
- Did not overwrite `docs/product/backlog.json`.

## Files Changed

- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/qa/QA_STATIC_REVIEW_2_9_6.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `6f79c531597348d8962704f4d0b58a414b69bcdc` — `Bump version for release 2.9.6`
- `bcc6ef6ceb983db7fc23cba4dd570752e74ba8c4` — `Update release status for 2.9.6`
- `4ebbe10daf74641ac0e3c9c89d69948feb49495c` — `Add release changelog`
- `d2d1c11ac43be3e3a02155109e0fef026a6d25d1` — `Update release status with changelog reference`
- `fb86b0b0acaa5215fbf2dc72a99c81d337b30030` — `Add static QA review for 2.9.6`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.9.6`
- versionCode: `36`
- expected tag: `v2.9.6`
- expected release: `Asgard TV v2.9.6`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- Static QA review exists for 2.9.6 and says READY FOR PHYSICAL QA, not DONE.
- Changelog now exists, but release remains pre-release / early alpha until smoke QA passes.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` run for `2.9.6`.
2. Verify GitHub Releases contains `Asgard TV v2.9.6`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install on Android TV emulator or Mi Box S.
5. Run physical/runtime smoke test.
6. Update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED.

## Next Recommended Task

QA / Engineer:

Run the 2.9.6 smoke test on Android TV emulator or Mi Box S.

Minimum test scope:

- APK installs.
- App launches.
- D-pad focus works.
- Enter activates focused items.
- Back behavior works.
- Home Watch opens native player.
- Native player play/pause/seek works.
- Search opens and returns demo result.
- Sources invalid row is blocked.
- Sources valid row saves.
- Settings screens open.
- App survives 15 minutes.

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- No real configured external service endpoint was tested in this chat environment.
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
