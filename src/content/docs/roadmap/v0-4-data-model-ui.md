---
title: "v0.4 Data Model + UI"
description: "Duration estimate: Weeks 13–18 (6 weeks)
Status: ⚪ Not started
Prerequisite: [v0.3](/roadmap/v0-3-plugin-sandboxing-clap/) complete"
---

> The Stardust app proper. Show / Song / Patch hierarchy, cascading settings, full Edit Mode + Live Mode, MIDI Learn, three core widgets, cue system MVP.

**Duration estimate:** Weeks 13–18 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.3](/roadmap/v0-3-plugin-sandboxing-clap/) complete

## Goals

By the end of v0.4, Stardust is a working live-performance host. You can:
- Create a Show with multiple Songs, each with sequenced Patches
- Set up your MIDI rig once at Show level (cascading settings)
- Customize a Live Mode layout for the show
- Play through patches with a footswitch, with zero stuck notes
- MIDI Learn parameters interactively

This is when Stardust becomes recognizable as the app — not just an audio engine with a debug UI.

## What gets built

### Show / Song / Patch data model

- Full data structures (see **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->)
- JSON + binary blob serialization
- `.stardust-show` file format (zip bundle)
- Save / load / autosave
- Import / export with plugin validation

### Cascading settings

- Show → Song → Patch override resolution
- Override UI affordance (●  indicator, right-click reset menu)
- Reset-to-layer with displayed values

See [Cascading Settings](/concepts/cascading-settings/) for the user-facing model.

### Show Setup Wizard

Multi-step wizard for new shows:
1. Audio device + buffer + sample rate
2. MIDI input devices (with light-up indicator confirmation)
3. Channel routing
4. Device profiles
5. UI layout (start from template)
6. Master settings

### Edit Mode

- Single workspace, two tabs: Patch + Layout
- VST chain editor with drag/drop
- Plugin parameter panels
- Built-in effects rack
- MIDI mapping table
- Cue editor (footswitch + MIDI-event triggers)
- Layout editor with widget drag/drop, grid snap

See [Edit Mode vs Live Mode](/concepts/edit-vs-live/).

### Live Mode

- Fully customizable layout from Edit Mode's Layout tab
- Touch-friendly, large-text, beautiful
- Show/Song/Patch labels, next-patch preview, patch list strip
- Visual keyboard with real-time notes
- Footswitch + expression pedal widgets
- VU meters, CPU+latency, MIDI activity
- Show notes pane (markdown)
- Parameter favorites (live-tweakable widgets)
- Panic button

See [Edit Mode vs Live Mode](/concepts/edit-vs-live/) and **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' -->.

### Three core widgets

The MVP widget set:

- `<KeyboardWidget>` — 25/49/61/76/88 key configurable, real-time note display
- `<FootswitchWidget>` — N buttons configurable, per-switch label + action
- `<ExpressionPedalWidget>` — position bar, settings popup

Plus supporting widgets: VU meters, CPU/latency indicator, MIDI activity, patch list strip, notes pane, panic button.

See **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' --> for the full catalogue and v0.4+ widgets.

### MIDI Learn (full UI)

- Click any parameter's MIDI Learn button
- Modal: "Move a control..."
- Detected message displayed with source device, channel, CC/note
- Range capture, curve selection
- Auto-suggest based on device profile

See [MIDI Learn](/features/midi-learn/).

### Device profile auto-detection

- USB device manufacturer/product ID matched against shipped profiles
- Auto-applies labels and pre-set mappings on plug-in
- v0.3 test devices + a handful of others (Nord Stage 3, Yamaha CP88, Kawai MP11SE)

See [Device Profiles](/features/device-profiles/).

### Cue system (MVP)

- Footswitch advance/jump
- MIDI-event triggers (conductor's note, etc.)
- Per-Song cue list editor
- Min patch-advance interval debounce
- Roland-sustain-slot-as-footswitch handling (no multi-advance bug)

See [Cue System](/features/cue-system/).

### Settings panels

- Audio panel (device, buffer, rate, routing, latency, test tones, meters)
- MIDI panel (devices, virtual ports, channel routing)
- Performance panel (thread priority, sandbox toggle, power plan)
- Plugins panel (scan folders, scan progress, quarantine list)
- General panel (theme, autosave, terminology)

See **File Format** <!-- TODO: dead wiki link to 'Architecture: File Format' --> for what gets persisted.

### Performance Lock toggle

Full implementation per [Performance Lock](/reliability/performance-lock/).

## Linked features (first complete in v0.4)

- [Patch Sequencing](/features/patch-sequencing/)
- [MIDI Learn](/features/midi-learn/)
- [Device Profiles](/features/device-profiles/)
- [Cue System](/features/cue-system/)
- [Setlist Mode](/features/setlist-mode/)
- [Audio I/O](/features/audio-io/) (full settings panel)
- [Cascading Settings](/concepts/cascading-settings/)
- [Edit Mode vs Live Mode](/concepts/edit-vs-live/)

## Exit criteria

v0.4 is done when:

- You can build a Show in Stardust with 5+ Songs, each with sequenced Patches
- Patches advance via footswitch with no stuck notes
- MIDI Learn works for keyboard + expression pedal + footswitches
- Cascading settings resolve correctly with visible overrides + reset
- Live Mode looks polished, large-text, touch-friendly
- Edit Mode lets you build a patch from scratch
- Performance Lock blocks edits during a show
- Cue system MVP works (footswitch + MIDI-event)
- Roland sustain-slot footswitch doesn't multi-advance

## Related pages

- [v0.3](/roadmap/v0-3-plugin-sandboxing-clap/)
- [v0.5](/roadmap/v0-5-mt-features/)
- [Shows, Songs, and Patches](/concepts/shows-songs-patches/)
- [Cascading Settings](/concepts/cascading-settings/)
- [Edit Mode vs Live Mode](/concepts/edit-vs-live/)
- **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' -->
- **Screen Inventory** <!-- TODO: dead wiki link to 'UI: Screen Inventory' -->
- **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->
- **File Format** <!-- TODO: dead wiki link to 'Architecture: File Format' -->
