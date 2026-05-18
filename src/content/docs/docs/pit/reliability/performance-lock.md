---
title: "Reliability: Performance Lock"
description: "Target version: v0.3"
---

> A single toggle that disables every potentially destructive operation during a show.

**Target version:** v0.3

## What it does

"Go Live" / "End Show" — a single toggle that flips the app into **performance mode**:
- File operations disabled (no save dialogs, no plugin scans)
- Patch editing disabled
- Layout editing disabled
- Settings changes mostly disabled
- Plugin loading / unloading disabled
- Auto-save still runs (in the background, but uses incremental snapshots)

When off (default): full app capability.

## Why this is its own toggle

You might think this is the same as Live Mode. It's not.

- **Live Mode** = a UI mode (what the user sees — performance-optimized layout)
- **Performance Lock** = a behavioral mode (what the app *allows* — destructive ops blocked)

They're orthogonal. You can be in Edit Mode with Performance Lock on (looking at editor but can't change anything). You can be in Live Mode with Performance Lock off (visual play view but able to make edits if needed).

Typical: both modes go together when you "Go Live."

## What's blocked when on

- Save / Save As / Save Show
- Import / Export
- Plugin scan
- VST chain editing (add / remove / reorder plugins)
- Plugin parameter changes (only through MIDI mappings, not direct UI)
- MIDI mapping changes
- Show / Song / Patch editing
- Theme changes (could cause UI repaint glitches)
- Audio device changes (could cause callback resets)
- MIDI input device changes
- Buffer size changes
- Settings panel disabled (read-only access)

## What still works

- Patch advance / previous (the whole point)
- Direct Patch jump (1-9, MIDI cues)
- Live parameter tweaking via mapped MIDI controls
- Live parameter tweaking via UI "favorite" widgets in Live Mode
- Panic button
- Latency / CPU monitoring
- Auto-save (in background)
- Hot-plug recovery
- Plugin crash recovery

## What it actually prevents

The audio callback runs in a tight loop. Anything that:

- Allocates memory
- Loads a file
- Modifies the plugin chain structure
- Re-scans devices

…can cause an allocation spike or callback delay, which can cause a dropout. Performance Lock prevents these classes of operations.

Many of these paths are already designed to be safe in Stardust. Performance Lock is the "no surprises" mode on top of that — a hard guarantee that nothing in either category can happen until the show ends.

## Visual indicator

When Performance Lock is on:
- A persistent indicator in the status bar: "⏺ LIVE"
- Edit buttons throughout the UI dim and show a tooltip: "Disabled while Performance Lock is active"
- The "Go Live" button changes to "End Show" with a confirm dialog

## Auto-save during Performance Lock

Auto-save still runs (every 30 seconds by default), but uses **incremental snapshots**:
- Only the diff since last save is written
- Write happens in a non-RT thread
- File I/O batched to minimize impact
- If save fails (disk full, etc.), don't block — log error, continue

On End Show, full save runs to consolidate the snapshots.

## "Go Live" workflow

1. Click "Go Live" button (top-right of UI)
2. [Pre-show validation](/docs/pit/reliability/pre-show-validation/) runs
3. If green: confirm dialog "Performance Lock active. Disabling edits until you click End Show."
4. Click "Confirm" → Performance Lock on
5. (Optional) Switch UI to Live Mode for performance visual layout
6. Play the show

## "End Show" workflow

1. Click "End Show" button (now showing in status bar)
2. Confirm dialog: "End Show — disable Performance Lock?"
3. Click "Confirm" → Performance Lock off
4. Auto-save consolidates pending snapshots
5. App returns to normal mode

## Phase status

| Phase | What's available |
|---|---|
| v0.3 | Performance Lock toggle, full set of blocked operations |
| v0.4 | Pre-show validation gating Go Live |
| v0.5+ | Configurable per-Show: which operations to block |

## Related pages

- [Pre-Show Validation](/docs/pit/reliability/pre-show-validation/)
- [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/)
- [Latency Budget](/docs/pit/reliability/latency-budget/)
