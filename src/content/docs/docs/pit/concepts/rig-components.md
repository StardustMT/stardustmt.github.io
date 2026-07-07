---
title: "Rig components"
description: "The hardware abstraction layer. Each rig component is a configurable primitive (keyboard, pads, pedals, wheels, knobs, buttons) with per-primitive customization. Compound components bundle primitives into a single saved controller."
---

A **rig component** is Stardust's abstraction over a piece of physical hardware — a keyboard, a footswitch, an expression pedal, a knob. Patches reference rig components rather than raw MIDI. You build your rig once in Setup → Rig, MIDI Learn each control, optionally bundle primitives into a saved **compound** (e.g., your whole RD-2000), then drag components into patches as sources.

This page is the per-primitive configuration catalog. It's the concrete spec the v0.10.0 rig work + v0.6.0 per-source binding build against.

## Why components, not raw MIDI

- **Configure once, reuse everywhere** — a compound rig component saved globally drops into every show
- **Theatre-native** — "my keyboard's sustain pedal," not "CC 64 on channel 1"
- **Per-source binding** — each component knows which physical controller feeds it (v0.6.0)
- **Cascading** — components live at show level; per-patch overrides where needed

## Keyboard

- Key count (25 / 37 / 49 / 61 / 76 / 88 / custom)
- Lowest key (MIDI note number)
- Channel (default 1; filter "listen only to channel N" or "all")
- Velocity curve (linear / soft / hard / custom curve editor)
- Velocity scale (min / max clamp)
- Aftertouch (channel pressure / poly aftertouch / none)
- Note name labels (sharps/flats, scientific pitch / Helmholtz)
- Color theme override (uses show theme by default)
- Show pressed keys in Live (default on; can disable per layout)
- Default transpose offset
- Note range filter (e.g., only A0–C8 forwarded)

## Pads

- Pad count (4 / 8 / 16 / 64 / custom grid m×n)
- Layout (grid / single row / custom)
- Per-pad note assignment (default = chromatic from C2)
- Per-pad MIDI channel (default = component channel)
- Per-pad color (default theme; per-pad override)
- Per-pad label
- Velocity sensitive (yes/no; fixed velocity if no)
- Pressure sensitive (channel pressure y/n)
- LED feedback (if hardware supports — sysex pattern)
- Note-off behavior (release on lift / sustain until next press / hold-to-toggle)

## Footswitch / button-switch

The generalized binary-control primitive. Full feature page: [Button / switch rig component](/docs/pit/features/button-switch-component/).

- Type (momentary / latching / toggle)
- Action (Next Patch / Prev Patch / Jump to Patch / Panic / Tap Tempo / Start Transport / Stop Transport / Toggle Bus Mute / Send MIDI Message / Custom Macro)
- Debounce time (ms, default 25)
- Long-press action (optional secondary, with threshold ms)
- Double-tap action (optional)
- LED feedback (if hardware supports)
- Polarity invert (some pedals are normally-closed)
- Throttle (max activations per second)

## Expression pedal

- Min / max raw range (calibration — "press fully down" → "lift fully up")
- Output range (typically 0–127; can clamp tighter)
- Curve (linear / log / exp / S-curve / custom)
- Target assignment (volume / plugin param / aftertouch / CC# / bus send)
- Deadzone at min / max (percentage)
- Smoothing (0–100 ms low-pass)
- Polarity invert

## Sustain pedal

- Type (momentary / half-pedal)
- Threshold for "on" (for half-pedal, 0–127)
- Polarity invert
- Channel
- CC override (default 64 damper; could send 66 sostenuto or 67 soft pedal instead)

## Pitch wheel

- Range (semitones up / down — default ±2)
- Snap to center (yes/no — most have spring return)
- Smoothing
- Curve

## Mod wheel

- Target CC (default CC1 modulation)
- Range (0–127 default; can clamp)
- Curve
- Smoothing

## Knob / fader

- Target assignment
- Range mapping (raw → output)
- Curve
- Pickup mode (jump / scale / relative)
- Step quantize (continuous / N steps)
- Smoothing
- Polarity invert

## Compound components

Drag multiple primitives into a named compound (e.g., `compound:RD-2000` = 88-key keyboard + pitch wheel + mod wheel + expression pedal + footswitch + damper pedal). Save show-local or global. Drop into a patch as a single [`source.compound`](/docs/pit/features/patch-library/) node.

The compound's appearance as a single Perform widget is configured in the **rig component widget editor** (v0.10.0) — a grid sub-screen with drawing primitives and an image widget. The live preview in the patch editor renders the configured controller (keys + wheels + sustain) but excludes non-tone controllers (footswitch, expression pedal).

## Version status

- **v0.6.0** — per-source hardware MIDI binding ✅ shipped 2026-07-03 ([stardust-pit#2](https://github.com/StardustMT/stardust-pit/issues/2), PR #118: `hardwareBinding` on source nodes — device by stable port id, channel, note/CC ranges, fan-out on overlap, disconnected-binding persistence, inspector in the patch editor); button/switch component + Learn Master tool still open
- **v0.6.0 rig-lite** — 📋 refined 2026-07-06 ([stardust-pit#122](https://github.com/StardustMT/stardust-pit/issues/122)): real Setup → Rig screen; components own device bindings; source nodes reference components by `rigComponentId` (node-level `hardwareBinding` removed via schema v2→v3 migration; unassigned nodes are silent); full-mock Learn incl. keyboard key-range and per-pad note grid (assignments stored; per-note routing consumed by v0.10.0 widgets); engine opens the union of rig-bound devices session-wide
- **v0.10.0** — compound components, `source.compound` node, rig component widget editor, per-pad widget config

## Related pages

- [Button / switch rig component](/docs/pit/features/button-switch-component/)
- [MIDI Learn](/docs/pit/features/midi-learn/)
- [Device profiles](/docs/pit/features/device-profiles/)
- [Cascading settings](/docs/pit/concepts/cascading-settings/)
- [Patch library](/docs/pit/features/patch-library/)
