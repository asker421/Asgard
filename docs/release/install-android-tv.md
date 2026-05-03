# Asgard TV — Android TV Installation Guide

Audience: non-programmer user with Android TV / Mi Box S / Smart Box.  
Goal: install a GitHub Actions debug APK and open Asgard TV safely.

---

## 1. What You Need

- Android TV, Mi Box S, or compatible Smart Box.
- Internet connection on the TV box.
- The latest `asgard-tv-debug-apk` artifact from GitHub Actions.
- A file transfer method:
  - USB flash drive, or
  - cloud drive / file manager, or
  - Downloader browser app, or
  - Android TV file sharing app.

---

## 2. Build or Download the APK

### Option A — GitHub Actions

1. Open the repository on GitHub.
2. Go to **Actions**.
3. Open **Build APK**.
4. Run the workflow if there is no recent successful build.
5. Open the successful workflow run.
6. Download artifact: `asgard-tv-debug-apk`.
7. Extract the artifact ZIP on your computer.
8. Copy `app-debug.apk` to USB or send it to the TV box.

### Option B — Local Build

Use this only if Android/Gradle tooling is already installed.

```bash
cd android
./gradlew :app:assembleDebug
```

APK output:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 3. Allow Installation from Unknown Sources

Android TV usually blocks APK installation until you approve the installing app.

1. Open **Settings** on Android TV.
2. Go to **Apps** or **Security & restrictions**.
3. Open **Unknown sources** or **Install unknown apps**.
4. Allow the file manager / Downloader app that will open the APK.
5. Return to the APK file and install again.

Exact menu names can differ by Android TV version and device brand.

---

## 4. Install the APK

1. Open your file manager on Android TV.
2. Find `app-debug.apk`.
3. Select it with the remote.
4. Choose **Install**.
5. Wait until installation finishes.
6. Choose **Open**, or find **Asgard TV** in the Android TV app list.

---

## 5. First Launch Check

After opening Asgard TV:

1. Confirm the app opens without a black screen.
2. Use remote arrows to move around.
3. Confirm focus is visible.
4. Press **OK** on a menu item or card.
5. Press **Back** and confirm it returns safely.
6. Turn off Wi-Fi and reopen the app once to confirm it does not crash without internet.

---

## 6. Adding Sources Safely

Asgard TV is designed for user-controlled sources only.

Use only media and source lists that you have the right to access.

The app should not ship with unauthorized copyrighted catalogs. Example files must use placeholders only.

TXT source format:

```text
# name | type | url_or_template | language | enabled | priority | auth_required | notes
Example Public API | api | https://example.invalid/api/search?q={query} | en | false | 10 | false | placeholder only
```

Rules:

- One source per non-empty line.
- Lines starting with `#` are comments.
- Invalid rows should show an error instead of crashing the app.
- Keep production sources separate from test placeholders.

---

## 7. Updating the App

The app can check GitHub Releases and open the latest release page. Android still requires user confirmation to install an APK update.

Safe update flow:

1. Download the new APK.
2. Install it over the previous version.
3. Do not clear app data unless troubleshooting.
4. Open Asgard TV.
5. Confirm sources, favorites, history and progress are still present where implemented.

---

## 8. Troubleshooting

| Problem | What to try |
|---|---|
| APK will not install | Enable unknown sources for the file manager / Downloader app |
| App does not appear on launcher | Open app list or reinstall APK |
| Black screen on launch | Reboot TV box and reinstall latest APK |
| Remote focus is lost | Press Back; if not fixed, restart app and report the screen |
| Video does not play | Test another legal stream or mock video; collect player error |
| Source import fails | Check TXT columns, comments and invalid rows |
| Update page opens but APK is not installed | Android requires manual APK download and install confirmation |

---

## 9. What to Report Back

When reporting a problem, include:

- Device model.
- Android TV version.
- APK build / Git commit if known.
- Exact screen where issue happened.
- Remote key pressed before the issue.
- Whether internet was on or off.
- Photo or short video if possible.
