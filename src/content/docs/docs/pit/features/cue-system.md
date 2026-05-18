---
title: "Cue System"
description: "A cue is a trigger → action pairing that fires during performance. Cues let you do things like:"
---

> Trigger actions during a Song from footswitches, MIDI events, or (eventually) timed cues.

## What it does

A **cue** is a trigger → action pairing that fires during performance. Cues let you do things like:

- "When I press footswitch 1, advance to the next Patch"
- "When the conductor sends MIDI note C-2 on channel 16, trigger panic"
- "When the click hits bar 17, advance the Patch automatically" (v0.5+)

Cues are defined per Song (mostly) and resolved at play time.

## Triggers

### MVP (v0.4)

- **Footswitch** — physical button press on a configured device
- **MIDI event** — incoming MIDI message matches a pattern (specific note, CC value, program change, etc.)

### v0.5+

- **Timed** — fires at a specific time elapsed in the Song
- **Bar/beat** — fires at a specific bar/beat (requires click track running)
- **MIDI Show Control (MSC)** — industry-standard show coordination protocol

## Actions

What a cue can do:

- **Advance Patch** (next / previous)
- **Jump to Patch** (by index in current Song)
- **Advance Song** (next / previous)
- **Jump to Song** (by index in setlist)
- **Trigger panic** (all-notes-off + sustain-off)
- **Send MIDI out** (program change, CC, note — for forScore page turns, QLab cues, lighting consoles)
- **Toggle Performance Lock**
- **Set parameter value** (snap a parameter to a specific value)
- **Toggle UI element visibility** (hide/show widgets)

## Cue editor

In Edit Mode → Patch tab, every Song has a **Cues** section listing all defined cues. Each row shows trigger + action with quick edit/delete.

The editor uses a simple two-column flow:
1. **Trigger** — select type (footswitch / MIDI event / timed) and configure
2. **Action** — select type and configure

For common cases (footswitch → advance patch), there's a one-click "Add common cue" button.

## Footswitch debounce + multi-advance prevention

Already mentioned in [MIDI Learn](/docs/pit/features/midi-learn/) and [Device Profiles](/docs/pit/features/device-profiles/) — for footswitch cues:

- **Minimum interval between advances** — configurable per Show, default 200 ms
- **Debounce** for contact bounce — default 150 ms
- **Stuck-high detection** — sustained CC 64 = 127 treated as single edge, not continuous re-trigger
- **Roland sustain-slot handling** — explicit support for the Boss FS-5U-into-sustain-jack hack

These prevent the most common footswitch failure mode in live hosts — a single press registering as two or three patch advances due to contact bounce or a sustained CC 64.

## MIDI-event cues (conductor cues)

A common Broadway pattern: the conductor (or stage manager) sends a MIDI note on a dedicated channel to signal "now." Stardust catches these and fires the configured action.

Example workflow:
- Conductor's iPad runs forScore or an SM app sending MIDI to a USB-MIDI cable
- That cable feeds into Stardust on the keyboardist's laptop
- Specific notes on a specific channel trigger Patch advances, panic, or Song jumps
- Same MIDI feed can drive a lighting console or QLab simultaneously

This makes Stardust into part of a coordinated show-control system.

## Storage format

Cues are part of the Song's JSON:

```json
"cues": [
  {
    "trigger": { "type": "footswitch", "device": "Boss FS-5U", "switch": 1 },
    "action": { "type": "advance_patch" }
  },
  {
    "trigger": { "type": "midi_event", "channel": 16, "msg": "note_on", "note": 24 },
    "action": { "type": "jump_to_patch", "index": 0 }
  },
  {
    "trigger": { "type": "midi_event", "channel": 16, "msg": "note_on", "note": 25 },
    "action": { "type": "trigger_panic" }
  }
]
```

See **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->.

## Cascading

Like other settings, cues can be defined at Show, Song, or Patch level. Common case: footswitch → advance patch at Show level (applies to all Songs); specific Songs can override or add additional cues.

See [Cascading Settings](/docs/pit/concepts/cascading-settings/).

## Per-show min advance interval

The "200 ms minimum between patch advances" is a Show-level setting, accessible in Settings → Performance. Some MDs (very fast advance sections) might want 100 ms; others (less reliable footswitch hardware) might want 300 ms. Stays consistent within a show.

## QLab / MSC integration (v0.5+)

QLab is the industry-standard show-control app. Stardust can integrate via:
- **OSC** — bidirectional cue triggers
- **MIDI Show Control** — formal protocol used in professional productions
- **Network triggers** — IP-based cue sends

This is v0.5–v1.0 territory. The cue system's data model is built generically so these plug in without rewrites.

## Phase status

| Phase | What's available |
|---|---|
| v0.4 (MVP) | Footswitch + MIDI-event cues, debounce, min-interval |
| v0.5 | Timed cues, bar/beat cues (requires click sync) |
| v0.5–v1.0 | QLab integration via OSC + MSC |
| v1.0+ | Cue list timeline view |

## Related pages

- [MIDI Learn](/docs/pit/features/midi-learn/)
- [Device Profiles](/docs/pit/features/device-profiles/)
- [Click Track](/docs/pit/features/click-track/) (for timed/bar cues)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)
- **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->
