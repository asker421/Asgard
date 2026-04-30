# Asgard TV — Visual Reference

This file is the visual reference package for engineering work on the Asgard TV interface.

Use it together with:

1. `docs/product/backlog.json`
2. `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
3. `android/app/src/main/assets/web/menu.txt`

## Critical rule: do not change the left menu content

The left menu item list is not part of the redesign scope unless a separate backlog story explicitly asks for it.

Engineering must preserve the existing menu content from:

`android/app/src/main/assets/web/menu.txt`

Current menu items:

```text
Главная
Каталог
Поиск
AI подбор
Детали
Player Pro
Библиотека
Серии
Источники
Torrent
QR импорт
Диагностика
Обновления
Настройки
```

The redesign may change menu styling, spacing, focus state, icon rendering and typography, but must not add, remove, reorder or rename menu items unless a backlog item explicitly allows it.

## Target visual direction

The Home screen must feel like a premium streaming TV product.

Reference qualities:

- dark cinematic background;
- left vertical navigation;
- large hero area on the right;
- large title typography;
- short meta line under title;
- concise content description;
- primary Play CTA;
- secondary More Info / Details CTA;
- horizontal content shelves below hero;
- Continue Watching shelf with progress bars;
- Top Picks / Recommendations shelf;
- Trending / New shelf;
- profile/settings/search affordances visible but not noisy;
- strong D-pad focus state.

## Layout reference

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ LEFT MENU              HERO AREA                                             │
│ ┌───────────────┐      ┌───────────────────────────────────────────────────┐ │
│ │ Logo          │      │ Large backdrop / cinematic feature image          │ │
│ │               │      │                                                   │ │
│ │ Главная       │      │ TITLE                                             │ │
│ │ Каталог       │      │ year · type/seasons · genre · age/rating          │ │
│ │ Поиск         │      │ short description, 2-3 lines max                  │ │
│ │ AI подбор     │      │                                                   │ │
│ │ Детали        │      │ [▶ Смотреть] [Подробнее]                          │ │
│ │ Player Pro    │      │                                                   │ │
│ │ Библиотека    │      └───────────────────────────────────────────────────┘ │
│ │ Серии         │                                                           │
│ │ Источники     │      CONTINUE WATCHING                                    │
│ │ Torrent       │      [card + progress] [card + progress] [card + progress] │
│ │ QR импорт     │                                                           │
│ │ Диагностика   │      TOP PICKS / RECOMMENDED                              │
│ │ Обновления    │      [poster] [poster] [poster] [poster] [poster]          │
│ │ Настройки     │                                                           │
│ └───────────────┘      TRENDING / NEW                                        │
│                        [poster] [poster] [poster] [poster] [poster]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Home screen visual requirements

### Left menu

Keep existing content exactly as defined in `menu.txt`.

Visual behavior:

- fixed left rail;
- logo at top;
- menu items vertically stacked;
- active item has blue/cyan highlight;
- focused item has strong glow/ring;
- inactive item uses muted text/icon color;
- icons should be uniform line icons;
- large clickable/focusable area for every item;
- no tiny text.

### Hero

The hero must dominate the first screen.

Requirements:

- title: very large, cinematic, uppercase or strong display typography;
- meta line: year, type, genre, rating, duration/season where available;
- description: short, readable, not more than 3 lines;
- CTA row: primary Play, secondary Details;
- background: wide backdrop, gradient overlay for readability;
- no real copyrighted posters required; use placeholders/demo images if needed.

### Shelves

At minimum:

- Continue Watching;
- Recommended / Top Picks;
- Trending / New.

Card requirements:

- large enough for TV;
- clear poster/backdrop area;
- readable title;
- metadata line;
- visible focus state;
- progress bar for Continue Watching.

## Color system

Use a premium dark-blue streaming palette:

```text
Background:       #05070D / #070B12 / #0A1020
Panel:            #0D1422 / #111B2D
Card:             #101827 / #111A2B
Primary accent:   #2F8CFF
Secondary accent: #66D9FF
Text primary:     #F4F7FB
Text secondary:   #91A0B8
Border:           rgba(120,160,220,0.18)
Focus ring:       rgba(47,140,255,0.82)
Progress:         #2F8CFF → #66D9FF
```

Avoid:

- excessive gold;
- random bright colors;
- many competing accents;
- low contrast text;
- mobile-density layouts.

## Icon system

Use one visual style for all icons.

Requirements:

- line or medium-weight icons;
- consistent size;
- active icon uses primary accent;
- inactive icon uses muted color;
- focused icon can glow with the nav item;
- do not mix filled, emoji and line icons randomly.

Required icon concepts:

- home;
- catalog/grid;
- search;
- AI/spark;
- details/info;
- player/play;
- library/bookmark;
- episodes/calendar;
- sources/link or database;
- user media/import;
- QR;
- diagnostics/activity;
- updates/download/cloud;
- settings/gear.

## TV-first focus behavior

Every focusable component must have:

- visible focus ring;
- predictable D-pad movement;
- no focus traps;
- automatic scroll into view when focused;
- minimum 48px visual target, preferably 56px+;
- readable typography at TV distance.

## User journey reference

Primary journey:

1. App opens on `Главная`.
2. User immediately sees featured content.
3. User can press Play or open Details.
4. User can move down to Continue Watching.
5. User can move left/right through shelves.
6. User can move left to menu and open Search or Library.
7. User can return predictably with Back.

Secondary journeys:

- Search → Results → Details → Player.
- Home → AI подбор → Details → Player.
- Home → Библиотека → Continue item → Player.
- Источники → Preview/Save → Диагностика if invalid.
- QR импорт → phone input → TV confirmation.
- Обновления → check release → open release/install flow.

## Engineering interpretation

When implementing UI:

- preserve current menu content;
- redesign layout and styling around that content;
- do not replace product structure with a different app concept;
- do not introduce copyrighted catalog data;
- fictional placeholder content is acceptable;
- all source/media features must remain user-controlled/legal only;
- if implementation differs from this reference, update this file and link the reason to a backlog story.
