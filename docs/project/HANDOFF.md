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

### ASG-042 — Continue Watching runtime UX hardening

- Selected task: `ASG-042 — Continue Watching runtime UX hardening`.
- Reason: playback/progress foundation exists, but Home Continue Watching needed a stable TV-first runtime layer with Resume / Start over / Remove / diagnostics.
- Inspected:
  - `store.js`
  - `main.js`
  - `content-fix.js`
- Added `continue-watching.js` as a late runtime layer:
  - reads saved progress from `AsStore.progress()`;
  - filters incomplete items to 1–95% progress;
  - sorts by `updatedAt` descending;
  - maps saved progress to open demo catalog metadata where possible;
  - replaces Home Continue Watching shelf with real saved progress items;
  - adds TV-friendly empty state when no saved progress exists;
  - adds Resume action from saved position;
  - adds Start over action from position `0`;
  - adds Remove action for individual progress items;
  - adds Info diagnostics action for saved progress item;
  - shows progress bar, percentage and timecode.
- Loaded `continue-watching.js` last in `index.html`.
- Bumped Android version to `2.10.12 (52)` for release trigger.
- Updated changelog and release status for `2.10.12`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending.
- Android emulator smoke workflow has been patched and force-triggered in previous work, but connector did not expose a live pass/fail run.
- Manual GitHub Actions verification is still required before claiming runtime QA PASS.

## Files Changed

- `android/app/src/main/assets/web/continue-watching.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `e85aee0ca3a61dc0285f4697b4bb42cb4b9790cb` — `Add Continue Watching runtime UX layer`
- `8d5ded625863c134010758011c6ea63fb30c1518` — `Load Continue Watching runtime last`
- `4fb868480a0d54ad06c7c5ff2883648f0ced8c34` — `Bump version for Continue Watching release`
- changelog update commit for `2.10.12` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `e04687068849bab7d8bfb75d52be6a070b8c7030` — `Update release status for 2.10.12 Continue Watching`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.12`
- versionCode: `52`
- expected tag: `v2.10.12`
- expected release: `Asgard TV v2.10.12`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- Continue Watching runtime is code-wired.
- Runtime QA is not verified.
- Android emulator smoke workflow should still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA still not completed.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after latest workflow patches.
2. Verify release `v2.10.12` and asset `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Home → Continue Watching:
   - empty state appears when no progress;
   - progress item appears after player saves progress;
   - Resume opens native player from saved position;
   - Start over opens native player from zero;
   - Remove deletes only selected progress item;
   - D-pad focus works on all actions.
4. Continue physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and then test `2.10.12` Continue Watching flow.

Engineer if device QA remains unavailable:

Implement `ASG-050 — QR import from phone` only as a safe local/user-confirmed import flow, or improve `ASG-090 — Diagnostics screen` if QA needs better troubleshooting visibility.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- Continue Watching depends on native player progress save format and runtime bridge behavior.
- Need runtime QA before marking `ASG-042` DONE.
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
