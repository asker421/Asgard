# Asgard TV — QA Status

Last updated: 2026-04-30

## Current QA Status

Not completed.

## Current Risk

The app has a strong early-alpha foundation, but it has not yet been verified as a stable Android TV build on real hardware.

## Required Smoke Test

| Area | Status | Notes |
|---|---|---|
| APK builds | TODO | |
| APK installs on Android TV / Mi Box S | TODO | |
| App opens without internet | TODO | |
| Remote navigation works | TODO | |
| Focus visible everywhere | TODO | |
| Back behavior works | TODO | |
| Home screen opens | TODO | |
| Mock catalog works | TODO | |
| Search opens | TODO | |
| Detail page opens | TODO | |
| ExoPlayer opens video | TODO | |
| Play/pause works | TODO | |
| Seek works | TODO | |
| Progress saves | TODO | |
| Sources screen opens | TODO | |
| TXT parser works | TODO | |
| Parser settings open | TODO | |
| Configured media service test works | TODO | |
| User-provided media validation works | TODO | |
| File picker opens where supported | TODO | |
| Media diagnostics screen opens | TODO | |
| Update screen opens | TODO | |
| App survives 15 minutes use | TODO | |

## QA Rule

A task can move to DONE only when:

- acceptance criteria passed;
- no critical crash;
- remote navigation works;
- user-facing errors are understandable;
- for TV UI tasks, focus behavior is verified.

## QA Output Format

For each tested area, write:

- Test date
- Device/emulator
- Build/version
- Result: PASS / FAIL / BLOCKED
- Evidence / notes
- Recommended backlog status
