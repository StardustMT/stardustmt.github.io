---
title: "Patch Sequencing"
description: "Each Song in Stardust contains an ordered list of Patches that the keyboardist advances through during the performance. Press the footswitch → next patch loa..."
---

> Walk through an ordered list of patches in a Song, advancing with a footswitch. Zero stuck notes. Instant switching.

**Status:** Core Show / Song / Patch model shipped in v0.3.0; engine-from-patch in v0.4.0; always-on engine in v0.4.1; multi-plugin chain hosting in v0.5.0. Per-patch transition refinements (warm-pool, sub-block boundary advance) land alongside v0.7.0 sandboxing.

## What it does

Each Song in Stardust contains an **ordered list of Patches** that the keyboardist advances through during the performance. Press the footswitch → next patch loads instantly with no clicks, pops, or stuck notes from the previous patch.

This is the core play experience of Stardust. See [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/) for the concept.

## How advancing works

When you advance from Patch N to Patch N+1:

1. **All notes held on the outgoing patch** are handled per the patch's transition config:
   - Release naturally (default — sounds musical)
   - Cut immediately
   - Carry over to the new patch (for sustained pads)
2. **Sustain pedal** is conceptually released for the outgoing patch (to prevent stuck-sustain)
3. **The new patch's VST chain is already loaded** — pre-loaded in memory
4. **A configurable transition** plays — immediate / short fade / crossfade
5. **MIDI mappings** swap to the new patch's mappings instantly
6. **UI updates** — patch label changes, patch list strip highlights the new active patch
7. **Patch N+2 begins pre-loading** in the background so the next advance is also instant

Total perceived latency: **under 20 ms** for the audio swap. UI updates are 30-60 ms (imperceptible to musicians).

## Pre-loading strategy

To make patch advances instant, we pre-load **adjacent patches** in memory:

- Current patch is fully instantiated and processing audio
- Next patch (N+1) is instantiated with state loaded, but muted
- Previous patch (N-1) similarly pre-loaded for back-foot navigation
- When you advance: just swap which patch is unmuted; the new one is ready

Memory cost: ~2-3x what a single patch would use. Worth it for instant switching.

## Direct jump

In addition to next/prev advance:

- **Keyboard 1-9** — number keys jump directly to that patch in the current Song
- **Footswitch with jump action** — assign specific footswitches to specific patches
- **MIDI cue** — incoming MIDI message triggers a Patch jump
- **Touch the patch list strip** in Live Mode — tap a patch to jump

Jumps work the same way as advance — pre-loading, voice tracking, transitions all apply.

## Voice tracking (preventing stuck notes)

Stuck notes between patches are the single most common reliability complaint about live-host software. Stardust avoids them by tracking every active voice.

Every active note is recorded by `(channel, note, plugin_id)` in a pre-allocated buffer. On patch change:

1. Identify all notes currently held on the outgoing patch's plugins
2. Send `note-off` for each, plus `sustain-off`, plus `all-notes-off` as belt-and-suspenders
3. Switch to the new patch
4. Notes physically pressed now go to the new patch's plugins

The voice tracker is pre-allocated (no allocation in audio thread), tracks up to N voices (default 1024 — far more than any musician would ever hold), and is reset on Show load.

If something goes wrong (plugin crashes, MIDI message dropped), the **panic button** brute-force broadcasts all-notes-off on every channel.

See [Voice Tracking](/docs/pit/reliability/voice-tracking/).

## Patch transitions

Each Patch can configure its transition style:

- **Immediate** (default) — instant swap, fast and tight
- **Short fade** — 50-100 ms crossfade, hides any minor mismatch
- **Long crossfade** — 1-3 second blend, useful for ambient transitions where you want to merge sounds

Transitions are per-target patch (i.e., "when this patch *becomes active*, fade in over X ms"). The outgoing patch's audio is faded out by the same envelope.

## Sustain bridging

A configurable option per Patch: when a note is being held during a patch change, what happens?

- **Cut** — notes stop immediately (snappy, predictable)
- **Release naturally** (default) — notes follow their normal release envelope on the outgoing patch
- **Carry over** — held notes continue sustaining on the new patch (rare, for sustained pad/string parts)

Carry-over is unusual but useful: e.g. a sustained string pad that needs to glide between sound design variations without note retrigger.

## Patch list UI

In Live Mode, the **patch list strip** widget shows all patches in the current Song:

```
[Patch 1: Whistle]  [Patch 2: Bells]  [● Patch 3: Pad]  [Patch 4: Glass]
                                       ^current
```

Current patch highlighted, others dimmed. Tap any patch to jump. Strip auto-scrolls if there are too many to fit.

Optionally show **next patch preview** as a separate widget — large text saying "Up next: Patch 4 — Glass" so you know what's coming.

See Widget Registry.

## Performance characteristics

| Operation | Target |
|---|---|
| Footswitch press → audio swap | < 20 ms |
| UI update on advance | < 60 ms |
| Plugin pre-load (background) | < 500 ms per plugin |
| Voice tracker capacity | 1024 simultaneous notes (configurable) |
| Memory overhead | ~2-3x single patch (for adjacent pre-load) |

## Phase status

| Phase | What's available |
|---|---|
| v0.2 | Voice tracker, panic key, manual patch swap in code |
| v0.4 | Full sequencing with UI, pre-load, transitions, sustain bridging |
| v0.5 | Smarter transitions (per-instrument crossfade rules) |

## Related pages

- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Cue System](/docs/pit/features/cue-system/)
- [MIDI Learn](/docs/pit/features/midi-learn/) (footswitch mapping)
- [Voice Tracking](/docs/pit/reliability/voice-tracking/)
- Widget Registry
- Data Model
