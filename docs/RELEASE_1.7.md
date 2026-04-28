# Asgard TV 1.7 — Persistence Core

## Added

- Android SharedPreferences persistence layer.
- JavaScript bridge methods for:
  - readConfig
  - readSourcesTxt
  - saveSourcesTxt
  - saveWatchProgress
  - getWatchProgress
  - getAllWatchProgress
  - addToFavorites
  - removeFromFavorites
  - getFavorites
  - addHistory
  - getHistory
  - clearHistory
  - getDeviceStorageInfo
- PlayerActivity saves watch progress on pause/destroy.
- Web UI screens:
  - Continue Watching
  - Favorites
  - History
  - Sources save/edit
- Version updated to 1.7.0.

## Notes

This release uses SharedPreferences instead of Room to keep the APK build simple and stable. Room can be added after this core is verified on Android TV.
