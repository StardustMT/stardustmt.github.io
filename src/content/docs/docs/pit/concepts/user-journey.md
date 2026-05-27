---
title: "The user journey"
description: "The canonical 13-step flow a musical director takes from opening Pit to going live. Every v1.0 screen and feature traces back to one of these steps."
---

This is the canonical user flow that Pit v1.0 must support end-to-end. Every screen and feature exists to serve one of these steps. If a feature doesn't trace back to a step here, it's probably out of scope for v1.0.

## The 13 steps

1. **Open Pit** → splash screen with recent shows + New / Open buttons
2. **New Show** → wizard (metadata + optional pre-add of saved compound rig components)
3. **Setup → Rig** → build a compound rig component (e.g., RD-2000 = 88-key keyboard + pitch wheel + mod wheel + expression pedal + footswitch + damper pedal), save as global
4. **Per-component MIDI Learn** → physically interact with hardware to bind MIDI channels + config (thresholds, behaviors)
5. **Rig component widget editor** → sub-screen with grid layout, drawing primitives, image widget — configure how the compound renders as a single Perform widget
6. **Program → new song with new patch** → drag rig component as controller, plugin as instrument, effects, main out → wire up
7. **Per-node inspector** → configure each node; live preview shows the full configured controller widget (keys + wheels + sustain — excludes non-tone controllers)
8. **Save patch to patch library** → reusable via references (single source of truth); show-local or global scope; per-instance name overrides (e.g., "b42. Full Strings")
9. **Balance / EQ tool** → measure loudness across patches, level-match intra-patch and cross-patch, set per-patch trim
10. **Perform → Layout editor** → drag widgets (song/patch list, dynamic text, rig component instance, volume meter)
11. **Per-widget config** → condensed song/patch list, dynamic text bindings (`{current.song}`, `{current.patch}`), volume meter source assignment
12. **Grid editor** → move / resize / rotate / reorient widgets on the live screen
13. **Save show + Go Live** → fullscreen reactive layout (responds to keys, pedals, wheels, volume, patch changes)

## How the steps map to versions

The flow isn't all shipping at once. Each step lands as its supporting features ship:

| Step | Feature | Version |
|---|---|---|
| 1 | [Splash screen](/docs/pit/screens/) | v0.9.0 |
| 2 | [New Show wizard](/docs/pit/features/new-show-wizard/) | v0.9.0 |
| 3 | [Rig components](/docs/pit/concepts/rig-components/) + compound builder | v0.6.0 primitives, v0.10.0 compound |
| 4 | [MIDI Learn](/docs/pit/features/midi-learn/) per-source binding | v0.6.0 |
| 5 | Rig component widget editor | v0.10.0 |
| 6 | Patch graph editor + `source.compound` | v0.5.0 graph, v0.10.0 compound |
| 7 | Per-node inspector + live preview | v0.5.0, full preview v0.10.0 |
| 8 | [Patch library](/docs/pit/features/patch-library/) | v0.10.0 |
| 9 | [Balance tool](/docs/pit/features/balance-tool/) | v0.12.0 |
| 10–12 | [Layout + grid editor](/docs/pit/concepts/setup-program-perform/) | v0.11.0 |
| 13 | Live fullscreen | v0.11.0 |

So the journey is "complete" once v0.11.0 + v0.12.0 land — that's when a working MD can do the full flow without dropping into developer tooling.

## What v1.0 means

**v1.0 = "a working MT pit keyboardist can ditch MainStage for a real show with it."**

That gates on three things, in order:

1. **Reliability** — the app doesn't crash mid-show, plugin crashes don't take it down, hardware unplugs don't take it down, patches load with reverb tails ringing through changes
2. **Workflow completeness** — the full 13-step journey above works end-to-end without dropping into developer tooling
3. **MD essentials** — tempo, click track editor, transpose, show notes, footswitch actions, backing tracks, pre-show validation, autosave

## Related pages

- [Setup, Program, and Perform](/docs/pit/concepts/setup-program-perform/)
- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Rig components](/docs/pit/concepts/rig-components/)
- [Pit roadmap](/docs/pit/roadmap/)
