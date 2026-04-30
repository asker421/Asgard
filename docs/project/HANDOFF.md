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

### Native sources.txt search engine integration

User asked to integrate the previously proposed Kotlin engine into the project.

Implemented native Kotlin source search engine under:

```text
android/app/src/main/java/com/asgard/tv/search/
```

Added native components:

- `Models.kt`
  - `SourceConfig`
  - `MediaItem`
- `SourcesConfigParser.kt`
  - parses 8-column `sources.txt` rows:

```text
name | type | url_template | language | enabled | priority | auth_required | notes
```

- `HttpLayer.kt`
  - OkHttp client
  - realistic browser User-Agent interceptor
  - URL template builder
  - safe HTTP GET helper
- `ParserNotes.kt`
  - key/value notes parser for selector/path configuration
- `BaseParser.kt`
  - parser interface
  - parser factory
- `HtmlParser.kt`
  - `search_template` support through OkHttp + Jsoup
  - generic CSS selector support through `notes`, e.g. `item=...;title=...;link=...`
- `JsonParser.kt`
  - `json` / `api` support through `JSONObject` / `JSONArray`
  - flexible dotted path mapping through `notes`
- `TorznabParser.kt`
  - `torznab` / `jacred` / `rss` / `xml` support through XML item parsing
  - extracts title and magnet/torrent links from `link`, `guid`, `enclosure`, and torznab attrs
- `SearchManager.kt`
  - Kotlin Coroutines parallel search using `async/awaitAll`
  - per-source error isolation
  - priority sorting
  - direct media source support for `direct_video`, `hls`, `direct_stream` and direct `.mp4/.m3u8/.webm/.mkv` URLs
- `NativeSearchJson.kt`
  - converts native search results to WebView-compatible JSON shape
- `NativeSourceBridge.kt`
  - exposes native source search to WebView as `AsgardNativeSearch.searchSources(query)`

### WebView integration

Updated:

```text
android/app/src/main/java/com/asgard/tv/MainActivity.kt
```

Added second JavaScript bridge:

```text
AsgardNativeSearch
```

It reads the current saved `sources_txt` from SharedPreferences, falling back to bundled `web/sources.txt`.

Added:

```text
android/app/src/main/assets/web/native-search-runtime.js
```

Purpose:

- wraps existing `AsSources.searchContent(query)`;
- tries native search first through `AsgardNativeSearch.searchSources(query)`;
- validates native report shape;
- normalizes native results for existing UI;
- falls back to the previous JS search path if native search fails.

Updated:

```text
android/app/src/main/assets/web/index.html
```

Loaded `native-search-runtime.js` immediately after `sources.js`:

```html
<script src="sources.js"></script>
<script src="native-search-runtime.js"></script>
```

### Dependencies / version

Updated:

```text
android/app/build.gradle.kts
```

Added dependencies:

```kotlin
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
implementation("com.squareup.okhttp3:okhttp:4.12.0")
implementation("org.jsoup:jsoup:1.17.2")
```

Bumped version:

```text
versionName = "2.10.21"
versionCode = 61
```

Preserved:

```text
applicationId = "com.asgard.tv"
namespace = "com.asgard.tv"
branding = "Asgard TV"
```

### Release docs

Updated:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

New expected release:

```text
Tag: v2.10.21
Release: Asgard TV v2.10.21
Asset: asgard-tv-release.apk
versionCode: 61
```

## Files Changed In Latest Task

