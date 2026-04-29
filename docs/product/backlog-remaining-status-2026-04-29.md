# Asgard TV — Backlog Remaining Product Status

Date: 2026-04-29

Source of truth remains: `docs/product/backlog.json`.

This file is a product-level status report derived from:

- `docs/product/backlog.json`
- `docs/product/backlog-sync-2026-04-28.md`
- current code state described in the sync report

Important: this file is not an alternative backlog. It summarizes what is already implemented, partially implemented, and still missing by product area.

---

# Summary

Current product maturity: early alpha / working prototype.

The app already has:

- Android TV project foundation
- WebView shell
- TV navigation layer
- premium dark UI foundation
- home screen skeleton
- mock catalog
- mock search
- mock detail pages
- basic embedded player foundation
- basic progress persistence
- source TXT parser foundation
- favorites/history persistence foundation
- magnet link validation UI
- torrent diagnostics placeholder
- settings skeleton
- diagnostics skeleton
- GitHub Releases update check foundation

The app still needs major completion in:

- real source-backed search
- full source manager
- QR phone import
- real AI provider integration
- real torrent engine
- `.torrent` file input
- full player QA on Android TV device
- real Continue Watching UX
- full favorites/watchlist/history screens
- diagnostics implementation
- release APK QA and installation guide

---

# Product Areas

## 1. Android TV Shell

Status: READY_FOR_QA

Already done:

- Android project exists.
- APK build foundation exists.
- AndroidManifest and launcher metadata exist.
- MainActivity loads local WebView assets.
- App resources exist.

Remaining:

- Verify APK build in CI.
- Install on Android TV / Mi Box S.
- Verify launch without internet.
- Verify no first-launch crash.

Related backlog items:

- ASG-001 should be updated to READY_FOR_QA.

---

## 2. Remote Navigation

Status: READY_FOR_QA

Already done:

- `input.js` exists.
- D-pad / keyboard navigation layer exists.
- Focusable controls exist.
- Focus ring styles exist.
- Back routing exists through `window.asgardBack`.

Remaining:

- Test on real remote.
- Check focus traps.
- Check disappearing focus.
- Validate Back behavior on all screens.

Related backlog items:

- ASG-002 should be updated to READY_FOR_QA.

---

## 3. Home Screen

Status: CODE_REVIEW

Already done:

- Home screen exists.
- Hero section exists.
- Shelves exist.
- Recommendations exist.
- Continue Watching mock row exists.
- Navigation links exist.

Remaining:

- Replace mock data with real data where needed.
- Connect to actual favorites/history/watchlist/new episodes.
- TV visual QA.

Related backlog items:

- ASG-003 should be updated to CODE_REVIEW.

---

## 4. Premium UI / Design System

Status: CODE_REVIEW

Already done:

- Premium dark UI exists.
- Hero/cards/shelves exist.
- Focus styling exists.
- Cinematic TV visual language exists.

Remaining:

- TV distance readability QA.
- Consistency pass across screens.
- Polish loading/empty/error states.

Related backlog items:

- ASG-004 should be updated to CODE_REVIEW.

---

## 5. Loading / Empty / Error States

Status: IN_PROGRESS

Already done:

- Some loading/empty/error panels exist.
- Search empty state exists.
- Diagnostics-style panels exist.
- Magnet metadata retry placeholder exists.

Remaining:

- Add consistent states to all major screens.
- Add retry UX everywhere relevant.
- Remove technical messages from user-facing UI.

Related backlog items:

- ASG-006 should be updated to IN_PROGRESS.

---

## 6. Mock Catalog

Status: READY_FOR_QA

Already done:

- Mock movies exist.
- Mock series exist.
- Mock metadata exists.
- Mock detail page exists.
- Mock player navigation exists.

Remaining:

- Verify offline behavior.
- Verify mock mode separation from production.

Related backlog items:

- ASG-010 should be updated to READY_FOR_QA.

---

## 7. Search

Status: CODE_REVIEW for mock search, TODO/IN_PROGRESS for real source search

Already done:

- Search screen exists.
- Input exists.
- Mock catalog search exists.
- Empty state exists.

Remaining:

- Real source-backed search.
- Unified search results.
- Deduplication/ranking.
- Filters.
- Voice search.
- Slow/broken source handling.

Related backlog items:

- ASG-011 should be updated to CODE_REVIEW.
- ASG-012 remains TODO or IN_PROGRESS depending on source integration.
- ASG-013 remains TODO.

---

## 8. Movie Detail Page

Status: CODE_REVIEW

