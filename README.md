# Asgard TV

Asgard TV is an Android TV cinema hub prototype with WebView UI, TXT configuration, metadata, user sources, player, downloads, iPhone/PWA preview and experimental torrent/magnet support for user-provided content.

## Current version

**1.5 — Player Pro & Storage Manager**

## Build APK

1. Open GitHub Actions.
2. Run the APK build workflow.
3. Download `app-debug.apk` artifact.
4. Install it on Android TV / Mi Box S.

## iPhone preview

The `web/` folder can be served as a local PWA preview:

```bash
cd web
python3 -m http.server 8080
```

Open the local IP address from Safari on iPhone.

## Legal boundary

Use only media and sources that you have the right to access. The project does not include pirated catalogs, mirrors, DRM bypass, Cloudflare bypass, captcha bypass or paid authorization bypass.
