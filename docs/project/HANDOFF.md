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

Refreshed for latest task:

- `docs/project/CHAT_PROTOCOL.md`
- `docs/product/backlog-v2.json`
- `docs/project/PROJECT_STATE.md`
- `docs/project/HANDOFF.md`
- `docs/project/DECISIONS.md`
- `docs/project/NEXT_ACTIONS.md`
- `docs/project/BACKLOG_V2_MIGRATION.md`
- `docs/prompts/ENGINEER_CHAT_PROMPT.md`

## Work Completed In Latest Task

### TMDB metadata and resilient stream loader — 2.10.28

User reported:

```text
мок дата осталась
метаданные не подтянулись
фильмы и сериалы все еще на английском и не актуальные
поиск дает результаты только с rutor.org
запуск видео не идет пишет stream еще не готов
```

Implemented:

- Added `metadata-loader-v12.js`:
  - retries service metadata/files several times instead of failing after one attempt;
  - extracts torrent hash from magnet btih where possible;
  - uses service list/get fallback when add response does not immediately return hash;
  - selects the largest supported video file;
  - builds stream URL only after file selection is available;
  - gives clearer states: `metadata_pending`, `hash_pending`, `no_playable_video_file`, `stream_ready`.

- Added `metadata-provider-v13.js`:
  - TMDB metadata provider foundation;
  - language defaults to `ru-RU` and region defaults to `RU`;
  - supports trending movies, now playing movies, trending series;
  - supports details, cast and seasons;
  - requires user-configured TMDB API key.

- Added `home-tmdb-v14.js`:
  - Home no longer pretends random English TVMaze data is real movie/top-chart data;
  - if TMDB API key is missing, Home shows a clear setup state instead of fake charts;
  - if TMDB API key exists, Home shows real TMDB `ru-RU` metadata cards;
  - Details can show cast and season grouping for series;
  - `▶ Включить фильм` routes title into Search/source selection flow.

- Updated `index.html`:
  - loads `metadata-loader-v12.js` after metadata compatibility layers;
  - loads `metadata-provider-v13.js` and `home-tmdb-v14.js` after older Home metadata fallbacks, so TMDB Home is the final Home override.

- Updated version:

```text
versionName = "2.10.28"
versionCode = 68
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.28
Release: Asgard TV v2.10.28
Asset: asgard-tv-release.apk
versionCode: 68
```

## Files Changed In Latest Task

- `android/app/src/main/assets/web/metadata-loader-v12.js`
- `android/app/src/main/assets/web/metadata-provider-v13.js`
- `android/app/src/main/assets/web/home-tmdb-v14.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `7a8bff8b8028d32fcbeb73c20203782fdd6fae20` — `Add resilient metadata loader`
- `907eef6dd52d4b43b13f131ee6fa505600989cb8` — `Load resilient metadata loader`
- `416e5a66bf83177adafe072cc285958db43f7e0d` — `Add TMDB metadata provider`
- `6052e90a5d9e4349d48328a408993016bfb865c6` — `Add TMDB driven home runtime`
- `12b763c379843a3a43b7c235aef80be88e6e0bcc` — `Load TMDB metadata home runtime`
- `6d28094c2ab1e2481f952ad2b7c06516b14aceb3` — `Bump version for TMDB metadata and resilient stream loader`
- `91406453d4dcbef4fd2d17e1b7d65986ab2df59c` — `Update release status for TMDB metadata and loader`
- `53f7344934891d2182a0817f4b4f95b04cc4eb54` — `Update changelog for TMDB metadata and loader`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.28"
versionCode = 68
```

- `index.html` now loads:

```text
metadata-loader-v12.js
metadata-provider-v13.js
home-tmdb-v14.js
```

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.28` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Runtime TMDB API key entry and TMDB data loading are not manually verified.
- Runtime TorrServer metadata/files flow is not confirmed on device.

## Known Limitations / Risks

- TMDB metadata requires user-provided TMDB API key. Without it, Home intentionally shows setup state instead of fake top charts.
- Search still depends on currently configured sources/parsers; if only Rutor works, diagnostics/source setup must be improved next.
- Native POST bridge for service API is still not committed. `metadata-loader-v12.js` improves retries/fallbacks, but if WebView POST is blocked, the next fix must add Android native POST bridge.

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

1. Check GitHub Actions for the `2.10.28` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.28`.
4. Test:
   - Home without TMDB key shows setup state, not fake charts;
   - after entering TMDB key, Home shows `ru-RU` metadata cards;
   - Details shows cast and seasons where available;
   - selecting a torrent/magnet tries metadata/files several times before failing;
   - capture exact service error if stream still not ready.
5. Next likely fix: native POST bridge for service API and better source diagnostics beyond Rutor.

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
