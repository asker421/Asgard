# Asgard TV

Asgard TV is an Android TV WebView cinema hub.

Current GitHub build: **1.6 — Modular Sources UI Build**.

## What is included

- Android TV project
- WebView shell
- JavaScript bridge
- ExoPlayer activity
- Modular Web UI
- TXT configuration files
- User sources parser
- iPhone/Safari preview
- GitHub Actions APK build

## Build APK

Open **Actions** and run **Build APK**. Download artifact `asgard-tv-debug-apk`.

## iPhone preview

Serve the `web/` folder locally:

```bash
cd web
python3 -m http.server 8080
```

Open the local IP address from Safari.

## Source policy

Use only media and sources that you have the right to access. User sources are treated as `User Source / Unknown Rights`.
