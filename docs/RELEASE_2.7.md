# Asgard TV 2.7 — JacRed / Torznab / TorrServer Architecture

## Scope

This release restructures Asgard TV toward the external parser architecture:

Asgard TV -> user-configured JacRed/Torznab-compatible parser -> user-configured TorrServer -> ExoPlayer.

Asgard does not include site-specific parsers.

## Added

### Parser & TorrServer settings

Added `Settings -> Parser & TorrServer` screen with:

- Parser type: JacRed
- JacRed Base URL
- JacRed API key
- TorrServer URL
- Test JacRed
- Test TorrServer
- Save settings
- Clear settings

API key is masked in UI and not printed fully in diagnostics.

### JacRed / Torznab adapter

Added `jacred-adapter.js`:

- JacRed-compatible source support.
- Torznab-compatible XML/RSS parsing.
- JSON fallback parser.
- API endpoint discovery.
- HTML UI detection with diagnostics message.
- Normalized torrent result model.

### TorrServer adapter

Added `torrserver-adapter.js`:

- Test connection.
- Add magnet.
- Add torrent URL.
- List torrents.
- Get metadata.
- Get files.
- Select largest video file.
- Build stream URL.
- Remove task.

### Search integration

Search now routes `jacred` / `torznab` sources through the external parser adapter.

Search results show:

- title
- quality
- size
- seeders
- peers
- date
- source/indexer
- Add to TorrServer
- Open external
- Diagnostics

No autoplay is performed.

### User confirmation

Before sending a result to TorrServer, the user must confirm:

`I confirm I have rights to access this content.`

### Sources cleanup

Bundled site-specific placeholder sources were removed from `sources.txt`.

The file now contains only public/open sources and disabled user-configured placeholders.

## Limitations

- TorrServer API variants may differ; additional endpoint compatibility may be needed after testing with the user's actual TorrServer.
- Stream URL format may need adjustment for the user's TorrServer version.
- Metadata/file selection UI is still basic.
- Android secure encrypted storage for the API key is not implemented yet; the key is masked in UI but currently stored in Web local storage.

## Manual QA

1. Open Settings.
2. Open Parser & TorrServer.
3. Enter JacRed Base URL.
4. Enter API key if needed.
5. Enter TorrServer URL.
6. Test JacRed.
7. Test TorrServer.
8. Add or enable a `jacred` source.
9. Open Search.
10. Search for a title.
11. Confirm results include title, size, seeders and peers where available.
12. Press Add to TorrServer.
13. Confirm rights dialog.
14. Verify TorrServer receives magnet/torrent URL.
15. Continue with metadata/files/playback validation.
