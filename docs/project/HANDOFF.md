# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

Engineer / QA / Release coordination

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

Active backlog:

`docs/product/backlog-v2.json`

Do not use old `docs/product/backlog.json` as active backlog.

## Work Completed

### User interruption / priority change

User reported:

```text
включи все ресурсы в каталоге, невозможно тестировать приложение, так же приложение не показывает вообще никаких фильмов сериалов итд
```

Priority was changed from continued `ASG-TOR-004` polish to immediate testability fix:

- Home must show visible content immediately.
- Catalog must show visible content immediately.
- Sources must contain enabled legal demo video resources.
- App must be testable without manual source setup.

### Visible demo catalog and enabled legal resources

Changed:

```text
android/app/src/main/assets/web/sources.txt
```

Added enabled legal/public direct video demo sources:

- Big Buck Bunny Demo
- Sintel Demo
- Tears of Steel Demo
- Elephants Dream Demo
- For Bigger Blazes Demo
- For Bigger Escapes Demo

All are direct public/open sample streams. No pirated catalogs or unauthorized sources were added.

Added:

```text
android/app/src/main/assets/web/demo-catalog-runtime.js
```

Purpose:

- final runtime layer to guarantee visible demo movies on Home and Catalog after all existing runtime overrides;
- provides demo Home shelves;
- provides demo Catalog list;
- provides demo Details page;
- opens native player through `openPlayerWithItem` when available;
- falls back to legacy `openPlayer` or browser open;
- clearly labels content as Legal Demo / Open Demo.

Updated:

```text
android/app/src/main/assets/web/index.html
```

Added as final scripts:

```html
<script src="streaming-first-v2.js"></script>
<script src="demo-catalog-runtime.js"></script>
```

### Partial ASG-TOR-004 work also added

Added:

```text
android/app/src/main/assets/web/streaming-first-v2.js
```

Purpose:

- improve selected stream readiness lifecycle;
- use selected file / stream URL / service configured / bridge ready status;
- route open through `AsPlayerHandoffV2` when available;
- readable prepare/open/cancel/diagnostics actions.

Runtime QA still pending.

### Version / release

Bumped:

```text
versionName = "2.10.20"
versionCode = 60
```

Fixed accidental Gradle typo immediately after bump:

```text
sourceCompatibility = JavaVersion.VERSION_17
```

Updated:

```text
docs/release/CHANGELOG.md
docs/release/RELEASE_STATUS.md
```

## Files Changed

- `android/app/src/main/assets/web/sources.txt`
- `android/app/src/main/assets/web/demo-catalog-runtime.js`
- `android/app/src/main/assets/web/streaming-first-v2.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`
- `docs/release/CHANGELOG.md`
- `docs/release/RELEASE_STATUS.md`
- `docs/project/HANDOFF.md`

## Recent Commits

- `5237eac3ba8b327e4a9f4db7dfb447691bd7dc6b` — `Enable bundled legal demo video sources`
- `dead374a9b932288c731fe3410e7fd02ede68928` — `Add final demo catalog runtime`
- `2ca419e296eb8124516e79504a2afaf2ac9e1107` — `Load final demo catalog runtime`
- `ff7d4c65a05c4ae8c96dcb093b00de9e175fb3a3` — `Bump version for visible demo catalog release`
- `1c90a65c617a6a7f49030c9d38088276333b2799` — `Fix Gradle JavaVersion syntax for 2.10.20`
- `984e7b3919a79e4165d7d12904ab75e17f480a54` — `Update changelog for 2.10.20 visible demo catalog`
- `e9a0098802834725fd59585ea717595da4bfdfa1` — `Update release status for 2.10.20 visible demo catalog`
- Current handoff update commit is the latest commit after this file is saved.

## Current Product Status

Early alpha / working prototype.

## Current MVP Status

`NOT_READY_YET`

Current release expectation:

- versionName: `2.10.20`
- versionCode: `60`
- expected tag: `v2.10.20`
- expected release: `Asgard TV v2.10.20`
- expected APK asset: `asgard-tv-release.apk`

## Current QA Status

```text
ASG-QA-001: QA_IN_PROGRESS / CI_SMOKE_PASS / BUGS_FOUND / MANUAL_TV_QA_REQUIRED
```

What should be retested immediately:

- Home shows demo movies immediately.
- Catalog shows demo movies immediately.
- Demo Details opens.
- Watch opens native PlayerActivity.
- Search sees enabled demo direct video sources.
- Gradle build passes after syntax fix.

## Current Highest Priority

1. Verify release `v2.10.20` and `asgard-tv-release.apk` after Actions completes.
2. Install `v2.10.20` on Android TV / emulator.
3. Confirm Home/Catalog are no longer empty.
4. Confirm demo Watch opens player.
5. Then continue `ASG-TOR-004` runtime QA / hardening.

## Next Recommended Task

QA:

Retest visible catalog/content issue on `v2.10.20`.

Engineer:

If Home/Catalog still do not show content, inspect load order and `AsApp.home` / `AsApp.catalog` overrides.

If Home/Catalog are fixed, continue:

```text
ASG-TOR-004 — Streaming-first playback
```

## Blockers / Risks

- No confirmed physical Android TV / Mi Box S QA.
- Demo catalog is intentionally legal demo content, not real fresh movie catalog.
- Release APK availability must still be verified in GitHub Releases.
- `streaming-first-v2.js` is code-wired but not runtime-verified.
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
