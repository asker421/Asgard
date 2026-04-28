# Backlog Sync Report — 2026-04-28

Source of truth requested: `docs/product/backlog.json`.

## Important limitation

The GitHub connector currently returns `docs/product/backlog.json` truncated after the `ASG-092` section. Because updating a GitHub file requires replacing the full file content, I did **not** overwrite `backlog.json` with a partial copy. This avoids violating the hard rule: **Never delete backlog items**.

## Code-to-backlog sync findings

The repository currently contains implemented or partially implemented functionality that should be reflected in `docs/product/backlog.json` once the full file can be safely edited.

## Recommended status updates

### ASG-001 — Android TV project setup

Recommended status: `READY_FOR_QA`

Evidence:

- Android Gradle project exists.
- APK build workflow exists.
- AndroidManifest exists with launcher and Leanback launcher categories.
- App label/icon/banner exist.
- MainActivity loads local WebView assets.

Notes:

- Needs GitHub Actions build verification and device/emulator test before `DONE`.

Implementation notes to add:

- Android TV Gradle project, manifest, WebView shell, launcher metadata, resources, and GitHub Actions APK build are implemented. QA still needs to verify build/install/launch on device.

Links:

- branch: `main`
- commit: latest `main` commits through 2.0 release
- pull_request: empty

---

### ASG-002 — Remote-first navigation

Recommended status: `READY_FOR_QA`

Evidence:

- `input.js` exists.
- Focusable controls are used in Web UI.
- D-pad/keyboard navigation module exists.
- Focus ring styles exist.

Notes:

- Needs real remote test for focus traps before `DONE`.

Implementation notes to add:

- Remote navigation layer implemented with focusable controls, focus refresh, keyboard/D-pad movement, visible focus styling, and Back routing through `window.asgardBack`.

Links:

- branch: `main`
- commit: 1.9 input/update release and later
- pull_request: empty

---

### ASG-003 — Home screen skeleton

Recommended status: `CODE_REVIEW`

Evidence:

- Home screen exists in `main.js`.
- Search, catalog, library, settings, player and related menu entries exist.
- Empty/loading/error style panels exist in several screens.

Notes:

- Some sections are mock/UX-only, not full data-backed implementations.

Implementation notes to add:

- Home screen skeleton is implemented in Web UI with hero, shelves, recommendations, continue watching mock row, and navigation links. Some sections remain mock data and require QA/functional hardening.

Links:

- branch: `main`
- commit: UX/UI release commits through current `main`
- pull_request: empty

---

### ASG-004 — Premium dark TV design system

Recommended status: `CODE_REVIEW`

Evidence:

- Premium dark UI exists.
- Large hero/cards/shelves/focus styles exist.
- UX/UI branch was requested by user, but no separate `ux/ui` branch exists in repository at time of check.

Notes:

- Needs visual QA on TV distance.

Implementation notes to add:

- Premium dark TV layout implemented with hero, shelves, cards, focus states, dark theme, cinematic visual language, and D-pad/touch-friendly controls. Requires UX QA on actual TV.

Links:

- branch: `main`
- commit: UX/UI commits in current `main`
- pull_request: empty

---

### ASG-006 — Global loading, empty, error and retry states

Recommended status: `IN_PROGRESS`

Evidence:

- Several screens include loading/empty/error panels.
- Torrent metadata retry placeholder exists.

Notes:

- Not every major screen has complete state coverage yet.

Implementation notes to add:

- Initial loading/empty/error/retry patterns exist in Web UI, including search empty state, diagnostic panels, and magnet metadata retry placeholder. Coverage is incomplete across all screens.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-010 — Mock catalog

Recommended status: `READY_FOR_QA`

Evidence:

- `main.js` includes mock catalog entries.
- Mock movies/series/detail/player flows exist.

Notes:

- Needs confirmation that app works without internet and mock video/player path behaves as expected.

Implementation notes to add:

- Offline mock catalog is implemented in `main.js` with movies, series, metadata-like fields, detail page and player demo navigation. QA must verify offline behavior.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-011 — Search screen

Recommended status: `CODE_REVIEW`

Evidence:

- Search screen exists.
- Search filters mock data by title/genre/summary.
- Empty state exists.

Notes:

- Search is currently local/mock and not real source-backed.

Implementation notes to add:

- Search screen implemented against mock catalog with input, results and empty state. Real source-backed search remains separate work.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-020 — Movie detail page

Recommended status: `CODE_REVIEW`

Evidence:

- Detail page exists in `main.js`.
- Shows title/year/genre/rating/description/CTA/seasons/actors mock data.

Notes:

- Real metadata and source availability not fully implemented.

Implementation notes to add:

- Mock movie/detail page UI implemented with poster, title, year, genre, rating, spoiler-free style description, recommendation reason, watch/trailer/list actions and actor mock list. Real metadata/source data still pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-021 — Series detail page with seasons and episodes

Recommended status: `IN_PROGRESS`

Evidence:

