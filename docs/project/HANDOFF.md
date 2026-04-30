# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Release / Engineer / QA coordination

## Mandatory Pre-flight Refreshed

For the latest release-documentation task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

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

### ASG-101 — Simple installation and update guide

- Selected task: `ASG-101 — Simple installation and update guide`.
- Reason: after Diagnostics v2, the product had many release increments and needed a non-programmer installation/update/source/setup guide before demo distribution.
- Inspected existing `docs/release/INSTALLATION_GUIDE.md`.
- Found it was still written for old expected release `v2.9.4 / versionCode 34`.
- Updated `docs/release/INSTALLATION_GUIDE.md` for current release track:
  - current expected release now points to `2.10.14 / 54` as the latest runtime feature baseline before the guide-only bump;
  - explains where to download `asgard-tv-release.apk` from GitHub Releases;
  - explains how to verify release tag, APK asset and release metadata;
  - includes install methods for USB, phone-to-TV transfer and ADB;
  - includes update failure recovery when debug APK signatures differ;
  - includes first-launch checklist;
  - includes setup flow through Settings → Search setup wizard → Sources → Parser/service → Search;
  - includes safe demo source row;
  - includes Continue Watching test;
  - includes QR import test;
  - includes Diagnostics test;
  - includes minimum smoke test checklist;
  - includes bug report template and quick recovery checklist.
- Bumped Android version to `2.10.15 (55)` for guide-only release trigger.
- Updated changelog and release status for `2.10.15`.
- Did not modify app runtime code.
- Did not mark any backlog item DONE.
- Did not overwrite old `docs/product/backlog.json`.

### QA gate status preserved

- `ASG-QA-001` remains pending / QA_IN_PROGRESS depending on latest backlog status.
- Android emulator smoke workflow must still be verified in GitHub Actions.
- Physical Android TV / Mi Box S QA is still not completed.

## Files Changed

- `docs/release/INSTALLATION_GUIDE.md`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- installation guide update commit was created after `INSTALLATION_GUIDE.md` update; verify exact SHA through commit history if needed.
- version bump commit was created after `android/app/build.gradle.kts` update; verify exact SHA through commit history if needed.
- changelog update commit was created after `CHANGELOG.md` update; verify exact SHA through commit history if needed.
- `6a9f55a0099c487c006b3a919ed40a975687ce80` — `Update release status for 2.10.15 installation guide`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.15`
- versionCode: `55`
- expected tag: `v2.10.15`
- expected release: `Asgard TV v2.10.15`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

`ASG-QA-001` remains the main gate.

Manual GitHub Actions verification is still required because connector did not expose reliable live Actions status.

## Current Highest Priority

1. Verify latest Android Emulator Smoke Test run in GitHub Actions.
2. Verify release `v2.10.15` and `asgard-tv-release.apk` after Actions completes.
3. Run manual install/update flow using `docs/release/INSTALLATION_GUIDE.md`.
4. Validate physical Android TV / Mi Box S install and first-launch flow.
5. Continue MVP runtime QA: Search → media task → file selection → player.

## Next Recommended Task

QA:

Verify Android Emulator Smoke Test and `v2.10.15` release asset.

Engineer:

If QA remains unavailable, return to the product-critical path from backlog-v2:

1. `ASG-TOR-SEARCH-001` — Torrent/media search from movie title.
2. `ASG-TOR-SEARCH-002` — Search result to playable media task.
3. `ASG-TOR-005` — Player integration and seeking.
4. `ASG-TOR-003` — Metadata and file selection.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- GitHub connector did not expose latest Actions run.
- Release APK availability must still be verified in GitHub Releases.
- Guide accuracy depends on current GitHub Release asset being produced successfully.
- Do not mark tasks DONE without QA evidence.
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