Already done:

- Detail page exists.
- Title/year/genre/rating/description are shown.
- CTA actions exist.
- Actor mock list exists.
- Recommendation-style copy exists.

Remaining:

- Real metadata.
- Real source availability.
- Real actors.
- Real trailer playback.
- Complete favorites/watchlist integration.

Related backlog items:

- ASG-020 should be updated to CODE_REVIEW.

---

## 9. Series / Episodes

Status: IN_PROGRESS

Already done:

- Series mock cards exist.
- Episodes screen exists.
- Season chips exist.

Remaining:

- Full season/episode model.
- Watched state per episode.
- Continue next episode.
- Release dates.
- Real history integration.

Related backlog items:

- ASG-021 should be updated to IN_PROGRESS.

---

## 10. Actors / Trailers

Status: IN_PROGRESS

Already done:

- Actor mock list exists.
- Trailer button exists.
- Placeholder/toast exists.

Remaining:

- Actor page.
- Filmography.
- Real trailer data.
- Trailer playback.

Related backlog items:

- ASG-022 should be updated to IN_PROGRESS.

---

## 11. Sources and TXT Import

Status: IN_PROGRESS / CODE_REVIEW

Already done:

- Sources UI foundation exists.
- `sources.js` exists.
- TXT parser exists.
- Empty/comment rows are handled.
- Validation exists.
- Persistence helpers exist.

Remaining:

- Full source CRUD.
- Enable/disable source.
- Source health status.
- Last checked timestamp.
- Import file picker UX.
- Import summary.
- Source diagnostics.

Related backlog items:

- ASG-030 should be updated to IN_PROGRESS.
- ASG-031 should be updated to CODE_REVIEW.
- ASG-032 likely remains TODO/IN_PROGRESS unless adapter contract is fully implemented.
- ASG-033 remains TODO/IN_PROGRESS.
- ASG-034 should be updated to READY_FOR_QA.

---

## 12. Embedded Player

Status: READY_FOR_QA

Already done:

- `PlayerActivity.kt` exists.
- ExoPlayer dependency exists.
- Media URL handoff exists.
- Play/pause exists.
- Seek keys exist.
- Progress save on pause/destroy exists.

Remaining:

- Device QA.
- Bad stream handling QA.
- Codec/container QA.
- Back behavior QA.

Related backlog items:

- ASG-040 should be updated to READY_FOR_QA.

---

## 13. Timeline Seek and Continue Watching

Status: IN_PROGRESS

Already done:

- D-pad seek exists in native player.
- Web mock timeline exists.
- Watch progress bridge exists.
- Player saves position.
- Continue Watching mock row exists.

Remaining:

- Full native timeline UI.
- Exact timecode navigation.
- Continue/Start Over prompt.
- Real Continue Watching list.
- Series resume logic.

Related backlog items:

- ASG-041 should be updated to IN_PROGRESS.
- ASG-042 should be updated to IN_PROGRESS.

---

## 14. QR Phone Import

Status: IN_PROGRESS

Already done:

- QR import UI placeholder exists.

Remaining:

- Real QR session.
- Local server / bridge.
- Phone import page.
- One-time token.
- Session expiry.
- TV confirmation.
- TXT/magnet import through QR.

Related backlog items:

- ASG-050 should be updated to IN_PROGRESS.
- ASG-051 remains TODO.

---

## 15. AI Assistant

Status: IN_PROGRESS

Already done:

- AI picker screen exists.
- Summary/recommendation mock UI exists.
- Static why-you-may-like-this copy exists.
- New episodes/calendar mock UI exists.

Remaining:

- Real AI provider.
- API key settings.
- Real AI summary.
- Real mood picker suggestions.
- Profile/history-based recommendation logic.
- Real new episode/release metadata.
- Fallback behavior when AI unavailable.

Related backlog items:

- ASG-060 should be updated to IN_PROGRESS.
- ASG-061 should be updated to IN_PROGRESS.
- ASG-062 should be updated to IN_PROGRESS.
- ASG-063 should be updated to IN_PROGRESS.
- ASG-064 remains TODO.

---

## 16. Favorites / Watchlist / History

Status: IN_PROGRESS

Already done:

- Favorites bridge methods exist.
- Favorites store helpers exist.
- History bridge methods exist.
- History store helpers exist.
- Some progress/history persistence exists.

Remaining:

- Full Favorites screen.
- Full Watchlist screen.
- Full History screen.
- Add/remove integration everywhere.
- Clear history.
- Disable history.
- Future releases in Watchlist.

