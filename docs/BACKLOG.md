# Asgard TV Backlog

This backlog tracks product progress by release.

Legend:

- `[DONE]` completed and committed to GitHub
- `[PARTIAL]` implemented as a first working layer, needs hardening or expansion
- `[NEXT]` next planned work
- `[TODO]` planned but not started

---

## Progress Snapshot

| Area | Status | Notes |
|---|---|---|
| Android TV project structure | DONE | Gradle project, manifest, resources, GitHub Actions build workflow |
| WebView shell | DONE | MainActivity loads local Web UI assets |
| ExoPlayer basic playback | DONE | PlayerActivity with play/pause and D-pad seek |
| TXT config assets | DONE | config/menu/home/theme/sources defaults |
| Modular Web UI | DONE | ui.js, sources.js, store.js, main.js |
| Persistence core | PARTIAL | SharedPreferences implemented; Room planned later |
| Favorites | DONE | Add/remove/list through bridge and Web UI |
| History | DONE | Add/list/clear through bridge and Web UI |
| Watch progress | PARTIAL | Saved on PlayerActivity pause/destroy; needs richer resume UX |
| Sources Manager | DONE | Edit/save/reset sources.txt; add template line; diagnostics |
| Source search | PARTIAL | Searches configured source definitions; real RSS/JSON/XML fetching still planned |
| Remote/D-pad input | DONE | Focusable controls, focus ring, keyboard/D-pad navigation module |
| Touch/mouse input | DONE | Touch mode, larger targets, click support |
| GitHub update check | PARTIAL | Checks GitHub Releases and opens release page; APK download/install planned for 2.0 |
| iPhone preview | PARTIAL | Basic web preview exists; currently not priority |
| Full Player Pro | TODO | Audio/subtitle selection, timecode, diagnostics |
| Download Manager | TODO | Direct APK/media downloads, progress, delete, cache management |
| Metadata providers | TODO | TMDB/TVmaze integration |
| AI assistant | TODO | AI endpoint, privacy preview, recommendations |
| Torrent/magnet playback | TODO | Only safe user-provided support planned; no bundled questionable catalogs |

---

## Completed Releases

### 1.6 — Modular Sources UI Build `[DONE]`

- Modular Web UI split into smaller files.
- Android WebView assets use `ui.js`, `sources.js`, `main.js`.
- iPhone/Safari preview added as `web/`.
- Basic `sources.txt` parser and preview.
- Android JavaScript bridge for asset reading, toast, player launch and storage info.
- ExoPlayer D-pad controls.
- Direct GitHub Actions APK build.

### 1.7 — Persistence Core `[DONE/PARTIAL]`

Completed:

- Android SharedPreferences persistence layer.
- Bridge methods for:
  - `readConfig()`
  - `readSourcesTxt()`
  - `saveSourcesTxt()`
  - `saveWatchProgress()`
  - `getWatchProgress()`
  - `getAllWatchProgress()`
  - `addToFavorites()`
  - `removeFromFavorites()`
  - `getFavorites()`
  - `addHistory()`
  - `getHistory()`
  - `clearHistory()`
  - `getDeviceStorageInfo()`
- PlayerActivity saves watch progress on pause/destroy.
- Web UI screens:
  - Continue Watching
  - Favorites
  - History
  - Sources save/edit

Still needed:

- Replace SharedPreferences with Room after APK is verified on device.
- Improve continue-watching cards with real resume actions.
- Add backup/restore.

### 1.8 — Sources Manager `[DONE/PARTIAL]`

Completed:

- Sources Manager UI.
- Add source template button.
- Edit and save `sources.txt` from Web UI.
- Reset saved sources to default assets.
- Sources search screen.
- Sources diagnostics screen.
- Source parser validation:
  - 8-column format
  - supported source type
  - required `{query}` for `search_template`

Still needed:

- Real network fetching for RSS/XML/JSON/API sources.
- Real `search_template` execution.
- Advanced parser profiles.
- Per-source enable/disable UI without editing raw TXT.

### 1.9 — Input & Update System `[DONE/PARTIAL]`

Completed:

- Remote + touch-friendly UI layer.
- Focusable controls for D-pad navigation.
- Larger touch targets.
- Focus ring for remote navigation.
- `input.js` module for keyboard/D-pad/touch mode.
- Update screen in Web UI.
- GitHub Releases update check through GitHub API.
- Android bridge method `getAppVersionInfo()`.
- Android bridge method `openExternalUrl()`.
- Config flags for remote input, touch input and update checking.

Still needed:

- Download APK through Android DownloadManager.
- Verify SHA-256.
- Open Android package installer with user confirmation.
- Create proper GitHub Release pipeline.

---

## Upcoming Releases

## 2.0 — Real Update Installer & Release Pipeline `[NEXT]`

### GitHub Releases Pipeline `[TODO]`

- Create release workflow that builds APK and attaches it to GitHub Release.
- Generate `latest.json` with:
  - `versionCode`
  - `versionName`
  - `apkUrl`
  - `notesUrl`
  - `sha256`
- Add release notes screen with changelog.
- Add GitHub Action step to publish APK artifact.

### Android Update Installer `[TODO]`

- Download APK through DownloadManager.
- Verify SHA-256 before install.
- Open Android package installer with user confirmation.
- Show update progress.
- Add settings:
  - auto-check on startup
  - manual only
  - never check

Important: normal Android apps cannot silently install APK updates. User confirmation is required unless the app is system/device-owner/root-managed.

## 2.1 — Full Player Pro `[TODO]`

- Audio track selection.
- Subtitle track selection.
- External `.srt` / `.vtt` subtitle URL.
- Manual timecode jump.
- Player diagnostics.
- Better resume UI.
- Error handling for unsupported streams.

## 2.2 — Room Database `[TODO]`

- Replace SharedPreferences persistence with Room.
- Add entities:
  - Movie
  - Source
  - Favorite
  - WatchProgress
  - WatchHistory
  - DownloadItem
- Add DAO files.
- Add migrations.
- Add backup/restore.

## 2.3 — Real Sources Engine `[TODO]`

- Fetch and parse RSS.
- Fetch and parse XML.
- Fetch and parse JSON.
- Execute user `search_template`.
- Map source results into searchable cards.
- Show source badge and rights status.
- Advanced parser UI.

## 2.4 — Metadata Providers `[TODO]`

- TMDB search/details/posters/trailers.
- TVmaze series/episodes/calendar.
- Metadata API keys screen.
- Metadata cache.

## 2.5 — AI Assistant `[TODO]`

- AI settings.
- User-provided AI endpoint.
- Privacy preview.
- Evening picker.
- “Why recommended”.
- Spoiler-free summaries.

---

## Permanent Product Rules

- No bundled questionable catalogs.
- No mirror search.
- No DRM bypass.
- No Cloudflare/captcha bypass.
- No paid authorization bypass.
- User sources remain `User Source / Unknown Rights`.
- User must only add sources they have the right to access.
