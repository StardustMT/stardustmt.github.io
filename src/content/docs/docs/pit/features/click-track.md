---
title: "Click Track"
description: "Target version: v0.5"
---

> Per-Song click with configurable BPM, time signature, count-in. Standard musical-theatre / live-band tempo coordination.

**Target version:** v0.5

## What it does

Each Song can have a configured click track that plays during the Song:
- Configurable **BPM** (manual or tap-tempo)
- Configurable **time signature** (4/4, 3/4, 6/8, 5/4, etc.)
- Configurable **count-in** bars (0, 1, 2, or 4)
- Audio output routed to a **dedicated channel** (typically your in-ear mix only — others on stage don't hear it)
- **Visual indicator** flashes on the beat in Live Mode
- **MIDI clock** output for syncing external sequencers, drum machines, or lighting consoles
- **Tap-tempo** footswitch for live conductor follow

## Where the click is load-bearing

A click is often the difference between a tight cue and a sloppy one, particularly with:
- Songs that need exact tempo (e.g. dance breaks, click tracks pre-mixed with backing tracks)
- Numbers with multiple keyboardists who need to lock together
- Pieces that have to sync with pre-recorded backing tracks
- Conductor-following sections where the conductor needs to nudge tempo

## Use cases

- **Pure click** — just a tempo guide for the keyboardist's in-ears
- **Click + count-in** — automatic 4-bar count before the Song starts
- **Conductor follows** — tap-tempo on a footswitch lets you adjust live
- **Click to drum machine / sequencer** — MIDI clock out drives external time-based gear

## Routing

The click track is a separate audio channel — it's not mixed with the main Song output. Common routing:

- Main outputs (channels 1-2) → FOH / monitors → no click
- Auxiliary output (channels 3-4) → keyboardist's in-ears → click + cue mix
- Keep your audience-facing sound clean while you stay locked to tempo

Configure in the [Audio I/O](/docs/pit/features/audio-io/) panel.

## Visual indicator

In Live Mode, a `<ClickIndicator>` widget flashes on each beat. Quarter notes brighter, others dimmer. Customizable colors per theme.

## Tap-tempo

Assign a footswitch (via [MIDI Learn](/docs/pit/features/midi-learn/)) as tap-tempo:
- 4+ taps establish a tempo
- Stardust averages the last 4 taps for stability
- Subsequent taps drift the tempo (configurable rate of drift)
- Useful for conductor-follow sections

## MIDI clock output

Stardust can output MIDI Beat Clock (a standard MIDI Real-Time message at 24 PPQN) on a virtual MIDI port. External gear can sync:
- Ableton Live / Logic
- Hardware drum machines, sequencers, modular gear
- Lighting consoles that accept MIDI clock for tempo-synced effects
- forScore (for tempo-aware page turn animations? rare but possible)

## Storage format

```json
"click_track": {
  "bpm": 120,
  "time_signature": [4, 4],
  "count_in_bars": 1,
  "output_channel": 3,
  "volume": 0.7,
  "midi_clock_out": true,
  "midi_clock_port": "Stardust Clock"
}
```

See Data Model.

## Related pages

- [Audio I/O](/docs/pit/features/audio-io/)
- [MIDI Learn](/docs/pit/features/midi-learn/) (tap-tempo assignment)
- [Cue System](/docs/pit/features/cue-system/) (bar/beat cues — v0.5+)
- Widget Registry
