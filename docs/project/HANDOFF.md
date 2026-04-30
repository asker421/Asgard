# Asgard TV — Chat Handoff

Last updated: 2026-04-30

## Chat Role

UX/UI

## Required Files Read

Read and used for this session:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/project/PROJECT_STATE.md`
4. `docs/project/CHAT_PROTOCOL.md`
5. `docs/project/HANDOFF.md`
6. `docs/project/DECISIONS.md`
7. `docs/project/NEXT_ACTIONS.md`
8. `docs/prompts/UX_UI_CHAT_PROMPT.md`
9. `docs/qa/QA_STATUS.md`
10. `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
11. `docs/product/VISUAL_REFERENCE.md`
12. `android/app/src/main/assets/web/menu.txt`
13. `android/app/src/main/assets/web/ui.js`
14. `android/app/src/main/assets/web/input.js`

Important note: `docs/product/backlog.json` was returned truncated by the GitHub connector during this session. It was not overwritten. Status interpretation used `docs/product/backlog-prioritized-status-2026-04-30.json` as the safe status layer.

## Work Completed

- Switched active role from Engineer to UX/UI after user correction.
- Performed required project-memory read for the UX/UI role.
- Confirmed formal backlog source of truth remains `docs/product/backlog.json`.
- Confirmed safe status guidance is `docs/product/backlog-prioritized-status-2026-04-30.json` because `backlog.json` may be truncated by the GitHub connector.
- Read current visual reference and UX/CX spec.
- Inspected current menu source: `android/app/src/main/assets/web/menu.txt`.
- Inspected runtime UI menu implementation: `android/app/src/main/assets/web/ui.js`.
- Inspected remote input/focus foundation: `android/app/src/main/assets/web/input.js`.
- Added UX/UI review document: `docs/ux/UX_REVIEW_2026-04-30.md`.
- No application code was changed in this UX review step.
- No backlog status was changed in this UX review step.

## Files Changed

- `docs/ux/UX_REVIEW_2026-04-30.md`
- `docs/project/HANDOFF.md`

## Current UX/UI Status

Current UX status: **NEEDS WORK**.

The project has a premium dark TV visual direction, remote input foundation and focus system, but there is a critical mismatch between the documented menu source of truth and the runtime UI menu definition.

## Critical UX Finding

`docs/product/VISUAL_REFERENCE.md` says the left menu must preserve the content from:

`android/app/src/main/assets/web/menu.txt`

Current `menu.txt` contains:

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

But `android/app/src/main/assets/web/ui.js` currently hardcodes only:

```js
['Главная','Поиск','Каталог','Библиотека','Источники','Настройки']
```

This means the runtime UI does not currently match the visual/product reference.

## Current Highest UX Priority

1. Align runtime menu with `menu.txt` without changing menu content.
2. Add consistent icons for every existing menu item.
3. Keep all current left menu item names and order exactly as `menu.txt` defines them.
4. Run Android TV D-pad focus audit after menu alignment.
5. Then polish Home hero, shelves and Continue Watching according to `docs/product/VISUAL_REFERENCE.md`.

## Next Recommended Task

UX/UI + Engineer:

Fix menu source mismatch.

Preferred implementation:

- Make `ui.js` load or mirror `android/app/src/main/assets/web/menu.txt` as the runtime menu source.
- If dynamic loading is risky, update `AsUI.menu` to exactly match `menu.txt` and add a code comment that `menu.txt` is the source of truth.
- Add line icons for every current menu item.
- Do not add, remove, reorder or rename menu items.

Suggested commit message:

```text
fix: align runtime menu with visual reference source
```

## Blockers / Risks

- `docs/product/backlog.json` may be truncated by the GitHub connector; do not overwrite it unless full file content is safely available.
- Runtime menu and documented menu currently disagree.
- No repository evidence yet of completed Android TV / Mi Box S physical UX QA.
- Do not mark any backlog item DONE until acceptance criteria and Definition of Done are verified.
- Do not add bundled prohibited catalogs, unauthorized sources, DRM bypass, Cloudflare bypass, captcha bypass, or silent APK installation.

## Notes for Next Chat

Before doing implementation or QA work, read:

1. `docs/product/backlog.json`
2. `docs/product/backlog-prioritized-status-2026-04-30.json`
3. `docs/product/UX_UI_CX_INTERFACE_SPEC.md`
4. `docs/product/VISUAL_REFERENCE.md`
5. `android/app/src/main/assets/web/menu.txt`
6. `docs/project/PROJECT_STATE.md`
7. `docs/project/CHAT_PROTOCOL.md`
8. `docs/project/DECISIONS.md`
9. `docs/project/NEXT_ACTIONS.md`
10. `docs/project/HANDOFF.md`
11. The relevant role prompt under `docs/prompts/`

Do not use `docs/BACKLOG.md`.

When reviewing UI/runtime behavior, do not judge only `main.js` or `input.js` in isolation. `index.html` may load later patch scripts that override or extend base behavior.
