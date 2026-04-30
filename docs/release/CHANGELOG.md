# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.9 — Stream diagnostics snapshot

Expected release:

```text
Tag: v2.10.9
Release: Asgard TV v2.10.9
Asset: asgard-tv-release.apk
versionCode: 49
```

### Added / Changed

- Added `stream-diagnostics.js` runtime layer.
- Media Task screen now gets a local Stream diagnostics panel.
- Diagnostics report includes task state, URL readiness, URL scheme, selected file, file count, native bridge availability, configured service status, saved progress, storage information and last player open result.
- Added Copy JSON action.
- Added Refresh diagnostics action.
- Added Clear snapshot action.
- Diagnostics are local/task-based.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Not verified on Android TV / Mi Box S in this chat environment.

## 2.10.8 — Streaming-first playback readiness

- Added `streaming-readiness.js` runtime layer.
- Added Streaming readiness panel to Media Task screen.
- Added Prepare stream, Open stream and Cancel preparation actions.
- Added readable ready / not ready / service missing / preparing / cancelled / failed states.

## Previous releases

See Git history for older release details from `2.10.7` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.9`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
