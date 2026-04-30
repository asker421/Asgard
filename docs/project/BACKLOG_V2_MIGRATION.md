# Asgard TV — Backlog v2 Migration Instructions

Last updated: 2026-04-30

## Purpose

The old backlog file:

`docs/product/backlog.json`

is too large and may be truncated by the GitHub connector in ChatGPT.

The compact backlog file is now the operational source of truth for all chats:

`docs/product/backlog-v2.json`

## Mandatory rule for all future chats

Use:

`docs/product/backlog-v2.json`

Do not use the old large backlog as the active source of truth.

The old file may remain in the repo as historical reference, but chats must not rely on it for planning, status updates or task selection.

## Required migration task for the next Engineer / Product Owner chat

Update all project documentation and prompt files so they reference `docs/product/backlog-v2.json` as the active backlog.

Search and update these files if they still mention the old active backlog path:

- `docs/project/PROJECT_STATE.md`
- `docs/project/HANDOFF.md`
- `docs/project/DECISIONS.md`
- `docs/project/NEXT_ACTIONS.md`
- `docs/prompts/ENGINEER_CHAT_PROMPT.md`
- `docs/prompts/QA_CHAT_PROMPT.md`
- `docs/prompts/PO_CHAT_PROMPT.md`
- `docs/prompts/UX_UI_CHAT_PROMPT.md`
- `docs/qa/QA_STATUS.md`
- `docs/release/RELEASE_STATUS.md`

## Replacement rule

Replace active backlog references like:

`docs/product/backlog.json`

with:

`docs/product/backlog-v2.json`

If the old file must be mentioned, describe it only as:

`historical large backlog, may be truncated by connector`

## Do not do

- Do not delete `docs/product/backlog-v2.json`.
- Do not create another backlog file.
- Do not use `docs/BACKLOG.md`.
- Do not overwrite the old `backlog.json` unless full file content and current blob SHA are safely available.
- Do not split the backlog again into multiple sources of truth.

## After migration

After updating documentation and prompt files:

1. Update `docs/project/HANDOFF.md`.
2. Commit the changes.
3. Report commit SHA.
4. Continue work from `current_next_tasks` in `docs/product/backlog-v2.json`.

## Current next tasks from backlog-v2

1. `ASG-QA-001` — Run Android TV build/install smoke test.
2. `ASG-TOR-003` — Metadata and file selection.
3. `ASG-TOR-005` — Player integration and seeking.
4. `ASG-042` — Continue Watching.
5. `ASG-012` — Unified search results and normalization.
6. `ASG-050` — QR import from phone.
