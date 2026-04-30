# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Android TV / WebView / QA-aware implementation

## Mandatory Pre-flight Refreshed

Active backlog:

```text
docs/product/backlog-v2.json
```

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed In Latest Task

### Search cards and source variant selection — 2.10.25

User requested:

```text
результаты поиска не должны быть просто линком или текстом
там тоже должна быть красивая карточка фильма
а вот выбор уже должен быть из линков
там должен быть список, какой торрент я хочу включить
```

Implemented:

- Added `search-card-groups-v6.js`.
- Search results are now grouped into movie/series cards instead of raw text/link rows.
- Each card groups multiple source variants by cleaned title.
- Each card shows:
  - title;
  - source count;
  - best source type;
  - quality where available;
  - seed/peer chips where available;
  - poster placeholder or poster image if available.
- Added two-level selection flow:
  1. choose movie/series card;
  2. choose a specific source/variant.
- Variant selection screen lists each available option with quality/source/size/seed/peer metadata where available.
- Primary actions are now user-facing:
  - `▶ Включить лучший`;
  - `Выбрать источник`;
  - `▶ Включить этот вариант`.
- Raw actions like `Create task`, `Open link`, and unclear link-first UI are no longer the main search UX.
- Updated `index.html` to load `search-card-groups-v6.js` after `one-click-playback-v5.js`.
- Updated version:

```text
versionName = "2.10.25"
versionCode = 65
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.25
Release: Asgard TV v2.10.25
Asset: asgard-tv-release.apk
versionCode: 65
```

### Attempted but not completed

User also requested a metadata-driven Home screen with new movies, new series, episode releases, metadata, posters and details.

Attempted to add `metadata-home-runtime-v6.js`, but the GitHub tool blocked the large runtime file twice. This is not implemented yet.

Recommended next approach:

- split Home metadata into smaller safe patches;
- first add metadata-only Home without playback logic;
- then add detail card;
- then wire `Включить фильм` to existing search-card / one-click flow.

## Files Changed In Latest Task

- `android/app/src/main/assets/web/search-card-groups-v6.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `c1889ec0cea3ce2d0e95f86b7fbdd7b08e1e2daf` — `Group search results into movie cards`
- `eaf51a947753bd752ffb170b5893d4b196912e29` — `Load grouped search card runtime`
- `c36183943f18a2ffe1864662f8870b937e7ca6ba` — `Bump version for grouped search cards`
- `86c9cb26300b87c41c95ca78cb3c6aa8b995ef62` — `Update release status for grouped search cards`
- `5104d036035f54f08c770680668e383dc10b35c9` — `Update changelog for grouped search cards`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.25"
versionCode = 65
```

- `search-card-groups-v6.js` exists.
- `index.html` loads `search-card-groups-v6.js` after `one-click-playback-v5.js`.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.25` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Grouped-card search UX was not manually tested on device.
- Metadata-driven Home screen is not implemented yet.

## Known Blocker / Risk

Native POST bridge for service API is still not confirmed. If service metadata still fails, the next fix should add a small safe native POST bridge in `MainActivity.kt` or a separate bridge class, then route service POST calls through it.

The Home screen still uses demo fallback / prior runtime layers until a smaller metadata-only Home patch is successfully added.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

```text
NOT_READY_YET
```

## Current QA Status

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / BUGS_FOUND / MANUAL_TV_QA_REQUIRED
```

Do not mark tasks DONE without QA evidence.

## Current Highest Priority

1. Check GitHub Actions for the `2.10.25` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.25`.
4. Test:
   - Search results appear as movie/series cards;
   - cards do not show only raw links;
   - `Выбрать источник` opens source variants;
   - source variants show quality/source/size/seed data where available;
   - `▶ Включить этот вариант` routes to one-click playback;
   - HTML/web pages are not opened directly in PlayerActivity.
5. Next work: add metadata-driven Home screen in smaller patches.

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
