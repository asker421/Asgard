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

### ASG-080 — Settings / source-service setup UX

- Selected task: `ASG-080 — Settings sections / source-service setup UX`.
- Reason: Search → Media Task flow is code-wired, but non-programmer setup of user-configured sources/services was still too technical.
- Inspected `parser-settings.js`.
- Added `setup-wizard.js` as a TV-friendly setup layer:
  - adds `Search setup wizard` card to Settings;
  - Step 1: overview of what Asgard needs;
  - Step 2: enabled sources overview and link to Source Manager;
  - Step 3: parser/service status and link to Parser & service settings;
  - Step 4: test setup summary;
  - direct actions to Source Manager, Parser & service and Search;
  - shows enabled sources count, parser URL status, service URL status and legal-safe notice;
  - no bundled catalogs, embedded source lists, engines, or bypass features added.
- Loaded `setup-wizard.js` after stream diagnostics runtime in `index.html`.
- Bumped Android version to `2.10.11 (51)` for release trigger.
- Updated changelog and release status for `2.10.11`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending.
- Android emulator smoke workflow has been patched and force-triggered in previous work, but connector did not expose a live pass/fail run.
- Manual GitHub Actions verification is still required before claiming runtime QA PASS.

## Files Changed

- `android/app/src/main/assets/web/setup-wizard.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- setup wizard runtime commit was created after `setup-wizard.js` creation; verify exact SHA through commit history if needed.
- `722e2864843424ca4d6e3e2006438588cd9570ca` — `Load setup wizard runtime`
- `e9e592d0550cc31d514e86ee8e7bf26d6b1d3104` — `Bump version for setup wizard release`
- changelog update commit for `2.10.11` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `acfb85660ee02413d308be16f131d6a72eafb394` — `Update release status for 2.10.11 setup wizard`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.11`
- versionCode: `51`
- expected tag: `v2.10.11`
- expected release: `Asgard TV v2.10.11`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- Setup wizard is code-wired.
- Runtime QA is not verified.
- Android emulator smoke workflow should still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA still not completed.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after latest workflow patches.
2. Verify release `v2.10.11` and asset `asgard-tv-release.apk` after Actions completes.
3. Runtime QA Settings → Search setup wizard:
   - card appears;
   - D-pad focus works;
   - Source Manager link works;
   - Parser/service link works;
   - Test setup renders status;
   - Open Search works.
4. Continue physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and then test `2.10.11` setup wizard flow.

Engineer if device QA remains unavailable:

Implement `ASG-042 — Continue Watching runtime UX hardening`, because playback/progress exists but resume/start-over UX still needs stable TV-first validation and polish.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- Setup wizard depends on runtime load order and existing Settings overrides.
- Need runtime QA before marking `ASG-080` DONE.
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
