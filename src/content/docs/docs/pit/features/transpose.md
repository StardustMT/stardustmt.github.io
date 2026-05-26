---
title: "Transpose"
description: "Target version: v0.5"
---

> Pitch shift a Song up or down in semitones. Essential for night-to-night vocal-health adjustments.

**Status:** Engine `transpose` node shipped in v0.5.0; per-patch transpose UI in v0.8.0.

## What it does

Per-Song transpose in semitones (±24 range typical). Audible pitch shift happens at the MIDI level — outgoing notes from the keyboard are shifted before reaching plugins, so the plugins play the transposed key directly.

Useful for:
- **Vocal health** — singer is tired, transpose down 2 semitones for the night
- **Original key vs performance key** — your charts are written in C but the show is performed in B
- **Capo equivalent** — guitar players use capos; keyboardists transpose
- **Multi-singer shows** — different soloists need different keys for the same Song

## How it works

Two implementation strategies:

1. **MIDI-level transpose** (default) — every `note_on` / `note_off` shifted by N semitones before reaching plugins. The plugin plays exactly the transposed notes; pitch is mathematically exact.
2. **Audio-level pitch shift** (advanced) — pitch-shift the plugin output audio. Slower, introduces artifacts, but works for sample-based plugins with specific tuning. Rarely needed.

Stardust uses MIDI-level by default. Audio-level is a future option for edge cases.

## Range warnings

When you transpose, Stardust checks:
- Are any expected notes now below the plugin's range (e.g. piano bottom note)?
- Are any expected notes above the plugin's range?
- For sample-based instruments: are we hitting the boundary where sample loops break?

If yes, surface a warning during edit. Doesn't block save — sometimes you want it that way for effect.

## Per-Song vs per-Patch

Default is **per-Song** transpose — the whole Song shifts together. But each Patch can override:

- Song-level transpose: +2 (all Patches default to +2)
- "Strings — Verse" Patch override: 0 (this Patch plays at original concert pitch)

Useful when one Patch in a Song needs to be in a different key (rare, but it happens).

See [Cascading Settings](/docs/pit/concepts/cascading-settings/).

## Live Mode indicator

The transpose status shows in Live Mode (configurable widget). Common display: "Key: B (orig C, -1)" or just "Transpose: -1."

## Storage

```json
"transpose": -2,
"transpose_strategy": "midi"  // or "audio"
```

Patch-level overrides use the same fields under `settings_overrides`.

## Related pages

- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)
- [Click Track](/docs/pit/features/click-track/) (often adjusted alongside transpose)
- [Show Notes](/docs/pit/features/show-notes/) (note your tonight's adjustments)
