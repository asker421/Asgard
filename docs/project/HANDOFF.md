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

### ASG-090 — Diagnostics screen

- Selected task: `ASG-090 — Diagnostics screen`.
- Reason: after QR import hardening, next recommended engineering task was unified troubleshooting visibility.
- Inspected `diagnostics-health.js`.
- Added `diagnostics-v2.js` as a late runtime layer:
  - overrides `AsApp.diagnostics()` with unified troubleshooting view;
  - adds Network section with browser online and nativeFetch availability;
  - adds Player section with openPlayer bridge availability, saved progress count and task count;
  - adds Cache / Storage section with local counters and device storage info where bridge supports it;
  - adds Permissions section with runtime-visible permission expectations;
  - adds Version / Release section with app version and expected release asset;
  - adds Source setup section with enabled/disabled/invalid source counts and parser/service status;
  - adds Warnings section with actionable static issues;
  - adds Copy JSON action;
  - links to Source diagnostics and Setup wizard;
  - no bundled catalogs, embedded source lists, engines, or bypass features added.
- Loaded `diagnostics-v2.js` last in `index.html`.
- Bumped Android version to `2.10.14 (54)` for release trigger.
- Updated changelog and release status for `2.10.14`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending.
- Android emulator smoke workflow has been patched and force-triggered in previous work, but connector did not expose a live pass/fail run.
- Manual GitHub Actions verification is still required before claiming runtime QA PASS.

## Files Changed

- `android/app/src/main/assets/web/diagnostics-v2.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- diagnostics v2 runtime commit was created after `diagnostics-v2.js` creation; verify exact SHA through commit history if needed.
- `5a67e458e176876e5093dd906105c1cf1e440fc6` — `Load diagnostics v2 runtime last`
- `51fec303c3c7d1954fbed0b6454621ead84656c7` — `Bump version for diagnostics v2 release`
- changelog update commit for `2.10.14` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `053981ff5e93aefa83d93fc234935b3cea081b9d` — `Update release status for 2.10.14 diagnostics v2`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.14`
- versionCode: `54`
- expected tag: `v2.10.14`
- expected release: `Asgard TV v2.10.14`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- Diagnostics v2 is code-wired.
- Runtime QA is not verified.
- Android emulator smoke workflow should still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA still not completed.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after latest workflow patches.
2. Verify release `v2.10.14` and asset `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Diagnostics:
   - Diagnostics screen opens;
   - Network / Player / Cache / Permissions / Version / Source setup sections render;
   - Copy JSON works or falls back to alert;
   - Source diagnostics link works;
   - Setup wizard link works;
   - D-pad focus works on diagnostics actions.
4. Continue physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and then test `2.10.14` Diagnostics flow.

Engineer if device QA remains unavailable:

Implement `ASG-101 — Simple installation and update guide`, because the product now has many release increments but still needs a non-programmer install/update/source/setup guide.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- Diagnostics v2 depends on runtime bridge method availability.
- Need runtime QA before marking `ASG-090` DONE.
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
