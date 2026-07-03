---
title: "Voice Tracking"
description: "Target version: v0.2"
---

> Track every active note so we can clean them up properly on patch change, panic, or plugin crash. The fix for "stuck notes."

**Target version:** v0.2

## The problem

MIDI is **stateful**: every `note-on` must be paired with a `note-off`. If anything drops the `note-off`:
- Plugin reload
- Dropped MIDI message
- Software crash
- Hardware glitch
- Patch change without proper cleanup

...the note sustains forever. **Stuck note.**

A "panic" command (all-notes-off broadcast) is the standard workaround in most live hosts. Stardust tracks active voices precisely so the workaround is rarely needed in the first place — panic exists as a last-resort failsafe, not the primary recovery mechanism.

## How voice tracking works

A **voice tracker** is a pre-allocated data structure that records every active note:

```rust
struct VoiceTracker {
    voices: [Option<Voice>; MAX_VOICES],
    // pre-allocated, no heap allocation in audio thread
}

struct Voice {
    channel: u8,
    note: u8,
    velocity: u8,
    plugin_id: PluginId,
    started_at: u64,  // sample count
}
```

When a `note-on` arrives:
1. Find an empty slot in `voices`
2. Record `(channel, note, plugin_id)` and metadata
3. Send to the relevant plugin

When a `note-off` arrives:
1. Find the matching voice in `voices`
2. Send `note-off` to the plugin
3. Clear the slot

## What happens on patch change

When you advance from Patch N to Patch N+1:
1. For every voice currently active on Patch N's plugins:
   - Send a `note-off` to that plugin
   - (Optional) brief release tail allowed before cutting
2. Send `all-notes-off` and `sustain-off` as belt-and-suspenders cleanup
3. Clear voice tracker for those plugins
4. Switch to Patch N+1's plugins
5. New incoming notes go to N+1's plugins

Result: no stuck notes between patches, even when carry-over voices are involved.

See [Patch Sequencing](/docs/pit/features/patch-sequencing/) for the user-facing flow.

## What happens on plugin crash

If a plugin crashes:
1. The plugin's voice tracker entries are immediately cleaned
2. `all-notes-off` broadcast on the channels the plugin was handling
3. New plugin (if restarted) gets a clean voice state

See [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/).

## What happens on hot-plug disconnect

If a MIDI device disconnects mid-note:
1. Voice tracker scans for voices originating from the disconnected device
2. Sends auto-`note-off` for each
3. Cleans the tracker entries

See [Hot-Plug Resilience](/docs/pit/reliability/hot-plug/).

## Capacity

Default: **1024 simultaneous voices** across all plugins / channels / devices. Configurable.

Why 1024? Even the most aggressive playing (multiple keyboards, layered sounds, complex MIDI input) tops out around 100-200 active voices. 1024 is comfortable headroom.

If we somehow exceed 1024 (e.g. a runaway MIDI feedback loop):
- Oldest voice gets evicted (with note-off sent)
- Warning logged
- Configurable: panic the engine vs continue with eviction

## Real-time-safe

Voice tracker is pre-allocated at startup. No heap allocation in the audio thread when notes come and go. All operations are O(voices_in_use) for lookup, which is small (typically < 50).

## Sustain pedal handling

When `CC 64 = 127` (sustain on) arrives:
- All currently-active voices get marked as "sustained"
- Any future `note-off` for these voices is **deferred** until `CC 64 = 0` (sustain off)

When `CC 64 = 0` arrives:
- All sustained voices get their pending `note-off` issued
- Tracker cleans up

This is standard MIDI behavior, but easy to get wrong. Our voice tracker handles it cleanly.

## Panic button (shipped, v0.6.0)

Even with perfect voice tracking, the **panic button** exists as a safety net. As shipped in v0.6.0 (`engine_panic`, stardust-pit#3):

- Manually triggerable — UI button in the engine panel, **Shift+Esc** anywhere in the app (configurable binding + rig-component action land with the button/switch component, #5)
- Completes **within one audio block** (≤ 5.3 ms @ 48 kHz / 256 frames), allocation-free on the audio thread
- Per instrument, in order: `sustain-off` (CC 64 = 0), an explicit `note-off` + poly-aftertouch-clear for **every tracked voice**, then `all-notes-off` (CC 123), pitch-bend center, mod-wheel 0, and channel-pressure 0 — on **every channel**, on **every plugin**
- Clears the entire voice tracker; events queued before the panic are dropped
- Idempotent and spammable — mashing it re-sends only the controller resets
- Auto-trigger on anomaly (plugin crash, device loss) arrives with v0.7.0 crash detection

In Stardust, panic should rarely be needed. But it's there.

The tracker itself shipped alongside: a fixed 16-channel × 128-note bitset per instrument node, maintained inline during MIDI fan-out — this is also what guarantees held notes survive a device rebind (`engine_rebind_routing`, #1).

## Precise tracking vs. panic-on-change

Many live hosts handle patch changes by broadcasting `all-notes-off` on every channel as a precaution — effective, but it also kills notes that should carry over (held pads, sustained voices intended to bridge patches).

Precise voice tracking lets Stardust send `note-off` only for the voices that belong to the outgoing patch. Carry-over voices stay sounding; everything else is cleaned up cleanly.

## Phase status

| Phase | What's available |
|---|---|
| ✅ v0.6.0 | Per-instrument voice tracker (bitset, fan-out-maintained), engine Panic command + UI button + Shift+Esc, tracked voices survive device rebind |
| v0.7.0+ | Auto-panic on plugin crash / device loss (crash detection) |
| later | Sustain bridging modes, carry-over voices on patch change, configurable transitions |

## Related pages

- [Patch Sequencing](/docs/pit/features/patch-sequencing/)
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Hot-Plug](/docs/pit/reliability/hot-plug/)
- MIDI Internals
- [Real-Time Audio](/docs/pit/reliability/latency-budget/)
