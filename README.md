# Asgard TV

Android TV WebView cinema hub.

Current GitHub repo status: buildable Android core plus web preview and TXT configuration files.

## Build APK

Open **Actions** and run **Build APK**. The workflow builds `android/app/build/outputs/apk/debug/app-debug.apk`.

## iPhone preview

Open the `web/` folder through a local server:

```bash
cd web
python3 -m http.server 8080
```

Then open the local IP address in Safari on iPhone.

## Source policy

Use only media and sources that you have the right to access. User sources are treated as `User Source / Unknown Rights`.
