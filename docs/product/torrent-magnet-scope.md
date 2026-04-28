# Asgard TV — Torrent and Magnet Playback Scope

This file captures the torrent/magnet playback scope for Asgard TV.

Important product rule: Asgard TV must not bundle pirated catalogs or prohibited sources. Torrent and magnet support is for user-provided legal content, public-domain content, private media, Linux ISOs, test torrents and other lawful use cases.

---

# Product Goal

Allow a user to paste/open a legal `.torrent` file or `magnet:` link and stream/play the selected video file inside Asgard TV, with Android TV remote support and clear diagnostics.

---

# Epic: Torrent / Magnet Engine

## ASG-TOR-001 — Magnet link input

Priority: Critical  
Status: TODO  
Release: 0.4+

As a user, I want to paste or import a `magnet:` link so the app can load torrent metadata and let me choose a playable video file.

Acceptance criteria:

- User can paste a magnet link manually.
- User can import a magnet link through phone QR import.
- App validates magnet URI format.
- Invalid magnet link shows clear error.
- Magnet metadata loading has timeout and retry.
- App does not crash if metadata cannot be loaded.

---

## ASG-TOR-002 — Torrent file input

Priority: Critical  
Status: TODO  
Release: 0.4+

As a user, I want to open a `.torrent` file so Asgard TV can load metadata and show available files.

Acceptance criteria:

- App can receive/import `.torrent` file.
- App parses torrent metadata.
- Invalid `.torrent` file shows clear error.
- Torrent file import works through local file picker or QR/phone bridge where possible.
- No crash on malformed file.

---

## ASG-TOR-003 — Torrent metadata screen

Priority: High  
Status: TODO  
Release: 0.5

As a user, I want to see torrent metadata before playback so I can choose the right file.

Acceptance criteria:

- Shows torrent name.
- Shows file list.
- Shows file sizes.
- Highlights likely playable video files.
- Allows user to choose file when torrent contains multiple files.
- Shows peers/seeds status if engine provides it.

---

## ASG-TOR-004 — Select video file from multi-file torrent

Priority: Critical  
Status: TODO  
Release: 0.5

As a user, I want to select the correct video file in a multi-file torrent.

Acceptance criteria:

- Video files are detected by extension and/or MIME type.
- Common video extensions are supported: mp4, mkv, avi, mov, m4v, webm.
- Non-video files are visible but not selected by default.
- Largest video file can be suggested as default.
- User can manually choose another file.

---

## ASG-TOR-005 — Streaming-first playback

Priority: Critical  
Status: TODO  
Release: 0.5

As a user, I want to start watching before the full torrent is downloaded when enough buffer is available.

Acceptance criteria:

- Torrent engine supports sequential download / streaming mode.
- Player starts only when enough initial buffer is available.
- Buffering state is visible.
- Playback resumes after buffer refill.
- App does not freeze while downloading.
- User can cancel playback/download.

---

## ASG-TOR-006 — Download progress and buffer UI

Priority: High  
Status: TODO  
Release: 0.5

As a user, I want to understand torrent download and buffer status.

Acceptance criteria:

- Shows metadata loading state.
- Shows connecting to peers state.
- Shows download speed.
- Shows buffer progress.
- Shows peers/seeds count where available.
- Shows estimated readiness for playback where possible.
- Shows clear message when no peers are available.

---

## ASG-TOR-007 — Torrent playback integration with player

Priority: Critical  
Status: TODO  
Release: 0.5

As a user, I want torrent video to play in the same Asgard TV player as other videos.

Acceptance criteria:

- Torrent stream opens in embedded player.
- Play/pause works.
- Back exits safely.
- Player errors are handled.
- Continue Watching works where technically possible.
- Timeline seek works when downloaded/buffered range supports it.
- Unsupported seek shows clear limitation instead of crashing.

---

## ASG-TOR-008 — Torrent cache and storage management

Priority: High  
Status: TODO  
Release: 0.6

As a user, I want to control how much storage torrent playback can use.

Acceptance criteria:

- Torrent cache location is defined.
- User can set cache size limit.
- User can clear torrent cache.
- App shows used storage.
- App handles low-storage condition safely.
- Partial downloads can be removed.

---

## ASG-TOR-009 — Torrent session lifecycle

Priority: High  
Status: TODO  
Release: 0.6

As a user, I want torrent activity to stop safely when I leave playback or close the app.

Acceptance criteria:

- Torrent session can pause/resume.
- Torrent session stops when user cancels.
- App does not keep downloading unexpectedly without user-visible state.
- Background behavior is configurable or clearly documented.
- Network resources are released on exit.

---

## ASG-TOR-010 — Torrent diagnostics

Priority: High  
Status: TODO  
Release: 0.6

As a tester, I want torrent diagnostics to understand why playback does not start.

Acceptance criteria:

- Diagnostics show magnet parse status.
- Diagnostics show metadata status.
- Diagnostics show peer connection status.
- Diagnostics show download speed.
- Diagnostics show buffer status.
- Diagnostics show selected file.
- Diagnostics show player handoff status.
- Error categories are clear: invalid magnet, metadata timeout, no peers, unsupported codec, storage error, player error.

---

## ASG-TOR-011 — Codec and container compatibility

Priority: High  
Status: TODO  
Release: 0.6

As a user, I want to know if a torrent video can play on my Android TV box.

Acceptance criteria:

- App detects common containers where possible.
- App handles unsupported codec errors clearly.
- App can offer external player fallback.
- Error message explains that the file may require another player or codec.

---

## ASG-TOR-012 — Legal and safety guardrails

Priority: Critical  
Status: TODO  
Release: 0.4+

As a product owner, I want torrent support to be legally safe and user-controlled.

Acceptance criteria:

- APK does not include pirated torrent catalogs.
- App does not promote copyrighted infringement.
- Torrent/magnet support is user-input based.
- Disclaimer exists in settings/import screen.
- Example files use public-domain/test/legal examples only.
- Test mode is separate from production mode.

---

# Recommended Engine Evaluation

The coding branch should evaluate Android-compatible torrent approaches before implementation.

Evaluation criteria:

- Android TV compatibility.
- Kotlin/Java interoperability.
- Streaming / sequential download support.
- Magnet metadata support.
- Torrent file support.
- Ability to select file in multi-file torrent.
- Cache/storage control.
- License compatibility.
- Stability on low-powered devices like Mi Box S.

Potential implementation options should be documented by the coding branch before choosing the engine.

---

# Definition of Done for Torrent/Magnet Playback

Torrent/magnet playback is not considered done until:

1. Magnet input works.
2. `.torrent` file input works.
3. Multi-file selection works.
4. Streaming-first playback works or limitation is clearly documented.
5. Buffer/download state is visible.
6. Player integration works.
7. Cache can be cleared.
8. No crash on invalid magnet, dead torrent, no peers, unsupported codec or low storage.
9. Diagnostics explain failures.
10. Legal-safe guardrails are in place.
