# Asgard TV Backlog

## 1.9 — Input & Update System

### Remote + Touch Screen Support

Goal: the same UI must work comfortably with Android TV remote and touch screens.

Tasks:

- Add explicit focusable classes to all main UI controls.
- Add D-pad focus ring and keyboard navigation.
- Add click/touch hit areas for tablets, touch TV boxes and phone preview.
- Avoid hover-only behavior.
- Add large touch targets, minimum 48dp equivalent.
- Add scroll behavior that works with D-pad and touch.
- Test on Android TV remote, mouse/air mouse, and touch screen.

### GitHub Update System

Goal: app can check GitHub Releases and guide the user to install the newest APK.

Tasks:

- Create GitHub Releases for APK artifacts.
- Add update metadata endpoint, for example `latest.json`.
- Add Android bridge method `checkForUpdates()`.
- Add update screen in Web UI.
- Compare installed `versionCode` with remote release version.
- Download APK to Downloads/cache.
- Open Android package installer for user-confirmed install.
- Never silently install APK without user confirmation.
- Show release notes before update.
- Add settings: auto-check on startup, manual check, never check.

Important Android limitation: normal apps cannot fully auto-install APK updates silently. User confirmation is required unless the device is managed/rooted/system app.
