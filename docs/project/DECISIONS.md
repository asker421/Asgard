# Asgard TV — Product and Technical Decisions

## Decision 001 — GitHub is the project memory

All chats must use GitHub files as project memory.

## Decision 002 — One formal backlog source of truth

The formal backlog is:

`docs/product/backlog.json`

No alternative formal backlog should be created.

## Decision 003 — Safe backlog updates

If GitHub connector returns `backlog.json` truncated, do not overwrite it.

Use a status update layer file until the full file can be edited safely.

Current status layer:

`docs/product/backlog-prioritized-status-2026-04-30.json`

## Decision 004 — User-provided media and source configuration only

Asgard TV must not bundle prohibited catalogs or unauthorized sources.

Allowed architecture:

- user-provided links/files
- user-configured parser
- user-configured media server
- public/demo sources
- placeholders disabled by default

## Decision 005 — Update check must not silently install APK

The app may check GitHub Releases and open release/download URL.

Any APK install must require explicit user confirmation.

## Decision 006 — First stable target

The first target is not a perfect product.

The first target is:

- APK builds
- APK installs on Android TV
- app opens without crash
- remote navigation works
- mock catalog works
- player works
- source/parser settings work
- user-provided media flow has safe foundation

## Decision 007 — Handoff is mandatory

Every meaningful chat session must update:

`docs/project/HANDOFF.md`

The next chat must read it before doing work.
