---
title: "Feature: Setlist Mode"
description: "Target version: v0.5"
---

> Walk through the show in order. Auto-advance or jump freely. Always know what's next.

**Target version:** v0.5

## What it does

Defines the order of Songs in the Show and provides a streamlined "I'm in performance" view of progression:
- Show the current Song large and prominent
- Show "Up Next" preview
- Allow free-jump to any Song (when needed, e.g. skipping a number)
- Optional auto-advance through Songs (rare in MT, common in concert setlist contexts)

## Typical MT setlist

A musical-theatre show might have 30-50 Songs (numbers + entr'actes + scene-change incidentals). Setlist mode is what makes navigating that practical.

```
1. Overture
2. Opening Number — "Tomorrow"
3. Scene-change incidental
4. "Maybe"
...
44. Encore
```

You're typically advancing through these in order. Footswitch advances Song; Stardust loads the new Song's first Patch.

## Free-jump

Three ways to jump to a non-adjacent Song:
- **Number key** — press the Song's number key (or a memorable shortcut)
- **Sidebar click** — Song list sidebar, click to load
- **MIDI cue** — incoming MIDI message triggers Song jump (conductor's cue)

## Auto-advance

Optional. When enabled, Stardust automatically advances to the next Song:
- **After N seconds of silence** — useful for backing-track contexts
- **On click track end** — when the Song's click finishes its full duration
- **On specific MIDI cue** — a "Song complete" message

Disabled by default — MT typically wants manual advance.

## "Up Next" preview

A dedicated widget in Live Mode shows:
- Currently active Song (large)
- Up Next: name (smaller, slightly dimmed)
- Optionally: time/duration estimate based on Song's BPM and length

Useful for orienting yourself between Songs.

## Custom show order

The setlist order is configurable per Show. Songs can be:
- Reordered via drag-and-drop in Show Editor
- Marked as "skip" (won't auto-advance to them, but still accessible via free-jump)
- Grouped into "Acts" with optional intermission marker

## Use cases beyond MT

While MT is the primary target, Setlist Mode also works for:
- **Concert setlist** — band's pre-planned song order with auto-advance after silence
- **Worship service** — songs in liturgical order with manual advance
- **DJ/electronic set** — though Stardust isn't really designed for that workflow

## Phase status

| Phase | What's available |
|---|---|
| v0.5 | Full Setlist Mode with free-jump and auto-advance |

## Related pages

- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Patch Sequencing](/docs/pit/features/patch-sequencing/)
- [Cue System](/docs/pit/features/cue-system/)
- **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' --> (NextUpWidget)