Related backlog items:

- ASG-070 should be updated to IN_PROGRESS.
- ASG-071 remains TODO or IN_PROGRESS if placeholders exist.
- ASG-072 should be updated to IN_PROGRESS.
- ASG-073 remains TODO.

---

## 17. Torrent / Magnet

Status: CODE_REVIEW for magnet input; IN_PROGRESS for diagnostics; TODO for torrent engine

Already done:

- `torrent.js` exists.
- Magnet parser exists.
- `magnet:?` validation exists.
- `xt=urn:btih` validation exists.
- Extracts display name, trackers and web seeds.
- Torrent task persistence bridge exists.
- Torrent screen exists.
- Torrent diagnostics exists.
- Legal/user-controlled disclaimer exists.
- Metadata retry/timeout placeholder exists.

Remaining:

- `.torrent` file input.
- Real torrent metadata engine.
- Peer discovery.
- Multi-file torrent file selection.
- Streaming-first playback.
- Buffer state.
- Download speed.
- Seeds/peers.
- Cache management.
- Low-storage handling.
- Real torrent-to-player handoff.
- Seek limitations.
- Codec/container handling.

Related backlog items:

- ASG-TOR-001 should be updated to CODE_REVIEW.
- ASG-TOR-002 remains TODO.
- ASG-TOR-003 remains TODO.
- ASG-TOR-004 remains TODO.
- ASG-TOR-005 remains TODO.
- ASG-TOR-006 should be updated to IN_PROGRESS.

---

## 18. Settings

Status: IN_PROGRESS

Already done:

- Settings screen exists.
- Sections exist for playback, parental/profile, AI, cache/storage and source security.

Remaining:

- Make settings functional.
- Player settings.
- AI settings.
- Source settings.
- Storage/cache actions.
- Backup/import/export.
- Privacy controls.

Related backlog items:

- ASG-080 should be updated to IN_PROGRESS.
- ASG-081 remains TODO.
- ASG-082 remains TODO.

---

## 19. Diagnostics

Status: IN_PROGRESS

Already done:

- Diagnostics UI skeleton exists.
- Torrent diagnostics partially implemented.
- Invalid magnet / timeout / rights status diagnostics exist.

Remaining:

- Internet check.
- Source check.
- AI check.
- Player check.
- Cache check.
- Permission check.
- App version/storage check.
- Logs export.
- Developer mode.

Related backlog items:

- ASG-090 should be updated to IN_PROGRESS.
- ASG-091 remains TODO.
- ASG-092 remains TODO.

---

## 20. Update Check

Status: CODE_REVIEW

Already done:

- `updates.js` exists.
- Android `openExternalUrl()` exists.
- GitHub Releases check exists.
- External release page opening exists.

Remaining:

- Add `ASG-UPD-001` to backlog.json when safe full-file edit is possible.
- Full APK download/install flow is not implemented.
- Failure state QA.
- User confirmation before APK install must remain mandatory.

Related backlog items:

- ASG-UPD-001 should be added under EPIC-011 or EPIC-012.

---

## 21. Release / Installation

Status: TODO / IN_PROGRESS foundation only

Already done:

- Build foundation exists.
- Some update/release helper logic exists.

Remaining:

- Stable APK artifact.
- Smoke test.
- Mi Box S validation.
- Installation guide.
- Changelog discipline.
- Update path without data loss.

Related backlog items:

- ASG-100 remains TODO.
- ASG-101 remains TODO.

---

# Highest Priority Remaining Product Work

## For demo APK

1. Validate Android TV APK build/install.
2. Validate remote navigation on real TV/box.
3. Harden Home + mock catalog + detail page.
4. Validate embedded player on device.
5. Finish real Continue Watching UX.
6. Finish TXT import UX.
7. Harden source manager.
8. Add basic diagnostics.

## For torrent/magnet direction

1. ASG-TOR-002 — Torrent file input.
2. Real torrent metadata engine.
3. Multi-file torrent selection.
4. Streaming-first playback.
5. Buffer/cache/diagnostics.

## For premium product

1. Real source-backed search.
2. QR phone import.
3. Real AI provider.
4. New episodes/upcoming releases data.
5. Full Favorites/Watchlist/History screens.
6. Settings/backup/privacy.
7. Release APK and installation guide.

---

# Backlog Update Note

`docs/product/backlog.json` should be updated with the statuses listed above when the full file can be safely edited without truncation. The current GitHub connector may truncate `backlog.json` after ASG-092, so direct replacement must be avoided unless full content is available.
