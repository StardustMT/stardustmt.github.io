---
title: "Feature: Multi-keyboardist Sync"
description: "Target version: v2.0+"
---

> Multiple Stardust instances on a LAN share Show/Song/Patch position. Keys 1 advances and Keys 2's UI follows.

**Target version:** v2.0+

## What it does

In musical theatre pits with **two or more keyboardists** running parallel rigs, this feature keeps them synchronized. When the lead keyboardist advances a Patch, the other keyboardists' Stardust instances auto-advance to the corresponding Patch in their own show file.

## The use case

A typical 4-keyboard MT pit:
- **Keys 1** (lead): mostly piano, conductor's right hand
- **Keys 2**: strings, brass, secondary instruments
- **Keys 3**: synths, specialty sounds
- **Keys 4**: percussion programming, ambient pads

All four are running their own Stardust instance with their own programmed show. But they all need to be on Patch 3 of Song "My Shot" at the same time. Manual coordination = error-prone.

**With sync**: Keys 1 (designated leader) advances to Patch 3, all four instances auto-advance to Patch 3. The lead keyboardist doesn't have to think about it; the others see the change without having to track it independently.

## How it works

One Stardust instance is designated **leader**:
- Broadcasts its current Show/Song/Patch position over UDP multicast (or TCP unicast)
- State updates sent on every change

Other instances designated **follower**:
- Listen for leader's broadcasts
- Auto-update their state to match
- Visual indicator in UI shows "Following Keys 1"

## What syncs

- Current Song index
- Current Patch index
- Performance Lock state (so all rigs lock together at "Go Live")
- Optionally: shared cues (if all rigs share the same MIDI-event cue map)

## What doesn't sync (intentionally)

- Audio output (each keyboardist plays their own audio, mixed at FOH)
- MIDI input (each has their own keyboard)
- Per-rig customizations (Keys 2's plugin choices, MIDI mappings, UI layout)
- Plugin state during a Patch (each plays their own thing)

## Override capability

A follower can **temporarily detach** from sync:
- Click "Detach from sync" → operate independently
- Click "Resync" → follow the leader again, jumping to leader's current position

Useful when Keys 4 needs to silently tweak something during a Patch — they detach, fix, then resync.

## Conductor's control

In some configurations, the conductor (or stage manager) is the *de facto* leader — they drive cues via MIDI to one machine, which broadcasts to the others. So the architecture also supports:
- **Cue-driven leader** — leader doesn't directly advance; receives MIDI cues from conductor, broadcasts the resulting state

## Same protocol as hot-spare rig

The network sync underpinning multi-keyboardist sync is the same code used for [Hot-spare Rig](/docs/pit/features/hot-spare-rig/). Both are different applications of the same broadcast-state pattern.

## Network requirements

- Common LAN (or Wi-Fi network) between all rigs
- Multicast must work (some Wi-Fi setups disable it — UDP unicast fallback supported)
- Sub-50ms typical latency over local Ethernet
- Tolerates packet loss (state is broadcast continuously, eventual consistency)

## Phase status

| Phase | What's available |
|---|---|
| v2.0+ | Full multi-keyboardist sync with leader designation, detach/resync, cue forwarding |

## Related pages

- [Hot-spare Rig](/docs/pit/features/hot-spare-rig/) (same protocol)
- [Cue System](/docs/pit/features/cue-system/)
- [Mobile Companion](/docs/pit/features/mobile-companion/) (similar network code reuse)
