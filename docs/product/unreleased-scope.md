# Asgard TV — Full Unreleased Product Scope

This file contains the full unreleased product scope for Asgard TV.  
The operational backlog for coding branches is `docs/product/backlog.json`, but this file captures the complete product vision so nothing important is lost.

## Current rule

- `docs/product/backlog.json` = execution backlog and status tracking.
- `docs/product/unreleased-scope.md` = full product scope and future backlog source.
- `docs/product/CODING_BRANCH_RULES.md` = rules for coding branches.

---

# 1. Android TV Foundation

## Must-have

- Native Android TV application for Mi Box S / Android TV / Smart Box.
- APK installable without developer knowledge.
- Android TV launcher support.
- Splash screen with Asgard TV branding.
- App must open without internet.
- App must not crash on first launch.

## Remote navigation

- Full support for Android TV remote:
  - Up
  - Down
  - Left
  - Right
  - OK / Select
  - Back
- Focus must always be visible.
- No invisible focus state.
- No focus trap.
- Back behavior must be predictable.
- Long press must not break navigation.

## Main screens

- Home.
- Search.
- Movies.
- Series.
- New / Upcoming.
- Continue Watching.
- Favorites.
- Watchlist.
- Settings.
- Diagnostics.

---

# 2. Premium TV UI / UX

## Visual design

- Premium streaming-app style.
- Dark theme by default.
- Large readable typography for TV distance.
- Big poster cards.
- Cinematic backdrop images.
- Smooth lightweight animations.
- Clean focus states.
- No technical/ugly utility look.

## Required states

Every major screen should support:

- Loading state.
- Empty state.
- Error state.
- Retry action.
- Offline state where relevant.

## Onboarding

First launch onboarding should explain:

- What Asgard TV is.
- How to add sources.
- How TXT import works.
- How QR phone import works.
- How AI features work.
- How player controls work.
- How to open settings again.

---

# 3. Catalog and Search

## Mock catalog

- Offline mock movies.
- Offline mock series.
- Mock posters and metadata.
- Mock detail page.
- Mock video for player testing.
- Mock mode must be clearly marked.

## Search

- Search by movie title.
- Search by series title.
- Russian and English input.
- Android TV keyboard support.
- Voice search through Android TV system input.
- Search loading state.
- Search no-results state.
- Search error state.
- Slow sources must not freeze UI.

## Search results

- Unified results from enabled sources.
- Deduplication / grouping.
- Ranking by metadata quality and source health.
- Show title, year, poster, type, rating, source and quality where available.

## Filters

- Movie / series.
- Year.
- Genre.
- Rating.
- Quality.
- Language.
- Source.

---

# 4. Content Detail Pages

## Movie detail page

Must show where available:

- Poster.
- Backdrop.
- Title.
- Original title.
- Year.
- Genre.
- Country.
- Runtime.
- Rating.
- Description.
- Actors.
- Director.
- Source availability.
- Watch button.
- Add to Favorites.
- Add to Watchlist.
- Trailer button.
- AI summary.
- Why you may like this.

## Series detail page

Must show:

- Seasons.
- Episodes.
- Watched episodes.
- Last watched episode.
- Next episode.
- Episode description where available.
- Episode release date where available.
- Continue from last episode.

## Actors

- Actor list on detail page.
- Actor page.
- Actor photo where available.
- Known roles.
- Where else they played.
- Open title from actor filmography.

## Trailers

- Trailer button.
- Trailer playback in embedded or external player.
- Graceful state if trailer is missing.

---

# 5. Source Management

## Manual source management

- Add source.
- Edit source.
- Enable source.
- Disable source.
- Delete source.
- Source status.
- Last checked timestamp.

## TXT source import

- Simple `.txt` import.
- One source per line.
- Empty lines ignored.
- Lines starting with `#` ignored.
- Invalid rows reported.
- Import summary:
  - added
  - skipped
  - invalid
  - failed
- Sources persist after restart.

## Source architecture

- SourceAdapter contract:
  - search
  - getDetails
  - getStreams
  - healthCheck
- Source errors isolated.
- One broken source must not crash search.
- Slow source must timeout.
- Disabled source ignored.
- Source status visible.

## Source diagnostics

- Check all sources.
- Check selected source.
- Test query.
- Raw response in developer mode.
- Normalized response in developer mode.
- Error categories:
  - network
  - timeout
  - invalid format
  - empty response
  - parser error
  - stream unavailable

## Test mode

- Separate test sources from production sources.
- Test mode visibly marked.
- Test mode does not pollute normal catalog.
- Test mode can be switched off safely.

## Legal-safe product structure

- No pirated/copyrighted sources bundled in APK.
- User-controlled source configuration.
- Example file contains placeholders only.
- Production and test mode separated.
- App must not depend on prohibited built-in sources.

---

# 6. QR Phone Import

## QR import flow

- User opens Settings → Import from Phone.
- TV generates QR code.
- Phone scans QR.
- Phone opens import page.
- User pastes TXT source list or file link.
- TV receives import request.
- TV requires confirmation before applying.
- Import result shown on TV.

## QR security

- One-time token.
- Session timeout.
- Old QR cannot be reused.
- No personal data in QR.
- TV confirmation required.

---

# 7. Video Player

## Embedded player

- Play video inside app.
- Play.
- Pause.
- Stop / Back.
- Loading state.
- Error state.
- No crash on bad stream.

## Timeline and timecode

- Timeline visible.
- Current time visible.
- Total duration visible.
- Seek forward.
- Seek backward.
- Exact timecode navigation where possible.
- Seek must not reset playback unexpectedly.

## Continue watching

