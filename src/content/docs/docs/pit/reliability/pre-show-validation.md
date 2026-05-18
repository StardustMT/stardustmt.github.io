---
title: "Pre-Show Validation"
description: "Target version: v0.3"
---

> Before "Go Live," run a checklist. Green = ready. Yellow = warnings. Red = don't go live yet.

**Target version:** v0.3

## What it does

Before you flip Performance Lock to "Go Live," Stardust runs a comprehensive validation and shows a single dashboard with green/yellow/red status per check.

The goal: catch problems *now*, not 30 seconds into the overture.

## Validation checks

### Plugins
- ✅ All plugins in the Show load successfully
- ✅ No quarantined plugins in the active Patches
- ✅ Plugin scan is current (no plugins added since last scan)
- ⚠️ Warning: any plugin took > 5 seconds to load (slow boot)

### Audio
- ✅ Audio device matches saved configuration
- ✅ Sample rate matches
- ✅ Buffer size set to expected value
- ⚠️ Warning: buffer size larger than recommended for your setup

### MIDI
- ✅ All expected MIDI devices present
- ✅ All devices responding (test by sending a benign sysex query, listening for any response)
- ⚠️ Warning: an expected device not detected

### Mappings
- ✅ No parameter mappings reference missing plugins
- ✅ No cues reference missing patches
- ⚠️ Warning: a mapping references a device that's not currently connected

### System
- ✅ Disk space sufficient (autosave needs to write)
- ✅ CPU baseline reasonable (idle CPU < 50% before show starts)
- ✅ Memory available (no OOM risk)
- ⚠️ Warning: laptop running on battery (suggest plugging in)
- ⚠️ Warning: OS update pending (could trigger mid-show)

### Show file
- ✅ Show file integrity valid (no corruption)
- ✅ All sample files present (for custom sampler Patches)
- ⚠️ Warning: Show file edited externally since last load

## Dashboard UI

The dashboard appears when you click **Go Live**. Each row is clickable for details + resolution suggestion.

| Status | Check | Detail |
|---|---|---|
| ✅ | Plugins | All 12 plugins loaded |
| ✅ | Audio | Focusrite, 128 / 48k |
| ⚠️ | MIDI | Roland RD-2000 not detected |
| ✅ | Mappings | 42 mappings valid |
| ✅ | System | Healthy |
| ✅ | Show file | Hamilton-Tour-2026.stardust |

Actions available beneath: **Resolve issues** · **Go Live anyway**.

## What happens with warnings (yellow)

- Show continues to load, but you see the warning
- Click "Resolve" to see what to do (e.g. "Connect the RD-2000 and click Re-scan")
- Click "Go Live anyway" to proceed (sometimes you know better than the check)

## What happens with errors (red)

- Show *won't* go live until errors are fixed
- Examples:
  - Show file corrupted
  - Plugin completely missing (will crash on load)
  - Audio device not present at all
- "Go Live anyway" disabled for red items

## Phase status

| Phase | What's available |
|---|---|
| v0.3 | Full validation dashboard with all checks above |
| v0.4 | Auto-resolve suggestions ("Click here to re-scan plugins") |
| v0.5+ | Pre-show validation as part of the Show Setup Wizard's "test run" |

## Related pages

- [Performance Lock](/docs/pit/reliability/performance-lock/)
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Hot-Plug](/docs/pit/reliability/hot-plug/)
- [Device Profiles](/docs/pit/features/device-profiles/)
