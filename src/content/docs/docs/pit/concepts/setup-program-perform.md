---
title: "Setup, Program, and Perform"
description: "The three top-level modes of the Pit shell, plus the orthogonal Performance Lock toggle. What lives where and why."
---

Pit is organized around three top-level modes plus one orthogonal toggle. The mode you're in determines what's on screen; the toggle determines whether the app accepts destructive operations.

| Mode | When you use it |
|---|---|
| **Setup** | Rig configuration. Audio devices, MIDI controllers, bus routing, show-level settings. Changes things that survive between shows. |
| **Program** | Show authoring. Patches, songs, click tracks, libraries, layouts. The bulk of pre-production work happens here. |
| **Perform** | The show. Your live performance view, laid out as you configured it in Program. Strictly runtime — no authoring surfaces. |
| **Performance Lock** (toggle) | Active in any mode; prevents file ops, allocations, and accidental edits during a running show. |

## Why three modes, not two

The earlier model — "Edit Mode" and "Live Mode" — collapsed rig configuration into the same surface as patch authoring. In practice these are different jobs done at different times:

- **Setup** is what you do **once per rig** (or once per venue). New MIDI controller? Setup. New audio interface? Setup. These are configuration changes that should survive a show file moving between machines.
- **Program** is what you do **per show**. Songs, patches, click tracks, backing tracks, layout work. The pre-production heavy lifting.
- **Perform** is what you do **at the show**. Read-only authoring, live-only operations, large-and-readable UI.

Three modes give each surface room to be the right shape for its job — and let the file menu, sidebar, and main canvas mean different things in each mode without overloading any single screen.

## Setup mode

The *"I'm getting ready"* mode. Configure the rig and show metadata before authoring patches.

### Setup → Rig (Screen)

Build the hardware rig.

- Component library: keyboard, pads, footswitch, expression pedal, sustain pedal, button/switch
- Compound component builder (drag primitives into a named compound — e.g., a `compound:RD-2000` with keys + wheels + sustain + footswitch + expression all bound)
- Save scope toggle: show-local / global
- MIDI Learn on every learnable field
- Per-component config inspector
- **Rig component widget editor** (sub-screen) — grid editor for how the compound renders as a Perform widget

### Setup → Show Settings (Screen)

Show-level configuration.

- Production / Source / Distribution metadata (revival-aware)
- Tempo defaults — master BPM removed; tempo lives on songs
- Audio output buses (FOH, IEM-click, IEM-band, etc.)
- Autosave settings
- Master volume + global panic key binding
- Plugin scan paths

### Setup → Re-learn All (Screen — sub-screen)

The **Learn Master tool**. Walk through every learnable field in the show one by one. Use when:

- Moved to a new machine
- Got a new keyboard
- Sent show to someone else with different hardware

## Program mode

The *"I'm authoring"* mode. Build patches, manage library, balance.

### Program → Patch Editor (Screen)

Edit the active patch. The bulk of programming work happens here.

- Patch graph editor (currently shipping in v0.5.0)
- `source.compound` node (drag rig component as single node) — v0.10.0
- Live preview renders full configured controller widget (keys + wheels + sustain; excludes non-tone controllers) — v0.10.0
- Per-patch tempo metadata (Advanced override) — v0.8.0
- Per-patch trim/gain field — v0.10.0
- Shared-patch banner *"Instance of 'X'"* — v0.10.0
- Missing-plugin warning icons + greyed nodes — v0.7.0
- **Plugin GUI dock** (bottom panel) — tab strip for each loaded plugin's CLAP GUI; user-resizable; per-plugin pop-out to floating window — v0.6.0

### Program → Patch Library (Screen)

Manage show + global patch library.

- All patches in show filtered by song
- "Save to global" toggle per patch
- Drag patch from library into song → creates reference (alias)
- Reference inspector — Basic + Advanced overrides
- "Find usages" — query references by library ID
- Orphan handling banners

See [Patch library](/docs/pit/features/patch-library/) for the full all-patches-as-references data model.

### Program → Balance / EQ Tool (Screen)

Level-match patches via LUFS measurement.

- Offline render — no speakers
- Cross-patch level audit
- Per-patch trim adjustment + tilt EQ
- A/B compare

See [Balance tool](/docs/pit/features/balance-tool/) for the full audio engineering breakdown.

