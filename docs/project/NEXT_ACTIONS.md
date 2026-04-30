# Asgard TV — Next Actions

Last updated: 2026-04-30

## Immediate Actions

1. Run Android TV build/install smoke test.
2. Test remote navigation on emulator or Mi Box S.
3. Test ExoPlayer with mock video and at least one valid media URL.
4. Apply prioritized backlog statuses to `backlog.json` if full-file editing becomes safe.

## Next Engineering Focus

### User-provided media metadata and playback handoff

Goal:

User-provided media input → metadata/files → selected video → stream URL → ExoPlayer.

Required:

- Accept user-provided media input.
- Get metadata/files from configured media service where applicable.
- Show real file list.
- Select video file.
- Generate playable stream URL.
- Open stream URL in `PlayerActivity`.
- Handle errors:
  - service not configured
  - metadata unavailable
  - no playable video file
  - unsupported codec/container
  - player error

## Then

1. Real Continue Watching UX.
2. Harden source-backed search.
3. Full source manager.
4. QR phone import.
5. AI provider integration.
6. Release APK and installation guide.

## Product Owner Review Queue

- Confirm whether demo APK target should prioritize playback flow or QR import.
- Confirm AI provider strategy.
- Confirm stable release criteria.

## QA Review Queue

- APK build/install.
- Remote focus behavior.
- Player behavior.
- Source/parser settings.
- Update screen.
