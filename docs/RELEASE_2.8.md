# Asgard TV 2.8 — ParserManager Fallback and GitHub Update UI

## Scope

This release extends the external-parser architecture and remote update flow without adding site-specific parsers inside Asgard.

## Parser / TorrServer

Added safe parser configuration and management:

- `parsers.json` with user-configured placeholders only.
- `parser_manager.js` with bundled config loading, optional remote JSON config loading, user parser merge, parser health checks, active parser selection and fallback.
- Parser settings UI now supports:
  - Test parser
  - Test all parsers
  - Select best parser
  - Use this parser
  - Clear active parser/settings
- Search now tries the active/best parser first and can fallback through configured parsers without infinite looping.

## JacRed / Torznab

- `jacred-adapter.js` remains the external JacRed/Torznab adapter.
- `AsSources` routes `jacred` / `torznab` sources through the external parser adapter.
- No site-specific parsers are bundled in Asgard.

## TorrServer

- `torrserver-adapter.js` provides basic TorrServer client functions:
  - test connection
  - add magnet
  - add torrent URL
  - list torrents
  - get metadata
  - get files
  - select largest video file
  - build stream URL
  - remove task
- Search result action is `Add to TorrServer` and requires user confirmation.

## GitHub Releases update UI

- `updates.js` now looks for `.apk` assets in GitHub Releases.
- Version comparison supports release body metadata and semver tag fallback.
- `updates-ui.js` adds a TV-friendly Updates screen with:
  - current version
  - latest version
  - release notes preview
  - APK asset and size
  - Check for updates
  - Download update
  - Open release page
- Release workflow now uploads `asgard-tv-release.apk` and writes version metadata into release notes.

## Build safety note

Native in-app APK installation needs Android FileProvider paths. The FileProvider manifest entry was not kept because the connector blocked creating `res/xml/file_paths.xml`; keeping the manifest without that file would break the APK build.

Current MVP update flow safely opens/downloads the GitHub Release APK. Full in-app install will be enabled after adding `android/app/src/main/res/xml/file_paths.xml` and FileProvider bridge methods.

## Version

- versionName: `2.8.0`
- versionCode: `29`

## Manual QA

1. Build/install APK.
2. Open Settings → Parser & TorrServer.
3. Enter your parser URL/API key and TorrServer URL.
4. Run Test parser / Test all parsers / Select best parser.
5. Open Search and search a title.
6. Confirm active parser and result metadata are visible.
7. Press Add to TorrServer and confirm rights.
8. Open Updates.
9. Press Check for updates.
10. Confirm release, version and APK asset are shown.