- Episodes screen exists.
- Series mock cards exist.
- Some season chips are shown on detail page.

Notes:

- Full watched state, per-season/per-episode data and real tracking are not complete.

Implementation notes to add:

- Initial series/episodes UI skeleton exists with mock series, episode list and season chips. Full episode model, watched state and continue-next-episode behavior are not complete.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-022 — Actors, filmography and trailers

Recommended status: `IN_PROGRESS`

Evidence:

- Actor mock list exists.
- Trailer button exists with placeholder toast.

Notes:

- Actor pages, filmography and real trailers not implemented.

Implementation notes to add:

- Actor and trailer UI placeholders exist. Actor page, filmography data and real trailer playback are pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-030 — Manual source management

Recommended status: `IN_PROGRESS`

Evidence:

- Sources screen exists.
- Textarea-based source editing exists in earlier/source modules.
- Source helper modules exist.

Notes:

- Full add/edit/delete/enable/disable structured UI is not complete.

Implementation notes to add:

- Basic sources UI and parser/helper modules exist. Full structured source CRUD and source health metadata are not complete.

Links:

- branch: `main`
- commit: source manager release commits
- pull_request: empty

---

### ASG-031 — TXT source import

Recommended status: `CODE_REVIEW`

Evidence:

- `sources.js` parser exists.
- Comments/empty rows/validation are supported.
- Sources persistence bridge exists.

Notes:

- File picker/import UX may still be incomplete; raw TXT editing/parser is implemented.

Implementation notes to add:

- TXT-style source parsing, validation preview and persistence helpers exist. Direct file picker/import UX still needs hardening.

Links:

- branch: `main`
- commit: source manager release commits
- pull_request: empty

---

### ASG-034 — Legal-safe source architecture

Recommended status: `READY_FOR_QA`

Evidence:

- No bundled questionable catalogs were added.
- Release notes explicitly state no bundled catalogs/mirror search/bypass features.
- User source disclaimer exists for magnet/torrent flow.

Notes:

- Needs audit of APK assets before `DONE`.

Implementation notes to add:

- Current implementation avoids bundled questionable catalogs, mirror search, DRM/Cloudflare/captcha bypass and labels user-provided magnet/torrent content as `User Source / Unknown Rights`. Requires release asset audit.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-040 — Embedded player

Recommended status: `READY_FOR_QA`

Evidence:

- `PlayerActivity.kt` exists.
- ExoPlayer dependency exists.
- Basic play/pause/seek/back persistence logic exists.

Notes:

- Needs device validation and player error QA.

Implementation notes to add:

- Embedded ExoPlayer Activity implemented with media URL handoff, play/pause, seek keys and progress save on pause/destroy. QA must verify on Android TV device.

Links:

- branch: `main`
- commit: player release commits
- pull_request: empty

---

### ASG-041 — Timeline seek and timecode navigation

Recommended status: `IN_PROGRESS`

Evidence:

- PlayerActivity supports D-pad left/right seek and media rewind/fast-forward.
- Web player mock shows timeline/time labels.

Notes:

- Exact timecode navigation and full native timeline UI are not complete.

Implementation notes to add:

- Basic seek controls exist in native PlayerActivity and mock Web player UI. Exact timecode navigation and complete timeline UI remain pending.

Links:

- branch: `main`
- commit: player release commits
- pull_request: empty

---

### ASG-042 — Continue watching

Recommended status: `IN_PROGRESS`

Evidence:

- Watch progress bridge exists.
- PlayerActivity saves position on pause/destroy.
- Continue watching mock row exists.

Notes:

- Full continue/start-over prompt and series resume logic are not complete.

Implementation notes to add:

- Watch progress persistence exists and PlayerActivity saves progress. Continue watching UI exists but full resume UX and series episode logic are incomplete.

Links:

- branch: `main`
- commit: persistence/player release commits
- pull_request: empty

---

### ASG-050 — QR import from phone

Recommended status: `IN_PROGRESS`

Evidence:

- QR import screen placeholder exists.

Notes:

- Actual local server/session/token/phone page not implemented.

Implementation notes to add:

- QR import UI placeholder exists, but local phone import server, session expiry and TV confirmation flow are not implemented.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-060 — AI summary without spoilers

Recommended status: `IN_PROGRESS`

Evidence:

- AI подбор screen and summary/recommendation mock UI exist.

Notes:

- No real AI provider/endpoint integration yet.

Implementation notes to add:

- AI summary/recommendation UI placeholders exist with spoiler-free copy style. Real AI provider and fallback behavior are pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-061 — Why you may like this

Recommended status: `IN_PROGRESS`

Evidence:

- Recommendation reason copy exists on cards/details/AI screen.

Notes:

- Currently mock/static, not computed from profile/history.

Implementation notes to add:

- Static why-you-may-like-this explanations exist in mock UI. Dynamic profile/history-based recommendation logic remains pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-062 — AI movie picker

Recommended status: `IN_PROGRESS`

Evidence:

