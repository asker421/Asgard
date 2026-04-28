# Asgard TV 2.2 — Torrent Metadata and File Selection

## Scope

Implements the next user-media backlog step:

- `ASG-TOR-003 — Torrent metadata and file selection`

Checked against:

- `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
- `docs/product/backlog.json`

## Added

### Torrent metadata model

- Added task file-list model.
- Added supported video extension detection:
  - mp4
  - mkv
  - avi
  - mov
  - m4v
  - webm
- Added file size formatting.
- Added default playable-file selection.
- Largest detected video file is selected by default.
- Non-video files are shown but not selected by default.

### Torrent screen UI

- `Torrent` screen now shows:
  - task status
  - metadata state
  - file list
  - file extension
  - file size
  - video / not video badge
  - selected file state
- Added `Load metadata` action.
- Added manual file selection.
- Added readable error when non-video file is selected.

### Diagnostics

- Torrent diagnostics now includes:
  - number of files
  - number of video files
  - selected file index
  - selected file object
  - task status
  - last error

## Important limitation

This release adds the safe metadata/file-selection layer and UI model. It does **not** add a real bencode parser or real peer metadata retrieval yet.

For now, `Load metadata` creates a deterministic local mock file list from the task name so the UI, selection logic and diagnostics can be tested without P2P networking.

## Safety

No bundled torrent catalogs, mirror search, DRM bypass, Cloudflare bypass, captcha bypass or paid-access bypass were added.

## Next

Recommended next backlog task:

- `ASG-TOR-004 — Streaming-first torrent playback`
