# Test Report 2.1

## Static verification

- `android/app/build.gradle.kts` updated to `versionName 2.1.0`, `versionCode 21`.
- `MainActivity.kt` includes torrent file picker and pending import bridge methods.
- `AndroidManifest.xml` includes ACTION_VIEW intent filters for torrent-like file inputs.
- `torrent.js` includes torrent file validation helpers.
- `main.js` includes UI for selecting and adding `.torrent` tasks.

## Manual QA checklist

### Android TV / Mi Box S

1. Install APK.
2. Open Asgard TV.
3. Open `Torrent` screen.
4. Confirm legal/user-controlled warning is visible.
5. Select `.torrent` file through Android picker.
6. Confirm selected file preview is shown.
7. Add `.torrent` task.
8. Restart app.
9. Confirm task persists.
10. Open `Torrent Diagnostics`.
11. Confirm task type, URI, size and metadata status are visible.

### Negative cases

- Cancel file picker.
- Select non-torrent file.
- Select empty file if available.
- Open malformed torrent-like file.
- Confirm app does not crash and shows readable error.

## Known limitations

- This release does not parse bencoded torrent metadata.
- This release does not retrieve peer metadata.
- This release does not stream torrent content.
- File list selection belongs to `ASG-TOR-003`.