- `android/app/build.gradle.kts`
- `android/app/src/main/java/com/asgard/tv/MainActivity.kt`
- `android/app/src/main/java/com/asgard/tv/search/Models.kt`
- `android/app/src/main/java/com/asgard/tv/search/SourcesConfigParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/HttpLayer.kt`
- `android/app/src/main/java/com/asgard/tv/search/ParserNotes.kt`
- `android/app/src/main/java/com/asgard/tv/search/BaseParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/HtmlParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/JsonParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/TorznabParser.kt`
- `android/app/src/main/java/com/asgard/tv/search/SearchManager.kt`
- `android/app/src/main/java/com/asgard/tv/search/NativeSearchJson.kt`
- `android/app/src/main/java/com/asgard/tv/search/NativeSourceBridge.kt`
- `android/app/src/main/assets/web/native-search-runtime.js`
- `android/app/src/main/assets/web/index.html`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `5cc1d0de715080c4415b6e4f68d7a6496eb5afe8` — `Add native source search dependencies`
- `12abf9d7707cdc369bb67455a54f7b355fa96782` — `Add native search models`
- `e2a8bdd489d6d433fb5bedd55390ffbfcaca45c0` — `Add sources txt parser`
- `c402e03fae9220809626ef85eff4fe5d0067dce9` — `Add OkHttp native search layer`
- `7c997b2abd9edd108eda11a665df49b49cd04fb2` — `Add native parser factory`
- `09e911a220c4a620e675f0f31805aa11ad21799c` — `Add native HTML parser`
- `316055586b0b05cb926d580714d292eac21df1c9` — `Add native JSON parser`
- `66611f3604d681264c789bc547e4580844bbfbb7` — `Add native Torznab XML parser`
- `f3e0cb5d0dd26eea84c19bc36ee00b0f9e302238` — `Add native parallel search manager`
- `9aea767bb4c11ee820f5d83c4d59668e48996fdd` — `Support native direct media source results`
- `ab4cfbca0cf42992a5577157353a01d2ba4b56c0` — `Add native search JSON bridge formatter`
- `f9ee55453ff5109030ee0dd7cb7edd5edd93e08f` — `Add native source search bridge`
- `4009591fba0bb24fcd3561c5968bac02950835a9` — `Register native source search bridge`
- `9d7a68720a016f32e839bc1819741ac0fce6e4ec` — `Add native-first search runtime override`
- `b9607a6b0e27a0b1ad4161cab3d77de61e880a8d` — `Load native source search runtime`
- `9eeefb6a02c53b12fcf661d5952ead0ccedc6972` — `Update changelog for native source search engine`
- `69200df0d5a74dbd2a32368f3c2f5333f45bbafe` — `Update release status for native source search engine`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Android build config now shows:

```text
versionName = "2.10.21"
versionCode = 61
```

- New runtime file is loaded after `sources.js` and before later search/runtime layers.
- Legal-safe architecture preserved: user-configured sources/services only, plus public demo content from prior task.

## Inferred

- If GitHub release workflow triggers on push to `main`, it should create/update release `v2.10.21` from the new `versionName`.
- Native search should improve Android WebView search because parsing/network is now handled natively via OkHttp/Jsoup/XML instead of browser fetch/CORS-sensitive paths.

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.21` is not yet confirmed.
- Connector check after `b9607a6b0e27a0b1ad4161cab3d77de61e880a8d` returned no commit statuses and no workflow runs at that moment.
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

1. Check GitHub Actions for the `2.10.21` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.21`.
4. Test:
   - app launches;
   - Home shows demo movies;
   - Catalog shows demo movies;
   - Search query `bunny` returns demo direct video source;
   - Search result opens native PlayerActivity;
   - fallback JS search still works if native search fails.
5. Then continue `ASG-TOR-004` streaming-first playback hardening.

## To Test Manually

On Android TV / emulator / Mi Box S:

1. Install APK `v2.10.21`.
2. Open app.
3. Home: demo movies visible immediately.
4. Catalog: demo movies visible immediately.
5. Search: type `bunny`.
6. Confirm result appears near search area and is not hidden below fold.
7. Press Watch/Open on result.
8. Confirm PlayerActivity opens.
9. Press Back from player.
10. Confirm Continue Watching/progress does not crash.
11. Open Source Diagnostics and confirm failures from individual sources do not crash entire search.

## Blockers / Risks

- Build may fail due to new native Kotlin files or dependency resolution; must verify in GitHub Actions.
- Native search currently uses synchronous JavaScript bridge call backed by `runBlocking(Dispatchers.IO)`. It is acceptable for this small integration but should be reviewed if slow sources freeze UI.
- Search template HTML parsing defaults to generic `a[href]` unless selectors are provided in `notes`; real websites may need explicit selectors.
- Auth-required sources are skipped by native manager until secure auth/secrets design is implemented.
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
