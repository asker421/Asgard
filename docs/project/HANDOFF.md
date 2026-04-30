# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Release / QA coordination

## Mandatory Pre-flight Refreshed

For the latest engineering task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/product/backlog-v2.json`
2. `docs/project/PROJECT_STATE.md`
3. `docs/project/HANDOFF.md`
4. `docs/project/DECISIONS.md`
5. `docs/project/NEXT_ACTIONS.md`
6. `docs/project/BACKLOG_V2_MIGRATION.md`
7. `docs/prompts/ENGINEER_CHAT_PROMPT.md`

Active backlog for current and future chats:

`docs/product/backlog-v2.json`

The old `docs/product/backlog.json` is historical/large and may be truncated by the connector. Do not use it as active backlog.

## Work Completed

- Continued engineering work after user asked for the next item.
- Completed mandatory pre-flight before starting the task.
- Selected task: `ASG-005 — First launch onboarding`.
- Reason: device QA is unavailable in this chat environment; after Diagnostics expansion, handoff listed First launch onboarding as the next engineering item.
- Inspected existing `main.js`; confirmed app starts directly on Home and onboarding did not exist.
- Added `onboarding.js` as the final runtime layer.
- Added TV-first first launch onboarding flow:
  - six onboarding steps;
  - explains Asgard TV, Sources, native ExoPlayer, QR import, Experimental screens and starting points;
  - Back / Next step navigation;
  - Skip action;
  - completion flag in localStorage;
  - Settings card to reopen onboarding;
  - first Home render interception when onboarding is not completed.
- Loaded `onboarding.js` last in `index.html`, after all runtime overlays, so it can intercept first Home render.
- Bumped Android version to `2.10.2 (42)` for the release trigger.
- Updated changelog and release status for 2.10.2.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

## Files Changed

- `android/app/src/main/assets/web/onboarding.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `204e48053499b2b40cf9ee0e9113d3e3512525da` — `Add first launch onboarding flow`
- `c249740718729a7beefd7ab1eb8b03ba7a33d4ca` — `Load onboarding runtime layer last`
- version bump commit for `2.10.2 (42)` was created after `build.gradle.kts` update; verify exact SHA through commit history if needed.
- changelog update commit for `2.10.2` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `12a04090a73fe81584d16c1d4a5915467ca3997f` — `Update release status for 2.10.2 onboarding`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.2`
- versionCode: `42`
- expected tag: `v2.10.2`
- expected release: `Asgard TV v2.10.2`
- expected APK asset: `asgard-tv-release.apk`

Current verification status:

- Release should be triggered by push to `main`.
- GitHub connector does not expose direct `workflow_dispatch` and did not confirm live workflow completion.
- Release APK availability must still be verified in GitHub Actions / Releases before claiming success.
- No Android TV / Mi Box S runtime QA has been completed in this session.
- First launch onboarding is code-wired but not runtime-verified on Android TV.

## Current Highest Priority

1. Verify GitHub Actions `Release APK` or `Build APK` run for `2.10.2`.
2. Verify GitHub Releases contains `Asgard TV v2.10.2`.
3. Verify release asset `asgard-tv-release.apk` exists and downloads.
4. Install APK on Android TV emulator or Mi Box S.
5. Run physical smoke test and update `docs/qa/QA_STATUS.md`.
6. Specifically validate first launch onboarding with D-pad.

## Next Recommended Task

QA / Engineer:

Run the real Android TV smoke test for `2.10.2`.

Minimum Onboarding test scope:

- Fresh install or clear app data.
- Confirm onboarding appears before Home.
- Navigate all steps with D-pad.
- Confirm Back / Next work.
- Confirm Skip goes to Home.
- Confirm completion persists across restart.
- Confirm Settings → Reopen onboarding works.
- Confirm D-pad focus works on onboarding buttons.

Engineer if device QA is unavailable:

Continue with the next engineering backlog item after First launch onboarding:

1. Global loading/empty/error/retry states (`ASG-006`).
2. AI provider settings (`ASG-064`) only after core playback/search/source manager is stable.
3. Privacy and secure API key storage (`ASG-082`) before real AI/API features.

## Blockers / Risks

- GitHub connector did not confirm latest workflow result.
- No evidence yet of completed Android TV / Mi Box S physical QA.
- Onboarding needs runtime validation with fresh app data and remote/D-pad.
- Onboarding uses localStorage completion flag; Android WebView persistence must be verified.
- Do not mark any backlog item DONE until acceptance criteria and Definition of Done are verified.
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

When reviewing runtime behavior, inspect `index.html` load order and the late patch scripts, not only base `main.js`/`ui.js`.
