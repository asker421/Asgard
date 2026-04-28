# Asgard TV 2.4 — TV Usability Stabilization

## Release decision

This release is a stabilization release after QA review. It does not add new torrent/AI features.

Target backlog/QA areas:

- P0-01 Back button behavior
- P0-02 Remote navigation
- P1-01 Version mismatch
- P1-04 JavaScript bridge / external URL safety hardening
- P2-02 Menu overload
- Product clarity: demo/prototype vs production-ready app

## Added / changed

### Version consistency

- Android version updated to `2.4.0` / `versionCode 24`.
- `MainActivity.getAppVersionInfo()` now uses:
  - `BuildConfig.VERSION_NAME`
  - `BuildConfig.VERSION_CODE`
- Removed the old hardcoded `2.1.0 / 21` bridge version.

### WebView URL handling hardening

- WebView now allows local asset URLs only.
- Non-local HTTP/HTTPS navigation is opened externally instead of inside the app WebView.
- Non-HTTP schemes are ignored by the WebView override path.

### Back stack

- Added `nav.js` stabilization layer.
- `AsUI.nav()` now pushes previous screen to a navigation stack.
- `window.asgardBack()` now pops the stack instead of always returning to Home.
- If stack is empty and current screen is not Home, Back returns to Home.
- On Home, Back shows a user-facing hint instead of jumping unexpectedly.

### Spatial TV navigation

- Added spatial focus movement based on `getBoundingClientRect()`.
- Up/down/left/right are now direction-aware instead of linear +1/-1 focus movement.
- Focus moves to nearest valid element in the requested direction.
- After screen change, focus moves to a meaningful CTA/input/card rather than blindly focusing the first element.

### Menu simplification

- Top-level menu reduced to core TV paths:
  - Главная
  - Поиск
  - Каталог
  - Библиотека
  - Источники
  - Настройки
- Secondary/experimental modules are grouped under `More / Experimental`:
  - QR импорт
  - Диагностика
  - Обновления
  - Torrent
  - Torrent Diagnostics
  - AI подбор
  - Player Pro
  - Серии
- Added visible note: `Demo build · Experimental user media`.

## Still blocked for product release

QA is still correct: the app should be considered a demo/prototype until these are resolved:

- full Player Pro overlay/error handling
- real source adapter/network search
- real QR import
- real diagnostics checks
- real update APK flow
- real P2P engine if torrent playback remains in scope
- physical Mi Box S / Android TV test

## Next recommended stabilization release

`2.5 — Player Stability and Continue Watching`

Focus:

- Player.Listener
- onPlayerError handling
- autosave every 10–15 seconds
- unknown duration guard
- seek bounds
- Continue / Start Over prompt
- bad URL friendly error
