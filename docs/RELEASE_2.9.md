# Asgard TV 2.9 — QA Stabilization

## Scope

This release addresses the QA findings without rewriting the application from scratch.

## Fixed / improved

### Watch / native player

- Added a stabilization layer so `AsApp.play()` opens native Android `PlayerActivity` through `AsgardBridge.openPlayer()` when running inside the APK.
- Browser/PWA fallback still uses the existing web UI player.

### PlayerActivity

- Added Media3 `Player.Listener`.
- Added error handling with Toast.
- Added bad URL validation.
- D-pad controls preserved.
- Seek right is clamped to duration when duration is known.
- Watch progress is saved only when position and duration are valid.

### Sources screen

- Sources textarea now loads from `AsStore.readSources()`.
- Preview runs `AsSources.parse()` and displays validation output.
- Save blocks invalid rows and saves only valid configuration.
- Reset calls `AsStore.resetSources()`.
- Summary includes total, valid, invalid and enabled counts.

### Search screen

- Search now combines demo/open catalog with enabled user source results from `AsSources.searchContent(query)`.
- Source errors are shown separately and should not crash the UI.
- Direct playable source results can open native ExoPlayer through the bridge.

### Source network

- `AsSources` now uses native bridge fetch when `AsgardBridge.nativeFetch` is available.
- This reduces WebView `file://` CORS failures.

### Mock screen labeling

- Added visible `Demo / Not fully implemented` badge overlays for mock-only screens.

### Navigation

- Existing `nav.js` stabilization layer remains responsible for navigation stack and spatial focus.

## Changed files

- `android/app/src/main/java/com/asgard/tv/PlayerActivity.kt`
- `android/app/src/main/assets/web/qa-stabilization.js`
- `android/app/src/main/assets/web/qa-stabilization-fix.js`
- `android/app/src/main/assets/web/index.html`
- `android/app/build.gradle.kts`

## Version

- versionName: `2.9.0`
- versionCode: `30`

## Manual QA

1. Build/install APK.
2. Press Watch on a demo card; APK should open native ExoPlayer.
3. In browser fallback, Watch may still open web player.
4. Use Back from Details/Search/Settings and confirm it returns to previous screen.
5. Navigate with D-pad in all directions and confirm focus is visible and spatial.
6. Open Sources, Preview current TXT config.
7. Add an invalid row and confirm Save is blocked.
8. Save valid sources and confirm summary.
9. Search with a query and confirm demo + source summary appears.
10. Open a direct/HLS source result and confirm ExoPlayer opens.
11. Open a bad video URL and confirm PlayerActivity shows error instead of crashing.
