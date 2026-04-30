# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

`ASG-QA-001 — Android TV build/install smoke test` has **CI EMULATOR SMOKE PASS** based on user-confirmed GitHub Actions result.

Manual QA found product/runtime issues. Current status is:

```text
QA_IN_PROGRESS / CI_SMOKE_PASS / BUGS_FOUND / MANUAL_TV_QA_REQUIRED
```

Physical Android TV / Mi Box S QA remains **BLOCKED / NOT COMPLETED** from this chat environment.

## Mandatory Pre-flight Used

Active backlog:

```text
docs/product/backlog-v2.json
```

Selected task:

```text
ASG-QA-001 — Run Android TV build/install smoke test
```

Reason:

User provided manual QA results after CI emulator smoke pass. Findings affect Android TV UX, Home/catalog/search/source flows and input behavior.

## CI Emulator Smoke Result

Status:

```text
PASS — user-confirmed from GitHub Actions UI
```

What this proves:

- APK build completed in CI.
- Android emulator smoke workflow completed successfully.
- APK install/launch/no-instant-crash gate passed according to workflow result.

What this does **not** prove:

- Full remote-control focus traversal across all screens.
- Back behavior across all screens.
- ExoPlayer real playback quality on Android TV device.
- Configured source/parser/TorrServer flows.
- QR import runtime flow.
- 15-minute manual stability.
- Mi Box S physical compatibility.

## Manual QA Findings — User Report 2026-04-30

User reported the following shorthand test results:

```text
1) +
2.1 +
2.2 +
3.1: на главной странице все еще мок дата, нет новых фильмов сериалов и постеров
3.2 +
4.1 +
4.2 +
4.3 +
5.1 +
5.2: работает не правильно, при нажатии Backspace должно стираться, а тут кидает на главный экран
5.3 +
6.1 +
6.2: не работает, или неразборчиво, может где-то и есть результат, но интерфейс не понятен
6.3: вывод пишется внизу, надпись появляется но не в правильном месте
6.4 +
7
```

Interpretation / QA mapping:

| Area | Result | Severity | Notes |
|---|---|---|---|
| Install / launch basics | PASS | - | User marked early checks as `+`. |
| Home screen | BUG_FOUND | High | Home still shows mock data; no fresh/new movies/series/posters. This is currently expected only as demo/fallback, but UX makes it look like real content. Needs clear demo labeling or real configured-source content. |
| Navigation basics | PASS | - | User marked several navigation sections as `+`. |
| Text input Backspace | BUG_FOUND / FIXED_IN_CODE | Critical | Backspace in input fields was intercepted as global Back and returned to Home. Fixed in `input.js` by not intercepting Backspace/Delete/text-editing keys while focus is in input/textarea/contenteditable. |
| Search / source results UX | BUG_FOUND | Critical | User reports search/source result flow does not work or is unclear; results may exist but UI is not understandable. Needs Search UX redesign, visible result area, source status, empty/error states and clear actions. |
| Output/result placement | BUG_FOUND | High | User reports output appears at bottom/wrong place. Needs layout fix: validation/search results should render near the action/input area, not hidden below fold. |
| Later checked section | PASS / PARTIAL | - | User marked `6.4 +` and `7`; exact mapping needs next QA form confirmation. |

## Fix Applied From Manual QA

### Backspace in text fields

Bug:

```text
Backspace in input/textarea returned to Home instead of deleting text.
```

Fix:

- Updated `android/app/src/main/assets/web/input.js`.
- Added editable element detection:
  - input text-like fields;
  - textarea;
  - contenteditable.
- Backspace/Delete/normal character input now pass through while editing.
- Escape blurs active text input instead of immediately navigating back.
- Global Back handling still works outside text editing controls.

Fix commit:

```text
cba83c117b1fa221f8cf208c83aae77ca9fbae2d
```

## Current Runtime Smoke Status

| Area | Status | Notes |
|---|---|---|
| APK builds in CI | PASS | User confirmed successful Android Emulator Smoke Test run. |
| APK installs in emulator | PASS | Covered by successful smoke workflow. |
| App launches in emulator | PASS | Covered by successful smoke workflow. |
| No instant crash/ANR | PASS | Covered by successful smoke workflow result. |
| Android TV / Mi Box S physical install | BLOCKED | Requires real device. |
| Remote focus traversal | PARTIAL PASS / NEEDS MORE QA | User marked several navigation checks as `+`; full focus-trap audit still needed. |
| Text input editing | BUG_FOUND / FIXED_IN_CODE / NEEDS RETEST | Backspace fix committed; retest required in search/source fields. |
| Home content | BUG_FOUND | Mock content still appears as main content; needs demo labeling or real content source integration. |
| Search/source results | BUG_FOUND | User reports unclear or not working. |
| Result placement | BUG_FOUND | Output appears at bottom / wrong place. |
| Back behavior by screen | NEEDS MORE QA | Backspace bug fixed; Back/Escape outside inputs still needs screen-by-screen QA. |
| ExoPlayer playback | TODO | Requires manual Android TV/emulator test. |
| Configured media source/service flow | TODO / BUG_FOUND UX | Requires configured source/service; UI currently unclear. |
| 15-minute stability | BLOCKED | Requires emulator/device long run. |

## Recommendation

Do not mark `ASG-QA-001`, `ASG-001`, `ASG-002`, `ASG-003`, `ASG-011`, `ASG-012`, `ASG-030`, `ASG-031`, `ASG-040`, or media playback tasks fully DONE yet.

Recommended statuses:

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / BUGS_FOUND / MANUAL_TV_QA_REQUIRED
ASG-002: BUG_FOUND or READY_FOR_QA_AFTER_INPUT_FIX
ASG-003: BUG_FOUND — Home still looks like mock content
ASG-011/ASG-012: BUG_FOUND — Search/results unclear
ASG-030/ASG-031: BUG_FOUND — Output placement/source UX unclear
```

Next action:

1. Re-run manual tests for text input Backspace in Search and Sources.
2. Fix Home mock-data presentation:
   - either show clear Demo/Fallback labels;
   - or populate Home from configured source/search results where possible;
   - avoid implying that mock data is fresh real content.
3. Redesign Search/source result layout:
   - result output directly under input/action;
   - visible loading/empty/error states;
   - clear playable/source/task action buttons;
   - no hidden result blocks below fold.
4. Continue manual Android TV QA:
   - D-pad focus traversal;
   - Enter activation;
   - Back behavior;
   - player launch/play/pause/seek;
   - Search → task → player flow;
   - 15-minute stability.

## QA Rule

A task can move to DONE only when:

- acceptance criteria passed;
- no critical crash;
- remote navigation works;
- text input editing behaves correctly;
- user-facing errors are understandable;
- for TV UI tasks, focus behavior is verified.
