# Backlog Sync 2.4 — QA Stabilization

Date: 2026-04-28

## Source of truth

Primary source of truth remains:

- `docs/product/backlog.json`

This sync note records status updates that should be reflected in `backlog.json` when the connector can safely update the full JSON without truncation.

## QA-driven release decision

External QA review marked the product as:

- Prototype PASS
- Product Release FAIL
- Stable 1.0 BLOCKED

Therefore release 2.4 intentionally stopped feature expansion and focused on TV usability stabilization.

## Recommended backlog updates

### ASG-002 — Remote-first navigation

Recommended status: `CODE_REVIEW`

Implementation notes:

- Added `nav.js` stabilization layer.
- Added spatial directional navigation using element bounding boxes.
- Up/down/left/right now move toward nearest valid element in the requested direction.
- Added meaningful initial focus after screen transitions.
- Requires physical Android TV remote QA before READY_FOR_QA or DONE.

Links:

- branch: `main`
- commit: `b2aa158e5ec834faa5791bafa450ca7528d1d7d0`
- pull_request: empty

### ASG-006 — Global loading, empty, error and retry states

Recommended status: `IN_PROGRESS`

Implementation notes:

- 2.4 improves no-dead-end behavior for Back/Home and adds recovery hints.
- Full global loading/empty/error coverage still incomplete.

Links:

- branch: `main`
- commit: `86e06e83bbd27a0ccd6cc978c9a981fb177f48cd`
- pull_request: empty

### ASG-080 — Settings sections / menu structure

Recommended status: `IN_PROGRESS`

Implementation notes:

- Main menu simplified to core TV paths.
- Secondary and experimental modules grouped under More / Experimental.
- Demo/Experimental note added to make product state clear.
- Settings subsections still need functional implementation.

Links:

- branch: `main`
- commit: `b2aa158e5ec834faa5791bafa450ca7528d1d7d0`
- pull_request: empty

### ASG-UPD-001 — GitHub update check screen

Recommended status: `CODE_REVIEW`

Implementation notes:

- Version mismatch fixed at Android bridge level.
- `getAppVersionInfo()` now returns `BuildConfig.VERSION_NAME` and `BuildConfig.VERSION_CODE`.
- Remaining update flow issues: APK asset selection, latest version comparison and rate-limit handling.

Links:

- branch: `main`
- commit: `3c73e431d324fc692414006d228d78f139e8c745`
- pull_request: empty

### ASG-034 — Legal-safe source architecture

Recommended status: `READY_FOR_QA`

Implementation notes:

- WebView now keeps non-local HTTP/HTTPS navigation out of the app WebView and opens it externally.
- Non-HTTP schemes are ignored by WebView override path.
- User-media legal responsibility messaging remains visible.

Links:

- branch: `main`
- commit: `3c73e431d324fc692414006d228d78f139e8c745`
- pull_request: empty

## New QA blocker tasks to add if missing

### ASG-QA-001 — Fix Android TV Back stack

Status: `CODE_REVIEW`

Notes:

- Implemented in `nav.js` but needs physical TV QA.

### ASG-QA-002 — Replace linear focus with spatial TV navigation

Status: `CODE_REVIEW`

Notes:

- Implemented in `nav.js` but needs physical TV QA.

### ASG-QA-003 — Fix version consistency

Status: `READY_FOR_QA`

Notes:

- Android bridge now uses BuildConfig. JS fallback cleanup still needs review.

## Next recommended release

`2.5 — Player Stability and Continue Watching`

Scope:

- Player.Listener
- onPlayerError handling
- autosave playback progress every 10–15 seconds
- unknown duration guard
- seek bounds
- Continue / Start Over prompt
- bad URL friendly error
