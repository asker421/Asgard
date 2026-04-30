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

### Auto metadata and default parser discovery — 2.10.24

User reported:

```text
магнет линки находит, но метаданные не собираются
там отдельная кнопка для сбора метаданных, и не работает
метаданные должны автоматически подтягиватся
так же не работает парсеры, дефолтного парсера нет, а остальные не видит
```

Implemented:

- Updated `media-task-api-fix-v3.js`:
  - after creating a magnet/torrent media task, metadata loading now starts automatically;
  - task gets `autoMetadata=true`;
  - UI text says metadata/files loading starts automatically;
  - manual `Load metadata` is now a retry/refresh action, not the main expected flow.

- Updated `parsers.json`:
  - added enabled default parser candidate:

```text
Default JacRed/Torznab Parser → http://pape85e.tsarea.tv:8880
```

- Updated `parser_manager.js`:
  - ignores placeholder URLs like `USER_CONFIGURED_*`;
  - includes bundled enabled default parser candidates;
  - auto-fills default TorrServer URL from bundled config when missing;
  - auto-selects and saves active parser candidate.

- Updated `torrserver-adapter.js`:
  - service URL falls back to `window.ASGARD_DEFAULT_TORR_SERVER`;
  - adapter prefers native POST bridge when available;
  - still falls back to browser fetch for POST when native POST is unavailable.

- Added `search-parser-runtime-v4.js`:
  - patches `AsSources.searchContent()` so it calls default/active parser automatically;
  - parser results and source results are merged and deduplicated;
  - patches title search so it does not block search just because manual parser URL is empty;
  - results still render directly under the search bar.

- Updated `index.html`:
  - loads `search-parser-runtime-v4.js` after `title-media-search.js` and before media-task runtime layers.

- Updated version:

```text
versionName = "2.10.24"
versionCode = 64
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.24
Release: Asgard TV v2.10.24
Asset: asgard-tv-release.apk
versionCode: 64
```

## Files Changed In Latest Task

- `android/app/build.gradle.kts`
- `android/app/src/main/assets/web/media-task-api-fix-v3.js`
- `android/app/src/main/assets/web/parsers.json`
- `android/app/src/main/assets/web/parser_manager.js`
- `android/app/src/main/assets/web/torrserver-adapter.js`
- `android/app/src/main/assets/web/search-parser-runtime-v4.js`
- `android/app/src/main/assets/web/index.html`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `d2a90ec2041fad44b6fab8dc5cd47670080b6f53` — `Auto-load metadata after media task creation`
- `ee938bc2b2187571bc5c106c4c09812b37c4464a` — `Add default parser candidate`
- `f9e0e53c29b393d467e988fd57222f01f8afa522` — `Improve parser discovery defaults`
- `02162c73db56bab32b04b9c039511edf4eeabe69` — `Use native POST for TorrServer API`
- `f2e692d4eb5bea59ec49c16702de2e6f3933dbec` — `Add auto parser runtime for search`
- `e4e8ee05b25ecdf59804b5ecc486a7905e3c58f5` — `Bypass manual parser guard in search runtime`
- `c2bb0748cdc486dd4fd9e3fc79e318ba89fdafd0` — `Load auto parser search runtime`
- `bfbd369bcc355c1cda08ffd6a21b52d6eec73890` — `Bump version for auto metadata and parser discovery fix`
- `bd1e3a60244869be1413cb858b8f8e1d6195e3f0` — `Update release status for auto metadata parser fix`
- `01b3b4c1e6c476f0297fa117e85d872cb3a7a7ea` — `Update changelog for auto metadata parser fix`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.24"
versionCode = 64
```

- Default TorrServer URL exists in settings code:

```text
http://pape85e.tsarea.tv:8880
```

- Default parser candidate exists in `parsers.json`.
- Auto parser runtime is loaded by `index.html`.
- Auto metadata trigger is added after media task creation.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.24` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Runtime connection to `http://pape85e.tsarea.tv:8880` is not verified from device.
- Metadata/files may still fail if WebView/browser fetch POST is blocked by CORS or the service API requires native POST.

## Known Blocker / Risk

A native Android JSON POST bridge for service API was attempted in `MainActivity.kt`, but the full-file update was blocked by the tool. Current `torrserver-adapter.js` is ready to use `AsgardBridge.nativePostJson(url, body)` if added later, but the bridge is not currently available in Android.

If metadata still fails in `2.10.24`, next fix should add a small safe native POST bridge to `MainActivity.kt` or a separate bridge class and expose:

```text
AsgardBridge.nativePostJson(url, jsonBody)
```

Then TorrServer POST calls should bypass WebView CORS/file-origin problems.

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

1. Check GitHub Actions for the `2.10.24` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.24`.
4. Test:
   - Search runs without manual parser setup;
   - default parser appears in diagnostics or active parser state;
   - magnet/torrent result creates task;
   - metadata starts automatically;
   - task shows files or a clear service error;
   - if service error is CORS/native POST-related, implement `nativePostJson` bridge next.

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
