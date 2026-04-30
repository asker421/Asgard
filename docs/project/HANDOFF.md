# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Product Owner / UX/UI coordination

## Work Completed

- Read the required project source-of-truth documents for the new chat.
- Confirmed formal backlog source of truth remains `docs/product/backlog.json`.
- Confirmed safe status guidance is `docs/product/backlog-prioritized-status-2026-04-30.json` because `backlog.json` may be truncated by the GitHub connector.
- Read project state, chat protocol, decisions, next actions, role prompts, QA status and release status.
- No code implementation was performed in this handoff-only step.
- No backlog status was changed.

## Files Changed

- `docs/project/HANDOFF.md`

## Current Product Status

Early alpha / working prototype.

Important current facts from project docs:

- QA smoke test is not completed.
- Stable release is not ready.
- Highest priority remains Android TV APK build/install smoke test.
- Remote navigation, ExoPlayer playback and first-launch stability still need device/emulator validation.
- Media/source features must remain user-provided and legal-source only.

## Current Highest Priority

1. `ASG-QA-001 — Run Android TV build/install smoke test`.
2. Validate remote navigation on Android TV emulator or Mi Box S.
3. Validate native ExoPlayer playback with demo video.
4. Validate Search and Sources flows after the recent TV UX patches.
5. Then continue user-provided media metadata/playback handoff flow.

## Next Recommended Task

QA / Engineer:

Run a real build/install smoke test for the latest APK and update `docs/qa/QA_STATUS.md` with PASS / FAIL / BLOCKED per area.

Minimum test scope:

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

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- `docs/release/RELEASE_STATUS.md` may be stale and should be checked against `android/app/build.gradle.kts` before release communication.
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