### Program → Pit Mixer (Screen)

Multi-channel audio input for MD in silent-pit / IEM contexts.

See [Pit Mixer](/docs/pit/features/pit-mixer/).

### Program → Click Track Editor (Song tab)

Author bar-by-bar tempo curves with vamps / repeats / cues.

See [Click track editor](/docs/pit/features/click-track-editor/).

## Perform mode

The *"I'm playing"* mode. Configure live layout; go fullscreen for show.

### Perform → Layout Editor (Screen)

Design the live screen.

- Widget palette (full catalog in v0.11.0)
- Grid canvas (snap-to-grid default on)
- Per-widget config inspector
- Drawing primitives (box, line, divider)
- Image widget
- Move / resize / rotate / z-order
- **Global default layout + per-song override layouts** (cascading)
- Layout templates picker (Blank, Minimal, Cabaret, MD Console)

### Perform → Live (Screen — fullscreen)

What the player sees during the show.

- Renders the active layout (global or per-song override)
- All widgets reactive (keyboard widget shows pressed keys; pedals show position; meters show live RMS; transport shows playhead; engine monitor updates per-block)
- Pre-show validation gate before entering (overrideable with confirm)
- **No hard-forced widgets** — user-placed everything. Panic + outline are widgets, not chrome.
- Exit Live returns to Perform editor

## Floating windows (not modes)

Windows that float over any mode, can be dragged to second monitors:

- **Settings** — app-wide preferences (Audio, MIDI, Plugins, Theme, Autosave, Telemetry, Shortcuts, About)
- **Plugin GUI (popped out)** — secondary placement only; default is docked in the patch editor bottom panel (see Program mode → Patch Editor). User can pop any plugin out into a floating window per their preference.
- **Conductor cam pop-out** — for second-monitor display
- **Parameter favorites pop-out** — touch-target parameter widgets

## Modals (transient)

- **New Show wizard** — 6-step show creator
- **Close blocker** — Save / Discard / Cancel on unsaved changes
- **Merge graph edits** — per-instance update/keep/three-way-merge
- **Orphan reattach** — re-link / save-new / keep-snapshot for missing library entries
- **Plugin requirements report** — missing-plugin list with "find this plugin" links
- **Pre-show validation gate** — blocks Live entry; overrideable
- **Crash reporter consent** — first-launch opt-in
- **Telemetry consent** — first-launch opt-in
- **Theme save / share** — theme editor output
- **Extension install permission** — capability consent UI

## Performance Lock

Orthogonal toggle. Active in any mode.

When **on**:

- File operations disabled (no save dialogs, no plugin scanning)
- Patch editing disabled
- Layout editing disabled
- Allocation-heavy operations blocked
- Anything that could cause an allocation spike, dropout, or accidental destructive edit is locked

When **off**: full app capability.

Single big toggle: **"Go Live"** / **"End Show"**.

Intent: enable Performance Lock once at the start of a show and don't think about it again until the show ends. Switching between Setup / Program / Perform with the lock on is fine — it's just visualization differences.

## What lives where (cheat sheet)

| You want to... | Mode |
|---|---|
| Add a MIDI controller | Setup |
| Re-route the click bus | Setup |
| Author a patch graph | Program |
| Build a click track | Program |
| Configure the Live layout | Program |
| Run the show | Perform |
| Read your show notes mid-show | Perform |
| Tweak a parameter favorite mid-show | Perform |
| Jump to the next patch | Perform |

## Mode switching is not in the menu bar

The native file menu (File / Edit / View / Window / Help) does **not** contain the mode switches. Modes are switched via a top-of-window ModeSwitcher, not via menu commands. The menu bar is for file/system operations; modes are about which screen you're on.

## What's planned

The three-mode shell wires into the app in **v0.9.0**. Until then, the live app shows a Program-mode-shaped stand-in (a patch editor + show toolbar). v0.9.0 also adds the splash screen, the New Show wizard, the settings Window, and the native file menu.

## Related pages

- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Cascading settings](/docs/pit/concepts/cascading-settings/)
- [Screen inventory](/docs/pit/screens/) — every surface with its target version
- [New Show wizard](/docs/pit/features/new-show-wizard/)
- [Performance Lock details](/docs/pit/reliability/performance-lock/)
