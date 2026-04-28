# Asgard TV 2.0 — Magnet Link Input

## Scope

Implements the first safe torrent/magnet task from product backlog:

- `ASG-TOR-001 — Magnet link input`

## Added

- Android version bump to `2.0.0` / `versionCode 20`.
- Android bridge persistence for user-provided magnet/torrent tasks:
  - `getTorrentTasks()`
  - `saveTorrentTasks()`
  - `addTorrentTask()`
  - `updateTorrentTask()`
  - `removeTorrentTask()`
  - `clearTorrentTasks()`
- New WebView module: `torrent.js`.
- Magnet URI validation:
  - checks `magnet:?`
  - requires `xt=urn:btih:<hash>`
  - validates 40 hex or 32 base32 info hash
  - extracts `dn`
  - extracts `tr`
  - extracts `ws`
- UX/UI updates:
  - menu item `Torrent`
  - menu item `Torrent Diagnostics`
  - legal/user-controlled usage disclaimer
  - clear validation output
  - safe metadata placeholder state
  - retry metadata placeholder
  - persistent task list
- Fixed UI helper compatibility after UX/UI changes by restoring `AsUI.hero()` and `AsUI.card()`.

## Not included yet

- No bundled torrent catalogs.
- No mirror search.
- No DRM bypass.
- No Cloudflare/captcha bypass.
- No captcha bypass.
- No full P2P streaming engine yet.
- No real peer metadata retrieval yet.
- No file selection inside torrent yet.

## Notes

The current release validates and stores user-provided legal magnet links and simulates metadata timeout/retry without crashing. Full P2P playback belongs to later backlog items.
