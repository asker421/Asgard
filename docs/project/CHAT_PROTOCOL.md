# Asgard TV — Chat Protocol

This document defines how different ChatGPT chats must collaborate through GitHub.

## Principle

GitHub is the project memory. No chat should work only from conversation memory.

## Required reading for every chat

Before doing work, every role must read:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`

## Source of truth

Formal backlog source of truth:

`docs/product/backlog.json`

If GitHub connector returns this file truncated, do not overwrite it.

Use `docs/product/backlog-prioritized-status-2026-04-30.json` as a safe update layer until the full file can be edited safely.

## Forbidden

- Do not use `docs/BACKLOG.md` as source of truth.
- Do not create a competing backlog.
- Do not delete backlog tasks.
- Do not silently change acceptance criteria.
- Do not add bundled pirated sources.
- Do not silently install APK updates.

## Required handoff

After meaningful work, update:

`docs/project/HANDOFF.md`

The handoff must include:

- role
- completed work
- changed files
- commit SHA
- next recommended task
- blockers
- notes for next chat

## Roles

### Product Owner

Owns backlog, prioritization, product decisions, scope and project state.

### Engineer

Implements code according to backlog and updates handoff/status.

### QA

Tests code, updates QA status, recommends DONE / BUG_FOUND / BLOCKED.

### UX/UI

Owns TV-first interface quality, flows, interaction design, focus behavior and visual consistency.

### Release

Owns APK build, release status, changelog and installation guide.

## Statuses

Use only:

- TODO
- IN_PROGRESS
- CODE_REVIEW
- READY_FOR_QA
- QA_IN_PROGRESS
- BUG_FOUND
- DONE
- BLOCKED
- DEFERRED

## Status meaning

- TODO: not started
- IN_PROGRESS: partially implemented
- CODE_REVIEW: implementation exists, needs review
- READY_FOR_QA: ready to test
- QA_IN_PROGRESS: QA is testing
- BUG_FOUND: failed QA or known bug
- DONE: all acceptance criteria and definition of done passed
- BLOCKED: cannot proceed
- DEFERRED: intentionally postponed
