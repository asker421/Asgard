# Asgard TV 2.9.1 — Parser Discovery and Remote Input Hotfix

## Fixed

### Parser discovery

The JacRed adapter no longer stops discovery when the base URL returns an HTML UI.

Before:

- `https://jac-red.ru/?t=search&q=test` returned HTML.
- Discovery stopped with `HTML UI detected; API endpoint required`.

Now:

- HTML UI is recorded in diagnostics as one failed attempt.
- Discovery continues to endpoint patterns such as:
  - `/api/v2.0/indexers/all/results/torznab/api`
  - `/api/v2.0/indexers/all/results/torznab/api/`
  - `/torznab/api`
  - `/api/torznab`
  - `/torznab`
  - `/api`
  - base URL last

Diagnostics now includes `attempts` so QA can see every endpoint that was tried.

### D-pad / Enter conflicts

The legacy `input.js` linear remote handler was overriding the newer spatial navigation layer.

Before:

- ArrowRight and ArrowDown both moved to next element.
- ArrowLeft and ArrowUp both moved to previous element.
- This could interfere with Test Parser / Test All Parser buttons.

Now:

- `input.js` only refreshes focusable elements and tracks touch/remote mode.
- `nav.js` remains the only spatial D-pad handler.

## Version

- versionName: `2.9.1`
- versionCode: `31`

## QA

1. Open Settings -> Parser & TorrServer.
2. Enter base URL such as a JacRed UI URL.
3. Press Test JacRed.
4. Confirm diagnostics shows multiple attempts, not only the base UI URL.
5. Press Test all parsers and Select best parser.
6. Confirm D-pad can move to buttons and Enter/OK activates them.
