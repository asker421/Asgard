# Test Report — Asgard TV 1.5

## Static checks performed

- `web/app.js` syntax check with `node --check`: PASS.
- Android WebView asset `app.js` syntax check with `node --check`: PASS.
- ZIP integrity check: PASS.

## Functional areas changed

### Player Pro

Expected behavior on Android TV:

- OK toggles play/pause.
- Left/Right seek by 10 seconds.
- Media rewind/fast-forward seek by 60 seconds.
- Up opens the timecode dialog.
- Menu opens Player Pro menu.
- Audio tracks can be selected when the media provides multiple audio tracks.
- Subtitle tracks can be selected or disabled when available.
- External subtitle URL can be added manually.
- Diagnostics dialog shows player state.

### Storage Manager

Expected behavior:

- Shows free/total space from Android `StatFs`.
- Shows cache size.
- Shows downloads directory size.
- Can clear downloads cache and internal download records.

## Not fully verified in this environment

- Android Gradle build, because this container does not include a full Android SDK runtime.
- Real playback on Mi Box S.
- Track selection against real multi-audio/multi-subtitle media.
- External subtitle CORS/server compatibility.

Final verification should be done through GitHub Actions and on Mi Box S / Android TV.
