# Test Report 2.2

## Static verification

- `android/app/build.gradle.kts` updated to `versionName 2.2.0`, `versionCode 22`.
- `torrent.js` includes:
  - supported video extension detection
  - file size formatting
  - deterministic metadata attachment
  - largest-video default selection
  - manual file selection guard
  - selected file diagnostics
- `main.js` includes:
  - `Load metadata` action
  - file list rendering
  - video / not video badges
  - selected state
  - manual file selection
  - updated torrent diagnostics

## Manual QA checklist

### Metadata and file selection

1. Install APK.
2. Open Asgard TV.
3. Open `Torrent` screen.
4. Add a valid magnet or `.torrent` task.
5. Press `Load metadata`.
6. Confirm file list appears.
7. Confirm supported video files are marked `video`.
8. Confirm non-video files are marked `not video`.
9. Confirm the largest video file is selected by default.
10. Select another supported video file.
11. Confirm selected state moves to that file.
12. Try selecting non-video file.
13. Confirm clear error appears and app does not crash.
14. Open `Torrent Diagnostics`.
15. Confirm selected file and video file counts are visible.

## Known limitations

- Metadata is deterministic local mock metadata.
- Real `.torrent` bencode parsing is not implemented yet.
- Real magnet peer metadata is not implemented yet.
- Real P2P streaming is not implemented yet.
- Streaming-first playback belongs to `ASG-TOR-004`.
