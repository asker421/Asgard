# Asgard TV — APK Installation Guide

Last updated: 2026-04-30

## Purpose

This guide is for non-programmer installation and smoke testing of Asgard TV on Android TV / Mi Box S / TV Box.

No Android Studio is required for normal installation.

## Expected APK

The release APK should be downloaded from GitHub Releases:

```text
asgard-tv-release.apk
```

Current expected release version:

```text
v2.9.4
versionName: 2.9.4
versionCode: 34
```

## Where to download

1. Open GitHub repository:

```text
https://github.com/asker421/Asgard
```

2. Open:

```text
Releases
```

3. Open latest release, expected:

```text
Asgard TV v2.9.4
```

4. Download asset:

```text
asgard-tv-release.apk
```

## How to confirm that the release is correct

Check three places.

### 1. Android build version

`android/app/build.gradle.kts` should contain:

```kotlin
versionCode = 34
versionName = "2.9.4"
```

### 2. GitHub Release tag

The release should be tagged:

```text
v2.9.4
```

### 3. Release notes metadata

Release notes should contain JSON like:

```json
{
  "versionCode": 34,
  "versionName": "2.9.4",
  "apkAsset": "asgard-tv-release.apk"
}
```

If these three values match, the release corresponds to the current Android build configuration.

## Install on Android TV / Mi Box S / TV Box

### Option A — USB drive

1. Download `asgard-tv-release.apk` on a computer or phone.
2. Copy it to a USB drive.
3. Insert USB drive into Android TV / TV Box.
4. Open a file manager on the TV device.
5. Open `asgard-tv-release.apk`.
6. If Android asks for permission, allow installation from this file manager.
7. Install the app.
8. Open Asgard TV from the Android TV launcher.

### Option B — Send file to TV app

1. Install a trusted file transfer app on phone and TV device.
2. Send `asgard-tv-release.apk` to the TV device.
3. Open the APK on the TV device.
4. Allow installation from unknown sources when Android asks.
5. Install and open Asgard TV.

### Option C — ADB install

Use this only if ADB is already available.

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

## If installation over old version fails

Debug APK signatures can differ between build environments.

If Android shows an install/update error:

1. Open Android TV Settings.
2. Go to Apps.
3. Find Asgard TV.
4. Uninstall it.
5. Install the new `asgard-tv-release.apk` again.

Important: uninstalling may remove local app data, sources and watch progress.

## Basic smoke test after install

Use the Android TV remote only.

### Launch

- App appears in Android TV launcher.
- App opens without crash.
- App opens without internet or shows understandable error.

### Remote navigation

- D-pad moves focus visibly.
- Focus ring is always visible.
- OK / Enter activates focused element.
- Back returns to previous screen where appropriate.
- Home + Back shows a friendly exit message.

### Main flow

1. Open Home.
2. Focus `Смотреть`.
3. Press OK.
4. Native ExoPlayer should open.
5. Press OK for play/pause.
6. Press Left / Right for seek.
7. Press Back to exit player.

### Search flow

1. Open Search.
2. Search for:

```text
bunny
```

3. Confirm results show mock/open catalog item.
4. Confirm summary is visible.
5. Confirm app does not crash if sources are empty or broken.

### Sources flow

1. Open Sources.
2. Paste invalid row:

```text
bad row
```

3. Press Preview / Save.
4. Save should be blocked with errors.
5. Paste valid row:

```text
Demo MP4 | direct_video | https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4 | multi | true | 1 | false | legal demo direct video
```

6. Save should succeed.
7. Search should be able to use enabled sources.

## What is not stable yet

Do not treat this as stable 1.0 until QA confirms:

- real Android TV / Mi Box S smoke test passed;
- remote focus has no traps;
- ExoPlayer playback is stable;
- source import/search is stable;
- app survives 15 minutes of use;
- installation/update path is documented and tested.

## Bug report template

```text
Build/version:
Device/emulator:
Screen:
Steps:
Expected:
Actual:
Photo/video:
Diagnostics text:
Can reproduce: yes/no
```
