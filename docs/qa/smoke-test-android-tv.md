# Asgard TV — Android TV Smoke Test Checklist

Owner: QA / release engineer  
Target device: Android TV / Mi Box S / Smart Box  
Backlog coverage: release smoke test, Mi Box S validation, remote navigation, player, source import, AI disabled mode, settings, diagnostics

This checklist is a release gate. A build is not ready for a user-friendly APK release until every critical case is either `PASS` or explicitly accepted as a known limitation.

---

## 1. Test Build Information

Fill this before testing.

| Field | Value |
|---|---|
| APK version / build label |  |
| Git commit / branch |  |
| Test date |  |
| Tester |  |
| Device model |  |
| Android TV version |  |
| Network state | Online / Offline / Both |
| Install method | USB / Downloader / File manager / Other |

---

## 2. Result Codes

| Code | Meaning |
|---|---|
| PASS | Works as expected |
| FAIL | Blocks release or must be fixed |
| WARN | Usable, but needs improvement |
| N/A | Not applicable for this build |

---

## 3. Install and First Launch

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-001 | Install APK on Android TV / Mi Box S | APK installs without error |  |  |
| ST-002 | Launch from TV launcher | Asgard TV appears and opens |  |  |
| ST-003 | Launch without internet | App opens without crash |  |  |
| ST-004 | First launch stability | No crash or black screen in first 60 seconds |  |  |
| ST-005 | App icon / banner | Launcher metadata is visible and readable |  |  |

Release rule: any `FAIL` in this section blocks release.

---

## 4. Remote Navigation and Focus

Use only the Android TV remote unless the case says otherwise.

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-010 | Press Up / Down / Left / Right on Home | Focus moves predictably |  |  |
| ST-011 | Press OK / Select on focused item | Focused action opens or executes |  |  |
| ST-012 | Press Back from child screens | Returns to previous screen or safe home state |  |  |
| ST-013 | Navigate through all menu items | Focus is always visible |  |  |
| ST-014 | Long press D-pad | Navigation does not break or trap focus |  |  |
| ST-015 | Navigate to Settings and back | No focus loss |  |  |
| ST-016 | Navigate to Sources and back | No focus loss |  |  |

Release rule: invisible focus or a focus trap is a release blocker.

---

## 5. Home, Search and Detail Pages

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-020 | Open Home | Main sections render without crash |  |  |
| ST-021 | Home with empty data / offline mode | User sees a friendly empty/offline state |  |  |
| ST-022 | Open Search | Search screen is reachable by remote |  |  |
| ST-023 | Search English query | Results or no-result state appears |  |  |
| ST-024 | Search Russian query | Input does not break UI |  |  |
| ST-025 | Open a result / mock title | Detail page opens |  |  |
| ST-026 | Detail page with missing metadata | Layout does not break |  |  |
| ST-027 | Add to Favorites / Watchlist if visible | Action does not crash |  |  |

---

## 6. Player Smoke Test

Use a legal test stream or local mock video only.

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-030 | Start playback from mock title | Player opens and starts or shows controlled error |  |  |
| ST-031 | Press OK / Select | Play / pause toggles |  |  |
| ST-032 | Press Left | Seek backward or safe no-op |  |  |
| ST-033 | Press Right | Seek forward or safe no-op |  |  |
| ST-034 | Press Back in player | Player exits safely |  |  |
| ST-035 | Bad stream URL | Error is shown; app does not crash |  |  |
| ST-036 | Unknown duration stream | Seek does not crash |  |  |
| ST-037 | Resume same title | Progress resumes where technically supported |  |  |

Release rule: native crash in player blocks release.

---

## 7. Sources and TXT Import

Use only sources the tester has the right to access. Do not test with unauthorized copyrighted catalogs.

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-040 | Open Sources screen | Screen opens without crash |  |  |
| ST-041 | Import TXT with valid placeholder rows | Parser accepts valid rows |  |  |
| ST-042 | Import TXT with empty lines and comments | Empty lines and `#` comments are ignored |  |  |
| ST-043 | Import malformed TXT | Invalid rows are reported, no crash |  |  |
| ST-044 | Restart app after import | Sources persist where persistence is implemented |  |  |
| ST-045 | Broken source entry | Broken source does not break the full app |  |  |

---

## 8. QR Import, AI Disabled Mode, Settings and Diagnostics

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-050 | Open QR import screen | Screen opens or clearly shows placeholder state |  |  |
| ST-051 | AI disabled / unavailable | App remains usable |  |  |
| ST-052 | Open AI picker / AI area | Missing provider does not crash app |  |  |
| ST-053 | Open Settings | Settings sections are reachable by remote |  |  |
| ST-054 | Open Diagnostics | Diagnostics screen opens without crash |  |  |
| ST-055 | Run any available diagnostic check | Result is shown as OK / Warning / Error where implemented |  |  |

---

## 9. Stability Pass

| ID | Test | Expected result | Result | Notes |
|---|---|---|---|---|
| ST-060 | Use app for 15 minutes | No crash, ANR, or unrecoverable focus loss |  |  |
| ST-061 | Switch app to background and back | App resumes safely |  |  |
| ST-062 | Reboot device and reopen app | App opens safely after reboot |  |  |
| ST-063 | Disconnect network during app usage | App shows graceful offline/error states |  |  |

---

## 10. Final Release Decision

| Gate | Status | Notes |
|---|---|---|
| Install / launch passed |  |  |
| Remote navigation passed |  |  |
| Player smoke passed |  |  |
| Sources/TXT smoke passed |  |  |
| AI disabled mode passed |  |  |
| Settings / diagnostics passed |  |  |
| 15-minute stability passed |  |  |
| Known release blockers |  |  |

Final decision: `READY_FOR_RELEASE` / `NOT_READY`

---

## 11. Known Limitations Template

Use this format when a case is not a blocker but must be visible.

```text
Limitation:
Impact:
Workaround:
Backlog item:
Release decision:
```
