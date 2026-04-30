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

### Metadata API compatibility and search timeout — 2.10.27

User reported:

```text
метадата апи из миссинг
начало зависать на поиске
```

Root cause found:

- `one-click-playback-v5.js` fails with `Metadata API missing` if `AsMediaTask.loadMetadata` is not available at click time.
- `torrserver-adapter.js` already prefers `AsgardBridge.nativePostJson`, but `MainActivity.kt` still exposes only `nativeFetch(GET)` and not native JSON POST.
- Full `MainActivity.kt` update to add native POST was blocked by tool safety checks again.

Implemented:

- Added `metadata-api-compat-v10.js`:
  - ensures `window.AsMediaTask` exists;
  - ensures `AsMediaTask.loadMetadata()` exists;
  - delegates to `AsMetadataFilesV2.load(taskId)` when available;
  - returns a readable `metadata_loader_missing` diagnostic instead of letting one-click playback crash with `Metadata API missing`.

- Added `search-timeout-v11.js`:
  - wraps `AsSources.searchContent(query)` with a 14-second timeout guard;
  - if a parser/source hangs, Search gets a timeout diagnostic instead of infinite loading.

- Updated `index.html`:
  - loads `search-timeout-v11.js` after `search-parser-runtime-v4.js`;
  - loads `metadata-api-compat-v10.js` after `metadata-files-v2.js` and before one-click playback.

- Updated version:

```text
versionName = "2.10.27"
versionCode = 67
```

- Updated release docs:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

Expected release:

```text
Tag: v2.10.27
Release: Asgard TV v2.10.27
Asset: asgard-tv-release.apk
versionCode: 67
```

## Files Changed In Latest Task

- `android/app/src/main/assets/web/metadata-api-compat-v10.js`
- `android/app/src/main/assets/web/search-timeout-v11.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits From Latest Task

- `564e93a65929afb0e0e1a40b18a34e3577ec8db8` — `Add metadata loader compatibility shim`
- `4c372e054cbd449448f5ff4d6dc98f8996f15daa` — `Load metadata API compatibility shim`
- `de0b8b308631418761046b379821490152388ab8` — `Add search timeout guard`
- `dde5bbae3f73387343945b7dd098d9d636f14ba0` — `Load search timeout guard`
- `198a1ce129519b99fa0e0402d8590c98d5910eda` — `Bump version for metadata API and search timeout fix`
- `ffc70f14172a0c31ce1c2a264d03a7de1732b6dc` — `Update release status for metadata API fix`
- `f96884f6d05b684bb086cef6e1c6ba8f5eccd356` — `Update changelog for metadata API fix`
- Current handoff update commit is the latest commit after this file is saved.

## Verified

- Repository access and push permissions exist.
- `applicationId` remains `com.asgard.tv`.
- Branding remains `Asgard TV`.
- Android build config was bumped to:

```text
versionName = "2.10.27"
versionCode = 67
```

- `index.html` now loads:

```text
search-timeout-v11.js
metadata-api-compat-v10.js
```

## Not Verified

- Local Gradle build was not run in this chat environment.
- GitHub Actions result for `2.10.27` is not yet confirmed.
- Android TV / Mi Box S runtime QA not completed.
- Runtime metadata/files flow is not confirmed on device.

## Known Limitation / Next Blocker

This patch should remove the visible `Metadata API missing` blocker.

However, native POST bridge for service API is still not committed. If the next device test fails with a service/network/POST/CORS style error, the next fix must add a small safe native POST bridge to Android and expose:

```text
AsgardBridge.nativePostJson(url, jsonBody)
```

`torrserver-adapter.js` is already prepared to use that method when present.

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

1. Check GitHub Actions for the `2.10.27` build/release run.
2. If build fails, fix the first compile/build error only.
3. If build passes, download/install `asgard-tv-release.apk` from `v2.10.27`.
4. Test:
   - Search no longer hangs indefinitely;
   - timeout diagnostic appears around 14 seconds if parser/source hangs;
   - `▶ Включить этот вариант` no longer shows `Metadata API missing`;
   - capture the new exact error if metadata still fails.
5. Next work if metadata still fails: native POST bridge for service API.

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
