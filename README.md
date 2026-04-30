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

## Product and UX source of truth

Before coding, read:

1. `docs/product/backlog.json` — product backlog, statuses, acceptance criteria and Definition of Done.
2. `docs/product/UX_UI_CX_INTERFACE_SPEC.md` — UX/UI/CX rules, screens, TV-first behavior and user journey.
3. `docs/product/VISUAL_REFERENCE.md` — premium TV streaming visual reference, color system, layout reference, icons and focus behavior.
4. `android/app/src/main/assets/web/menu.txt` — current left menu content.

Important: visual redesign may improve menu styling, icons, spacing, focus and active states, but must not add, remove, reorder or rename left menu items unless a backlog story explicitly asks for it.

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

## Updates

The app can check GitHub Releases and open the latest release page. Android requires user confirmation to install APK updates.

## Source policy

Use only media and sources that you have the right to access. User sources are treated as `User Source / Unknown Rights`.
