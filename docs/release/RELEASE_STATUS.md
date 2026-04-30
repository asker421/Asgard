# Asgard TV — Release Status

Last updated: 2026-04-30

## Current Release Stage

Pre-release / early alpha.

## Current Version

2.10.13 according to Android build configuration.

## Release Readiness

Not ready for stable release.

## Expected Release

- versionName: `2.10.13`
- versionCode: `53`
- tag: `v2.10.13`
- release title: `Asgard TV v2.10.13`
- APK asset: `asgard-tv-release.apk`

## New in 2.10.13 Scope

- Hardened `qr-import.js` for `ASG-050`.
- TV confirmation now requires entering the active 6-digit PIN.
- HTTP(S) links can be imported only as disabled user source rows.
- Imported link rows are disabled by default until the user reviews and enables them in Source Manager.
- JSON wrapper supports `sources_txt` and `link` preview/handling.
- Unsupported or sensitive payload types remain preview-only.
- Session remains one-time with expiry and local TV confirmation.
- No silent import, no silent APK install, no bundled catalogs, no embedded source lists, no bypass features.

## Verification Status

Release verification is PENDING.

Do not claim that `2.10.13` release APK is available until GitHub Actions / Releases confirm it.

## Missing Before Demo APK

- Confirm APK build for 2.10.13.
- Confirm release asset `asgard-tv-release.apk` exists for v2.10.13.
- Confirm install on Android TV / Mi Box S.
- Create QR import session.
- Preview sources.txt payload.
- Confirm wrong PIN blocks import.
- Confirm correct PIN imports valid sources.
- Confirm HTTP(S) link imports as disabled source only.
- Confirm unsupported payloads remain preview-only.
- Confirm D-pad focus works on QR import actions.
- Confirm no first-launch crash.

## Stable Release Gates

Stable release is blocked unless:

- APK builds.
- APK installs on Android TV / Mi Box S.
- App opens without internet.
- Remote navigation works.
- Player works.
- QR import requires TV confirmation and PIN.
- Search and source setup work with user-configured sources.
- Media task flow has clear states and diagnostics.
- No critical crash.
- QA smoke test passed.
- Changelog exists.
