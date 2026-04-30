# Asgard TV — UX/UI/CX Interface Specification

Source of truth: `docs/product/backlog.json`.

Visual reference source of truth: `docs/product/VISUAL_REFERENCE.md`.

This document translates the backlog into a TV-first interface model for the Android TV WebView shell. The goal is to make every module understandable, navigable with a remote, safe on errors and clear for a non-technical user.

## Mandatory documents before UI work

Before any UI change, engineering must read:

1. `docs/product/backlog.json`
2. `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
3. `docs/product/VISUAL_REFERENCE.md`
4. `android/app/src/main/assets/web/menu.txt`

## Critical menu rule

Do **not** change the left menu content during visual redesign.

The redesign may improve:

- icons;
- spacing;
- focus state;
- active state;
- colors;
- typography;
- layout density.

But it must not add, remove, reorder or rename left menu items unless a separate backlog story explicitly asks for that.

The current menu content is defined in:

`android/app/src/main/assets/web/menu.txt`

## Design principles

1. **TV-first** — every main control must be readable from distance and reachable with D-pad navigation.
2. **Visible focus at all times** — focus ring is intentionally large and high-contrast.
3. **One primary action per screen** — Watch, Search, Import, Continue or Check Update must be obvious.
4. **No dead ends** — loading, empty and error states always give a next action.
5. **User-controlled sources only** — source/media import screens must not bundle questionable catalogs.
6. **AI must be optional** — AI recommendations degrade gracefully when AI is disabled or unavailable.
7. **Premium streaming feel** — dark cinematic palette, large hero, horizontal shelves, clear CTAs and strong hierarchy.

## Module-to-screen mapping

| Backlog epic | Module | Screens added to UI |
|---|---|---|
| EPIC-001 | Android TV Foundation | Home, Catalog, Details, Settings, global menu/focus system |
| EPIC-002 | Catalog, Search and Sources | Catalog, Search, Sources, Diagnostics |
| EPIC-003 | Player | Player Pro, Continue Watching, timeline and next episode panel |
| EPIC-004 | QR Import and AI Assistant | QR Import, AI подбор, actor recommendations, why-you-may-like-this |
| EPIC-005 | User media streaming | User media import, metadata/file selection, buffer/cache diagnostics |

## Screens

### 1. Главная
Premium landing screen with hero content, Watch CTA, Details CTA, Continue Watching, Recommendations, New Releases and backlog module overview.

Required visual direction is defined in `docs/product/VISUAL_REFERENCE.md`.

### 2. Каталог
Full browsing screen with filters, grouped rows, large poster cards, year, genre, rating, episode and duration.

### 3. Поиск
Remote-friendly search with large input, AI shortcut, popular queries, loading, empty and error states.

### 4. AI подбор
AI discovery screen with spoiler-free summary, recommendation explanation, actor list, related titles and failure fallback.

### 5. Детали
Content decision screen with poster, rating, metadata, synopsis, why-you-may-like-this, Watch, Trailer, Add to list, seasons and actors.

### 6. Player Pro
Unified player surface with large video area, timeline, play/pause, +/-10 seconds, subtitles, audio, quality, speed, buffer and next episode panel.

### 7. Библиотека
Personal hub with watchlist, history, downloads, favorites and calendar for new episodes.

### 8. Серии
Tracked series page with latest episode indicator and release date/status.

### 9. Источники
Simple TXT source management with one source per line, preview/save actions, validation summary and persistence after restart.

### 10. User media streaming
Safe user-provided media screen with import, metadata, file selection, buffer/cache and diagnostics. The UI must show legal/user-controlled usage messaging.

### 11. QR импорт
Phone bridge flow: TV shows QR, phone input page opens, TV confirmation is required, session expires.

### 12. Диагностика
Human-readable errors for invalid input, metadata timeout, no connection, unsupported codec, storage error and player error.

### 13. Обновления
GitHub release update check with current version, manual check button and release metadata area.

### 14. Настройки
Playback, parental control, profile, AI assistant, cache/storage and source security settings.

## CX acceptance checklist

- User can understand the app in less than 30 seconds from Home.
- User can operate every main screen with a TV remote.
- User always sees where focus is.
- User can recover from bad source, bad user media input, AI failure and update failure.
- User can use the app without knowing JSON.
- User sees legal/source responsibility messaging where it matters.
- User has a clear path from discovery → detail → playback → continue watching.
- Visual redesign preserves the existing left menu content.
- Home screen matches the premium TV streaming direction from `VISUAL_REFERENCE.md`.

## Implementation notes

The first implementation is intentionally WebView-safe:

- no new Android dependencies;
- no copyrighted posters;
- fictional demo content only;
- static UI states for modules that need backend/native implementation later;
- existing bridge calls are kept for player and update functions where available.
