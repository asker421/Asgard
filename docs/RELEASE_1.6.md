# Asgard TV 1.6 — Modular Sources UI Build

## Added

- Modular Web UI split into smaller files.
- Android WebView assets use `ui.js`, `sources.js`, `main.js`.
- iPhone/Safari preview uses the same modular structure.
- Basic sources.txt parser and preview.
- Android JavaScript bridge for asset reading, toast, player launch and storage info.
- ExoPlayer D-pad controls.
- Direct GitHub Actions APK build.

## Notes

This is the first repo-native modular build. It replaces the previous archive-first approach.
