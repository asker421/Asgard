# Asgard TV — Next Actions

Last updated: 2026-04-30

## Product Focus

Fastest path to working version:

**Search movie → find user-configured torrent/media result → select playable video file → launch in ExoPlayer.**

This is now the primary engineering direction.

## Immediate Actions

1. `ASG-TOR-SEARCH-001` — Torrent/media search from movie title.
2. `ASG-TOR-SEARCH-002` — Convert selected search result into playable media task.
3. `ASG-TOR-005` — Send selected stream URL to ExoPlayer.
4. `ASG-TOR-003` — Wire real metadata/files from configured service.
5. `ASG-QA-001` — Run Android TV build/install smoke test in parallel or immediately after MVP flow.

## Main Engineering Flow

Goal:

Movie title/search query → configured parser/source → normalized torrent/media result → metadata/files → selected video → stream URL → `PlayerActivity`.

Required:

- Use only user-configured sources/parsers/services.
- Search by movie title from Search screen or detail page.
- Return results with title, source, type, quality, size, seeds/peers where available.
- Let user select result.
- Convert selected result into media task.
- Load metadata/files from configured service where applicable.
- Select playable video file.
- Generate playable stream URL.
- Open stream URL in `PlayerActivity`.
- Handle errors:
  - no configured source/service
  - no results
  - metadata unavailable
  - no playable video file
  - unsupported codec/container
  - player error

## Definition of Working MVP

The app is considered working MVP when:

1. User searches a movie title.
2. App shows at least one valid user-configured media/torrent result.
3. User selects a result.
4. App loads metadata or provides a playable stream URL.
5. User can select video file if multiple files exist.
6. App opens selected video in ExoPlayer.
7. Player starts playback or shows a clear failure reason.
8. App does not crash on invalid/no-result/no-service cases.

## Then

1. Real Continue Watching UX runtime QA.
2. Harden source-backed search and source manager.
3. QR phone import.
4. AI provider integration.
5. Release APK and installation guide.

## Product Owner Review Queue

- Confirm source setup UX for non-technical user.
- Confirm whether MVP can depend on configured external media service or needs an embedded engine later.
- Confirm stable release criteria after MVP playback works.

## QA Review Queue

- APK build/install.
- Remote focus behavior.
- Search result selection.
- Metadata/file selection.
- Player launch.
- Player behavior.
- No-service/no-result/error states.
