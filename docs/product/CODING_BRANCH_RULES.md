# Coding Branch Rules for Asgard TV

Repo: `asker421/Asgard`

Backlog source of truth:

`docs/product/backlog.json`

## Workflow

1. Read `docs/product/backlog.json` before coding.
2. Pick the highest-priority `TODO` task from the current release unless the user says otherwise.
3. Set the task status to `IN_PROGRESS` before implementation.
4. Implement the task.
5. Update `implementation_notes`.
6. Add `links.branch`, `links.commit` and `links.pull_request` if available.
7. Move task to `CODE_REVIEW` or `READY_FOR_QA`.
8. Set `DONE` only after acceptance criteria and Definition of Done are satisfied.

## Statuses

- `TODO`
- `IN_PROGRESS`
- `CODE_REVIEW`
- `READY_FOR_QA`
- `QA_IN_PROGRESS`
- `BUG_FOUND`
- `DONE`
- `BLOCKED`
- `DEFERRED`

## Hard rules

- Never delete backlog items.
- Never silently change acceptance criteria.
- If implementation differs from the original requirement, add a note.
- If new work is discovered, create a new `TODO` item.
- Android TV remote navigation is mandatory for UI tasks.
- Player error handling is mandatory for player tasks.
- Source errors must not crash the app.
- AI features must be optional; the app must work when AI is unavailable.
