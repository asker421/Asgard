# Asgard TV 2.3 — Streaming-first Playback Foundation

## Scope

Implements the safe foundation for:

- `ASG-TOR-004 — Streaming-first torrent playback`

Checked before implementation:

- `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
- `docs/product/backlog.json`

## Added

### Version

- Android version updated to `2.3.0` / `versionCode 23`.

### Streaming state model

Added streaming-first state helpers in `torrent.js`:

- `startStream(task)`
- `advanceStream(task)`
- `pauseStream(task)`
- `cancelStream(task)`
- `simulateNoPeers(task)`
- `canStream(task)`

Streaming state includes:

- selected file
- buffer percent
- downloaded percent
- speed kbps
- peers
- seeds
- local stream URL placeholder
- player handoff readiness flag
- clear limitation message

### UI extension

Added `stream.js` instead of rewriting the large `main.js` file.

`stream.js` patches the Torrent screen with:

- Start buffer
- Advance buffer
- Pause
- Cancel
- No peers test
- Buffer progress bar
- Download progress state
- Peers / seeds / speed display
- Human-readable limitation explaining that real P2P engine is not attached yet

### Diagnostics

Torrent diagnostics now includes stream state:

- buffer percent
- downloaded percent
- peers
- seeds
- speed
- no peers state
- selected file
- last error

## Important limitation

This release does **not** implement real P2P torrent streaming yet.

It adds the safe streaming-first UX/state layer so the app can represent buffering, ready/cancel/pause/no-peers states without freezing or crashing. The next native module should provide real local stream server / ExoPlayer handoff.

## Safety

No bundled torrent catalogs, mirror search, DRM bypass, Cloudflare bypass, captcha bypass or paid-access bypass were added.

## Next

Recommended next backlog task:

- `ASG-TOR-005 — Torrent player integration and seeking`
