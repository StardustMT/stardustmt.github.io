---
title: "Custom Sampler"
description: "Target version: v0.4 (moved up from v0.5 due to demand)"
---

> Record a sound, auto-map it across the keyboard, save as a Stardust Patch. Use it for show-specific custom sounds.

**Target version:** v0.4 (moved up from v0.5 due to demand)

## What it does

Record audio (live input or imported file), and Stardust automatically maps it across the keyboard with pitch shifting + time stretching so every key plays the sound at a different pitch.

Useful for:
- **Show-specific custom sounds** — Sondheim's "Sweeney Todd" whistle, "Little Shop of Horrors" Audrey-II growl, any number from your specific show
- **Recorded vocal samples** — your singer's "ah" for a layered backing
- **Found sounds** — a creaky door, a coin drop, anything you need to trigger from a keyboard
- **Quick-and-dirty instrument design** — record yourself playing one note on a real instrument, map it across

## How it works

1. **Record or import** — record from your audio interface input, or import a `.wav` / `.flac` / `.aiff` file
2. **Set the root note** — what key was the original sound played at? (Stardust can auto-detect for tonal recordings)
3. **Configure mapping** — pitch shift (semitone-by-semitone) or time stretching (preserves pitch over the keyboard range)
4. **Save as Patch** — adds to the current Patch's VST chain as a "Stardust Sampler" instance

Under the hood, this generates an **SFZ file** (industry-standard sample format) that Stardust's built-in SFZ player (or Sforzando, if installed) plays. SFZ format means your custom samples are portable to other apps if you ever leave Stardust.

## Recording quality

- Record at the audio interface's native sample rate
- Up to 30 seconds per sample (configurable)
- Multi-sample recording supported (record 3-5 root notes for better range coverage)
- Velocity-layered samples (v0.5+ — record soft, medium, loud versions; Stardust crossfades by velocity)

## Pitch shifting strategies

- **Resampling** (default) — fast, classic "Mellotron" character; pitch and time scale together (high pitch = shorter)
- **Time-stretched pitch shift** — pitch shifts independent of duration; high notes don't get shorter. Slight quality loss but tonally cleaner.

Pick per sound. Drums and percussion want resampling. Sustained tones want time-stretched.

## Multi-sample for range coverage

A single sample stretched across an octave or more starts to sound artifact-y. For better coverage, record multiple samples at different pitches:
- Record C2, C3, C4, C5
- Stardust uses the closest sample as the source for each key, then pitch-shifts within ±3 semitones

This is how all professional sample libraries work — Stardust gives you a quick way to do it in-app.

## Workflow example

> "I need a glass-clink sound for Patch 3 of My Shot."

1. Open Stardust → Patch 3 in Edit Mode
2. Click "Add Sound" → "Custom Sampler"
3. Record button → tap a glass with a metal spoon, stop recording
4. Set root note: G4 (or just let Stardust auto-detect)
5. Choose "Resampling" for that classic percussion-y feel
6. Save → glass-clink is now playable across the whole keyboard, pitch-shifted

Time investment: 30 seconds to record, 10 seconds to configure.

## Integration with community sharing

Sampler-created sounds can be exported as `.sfz` + sample files and shared via [Community Sharing](/docs/pit/features/community-sharing/) — paid or free. Other users can install the sound bundle and it appears in their Sampler library.

## Storage

Custom samples stored in the Show's bundle (the `.stardust-show` zip):
- `samples/<patch-id>/<sample-id>.wav` — raw audio
- `samples/<patch-id>/<sample-id>.sfz` — SFZ mapping definition
- Referenced in the Patch's plugin chain

## Phase status

| Phase | What's available |
|---|---|
| v0.4 | Basic record + pitch-shift mapping, single sample per Patch |
| v0.5 | Multi-sample + velocity layers |
| v1.0+ | Time-stretched pitch shifting, granular synthesis options |

## Related pages

- [Plugin Hosting](/docs/pit/features/plugin-hosting/) (sampler is a built-in plugin in the VST chain)
- [Community Sharing](/docs/pit/features/community-sharing/)
- File Format (samples bundled in Show file)
