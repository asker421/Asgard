# Asgard TV 2.1 — Torrent File Input

## Scope

Implements the next user-media backlog step after magnet input:

- `ASG-TOR-002 — Torrent file input`

UX/UI/CX rules were checked against:

- `docs/product/UX_UI_CX_INTERFACE_SPEC.md`

## Added

### Android native

- Version updated to `2.1.0` / `versionCode 21`.
- Android file picker for user-provided `.torrent` files.
- Android `ACTION_VIEW` intent support for torrent-like files.
- Pending torrent file import storage in `SharedPreferences`.
- Android bridge methods:
  - `pickTorrentFile()`
  - `getPendingTorrentFileImport()`
  - `clearPendingTorrentFileImport()`
- File metadata extraction where available:
  - display name
  - content URI
  - size in bytes
  - import source: `picker` or `intent`

### Web UI

- User media screen now supports both:
  - magnet links
  - `.torrent` files
- Added `.torrent` file picker action.
- Added selected file preview.
- Added `.torrent` validation:
  - Android returned URI must exist
  - file name or URI should indicate `.torrent`
  - empty file is rejected when size is known as zero
- Added `.torrent` task creation with status `metadata_pending`.
- User media task list now shows both magnet and torrent file tasks.
- Torrent diagnostics now includes:
  - task type
  - URI presence
  - file size
  - metadata timeout/retry state
  - rights status

## UX/CX alignment

- TV-first, large controls.
- Visible focus remains supported through existing `focusable` classes.
- One primary path on the user media screen: import user-provided legal media.
- No dead end: invalid file shows a readable error; selected file can be previewed; retry placeholder exists.
- Legal/user-controlled responsibility message remains visible on the media import screen.

## Not included yet

- No real torrent bencode parser yet.
- No real peer metadata retrieval yet.
- No file list inside torrent yet.
- No embedded P2P streaming engine yet.
- No bundled catalogs, mirrors, DRM bypass, Cloudflare bypass, or captcha bypass.

## Next

Recommended next backlog task:

- `ASG-TOR-003 — Torrent metadata and file selection`
