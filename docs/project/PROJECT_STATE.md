# Asgard TV — Project State

Last updated: 2026-04-30

## Source of Truth

Main backlog:

`docs/product/backlog.json`

Prioritized status layer:

`docs/product/backlog-prioritized-status-2026-04-30.json`

## Current Product Stage

Early alpha / working prototype.

## Current Build Status

Unknown until Android TV APK build/install smoke test is completed.

## What Already Exists

- Android TV project foundation
- WebView shell
- Native Android bridge
- ExoPlayer PlayerActivity
- Remote navigation layer
- Premium dark TV UI foundation
- Home screen skeleton
- Mock catalog
- Mock search
- Movie detail page
- Series/episodes skeleton
- TXT source parser
- Source diagnostics
- JacRed/Torznab parser foundation
- TorrServer adapter foundation
- Favorites/history/progress persistence foundation
- Magnet link validation
- .torrent file picker/import foundation
- Torrent diagnostics/state UI
- GitHub Releases update check

## Main Gaps

- Real Android TV / Mi Box S QA
- Stable APK release validation
- Real .torrent metadata/TorrServer playback flow
- Real source-backed search hardening
- Real Continue Watching UX
- QR phone import
- Real AI provider
- Full Favorites / Watchlist / History screens
- Full diagnostics
- Installation guide for non-programmer

## Current Highest Priority

1. Run Android TV build/install smoke test
2. Validate remote navigation on real device
3. Validate ExoPlayer playback on device
4. Complete .torrent / magnet → TorrServer → stream URL → ExoPlayer flow
5. Complete Continue Watching UX
6. Harden source search and source manager
7. Implement QR phone import
8. Add real AI provider later

## Do Not Do

- Do not create alternative backlog files.
- Do not use docs/BACKLOG.md as source of truth.
- Do not overwrite backlog.json if GitHub connector returns it truncated.
- Do not add bundled pirated sources.
- Do not silently install APK updates.
