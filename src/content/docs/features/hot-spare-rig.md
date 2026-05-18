---
title: "Feature: Hot-spare Rig"
description: "Target version: v2.0+"
---

> Two Stardust machines wired in parallel. Primary fails, backup takes over via MIDI switch. Standard Broadway MD redundancy.

**Target version:** v2.0+

## What it does

Many Broadway shows run two MainStage rigs in parallel for redundancy:
- **Primary** plays the show
- **Backup** runs the same Show, mirrors the primary's state (current Song, current Patch)
- A physical **MIDI A/B switch** routes the keyboard's MIDI to either rig
- If the primary crashes / freezes / has audio dropout, flip the switch → backup takes over instantly

This is the standard redundancy pattern in professional musical theatre. Stardust supports it natively.

## How it works

Two Stardust instances on a local network:
1. **State sync** — primary broadcasts current Show position, Song, Patch index, any active overrides over UDP multicast (or TCP if preferred)
2. **Backup mirrors** — receives state updates and silently keeps its own state in sync
3. **Audio output** — backup runs the same audio engine but is *muted* (or routed to a separate output that isn't currently in the FOH mix)
4. **MIDI switching** — when the audience-facing MIDI feed switches from primary to backup (via hardware A/B), the backup is already at the correct patch with the correct state

## Why not "automatic failover"?

You might ask why we don't auto-switch the MIDI feed in software when we detect a primary crash. Two reasons:
- **Software switching is the wrong layer** — if Stardust crashes, it can't tell the operator to switch. A physical MIDI A/B switch is operator-controlled by the FOH engineer or the keyboardist — they know what they want to switch to.
- **Failure modes** — sometimes the audio interface is the issue, not the software. A physical switch handles that too.

The professional pattern is **hardware-switched, software-synced**. Stardust handles the software-sync; the operator handles the switch.

## What's synced

- Current Show / Song / Patch position
- Performance Lock state
- Currently-active patch advances (so backup has same patches loaded as primary)
- Per-Show settings deltas (if the operator changed something mid-show)

What's *not* synced (intentionally):
- Live performance audio (each instance produces its own)
- MIDI input (each rig has its own physical MIDI feed)
- Plugin state mid-performance (snapshot at patch change is enough)

## Network protocol

Custom UDP multicast for state broadcasting:
- Lightweight, low-latency
- No round-trip required (fire-and-forget)
- Multiple backups can listen (3-machine redundancy is possible)
- Configurable port + multicast group

For ultra-reliable, TCP unicast available (one-to-one pairing, with retry).

## Same protocol as multi-keyboardist sync

The same network sync code underpins [Multi-keyboardist Sync](/features/multi-keyboardist-sync/) — Keys 1 advances and Keys 2 follows. Different application of the same mechanism.

## Status indicator

Both primary and backup show their role in the UI status bar:
- Primary: "PRIMARY · LIVE" (with pulsing green)
- Backup: "BACKUP · STANDBY · synced ✓" (steady amber)

If sync is lost (network issue), backup shows "BACKUP · DESYNCED" with a red indicator.

## Manual takeover handoff

If the operator manually swaps primary ↔ backup roles (e.g. they decide the primary is unreliable mid-show and want the backup to become the new primary), it's a single click. The "new primary" starts broadcasting, the "new backup" starts listening.

## Phase status

| Phase | What's available |
|---|---|
| v2.0+ | Full hot-spare protocol + UI |

Promised originally in v0.4 reliability work; deferred because building the rest of the app is more critical for 1.0.

## Related pages

- [Multi-keyboardist Sync](/features/multi-keyboardist-sync/) (same underlying protocol)
- [Pre-Show Validation](/reliability/pre-show-validation/)
- **Real-Time Audio** <!-- TODO: dead wiki link to 'Architecture: Real-Time Audio' -->