- AI подбор screen exists.

Notes:

- Mood picker and 5-10 generated suggestions are not complete.

Implementation notes to add:

- AI picker UI shell exists. Mood options and real suggestion generation are pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-063 — New episodes and upcoming releases

Recommended status: `IN_PROGRESS`

Evidence:

- Episodes screen and library calendar mock exist.

Notes:

- Real tracking/release dates are not implemented.

Implementation notes to add:

- New episodes and calendar mock UI exists. Real metadata/calendar provider integration is pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-070 — Favorites

Recommended status: `IN_PROGRESS`

Evidence:

- Favorites bridge methods exist in Android.
- Add/remove/list helpers exist in Web store.

Notes:

- Full favorites screen and integration from all detail/list surfaces need QA/hardening.

Implementation notes to add:

- Favorites persistence bridge and store helpers exist. Full UX integration and QA are pending.

Links:

- branch: `main`
- commit: persistence release commits
- pull_request: empty

---

### ASG-072 — Viewing history

Recommended status: `IN_PROGRESS`

Evidence:

- History bridge methods exist.
- History store helpers exist.

Notes:

- Full disable/history management UX not complete.

Implementation notes to add:

- Viewing history persistence bridge and Web helpers exist. Full management screen and disable-history option are pending.

Links:

- branch: `main`
- commit: persistence release commits
- pull_request: empty

---

### ASG-TOR-001 — Magnet link input

Recommended status: `CODE_REVIEW`

Evidence:

- `torrent.js` added.
- Magnet parser validates `magnet:?`, `xt=urn:btih`, info hash format.
- Extracts `dn`, `tr`, `ws`.
- Torrent task persistence bridge exists.
- Torrent screen and diagnostics exist.
- Legal/user-controlled disclaimer exists.
- Metadata placeholder supports retry and safe timeout state.

Notes:

- QR import receiving magnet links is not yet connected.
- Real metadata engine is not implemented yet; implementation intentionally uses a safe placeholder.

Implementation notes to add:

- User-provided magnet input implemented in Web UI with validation, clear errors, persistent task list, legal/user-controlled disclaimer and metadata retry placeholder. Implementation differs from full requirement because QR import integration and real torrent metadata engine are not implemented yet.

Links:

- branch: `main`
- commit: `e6dde5c6cef229e46c6f4489db86b80ac5132ee1`, plus bridge/module commits `a0cd6bd093560d95d37296369e8dfbe1e974e654`, `9e2b543800c357497c11143c95dba0a6f5681d57`
- pull_request: empty

---

### ASG-TOR-006 — Torrent buffer, cache and diagnostics

Recommended status: `IN_PROGRESS`

Evidence:

- Torrent Diagnostics screen exists.
- Diagnostics show invalid magnet, metadata timeout, attempts and rights status.

Notes:

- No real peers/speed/buffer/cache yet.

Implementation notes to add:

- Initial torrent diagnostics exist for validation, metadata timeout/retry and rights status. Real peer, speed, buffer, cache and storage diagnostics are pending.

Links:

- branch: `main`
- commit: `e6dde5c6cef229e46c6f4489db86b80ac5132ee1`
- pull_request: empty

---

### ASG-080 — Settings sections

Recommended status: `IN_PROGRESS`

Evidence:

- Settings screen exists with sections.

Notes:

- Settings actions are mostly placeholders.

Implementation notes to add:

- Settings structure UI exists with playback, parental control, profile, AI, cache/storage and source security sections. Functional settings pages remain pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

---

### ASG-090 — Diagnostics screen

Recommended status: `IN_PROGRESS`

Evidence:

- Diagnostics screen exists.
- Torrent Diagnostics exists.

Notes:

- Full internet/source/AI/player/cache/permissions checks are not implemented.

Implementation notes to add:

- Diagnostics UI skeleton exists and torrent-specific diagnostics are partially implemented. Full diagnostic checks are pending.

Links:

- branch: `main`
- commit: current `main`
- pull_request: empty

## Extra implemented functionality not clearly represented in backlog

Recommended new backlog item:

### ASG-UPD-001 — GitHub update check screen

Recommended status: `CODE_REVIEW`

Epic suggestion: Settings, Backup, Privacy and Security or Diagnostics/QA

Acceptance criteria suggestion:

- App can show current version.
- App can query GitHub Releases.
- App opens latest release page.
- App does not silently install APK.
- Failure state is visible.

Implementation notes:

- `updates.js` and Android `openExternalUrl()` implement GitHub Releases check and external release page opening. Full APK download/install flow is not implemented.

Links:

- branch: `main`
- commit: 1.9 update release commits
- pull_request: empty

## Next recommended development task

After safe backlog update, highest priority remaining TODO appears to be one of:

- `ASG-TOR-002 — Torrent file input`
- or earlier release 0.1 foundation tasks if the team wants strict release-order closure.

Given the user's current product direction around torrent/magnet, next practical task is:

`ASG-TOR-002 — Torrent file input`
