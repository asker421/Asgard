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

### Metadata Home actually enabled and enriched — 2.10.26

User reported:

```text
главный экран не изменился, там по прежнему мок
на карточках нет никакой информации что за фильм и о чем
актеры рейтинги и все остальное не работает
```

Root cause found:

- `home-metadata-v7.js` existed in the repo but was not loaded by `index.html`.
- Therefore the app could not run the metadata Home runtime and kept showing demo/mock content.

Implemented:

- Updated `index.html`:
  - now loads `home-metadata-v7.js` after `demo-catalog-runtime.js`;
  - now loads `home-metadata-force-v8.js`;
  - now loads `home-metadata-enrich-v9.js`.

- Added `home-metadata-force-v8.js`:
  - forces metadata Home over demo fallback when current screen is Home;
  - retries after short delays to override late demo/mock runtime rendering.

- Added `home-metadata-enrich-v9.js`:
  - overrides metadata Details to add actor/cast cards from TVMaze where available;
  - Details now shows summary, genre/date/rating chips and cast section;
  - `▶ Включить фильм` stays routed to existing search flow by title.

- Updated version:

```text
versionName = "2.10.26"
versionCode = 66
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.26
Release: Asgard TV v2.10.26
Asset: asgard-tv-release.apk
versionCode: 66
```

## Files Changed In Latest Task

- `android/app/src/main/assets/web/index.html`
- `android/app/src/main/assets/web/home-metadata-force-v8.js`
- `android/app/src/main/assets/web/home-metadata-enrich-v9.js`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `6354bf84194708545e456bce0b469c1961129294` — `Load metadata home after demo runtime`
- `7f83e6356249379e502bdc909719c2d68b3a8da8` — `Force metadata home over demo fallback`
- `93f68bc8e8473c3c9a5e816212b329d20209f5bc` — `Enrich home metadata details with cast`
- `76ab35bf335497aff01bbfe783f3c9e13ca0982c` — `Load enriched home metadata details`
- `323ec5a3e1b311ccf14ec9a2073c15bb8a6eb0b4` — `Bump version for metadata home fix`
- `d155238de05a1f7050fa348d090b0bcd57f7ca61` — `Update release status for metadata home fix`
- `e9ab393a6c83da73d10ae6b0af0c1c3ba002116f` — `Update changelog for metadata home fix`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.26"
versionCode = 66
```

- `index.html` now loads:

```text
home-metadata-v7.js
home-metadata-force-v8.js
home-metadata-enrich-v9.js
```

- Metadata Home is intended to override demo/mock Home.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.26` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Runtime access to TVMaze API from device is not verified.
- Home metadata UX was not manually tested on device.

## Known Limitation

Current metadata Home uses TVMaze series/episode data. Movie metadata is still limited. Proper movie metadata, actors, ratings and posters for films require a configured movie metadata provider such as TMDB and should be added as a settings-driven feature.

## Known Blocker / Risk

Native POST bridge for service API is still not confirmed. If service metadata still fails, the next fix should add a small safe native POST bridge in `MainActivity.kt` or a separate bridge class, then route service POST calls through it.

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

1. Check GitHub Actions for the `2.10.26` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.26`.
4. Test:
   - Home no longer shows only Big Buck Bunny/Sintel/Tears of Steel demo content;
   - Home shows metadata cards with poster/title/episode/date/rating/genres where available;
   - opening a card shows summary and actor/cast cards where available;
   - `▶ Включить фильм` routes to Search by title;
   - Search still shows grouped cards and source variant selection.
5. Next work:
   - add TMDB/settings-driven movie metadata provider;
   - add native POST bridge if service metadata still fails.

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
