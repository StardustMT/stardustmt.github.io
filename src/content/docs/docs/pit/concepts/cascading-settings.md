---
title: "Cascading Settings"
description: "Stardust uses a three-level cascading configuration model: settings live at the Show level by default and can be overridden at the Song or Patch level."
---

Stardust uses a **three-level cascading configuration model**: settings live at the Show level by default and can be overridden at the Song or Patch level.

```
Show settings (the defaults)
  ↓ inherited by
Song settings (overrides for this Song only)
  ↓ inherited by
Patch settings (overrides for this Patch only)
```

## The principle

You should not have to configure your MIDI rig, audio output, and UI layout for every patch. You configure them once — at the Show level — and they apply to every Song and Patch automatically.

If a *specific* patch needs different behavior (e.g. one patch needs MIDI channel 16 instead of channel 1), you override only that setting only at that level. Everything else still inherits.

## What can be cascaded

Practically every setting:

- **Audio**: device, buffer size, sample rate, output routing
- **MIDI**: input devices, channel routing, virtual MIDI outputs
- **Device profiles**: keyboard model, attached pedals
- **UI layout**: which widgets appear in Live Mode and where
- **Master settings**: master volume, master reverb send
- **Click track**: tempo, time signature, count-in
- **Transpose**: pitch shift
- **Performance behavior**: minimum patch-advance interval, transition style

## Override UI affordance

When a setting is overridden at a lower level, the UI shows a small **●** indicator next to it with a tooltip:

> *Overrides Song-level value: 80%*

Or, for Patch-level overrides that bypass the Song level:

> *Overrides Show-level value: Channel 1*

### Resetting overrides

Right-click on any overridden setting to see a menu:

| Option | When shown | What it does |
|---|---|---|
| `↩ Reset to Song-level (80%)` | When the Song level has a different value | Removes the Patch override; Patch now inherits from Song |
| `↩ Reset to Show-level (60%)` | When the Show level has a different value | Removes both Patch and Song overrides; inherits from Show |
| `↩ Reset to default (100%)` | Always | System default — full reset |

Each reset option **shows the actual value it would reset to**, so you can compare before clicking.

## Example workflow

You're MD'ing *Hamilton*. At the Show level you set:
- Audio device: Focusrite Scarlett 4i4, 128 samples, 48 kHz
- MIDI input: Roland RD-2000 (channel 1)
- Expression pedal: CC 7 → master volume
- Footswitch 1: advance patch

These settings apply to every Song and every Patch by default.

For "My Shot," your strings patch needs the expression pedal to control filter cutoff *instead of* volume. You override **only that one setting** at the Patch level:

- Expression pedal: CC 7 → Filter Cutoff (overrides Show-level mapping)

Every other Song and Patch keeps the default expression-pedal-to-master-volume mapping. The "My Shot — Strings" patch shows a ● next to that mapping so you can see at a glance it's overridden.

When the show ends and you go back to building the next Song, you don't need to redo any setup — it's all still inherited from the Show level.

## Why cascade

Most existing live hosts treat patches as independent units — MIDI mappings, audio settings, and layout are configured per patch. For a 50-patch show that means setting up the same keyboard mappings dozens of times.

Cascading lets you define settings once at the level they apply to, and override only where something genuinely differs. The override indicator (●) makes it visible at a glance which level supplied each value.

## Implementation notes

For contributors:

- The data model uses optional `Option<SettingOverride>` fields at each level
- Resolution happens via a `resolve_setting()` function that walks up Patch → Song → Show
- The override indicator UI is generated from the resolution chain (we know which level supplied the value)
- See **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' --> for the full schema

## Related pages

- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/)
- **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->
