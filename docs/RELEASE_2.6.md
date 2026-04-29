# Asgard TV 2.6 — Source Diagnostics and Parser Preview

## Scope

This release improves user-source troubleshooting. It does not add bundled catalogs or bypass logic.

## Added

### Source result classification

Every parsed result is classified as:

- `playable` — direct video / HLS / stream URL likely playable by ExoPlayer
- `magnet` — magnet URI
- `torrent` — `.torrent` URL / torrent reference
- `link` — normal URL, not directly playable yet
- `not_playable` — unsupported or unclear result

### Better source reports

Each source query now returns:

- source name
- source type
- status
- parser used
- content type
- elapsed time
- result counts
- playable count
- magnet count
- torrent count
- link count
- error category

Error categories include:

- `Timeout`
- `Network/CORS blocked`
- `http_error`
- `empty`
- `disabled_or_invalid`

### Diagnostics UI

Added `source-diagnostics.js` and connected it from `index.html`.

The Diagnostics screen now shows:

- parsed `sources.txt` rows
- format errors
- enabled/disabled status
- per-source query reports
- parser status
- preview of found links
- counts by result type

## How to test

1. Add sources to `sources.txt` or through the app.
2. Open `Диагностика`.
3. Enter a test query or leave empty.
4. Press `Проверить источники`.
5. Review which sources return playable links and which fail with timeout/CORS/empty/parser errors.

## Important limitations

- If a site blocks WebView/fetch with CORS or requires Cloudflare/captcha/auth, the diagnostic will show that instead of bypassing it.
- Streaming-site page extraction is not fully implemented yet.
- Torrent/magnet playback remains experimental; this release only improves visibility into source results.

## Next recommended work

- Per-source advanced parser settings.
- Manual selector configuration for HTML sources.
- Native/backend adapter for sources blocked by WebView fetch.
- Player error overlay and better ExoPlayer diagnostics.
