# Test Report 2.4

## QA context

This release responds to the QA review that marked the app as:

- Prototype PASS
- Product Release FAIL
- Stable 1.0 BLOCKED

## Static verification

- Android version updated to `2.4.0` / `versionCode 24`.
- `MainActivity.getAppVersionInfo()` uses `BuildConfig` version values.
- WebView URL handling only allows local app assets inside WebView.
- `nav.js` added.
- `index.html` loads `nav.js` after existing UI scripts.
- `nav.js` adds:
  - navigation stack
  - Back pop behavior
  - spatial directional focus
  - meaningful initial focus
  - simplified core menu
  - experimental module grouping

## Manual QA checklist

### Navigation

1. Open app.
2. Move focus with Up/Down/Left/Right.
3. Confirm focus moves directionally, not only linearly.
4. Open Search from menu.
5. Open another screen.
6. Press Back.
7. Confirm previous screen opens.
8. Continue pressing Back until Home.
9. Press Back on Home.
10. Confirm app does not jump unexpectedly.

### Menu

1. Confirm main menu has core paths:
   - Главная
   - Поиск
   - Каталог
   - Библиотека
   - Источники
   - Настройки
2. Confirm experimental modules are grouped separately.
3. Confirm demo/experimental note is visible.

### Version

1. Open Updates screen.
2. Confirm current version matches Gradle build version.
3. Confirm no old hardcoded version is shown.

## Remaining blockers

- Player Pro remains incomplete.
- Sources search remains incomplete.
- QR import remains incomplete.
- AI remains placeholder.
- Diagnostics remains incomplete.
- Physical Android TV / Mi Box S QA still required.
