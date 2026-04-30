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

### ASG-050 — QR import from phone

- Selected task: `ASG-050 — QR import from phone`.
- Reason: after Continue Watching runtime UX, the next backlog item is QR phone import with safe local/user-confirmed flow.
- Inspected `qr-import.js`.
- Hardened QR import confirmation flow:
  - one-time token / 6-digit PIN / 10-minute expiry preserved;
  - Confirm import now requires entering active TV PIN;
  - wrong PIN blocks import;
  - sources.txt payload still previews and imports only after TV confirmation;
  - HTTP(S) links import only as disabled user source rows;
  - imported link rows are disabled by default until user reviews and enables them in Source Manager;
  - JSON wrapper supports `sources_txt` and `link` payload preview/handling;
  - unsupported or sensitive payload types remain preview-only;
  - session is consumed only after successful import;
  - no silent import, no silent APK install, no bundled catalogs, no embedded source lists, no bypass features.
- Bumped Android version to `2.10.13 (53)` for release trigger.
- Updated changelog and release status for `2.10.13`.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending.
- Android emulator smoke workflow has been patched and force-triggered in previous work, but connector did not expose a live pass/fail run.
- Manual GitHub Actions verification is still required before claiming runtime QA PASS.

## Files Changed

- `android/app/src/main/assets/web/qr-import.js`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- QR import hardening commit was created after `qr-import.js` update; verify exact SHA through commit history if needed.
- `c6ad37baae3362ea9105ed82d9070df347bb8d08` — `Bump version for QR import release`
- changelog update commit for `2.10.13` was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `aa8b225bae3d912ad739d97ee6dc117ebdcb3841` — `Update release status for 2.10.13 QR import`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

Current release expectation:

- versionName: `2.10.13`
- versionCode: `53`
- expected tag: `v2.10.13`
- expected release: `Asgard TV v2.10.13`
- expected APK asset: `asgard-tv-release.apk`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / WORKFLOW_PATCHED / RUN_REQUIRED_OR_VERIFY_MANUALLY
```

Current verification status:

- QR import hardening is code-wired.
- Runtime QA is not verified.
- Android emulator smoke workflow should still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA still not completed.

## Current Highest Priority

1. Manually verify GitHub Actions → `Android Emulator Smoke Test` after latest workflow patches.
2. Verify release `v2.10.13` and asset `asgard-tv-release.apk` after Actions completes.
3. Runtime QA QR import:
   - create QR session;
   - preview sources.txt payload;
   - wrong PIN blocks import;
   - correct PIN imports valid sources;
   - HTTP(S) link imports as disabled source only;
   - unsupported payloads remain preview-only;
   - D-pad focus works on QR actions.
4. Continue physical Android TV / Mi Box S QA.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and then test `2.10.13` QR import flow.

Engineer if device QA remains unavailable:

Implement `ASG-090 — Diagnostics screen` to consolidate internet/player/cache/permissions/version diagnostics for troubleshooting.

## Blockers / Risks

- GitHub connector did not expose latest workflow run.
- Physical Android TV / Mi Box S QA still not completed.
- QR import still simulates phone transfer by paste area; real local phone bridge/server is not implemented.
- Need runtime QA before marking `ASG-050` DONE.
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
