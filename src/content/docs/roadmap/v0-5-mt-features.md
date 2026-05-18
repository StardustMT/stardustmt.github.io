---
title: "v0.5 MT Features"
description: "Duration estimate: Weeks 19–24 (6 weeks)
Status: ⚪ Not started
Prerequisite: [v0.4](/roadmap/v0-4-data-model-ui/) complete"
---

> The features that make Stardust genuinely useful for a musical theatre pit player.

**Duration estimate:** Weeks 19–24 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.4](/roadmap/v0-4-data-model-ui/) complete

## Goals

By the end of v0.5, Stardust has everything a working MD or pit keyboardist needs to actually run a show — click track for tempo coordination, transpose for vocal-friendly key changes, integrated show notes, automatic page turns via forScore, the custom sampler for one-off sounds, and a complete device profile library.

## What gets built

### Click track (per Song)

- Configurable BPM, time signature, count-in bars
- Audio output to a dedicated channel (often a "clicks-only" output for in-ear use)
- Visual indicator in Live Mode
- MIDI clock output (sync external sequencers / lighting)
- Tap-tempo footswitch assignment for live conductor follow

See [Click Track](/features/click-track/).

### Show notes / lyrics / chord chart

- Per-Song markdown-rendered notes pane
- Per-Patch notes (smaller, contextual)
- Inline chord notation
- Font size + theme controls

See [Show Notes](/features/show-notes/).

### Transpose

- Per-Song transpose in semitones
- Honors instrument range (warn if notes go below MIDI range)
- Different transpose per Patch within a Song (rare, but supported)

See [Transpose](/features/transpose/).

### Patch-change MIDI output

- Configurable MIDI message sent on patch advance (Program Change, Note, CC)
- Per-patch override (one patch sends a specific message, others use default)
- Useful for:
  - **forScore page turns** (send PC or Note → forScore advances page)
  - **QLab cue triggers** (v0.5–v1.0 deeper integration)
  - **External sequencers / lighting consoles**

See [forScore Integration](/features/forscore-integration/).

### Custom sampler

The v0.4-promoted "custom sound maker":
- Record live input or import audio file
- Auto-map across keyboard with pitch shifting
- Time-stretching options
- Save as Stardust-native sampler patch (uses SFZ format underneath for compatibility)

See [Custom Sampler](/features/custom-sampler/).

### Setlist mode

- Define show order: Song 1 → Song 2 → ... → Bow
- Auto-advance through Songs (manual or footswitch)
- Free-jump to any Song
- "Up Next" display in Live Mode

See [Setlist Mode](/features/setlist-mode/).

### Built-in effects (full implementation)

- 3-band EQ (configurable Q + frequency)
- Reverb (algorithmic + multi-preset)
- Compression (threshold, ratio, attack, release, makeup gain)
- Wired through `effects` module in Overture
- Per-patch insert chains

### Full device profile library

Beyond v0.3's minimal set, ship profiles for:
- Roland RD-2000, RD-88, RD-08
- Nord Stage 3, Stage 4, Electro 6, Grand
- Yamaha Montage M, MODX, CP88, CK88
- Kawai MP11SE, MP7SE, VPC1
- Korg Kronos, Nautilus, SV-2
- Casio PX-S series
- Boss FS-5U, FS-6, FS-7
- Roland DP-10, DP-2, EV-5, EV-7
- M-Audio EX-P, Yamaha FC7, Moog EP-3
- iRig Blueboard, Behringer FCB1010, AirTurn (BT-105, BT500, Quad6)
- Akai MPK / MPD, NI Komplete Kontrol S, Arturia KeyLab, Novation Launchkey/Control

See [Device Profiles](/features/device-profiles/).

## Linked features

- [Click Track](/features/click-track/)
- [Show Notes](/features/show-notes/)
- [Transpose](/features/transpose/)
- [forScore Integration](/features/forscore-integration/)
- [Custom Sampler](/features/custom-sampler/)
- [Setlist Mode](/features/setlist-mode/)

## Exit criteria

v0.5 is done when:

- Click track plays per Song with correct tempo + visual indicator
- Transpose works correctly (audible pitch shift, no MIDI range errors)
- Show notes render per Song and per Patch
- forScore page-turns triggered by Stardust patch advance
- Custom sampler can record/import a sound and map it across the keyboard
- Setlist mode lets you walk through a complete Show
- Full device profile library shipping with the app

## Related pages

- [v0.4](/roadmap/v0-4-data-model-ui/)
- [v1.0](/roadmap/v1-0-public-release/)
- [Click Track](/features/click-track/)
- [Show Notes](/features/show-notes/)
- [Transpose](/features/transpose/)
- [Custom Sampler](/features/custom-sampler/)
- [forScore Integration](/features/forscore-integration/)
- [Setlist Mode](/features/setlist-mode/)
- [Device Profiles](/features/device-profiles/)
