# Asgard TV 1.5 — Player Pro & Storage Manager

## Added

- Player Pro menu inside Android PlayerActivity.
- D-pad controls preserved:
  - OK / Enter: play or pause
  - Left / Right: seek +/-10 seconds
  - Rewind / Fast Forward: seek +/-60 seconds
  - Up: jump to timecode
  - Menu: Player Pro menu
- Audio track selection using Media3 track overrides.
- Subtitle track selection using Media3 track overrides.
- Disable subtitles option.
- External subtitle URL support for direct `.srt` / `.vtt` links without authorization.
- Player diagnostics dialog:
  - current position
  - duration
  - buffered position
  - playback state
  - audio track count
  - subtitle track count
  - external subtitle URL
- New Web UI screen: Player Pro.
- New Web UI screen: Storage Manager.
- Android storage stats:
  - free / total space
  - cache size
  - downloads size
  - download directory
- Clear downloads cache action.
- Config flags for Player Pro and Storage Manager.
- iPhone/PWA preview keeps working for Web UI validation.

## Scope

This release improves the playback and storage experience. It does not add bundled content catalogs, mirrors, DRM bypass, Cloudflare bypass, captcha bypass, or paid authorization bypass.

## Notes

External subtitles must be direct HTTP/HTTPS `.srt` or `.vtt` URLs reachable by the device.
