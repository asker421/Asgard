# Asgard TV — Static QA Review 2.9.6

Last updated: 2026-04-30

## Scope

Static repository-level QA review for version 2.9.6 / versionCode 36.

No Android TV emulator, Mi Box S or live APK runtime was available in this chat environment.

## Result

Physical QA remains BLOCKED / NOT COMPLETED.

Static inspection result: READY FOR PHYSICAL QA, not DONE.

## Expected release

```text
versionName: 2.9.6
versionCode: 36
tag: v2.9.6
asset: asgard-tv-release.apk
```

## Static findings

### Remote navigation

Static result: PASS / runtime QA needed.

`input.js` now includes key handling, directional navigation, Enter activation, Back/Escape routing and scroll into view.

### Back behavior

Static result: PASS / runtime QA needed.

`ui.js` now includes navigation history and back handling.

### Player handoff

Static result: PASS / runtime QA needed.

The app has code paths that pass playable URLs to the native player through the Android bridge.

### Sources and search

Static result: PASS / runtime QA needed.

Search and source management have runtime code paths for preview, validation, save, reset, results and error reporting.

## Required physical QA

Run on Android TV emulator or Mi Box S:

1. Install APK.
2. Launch app.
3. Test D-pad on Home.
4. Test D-pad through left menu.
5. Test Enter on focused buttons/cards.
6. Test Back from Search, Details, Sources, Settings and Player.
7. Test Home Watch button opens native player.
8. Test native player play/pause/seek.
9. Test Search with a demo query.
10. Test Sources invalid row is blocked.
11. Test Sources valid row is saved.
12. Test Settings screens open.
13. Keep app open and navigate for 15 minutes.

## Recommendation

Do not mark any backlog item DONE yet.

Recommended interim status is READY_FOR_QA or IN_PROGRESS until Android TV runtime evidence is available.
