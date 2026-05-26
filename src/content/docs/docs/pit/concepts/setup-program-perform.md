---
title: "Setup, Program, and Perform"
description: "The three top-level modes of the Pit shell, plus the orthogonal Performance Lock toggle."
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

- **Setup** is what you do **once per rig** (or once per venue). New MIDI controller? You're in Setup. New audio interface? Setup. These are configuration changes that should survive a show file moving between machines.
- **Program** is what you do **per show**. Songs, patches, click tracks, backing tracks, layout work. The pre-production heavy lifting.
- **Perform** is what you do **at the show**. Read-only authoring, live-only operations, large-and-readable UI.

Three modes give each surface room to be the right shape for its job — and let the file menu, sidebar, and main canvas mean different things in each mode without overloading any single screen.

## Setup mode

Rig and show configuration. The things that don't change song-by-song.

- **Audio devices** — input + output device, sample rate, buffer, routing to buses
- **MIDI devices** — connected controllers, hardware mapping, learn
- **Rig components** — keyboards, pads, footswitches, expression pedals, button rigs
- **Buses** — main mix, IEM mix, click bus, conductor bus, custom routes
- **Show metadata** — title, production info (revival-aware), distribution settings, autosave preferences
- **Plugin scan** — re-scan triggers, scan cache state, plugin requirements report

Setup changes typically apply to the show as a whole, or to your rig regardless of show.

## Program mode

Show authoring. The bulk of pre-production happens here.

- **Outline** (left sidebar) — show → songs → patches, plus the library
- **Canvas** (center) — depending on selection:
  - Patch selected → patch graph editor
  - Song selected → song settings (sub-tabs: Settings / Click / Backing / Patches)
  - Library entry selected → library entry editor
- **Inspector** (right sidebar) — properties of the selected node, patch, or song
- **Click track editor** — v0.12.0
- **Layout editor** — v0.11.0; configures what Perform mode looks like

Performance Lock can be enabled in Program mode — useful for rehearsals where you don't want to accidentally edit the graph while testing things.

## Perform mode

The live performance view. What's in front of you for hours during a show.

- Fully configurable via the Program-mode layout editor
- Widgets are the only thing on screen — no authoring chrome
- **Read-at-a-glance** — large default fonts, generous spacing, high-contrast theme available
- **Touch-friendly** — interactive widgets sized for tap targets
- **Pop-out floating Windows** for second monitors (conductor cam, parameter favorites)
- **Live fullscreen mode** — hides menu bar and any non-Perform chrome

What's not in Perform mode (these belong to Program):

- VST chain editing
- MIDI Learn
- Layout editing
- Audio / MIDI device settings
- Plugin browser
- File operations

If you need any of these mid-show you flip Performance Lock off, switch to Program, do the thing, switch back. Ideally you never need to.

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
- [New Show wizard](/docs/pit/features/new-show-wizard/)
- [Performance Lock details](/docs/pit/reliability/performance-lock/)
