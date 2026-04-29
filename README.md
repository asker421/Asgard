# Asgard TV

Asgard TV is an Android TV WebView cinema hub.

Current GitHub build: **1.9 — Input & Update System**.

## Included

- Android TV project
- WebView shell
- JavaScript bridge
- ExoPlayer activity
- Modular Web UI
- TXT configuration files
- Sources Manager
- Favorites / history / watch progress
- Remote + touch-friendly UI layer
- GitHub update screen
- GitHub Actions APK build

## Build APK in GitHub Actions

Open **Actions** and run **Build APK**. Download artifact `asgard-tv-debug-apk`.

## Local build

```bash
cd android
./gradlew :app:assembleDebug
```

APK output:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## QA and release docs

- [Android TV smoke test checklist](docs/qa/smoke-test-android-tv.md)
- [Android TV installation guide](docs/release/install-android-tv.md)

## Updates

The app can check GitHub Releases and open the latest release page. Android requires user confirmation to install APK updates.

## Source policy

Use only media and sources that you have the right to access. User sources are treated as `User Source / Unknown Rights`.
