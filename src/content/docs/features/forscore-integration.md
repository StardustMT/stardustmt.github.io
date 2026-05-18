---
title: "Feature: forScore Integration"
description: "Target version: v0.5"
---

> Send MIDI commands from Stardust to forScore (iOS sheet-music app) for automatic page turns synced to Patch changes.

**Target version:** v0.5

## What it does

When you advance to a new Patch (or hit a defined cue), Stardust sends a configured MIDI command out a **virtual MIDI cable** to forScore (running on a connected iPad). forScore receives the command and turns the page, opens a bookmark, or executes a defined action.

This means: **one footswitch press advances both your Stardust patch AND your forScore page.**

## The two-device setup

Many MT keyboardists already run two devices on stage:

- **Stardust** on a laptop for sound (patches, plugins, click)
- **forScore** on iPad for sheet music

Without integration, that's two foot pedals and two cue systems to keep mentally in sync. With it, a single press advances both.

## How it works

forScore [accepts MIDI input](https://forscore.co/midi/) for actions:
- Page turn (forward / back / half-page / specific page)
- Bookmark navigation
- Play/pause its built-in audio player
- Half-page mode toggle
- Set list navigation

Stardust:
1. Creates a virtual MIDI port (IAC on macOS, loopMIDI on Windows)
2. Configures forScore to listen on that port
3. On Patch advance (or cue), sends the configured MIDI message out the port
4. forScore receives and executes

## Configuration

In Edit Mode → Patch tab → "Patch-change MIDI out" section:

- **Send on advance:** select message type (Program Change, Note, CC)
- **Channel:** which MIDI channel
- **Value:** specific number (e.g. PC 5 for "page 5", or Note C-2 for "next page")
- **Output port:** the virtual MIDI port forScore is listening on

Per-patch override: most patches send the default ("advance page"), but specific patches can send different commands (e.g. "open Bookmark 3" for a section jump).

See [MIDI Learn](/features/midi-learn/) for the related action-mapping concepts.

## Setup walk-through

### macOS

1. Open **Audio MIDI Setup** → **MIDI Studio** → **IAC Driver**
2. Enable "Device is online" and add a bus called "Stardust → forScore"
3. In Stardust: Settings → MIDI → Virtual Outputs → add "Stardust → forScore"
4. On iPad: connect via USB-C (or use a USB-MIDI host adapter)
5. In forScore: Tools → MIDI → enable the IAC bus
6. Map forScore's "Next Page" action to whatever MIDI message Stardust sends (e.g. PC 1)
7. Test by advancing a Patch — forScore should turn the page

### Windows

1. Install [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html) (free)
2. Create a port "Stardust → forScore"
3. In Stardust: Settings → MIDI → Virtual Outputs → add "Stardust → forScore"
4. iPad connects via USB-MIDI host adapter to the Windows machine? (More complex — usually iPad would need its own MIDI input from a USB-MIDI splitter or network MIDI)

iPad → Windows MIDI is harder than iPad → macOS. Network MIDI (rtpMIDI) is one path; USB-MIDI splitter is another. Stardust outputs MIDI; getting it to the iPad is up to your hardware setup.

## Phase status

| Phase | What's available |
|---|---|
| v0.5 | Patch-change MIDI out (Program Change, Note, CC), virtual port creation |
| v1.0+ | Setup wizard with forScore-specific defaults, Windows network-MIDI guidance |

## Related pages

- [MIDI Learn](/features/midi-learn/)
- [Patch Sequencing](/features/patch-sequencing/)
- [Cue System](/features/cue-system/)
- [Show Notes](/features/show-notes/) (alternative for short text snippets)
