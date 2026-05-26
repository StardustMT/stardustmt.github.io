---
title: "MIDI Learn"
description: "MIDI Learn is the interactive way to map physical controls (knobs, faders, footswitches, expression pedals) to plugin parameters and Stardust actions."
---

> Click a parameter, move a control, you're mapped.

**Status:** Per-source MIDI binding lands in v0.6.0 (alongside [device profiles](/docs/pit/features/device-profiles/)). Custom-curve editor and bidirectional MIDI are v1.x.

## What it does

MIDI Learn is the interactive way to map physical controls (knobs, faders, footswitches, expression pedals) to plugin parameters and Stardust actions.

The flow:
1. In Program mode, click the "MIDI Learn" button next to any parameter (e.g. Reverb Mix)
2. Modal appears: *"Move a control..."*
3. Turn a knob, move the expression pedal, press a footswitch
4. Stardust detects the MIDI message (source, channel, CC/note number)
5. Confirms mapping with detected device name and message detail
6. (Optional) Set range, curve, min/max
7. Save mapping

That's it. No reading documentation, no manually typing CC numbers.

## What can be mapped

**Plugin parameters** — anything the plugin exposes (volume, filter cutoff, reverb mix, etc.)

**Stardust actions**:
- Advance/previous patch
- Jump to specific patch (1–9)
- Advance/previous Song
- Trigger panic
- Toggle Performance Lock
- Send named MIDI message out (for forScore page turns, etc.)
- Toggle UI widget visibility
- Open plugin GUI

**Built-in effect parameters** — EQ bands, reverb decay, compressor threshold, etc.

## Smart defaults via device profiles

When a known device is plugged in (e.g. Roland RD-2000), Stardust pre-applies the device's known control labels:

- Faders 1-9 labeled
- Knobs 1-9 labeled
- S1/S2 buttons labeled
- Modulation lever, pitch bend, sustain pedal already recognized

So during MIDI Learn, when you move a control, the modal says *"Detected: Knob 1 from Roland RD-2000"* not *"Detected: CC 80 channel 1."* Much friendlier.

See [Device Profiles](/docs/pit/features/device-profiles/).

## Range capture

After the initial detection, the modal optionally enters **range-capture mode** — move the control through its full range. Stardust records min and max, so a pedal that physically reads 5-118 (not 0-127) gets mapped accordingly without dead zones.

## Curve options

For continuous controls (expression pedals, knobs), the mapping supports curve transformation:
- **Linear** (default) — 1:1 mapping
- **Exponential** — slow at low end, fast at top (good for volume)
- **Logarithmic** — fast at low end, slow at top
- **Custom** — drawable curve editor (v0.5+)

## Cascading mappings

Like all settings, MIDI mappings **cascade Show → Song → Patch**. You set up your common rig at the Show level once. A specific Patch can override individual mappings:

> Show-level: Expression Pedal → Master Volume
> Patch "Strings — Verse" override: Expression Pedal → Strings Filter Cutoff

Most patches will use the inherited mapping; only patches with specific needs override.

See [Cascading Settings](/docs/pit/concepts/cascading-settings/).

## Multi-device awareness

If you have multiple MIDI inputs (e.g. main keyboard + auxiliary controller), MIDI Learn correctly identifies which device sent the detected message. You can also restrict a mapping to a specific device — useful if two devices both send CC 7 but you only want one of them mapped.

## Roland sustain-slot footswitch handling

A specific quirk we explicitly handle:

Roland keyboards' sustain jack sends `CC 64` 127/0 (sustain on/off). A common workaround is to plug a momentary footswitch (e.g. Boss FS-5U) into the sustain jack and use it as a patch-advance trigger. The catch: contact bounce or a sustained `CC 64 = 127` produces **multi-patch-advance bugs** in most hosts.

Stardust handles this when you label the device:
- Apply **debounce** (default 150 ms minimum between activations)
- Provide **"minimum interval between patch advances"** setting (default 200 ms, per-Show)
- Detect "stuck high" `CC 64` and treat as a single edge, not continuous re-trigger

See [Device Profiles](/docs/pit/features/device-profiles/) for related quirks.

## MIDI activity indicator

In Perform mode, a row of small dots shows real-time MIDI activity per device. Lets you confirm at a glance that your controls are talking. If something stops working mid-show, the dots tell you instantly whether the issue is hardware (no signal) or software (signal but no action).

See Widget Registry.

## Storage format

Mappings stored in the Show file as JSON:

```json
"midi_mappings": [
  {
    "source": { "device": "Roland RD-2000", "cc": 7, "channel": 1 },
    "target": { "type": "plugin_param", "plugin_id": "keyscape", "param": "volume" },
    "range_min": 5,
    "range_max": 118,
    "curve": "exponential"
  }
]
```

See Data Model.

## Phase status

| Phase | What's available |
|---|---|
| v0.2 | Basic MIDI input + manual mapping in code (no UI) |
| v0.4 | Full MIDI Learn UI with device profiles, ranges, curves, cascading |
| v0.5+ | Custom curve editor, bidirectional MIDI (v1.0+) |

## Related pages

- [Device Profiles](/docs/pit/features/device-profiles/)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)
- [Setup, Program, and Perform](/docs/pit/concepts/setup-program-perform/)
- Widget Registry
- MIDI Internals
- Data Model
