# Asgard TV — Simple Installation and Update Guide

Last updated: 2026-04-30

## Who this guide is for

This guide is for a non-programmer who wants to install and test Asgard TV on:

- Android TV;
- Mi Box S;
- Smart Box / TV Box on Android;
- Android TV emulator.

Normal use does **not** require Android Studio.

## Current expected release

Current Android build configuration should point to:

```text
versionName: 2.10.14
versionCode: 54
expected tag: v2.10.14
expected APK asset: asgard-tv-release.apk
```

Before downloading, verify that the latest GitHub Release matches the current version in:

```text
android/app/build.gradle.kts
```

## Where to download APK

1. Open repository:

```text
https://github.com/asker421/Asgard
```

2. Open:

```text
Releases
```

3. Open the latest release, expected format:

```text
Asgard TV v2.10.14
```

4. Download this asset:

```text
asgard-tv-release.apk
```

Do not download random APKs from other sites.

## How to confirm the APK is the right release

Check three things.

### 1. Release tag

Expected:

```text
v2.10.14
```

### 2. APK asset name

Expected:

```text
asgard-tv-release.apk
```

### 3. Release metadata

Release notes should contain metadata similar to:

```json
{
  "versionCode": 54,
  "versionName": "2.10.14",
  "apkAsset": "asgard-tv-release.apk"
}
```

If the latest release is newer than this guide, use the latest matching `versionName/versionCode` from GitHub Releases and `build.gradle.kts`.

## Install on Android TV / Mi Box S / TV Box

### Option A — USB flash drive

1. Download `asgard-tv-release.apk` on a computer.
2. Copy the APK to a USB flash drive.
3. Insert USB into the TV Box / Mi Box S.
4. Open a file manager on TV.
5. Open `asgard-tv-release.apk`.
6. If Android asks for permission, allow installation from this file manager.
7. Install.
8. Open **Asgard TV** from Android TV launcher.

### Option B — Send APK from phone to TV

1. Install a trusted file-transfer app on phone and TV.
2. Send `asgard-tv-release.apk` to TV.
3. Open the APK file on TV.
4. Allow installation from unknown sources when Android asks.
5. Install and open **Asgard TV**.

### Option C — ADB install

Use only if ADB is already available.

```bash
adb install -r asgard-tv-release.apk
```

Launch:

```bash
adb shell monkey -p com.asgard.tv 1
```

or:

```bash
adb shell am start -n com.asgard.tv/.MainActivity
```

## If update over old version fails

Because current APK is still a debug-style release artifact, Android may reject update over an older APK if signatures differ.

If update fails:

1. Open Android TV Settings.
2. Open Apps.
3. Find **Asgard TV**.
4. Uninstall it.
5. Install the new `asgard-tv-release.apk` again.

Important: uninstalling can remove local app data, sources, favorites and watch progress.

## First launch checklist

Use only TV remote / D-pad.

Expected:

- App appears in Android TV launcher.
- App opens without crash.
- Left menu is visible.
- Focus ring is visible.
- D-pad moves focus.
- OK / Enter activates selected item.
- Back returns to previous screen where possible.

If the app opens but something is unclear, go to:

```text
Диагностика
```

and use:

```text
Copy JSON
```

for a bug report.

## Basic safe setup path

### Step 1 — Open Settings

Open:

```text
Настройки
```

Find card:

```text
Search setup wizard
```

This wizard explains what is configured and what is missing.

### Step 2 — Add or review Sources

Open:

```text
Источники
```

Safe demo direct video source example:

```text
Demo MP4 | direct_video | https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4 | multi | true | 1 | false | legal demo direct video
```

Rules:

- Only add sources you have rights to use.
- Asgard does not include bundled catalogs.
- User-added links are your responsibility.
- Unknown links should stay disabled until checked.

### Step 3 — Parser / service settings

Open:

```text
Настройки → Search setup wizard → Parser & service
```

Use this only if you have your own compatible parser/service URL.

Expected fields may include:

- parser URL;
- API key;
- service URL.

Do not paste passwords, cookies or private tokens.

### Step 4 — Test setup

In the setup wizard, press:

```text
Test setup
```

Expected:

- enabled sources count is visible;
- parser status is visible;
- service status is visible;
- errors are readable.

### Step 5 — Search

Open:

```text
Поиск
```

Try safe query:

```text
bunny
```

Expected:

- search summary is visible;
- results are grouped;
- direct playable result can open player;
- invalid/broken sources show readable errors instead of crashing.

## Continue Watching test

1. Open a playable demo video.
2. Watch for at least 20–30 seconds.
3. Press Back to leave player.
4. Return to Home.
5. Check:

```text
Continue Watching
```

Expected:

- saved item appears;
- progress bar appears;
- Resume opens from saved position;
- Start over opens from zero;
- Remove deletes only selected item.

## QR import test

Open:

```text
QR импорт
```

Expected safe flow:

1. Create QR session.
2. Confirm 6-digit PIN appears.
3. Paste payload into TV paste area.
4. Press Preview.
5. Enter PIN.
6. Press Confirm import on TV.

Wrong PIN must block import.

HTTP(S) link imports only as disabled source row. Review and enable it manually in Source Manager.

Unsupported payloads remain preview-only.

## Diagnostics test

Open:

```text
Диагностика
```

Expected sections:

- Network;
- Player;
- Cache / Storage;
- Permissions;
- Version / Release;
- Source setup;
- Warnings.

Use:

```text
Copy JSON
```

when reporting bugs.

## Minimum smoke test after every APK install

### Launch

- APK installs.
- App opens.
- No crash on first screen.
- Left menu appears.

### Remote

- D-pad focus is visible.
- Up / Down / Left / Right work.
- OK activates selected card/button.
- Back behaves predictably.

### Player

- Direct demo video opens native player.
- OK play/pause works.
- Left / Right seek works.
- Back exits player.

### Search

- Search screen opens.
- Search with demo/source works.
- Empty/broken sources do not crash the app.

### Sources

- Invalid row is blocked.
- Valid row can be saved.
- Disabled source stays disabled until user enables it.

### Diagnostics

- Diagnostics screen opens.
- Copy JSON works or falls back to visible text.

## What is still not stable

Do not call the app stable 1.0 until:

- GitHub Actions build/install smoke test is green;
- Android TV / Mi Box S physical QA passes;
- remote focus has no traps;
- ExoPlayer playback is stable;
- Search → media task → player flow is verified;
- Continue Watching is verified;
- QR import is verified;
- Diagnostics is verified;
- app survives 15 minutes of navigation/use.

## Bug report template

```text
Build/version:
Device/emulator:
Screen:
Steps:
Expected:
Actual:
Photo/video:
Diagnostics JSON/text:
Can reproduce: yes/no
```

## Quick recovery checklist

If something goes wrong:

1. Restart app.
2. Restart TV Box.
3. Open Diagnostics and copy JSON.
4. Check Sources for invalid rows.
5. Disable suspicious user sources.
6. If update/install failed, uninstall old Asgard TV and install APK again.
7. Report bug with the template above.
