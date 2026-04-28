# Asgard TV Backlog

## 2.0 — Real Update Installer & Release Pipeline

### GitHub Releases Pipeline

- Create release workflow that builds APK and attaches it to GitHub Release.
- Generate `latest.json` with versionCode, versionName, apkUrl, notesUrl and sha256.
- Add release notes screen with changelog.

### Android Update Installer

- Download APK through DownloadManager.
- Verify sha256 before install.
- Open Android package installer with user confirmation.
- Show update progress.
- Add settings:
  - auto-check on startup
  - manual only
  - never check

Important: normal Android apps cannot silently install APK updates. User confirmation is required unless the app is system/device-owner/root-managed.

## 2.1 — Full Player Pro

- Audio track selection.
- Subtitle track selection.
- External `.srt` / `.vtt` subtitle URL.
- Manual timecode jump.
- Player diagnostics.

## 2.2 — Room Database

- Replace SharedPreferences persistence with Room.
- Add migrations.
- Add backup/restore.
