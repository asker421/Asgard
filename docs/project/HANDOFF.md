# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / Android TV / WebView / QA-aware implementation

## Mandatory Pre-flight Refreshed

For the latest task, refreshed according to `docs/project/CHAT_PROTOCOL.md`:

1. `docs/project/CHAT_PROTOCOL.md`
2. `docs/product/backlog-v2.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/HANDOFF.md`
5. `docs/project/DECISIONS.md`
6. `docs/project/NEXT_ACTIONS.md`
7. `docs/project/BACKLOG_V2_MIGRATION.md`
8. `docs/prompts/ENGINEER_CHAT_PROMPT.md`
9. `docs/qa/QA_STATUS.md`

Active backlog:

```text
docs/product/backlog-v2.json
```

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed In Latest Task

### Native source search hardening — 2.10.22

User asked to continue integration of the safer native extraction engine.

Implemented hardening on top of the existing native Kotlin search engine under:

```text
android/app/src/main/java/com/asgard/tv/search/
```

Changed:

- `Models.kt`
  - Enriched `MediaItem` with optional metadata fields:
    - `year`
    - `quality`
    - `size`
  - Added provider diagnostic status enum:
    - `OK`
    - `EMPTY`
    - `DISABLED`
    - `INVALID_CONFIG`
    - `AUTH_REQUIRED`
    - `UNSUPPORTED`
    - `NETWORK_ERROR`
    - `TIMEOUT`
    - `PROVIDER_PROTECTED`
    - `HUMAN_VERIFICATION_REQUIRED`
    - `PARSE_ERROR`
  - Added safe exception types for provider protection, human verification, and timeout handling.

- `HttpLayer.kt`
  - Hardened network headers.
  - Added `ProviderGuard` that detects provider protection and human-verification pages.
  - Such pages are not parsed as normal media pages; they become diagnostics.
  - No bypass, no cookie extraction, no automated solving and no protected-provider circumvention was added.

- `SearchManager.kt`
  - Added per-source timeout through `withTimeout`.
  - Added source status mapping for:
    - protected provider pages;
    - human-verification pages;
    - timeout;
    - parse errors;
    - network errors;
    - auth-required sources.
  - Kept parallel querying with coroutine `async/awaitAll`.
  - One failing/stuck source does not block other enabled sources.

- `HtmlParser.kt`
  - Added safe deep extraction of explicit direct media / P2P URLs already present in HTML/script text.
  - Added selector mapping for `year`, `quality`, `size` through `notes`.
  - Does not deobfuscate protected players.
  - Does not bypass provider protection, human verification, paywalls, DRM or encrypted source maps.

- `JsonParser.kt`
  - Added `year`, `quality`, and `size` mapping through `notes`.

- `TorznabParser.kt`
  - Added extraction of `year`, `quality`, `size`, and enclosure length where present.

- `NativeSearchJson.kt`
  - Exposes provider `status` into WebView reports.
  - Exposes `year`, `quality`, `size`, `poster_url` and `posterUrl` into WebView result objects.

Version bumped:

```text
versionName = "2.10.22"
versionCode = 62
```

Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.22
Release: Asgard TV v2.10.22
Asset: asgard-tv-release.apk
versionCode: 62
```

## Files Changed In Latest Task

- `android/app/build.gradle.kts`
- `android/app/src/main/java/com/asgard/tv/search/Models.kt`
- `android/app/src/main/java/com/asgard/tv/search/HttpLayer.kt`
- `android/app/src/main/java/com/asgard/tv/search/SearchManager.kt`
- `android/app/src/main/java/com/asgard/tv/search/HtmlParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/JsonParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/TorznabParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/NativeSearchJson.kt`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `eb48fd26e7657cb15fbf615a0d76a211dba582ae` — `Add safe provider guard to native network layer`
- `f0cceb61dbecf5e0c7001fbeb2da231f502e7efb` — `Add source status handling and per-source timeout`
- `3d23c645d632ae072442257552ee9f78c8abd430` — `Enrich native JSON parser metadata`
- `fd1a44d31273bb9228b3e6ef2927b0a825ebb1cb` — `Enrich native Torznab parser metadata`
- `758ffc6c1857bcea17cb236f5a05aac6f18d2183` — `Bump version for native search hardening`
- `0538d8293111d67fa57bff35c520a75f05ee08a5` — `Update changelog for native source search hardening`
- `ab394df3d5851dea9191d71faa31b17118a3832a` — `Update release status for native source search hardening`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.22"
versionCode = 62
```

- Legal-safe architecture preserved: user-configured sources/services only, plus public demo content from prior task.
- No protected-provider circumvention, no automated human-verification solving, no unauthorized catalogs, no paid-access circumvention, and no embedded P2P engine were added.

## Inferred

- If GitHub release workflow triggers on push to `main`, it should create/update release `v2.10.22` from the new `versionName`.
- Native source diagnostics should now be clearer because provider protection, human verification, timeout and parse error states are separated.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.22` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Native search runtime behavior not manually tested on device/emulator.

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

1. Check GitHub Actions for the `2.10.22` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.22`.
4. Test:
   - app launches;
   - Home shows demo movies;
   - Catalog shows demo movies;
   - Search query `bunny` returns demo direct video source;
   - native report contains `status` fields;
   - protected/human-verification/timeouts show as diagnostics;
   - Search result opens native PlayerActivity;
   - fallback JS search still works if native search fails.
5. Then continue `ASG-TOR-004` streaming-first playback hardening.

## To Test Manually

On Android TV / emulator / Mi Box S:

1. Install APK `v2.10.22`.
2. Open app.
3. Home: demo movies visible immediately.
4. Catalog: demo movies visible immediately.
5. Search: type `bunny`.
6. Confirm result appears near search area and is not hidden below fold.
7. Confirm source diagnostics show provider statuses.
8. Press Watch/Open on playable result.
9. Confirm PlayerActivity opens.
10. Press Back from player.
11. Confirm Continue Watching/progress does not crash.

## Blockers / Risks

- Build may fail due to Kotlin changes; verify in GitHub Actions.
- Native search currently uses synchronous JavaScript bridge call backed by `runBlocking(Dispatchers.IO)`. It is acceptable for this small integration but should be reviewed if slow sources freeze UI.
- Search template HTML parsing defaults to generic `a[href]` unless selectors are provided in `notes`; real websites may need explicit selectors.
- Auth-required sources are reported/skipped by native manager until secure auth/secrets design is implemented.
- No embedded P2P/torrent engine was added; torrent/magnet results still require user-configured service flow.
- Do not add bundled prohibited catalogs or bypass logic.

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
