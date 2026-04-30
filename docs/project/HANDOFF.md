# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

## Mandatory Pre-flight Refreshed

For the latest manual QA findings task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. Relevant role prompt / QA status context from repository

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### Manual QA findings processed

User reported manual QA results:

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

Interpretation:

- CI emulator smoke passed, but manual QA found product/runtime issues.
- Home still looks like mock/demo content instead of real/fresh movies/series/posters.
- Backspace in input fields was treated as global Back and returned to Home.
- Search/source result flow is unclear or not working from user perspective.
- Output/result placement is wrong: messages/results appear too low or outside expected area.

### Fix applied

Fixed confirmed critical input bug in:

```text
android/app/src/main/assets/web/input.js
```

Change:

- Added editable element detection:
  - text-like input;
  - textarea;
  - contenteditable.
- Backspace/Delete/normal character input now pass through when focus is inside editable fields.
- Escape blurs the text input instead of immediately navigating back.
- Global Back handling remains outside text editing controls.

Commit:

```text
cba83c117b1fa221f8cf208c83aae77ca9fbae2d
```

### QA documentation updated

Updated:

```text
docs/qa/QA_STATUS.md
```

Recorded:

- CI emulator smoke remains PASS.
- Manual QA found bugs.
- Backspace bug fixed in code and needs retest.
- Home mock data and Search/Sources UX remain bugs.

Commit:

```text
a72fb3374bee9c9044a713501e9e295423664244
```

## Files Changed

- `android/app/src/main/assets/web/input.js`
- `docs/qa/QA_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `cba83c117b1fa221f8cf208c83aae77ca9fbae2d` — `Fix Backspace behavior in text inputs`
- `a72fb3374bee9c9044a713501e9e295423664244` — `Record manual QA findings and Backspace fix`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current QA status:

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / BUGS_FOUND / MANUAL_TV_QA_REQUIRED
```

What is verified:

- CI emulator smoke workflow passed by user confirmation.
- APK build/install/launch/no-instant-crash gate is passed in CI emulator.
- Several basic manual checks passed according to user shorthand.

What is fixed and needs retest:

- Backspace/Delete/text input editing inside input/textarea/contenteditable.

What is still not fixed:

- Home mock/demo data still appears as main content; no real fresh/new movies/series/posters.
- Search/source results are unclear or not working from user perspective.
- Output/result placement is wrong; messages/results appear too low or outside expected area.
- Full remote D-pad focus traversal still needs structured QA.
- Back behavior across all screens still needs structured QA after input fix.
- Native ExoPlayer real playback quality on Android TV device remains unverified.
- Configured source/parser/TorrServer flows remain unverified.
- 15-minute manual stability remains unverified.

## Current Highest Priority

1. Re-run manual QA for Backspace behavior in Search/Sources fields after commit `cba83c117...`.
2. Fix Home mock-data presentation:
   - either label as Demo/Fallback clearly;
   - or populate from configured source/search results where possible;
   - avoid implying mock data is fresh real content.
3. Redesign Search/source result layout:
   - results directly under input/action;
   - visible loading/empty/error states;
   - clear playable/source/task actions;
   - no hidden output at the bottom.
4. Continue manual Android TV / Mi Box S QA for Search → media task → metadata → player flow.

## Next Recommended Task

Engineer:

Address manual QA BUG_FOUND items in this order:

1. Home mock data / content labeling or real source-backed home.
2. Search/source result clarity and placement.
3. Sources output placement.
4. Retest Backspace/input behavior.

QA:

Retest the affected cases after new APK build:

- text input Backspace;
- Search results visibility;
- Sources preview/save output placement;
- Home content expectation.

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- Search/source UX is not understandable enough for user.
- Home screen can mislead user because mock data looks like real fresh content.
- Release APK availability must still be verified in GitHub Releases if distributing.
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
