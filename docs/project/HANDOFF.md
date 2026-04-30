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

### Search UI, media task fix, default service URL — 2.10.23

User reported:

```text
поиск дал какие то результаты но совершенно не понятно что это
когда нажимаешь create media link выдает ошибку torrent task api unavailable
```

User also requested:

```text
добавь еще дефолтный тор сервер pape85e.tsarea.tv:8880
обнови еще юзер интерфейса что бы результаты поиска были более организованными и сразу под строкой поиска
```

Implemented:

- Added default TorrServer/service URL:

```text
http://pape85e.tsarea.tv:8880
```

- Updated `store.js`:
  - added `window.ASGARD_DEFAULT_TORR_SERVER`;
  - `AsStore.parserSettings()` now returns default parser settings with the default TorrServer URL;
  - `AsStore.saveParserSettings()` preserves that default unless user overrides it.

- Added `media-task-api-fix-v3.js`:
  - late runtime patch for `AsMediaSearch.createTask()`;
  - prevents old `torrent_task_api_unavailable` stub from being called;
  - creates persistent media tasks through `AsStore.updateTorrentTask()` / local fallback;
  - handles direct playable, magnet, torrent URL, and normal web-link cases with clearer messages.

- Updated `index.html`:
  - loads `media-task-api-fix-v3.js` after `media-task-creation-v2.js`.

- Updated `title-media-search.js`:
  - results now appear immediately under the search bar;
  - setup and diagnostics moved below result list into compact expandable sections;
  - result cards explain what each result means:
    - direct playable = can watch immediately;
    - magnet/torrent = requires TorrServer/service;
    - link = normal web link, not a media task;
  - result groups are shown in this order:
    1. direct playable;
    2. torrent files;
    3. magnet links;
    4. other links.

- Updated version:

```text
versionName = "2.10.23"
versionCode = 63
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.23
Release: Asgard TV v2.10.23
Asset: asgard-tv-release.apk
versionCode: 63
```

## Files Changed In Latest Task

- `android/app/build.gradle.kts`
- `android/app/src/main/assets/web/store.js`
- `android/app/src/main/assets/web/title-media-search.js`
- `android/app/src/main/assets/web/media-task-api-fix-v3.js`
- `android/app/src/main/assets/web/index.html`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `5df2b367dac690b0edbef4d79c2991174810b24d` — `Fix media task creation fallback`
- `60b1dcc3a9bc1029cbc2e4a6801deb3096300230` — `Add default TorrServer setting`
- `5350e32e4f5aaed0ae220e8bc346bad13e1999a3` — `Improve search results layout`
- `f186c82473bccf3531253360b43ac86e8f1714fb` — `Load media task API fix runtime`
- `a034e3322faa41f81951a6d0b0619104d5d91be0` — `Bump version for search UI and default service fix`
- `fdeb0a3f6cfceb3a8f164e2196ade4419682d5ae` — `Update release status for search UI fix`
- `eb804e756546fa13eefbdc1f451ca3011bc34a5c` — `Update changelog for search UI and service fix`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.23"
versionCode = 63
```

- Default service URL is now in code:

```text
http://pape85e.tsarea.tv:8880
```

- Search UI file was updated so results render directly under search bar.
- `media-task-api-fix-v3.js` exists and is loaded by `index.html`.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.23` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- User must confirm whether `Create media task` no longer shows `torrent_task_api_unavailable`.

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

1. Check GitHub Actions for the `2.10.23` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.23`.
4. Test:
   - Search results appear immediately under search bar;
   - result cards are understandable;
   - default TorrServer URL is prefilled;
   - `Create media task` no longer shows `torrent_task_api_unavailable`;
   - direct playable still opens PlayerActivity;
   - torrent/magnet task goes to metadata/load stream flow.

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
