# Asgard TV 2.5 — User Source Search and Playback

## Scope

This release connects the Search screen to user-provided sources from `sources.txt` / saved source config.

It focuses on user-controlled sources only. The app does not bundle catalogs, mirrors, bypass logic or protected sources.

## Added

### Source engine

`sources.js` now supports these source types:

- `direct_video`
- `hls`
- `direct_stream`
- `magnet`
- `torrent_url`
- `torrent_file`
- `magnet_list`
- `json`
- `api`
- `rss`
- `xml`
- `search_template`
- `archive`
- `commons`
- `official_youtube`

### Real source search

Search now queries enabled user sources instead of only filtering the demo catalog.

Supported behavior:

- `direct_video` / `hls` / direct stream URLs open in ExoPlayer.
- `magnet` results are added as Magnet tasks.
- `torrent_url` / `.torrent` references are added as Torrent tasks.
- `json` / `api` sources are normalized from common result arrays.
- `rss` / `xml` / HTML sources are parsed for links.
- `search_template` replaces `{query}` and performs a request.
- One broken source does not break the whole search.
- Each source request has a timeout.
- Results show source name, source type and `User Source / Unknown Rights` badge.

### UI

Added `source-search.js` and connected it from `index.html`.

The Search screen now shows:

- large TV search input;
- number of active sources;
- source report summary;
- normalized results;
- source errors in readable diagnostic JSON;
- direct Watch action;
- Magnet task action;
- Torrent task action;
- Open link fallback.

### Stability fix

Fixed a JS naming collision where `AsApp.catalog` was used both as catalog data and as a Catalog screen function. Open demo catalog data now lives in `AsApp.openCatalogData`, while `AsApp.catalog()` remains the Catalog screen.

## Source format examples

```txt
My MP4 Movie | direct_video | https://example.com/movie.mp4 | ru | true | 1 | false | user source
My HLS Stream | hls | https://example.com/playlist.m3u8 | ru | true | 2 | false | user source
My Magnet | magnet | magnet:?xt=urn:btih:... | ru | true | 3 | false | user source
My Torrent | torrent_url | https://example.com/file.torrent | ru | true | 4 | false | user source
My Search | search_template | https://example.com/search?q={query} | ru | true | 5 | false | user source
```

## Limitations

- Auth-required sources are not queried yet because secure secret storage is not complete.
- Search templates can only parse accessible HTML/JSON/XML responses that do not require bypass logic.
- The app does not bypass DRM, captcha, Cloudflare or paid access.
- Torrent playback remains experimental; magnet/torrent results become tasks, not real streaming yet.

## Next recommended work

- Improve Sources screen preview/save summary.
- Add per-source diagnostics page.
- Add player error handling overlay.
- Add real TXT import summary with added/skipped/invalid counters.
