---
title: "Edit Mode vs Live Mode"
description: "Stardust has two primary modes plus one orthogonal toggle:"
---

Stardust has two primary modes plus one orthogonal toggle:

| Mode | When you use it |
|---|---|
| **Edit Mode** | Programming the show — designing patches, mapping MIDI, arranging your Live layout |
| **Live Mode** | Playing the show — your performance view |
| **Performance Lock** (toggle) | Active in either mode; prevents file ops + accidental edits during a show |

## The philosophy

> **Programming happens in Edit Mode. Playing happens in Live Mode.**

Once a show is built, Live Mode should cover everything you need on stage — parameter tweaks, patch jumps, looking up notes. Needing to switch back to Edit Mode mid-show is a sign your layout is missing something, not a normal part of the workflow.

## Edit Mode

Edit Mode is the workspace where you build the show. Single screen with two tabs:

### Patch tab
- VST chain (drag plugins in/out, reorder)
- Plugin parameter panels
- Built-in effect inserts (EQ, reverb, compression)
- MIDI mappings (control source → parameter target)
- Per-patch settings
- Cue editor (MIDI-event triggers)

### Layout tab
- Drag/drop UI widgets onto the Live Mode canvas
- Grid-snap, freely resizable
- Choose which widgets appear, where, how big
- Cascading layouts: a Show's default layout can be overridden per Song or Patch

Switching between tabs is instant; both operate on the same Song/Patch you're editing.

## Live Mode

Live Mode is what's in front of you for hours at a time during a show. The layout is fully configurable via the Layout tab in Edit Mode — pit keyboardists and solo electronic musicians can end up with completely different screens.

### Design goals

- **Customisable** — every widget, every position, every size. Layouts cascade Show → Song → Patch.
- **Considered typography and minimal animation** — readable for long sessions, not visually noisy.
- **Functionally complete** — anything you might reasonably need mid-show is reachable without leaving Live Mode.
- **Touch-friendly** — interactive widgets are sized for tap targets on touchscreen laptops (Surface, Yoga, etc.).
- **Read-at-a-glance** — large default fonts, generous spacing, a high-contrast theme available.
- **Contextual density** — pack in info (parameter readouts, lyrics, click) or strip it back to Show / Song / Patch + keyboard.

### What's available in Live Mode

- Show + Song + Patch labels (large, prominent)
- Next Patch preview, optional previous patch reference
- Horizontal patch-list strip showing all patches in the current Song
- Visual keyboard with notes lighting in real time
- Footswitch + expression pedal visualizations
- VU meters, CPU+latency indicator, MIDI activity dots
- Time elapsed in current Song
- Click track indicator
- Show notes / lyrics / chord chart pane (markdown-rendered)
- **Parameter "favorites"** — exposed parameter widgets you can nudge with touch/scroll without leaving Live Mode
- Panic button (large, red, always reachable)

### What's NOT in Live Mode

These belong to Edit Mode:

- VST chain editing
- MIDI Learn mode
- Layout editing
- Audio/MIDI device settings
- Plugin browser
- File operations

If you need any of these mid-show, you toggle off Performance Lock, switch to Edit Mode, do the thing, and switch back. But ideally you never need to.

## Performance Lock

Orthogonal toggle. Active in either mode.

When **on**:
- File operations disabled (no save dialogs, no plugin scanning)
- Patch editing disabled
- Layout editing disabled
- Allocation-heavy operations blocked
- Anything that could cause an allocation spike, dropout, or accidental destructive edit is locked

When **off**: full app capability.

Single big toggle in the UI: **"Go Live"** / **"End Show"**.

The intent: you enable Performance Lock once at the start of a show and don't think about it again until the show ends. Switching between Edit and Live with the lock on is fine — just for visualization differences.

## Customizing Live Mode for your needs

Different musicians want very different things:

- **Solo electronic musician**: wants huge parameter widgets for live tweaking, minimal text
- **Pit keyboardist**: wants Show/Song/Patch big, next-patch preview, show notes pane visible
- **Worship leader**: wants chord chart prominent, current key/transpose, click
- **Conductor**: wants tempo, click, cue panel, big patch labels

All achievable by configuring the Layout tab. Layouts can be saved and **shared via the community hub** ([Community Sharing](/features/community-sharing/)).

## Related pages

- [Shows, Songs, and Patches](/concepts/shows-songs-patches/)
- [Cascading Settings](/concepts/cascading-settings/)
- **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' -->
- **Screen Inventory** <!-- TODO: dead wiki link to 'UI: Screen Inventory' -->
- [Performance Lock details](/reliability/performance-lock/)
