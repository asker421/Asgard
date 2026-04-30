# Asgard TV — Changelog

Last updated: 2026-04-30

Active backlog source of truth:

```text
docs/product/backlog-v2.json
```

The old `docs/product/backlog.json` is historical and may be truncated by the connector.

## 2.10.18 — Player handoff with stable task id

Expected release:

```text
Tag: v2.10.18
Release: Asgard TV v2.10.18
Asset: asgard-tv-release.apk
versionCode: 58
```

### Added / Changed

- Added `player-handoff-v2.js` runtime layer for `ASG-TOR-005`.
- Added Android bridge method `openPlayerWithItem(url, title, startPosition, itemId)`.
- Media task player handoff now prefers stable task id for progress/resume tracking.
- Missing stream URL now shows readable error with Prepare stream / Load metadata / Diagnostics actions.
- Unsupported URL scheme is blocked before player handoff.
- Resume and Start over now use the same task id path.
- Player handoff diagnostics now show bridge availability, item id support, URL readiness and saved progress.
- Legacy `openPlayer(url,title,startPosition)` remains as fallback.
- No bundled catalogs, embedded source lists, engines, or bypass features were added.

### QA status

Code-wired only. Android TV runtime QA is still pending.

## 2.10.17 — Search result to persistent media task

- Added `media-task-creation-v2.js` runtime layer for `ASG-TOR-SEARCH-002`.
- Search result now converts into stricter persistent media task.

## Previous releases

See Git history for older release details from `2.10.16` and below.

## Release verification checklist

A release is successful only when all of these are true:

1. `android/app/build.gradle.kts` version matches intended release.
2. GitHub Actions → `Release APK` latest run is green.
3. GitHub Releases contains matching tag, for example `v2.10.18`.
4. Release notes contain matching JSON metadata.
5. Release contains asset:

```text
asgard-tv-release.apk
```

6. APK downloads successfully.
7. APK installs and launches on Android TV / Mi Box S or emulator.

Stable release is blocked until Android TV smoke test, navigation, player, source/search and user-facing error states are verified.