- Save progress periodically.
- Continue Watching row on Home.
- Continue / Start Over prompt.
- Progress survives app restart.
- Progress survives device reboot.
- Series should resume next relevant episode.

## Quality

- Manual quality selector.
- Auto quality when supported.
- 480p / 720p / 1080p / 4K where available.
- Quality change should preserve playback position.

## Subtitles

- Embedded subtitles where available.
- External subtitles where available.
- Enable / disable subtitles.
- Select language.
- Adjust basic size.

## Audio tracks

- Select audio track.
- Select language.
- Change track during playback.
- Playback position preserved.

## External player

- Option to use external player.
- Android intent support.
- Friendly message if external player missing.
- Return to Asgard TV safely.

---

# 8. AI Assistant

AI is a premium layer. The app must work even if AI is disabled, API key is missing, or provider is unavailable.

## AI summary

- Short no-spoiler summary.
- 3–5 short sentences.
- Spoiler mode only by explicit action.

## Why you may like this

- 3–5 reasons.
- Based on genre, metadata, similar titles, history and mood where possible.
- Short TV-readable format.

## AI movie picker

Mood options:

- Light.
- Funny.
- Action.
- Thriller.
- Family.
- Smart.
- Mystery.
- Series tonight.
- Movie under beer.
- Something short.

Output:

- 5–10 suggestions.
- Short reason for each.
- Open title card from suggestion.

## Actors AI

- Where else actor played.
- Popular roles.
- Similar actor/title suggestions.

## New episodes

- Track watched series.
- Show last watched episode.
- Show next episode.
- Show release date where available.
- Home row: New Episodes.

## New / upcoming releases

- New movies.
- New series.
- Upcoming releases.
- Release date where available.
- Add to Watchlist.

## AI settings

- Enable / disable AI.
- Provider setting.
- API key field if needed.
- Language setting.
- Test AI connection.
- AI error must not break UI.
- API key must not be logged.

---

# 9. Personal Library

## Favorites

- Add to Favorites.
- Remove from Favorites.
- Favorites screen.
- Persist after restart.
- No duplicates.

## Watchlist

- Add to Watchlist.
- Remove from Watchlist.
- Watch later screen.
- Future releases can be added.

## History

- Viewing history.
- Movie history.
- Episode history.
- Last watched date.
- Remove item.
- Clear all.
- Disable history.

## Profiles

- Multiple profiles.
- Separate history.
- Separate favorites.
- Separate watchlist.
- Child profile later.
- Optional PIN later.

---

# 10. Settings

Required sections:

- Sources.
- Import.
- Player.
- AI.
- Interface.
- Profiles.
- Storage.
- Diagnostics.
- About.

## Player settings

- Default player.
- External player option.
- Default quality.
- Default audio language.
- Default subtitle language.
- Subtitle size.

## Storage settings

- Clear cache.
- Clear sources.
- Clear history.
- Reset app.
- Export settings.
- Import settings.

---

# 11. Backup, Privacy and Security

## Backup / export

- Export settings to file.
- Import settings from file.
- Include/exclude:
  - sources
  - favorites
  - watchlist
  - history
  - profiles
  - settings

## Privacy

- Disable history.
- Clear history.
- Secure API key storage.
- Do not log API keys.
- Do not export API key without explicit confirmation.

---

# 12. Diagnostics and Developer Mode

## Diagnostics screen

Checks:

- Internet.
- Sources.
- AI.
- Player.
- Cache.
- Permissions.
- App version.
- Storage.

Each check status:

- OK.
- Warning.
- Error.

## Logs

- Local logs.
- Export logs.
- Redact private data.
- Separate source/player/AI errors.

## Developer mode

- Source ID.
- Response time.
- Parser status.
- Stream status.
- Player error code.
- Raw parser output.
- Normalized parser output.

---

# 13. QA Requirements

## Smoke test before release

Must check:

- Install APK.
- Launch app.
- Open without internet.
- Remote navigation.
- Focus visibility.
- Home screen.
- Search.
- Detail page.
- Player start.
- Play / pause.
- Timeline seek.
- Continue watching.
- Source add.
- TXT import.
- QR import.
- AI disabled mode.
- Settings.
- Diagnostics.
- 15-minute stability test.

## Mi Box S validation

- App launches.
- UI is responsive.
- Remote navigation works.
- Player works.
- Memory usage acceptable.
- No critical lag.

## UI review

- No clipped text.
- No lost focus.
- No tiny text.
- No bad Back behavior.
- No broken empty states.
- No crash on slow internet.

---

# 14. Release and No-Code Usage

## APK release

- Ready installable APK.
- Version visible in app.
- Changelog included.
- Update does not delete settings.

## Installation guide

Must explain simply:

- How to install APK.
- How to allow unknown sources if needed.
- How to open Asgard TV.
- How to add sources.
- How to use TXT import.
- How to use QR import.
- How to enable/disable AI.
- How to update app.

---

# 15. Definition of “Good”

Asgard TV is not good enough until:

1. Remote navigation is perfect.
2. Player is stable.
3. Continue Watching works.
4. TXT import works.
5. QR import works.
6. Source errors do not crash the app.
7. AI is useful but optional.
8. UI looks premium.
9. Diagnostics explain what is broken.
10. Non-programmer can install and configure it.

---

# 16. Definition of Stable 1.0

Stable 1.0 requires:

1. APK release exists.
2. Critical smoke test passed.
3. Mi Box S or Android TV physical validation passed.
4. No critical crash.
5. No focus/navigation blocker.
6. No player blocker.
7. No broken source import.
8. No broken update path that deletes user data.
9. Changelog exists.
10. Installation guide exists.
