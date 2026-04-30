# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Release / QA / Product coordination

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

- Continued release/demo-ready work after user asked to work further.
- Confirmed current Android build configuration is expected to be `2.9.4 (34)`.
- Confirmed Release APK workflow is designed to create/update `v2.9.4` and upload `asgard-tv-release.apk` when a push to `main` triggers it.
- Added a non-programmer APK installation guide.
- Updated release status to point to the installation guide.
- Did not mark any backlog item DONE.
- Did not overwrite `docs/product/backlog.json`.

## Files Changed

- `docs/release/INSTALLATION_GUIDE.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Commits From This Session

- `8b1b9d2609b5b8a9f8263c75157ca2cfcc8fbfe0` — `chore: trigger release 2.9.4`
- `d0b3d0b3bddc869b5efd5ce060617ea893f27026` — `Add APK installation guide`
- `34bc6cc309a73beeac56690449b64409a3593814` — `Update release status with installation guide`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.9.4`
- versionCode: `34`
- expected tag: `v2.9.4`
- expected release: `Asgard TV v2.9.4`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release trigger was pushed to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` run for latest release-trigger commit.
2. Verify GitHub Releases contains `Asgard TV v2.9.4`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install on Android TV emulator or Mi Box S.
5. Run smoke test and update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED.

## Next Recommended Task

QA / Release:

Check GitHub UI directly:

- GitHub → Actions → `Release APK` → latest run.
- GitHub → Releases → latest release.
- Expected release tag: `v2.9.4`.
- Expected asset: `asgard-tv-release.apk`.

Then follow:

```text
docs/release/INSTALLATION_GUIDE.md
```

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- GitHub connector did not confirm latest workflow result.
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
