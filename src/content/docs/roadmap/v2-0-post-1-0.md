---
title: "v2.0+ Post-1.0"
description: "Status: ⚪ Planning only — no committed timelines
Prerequisite: 1.0 released, community feedback collected"
---

> Everything that doesn't make 1.0. Major features that build on the 1.0 foundation.

**Status:** ⚪ Planning only — no committed timelines
**Prerequisite:** 1.0 released, community feedback collected

## Goals

v2.0+ is a backlog, not a sequential phase. Items are prioritized post-1.0 based on user demand and contributor interest. Each item links to its feature page; check those for current status.

## Community marketplace

[Full feature page](/features/marketplace/)

- Paid + free show sharing
- Show creators set pricing
- Lemon Squeezy (or Paddle) as Merchant of Record for tax compliance
- 15% platform commission
- License verification, account binding
- Verified creator badges

Beyond just shows, the marketplace handles device profile presets, UI layout presets, color theme presets, effect presets, patch presets, and sample packs.

## Community sharing (free hub)

[Full feature page](/features/community-sharing/)

- Free share hub for non-monetized content
- Same backend as marketplace, no payment gate
- Device profiles, layouts, themes, effect presets, patch presets

## AU plugin hosting (macOS)

[Full feature page](/features/au-hosting/)

- Audio Units (AU) plugin format
- Native Objective-C++ AU host module bridged to Rust
- macOS-only (no Windows equivalent)
- Significant work — full plugin format implementation

## Mobile companion

[Full feature page](/features/mobile-companion/)

- Phone/tablet remote control of desktop Stardust
- Tauri Mobile (iOS + Android)
- Patch browse, parameter tweak, show notes view
- Talks to desktop engine over LAN
- **Not** a mobile audio engine — that's a separate project beyond v2.0+

## Multi-keyboardist LAN sync

[Full feature page](/features/multi-keyboardist-sync/)

- Multiple Stardust instances on a LAN share Show/Song/Patch position
- Keys 1 advances and Keys 2's UI follows
- Useful for: multi-keyboardist shows, conductor-driven cue forwarding, hot-spare rig sync

## Hot-spare rig sync protocol

[Full feature page](/features/hot-spare-rig/)

- Primary + backup Stardust rigs wired in parallel
- Backup mirrors primary's current state (Show, Song, Patch position)
- Physical MIDI A/B switch (or software-controlled router) handles takeover
- Brodway MD-standard redundancy pattern

## Backing track playback

- Audio track import per Song (stems, click, guide tracks)
- Sync to internal click track
- Playback controls in Live Mode
- Cue points marking sections (Verse 1, Chorus, etc.)
- MIDI export of click for external sequencers

## Advanced cue system

Beyond MVP cue scope:
- **Timed cues** — "At 1:30 elapsed, advance patch"
- **Bar/beat cues** — "On bar 17, advance"
- **MIDI Show Control (MSC)** — industry-standard show coordination protocol
- **QLab deep integration** — bidirectional cue triggers via OSC + MIDI
- **Cue list timeline view** — visual editor showing all cues for a Song

## AI sound search

- "Find me a dark string sound with reverb"
- Search by description → recommend installed plugins + presets
- Search by reference audio (hum a tune → similar patches)
- ML backend trained on community-tagged patches

## Pure Rust VST3 SDK (long-term)

- Extract a pure Rust VST3 host SDK from Overture's C++ shim
- 3-6 months dedicated work for an experienced Rust audio engineer
- Becomes a side-effect of years of hosting real plugins
- Published as separate crate (`overture-vst3` or similar)

## More device profiles

- MainStage / Gig Performer migration wizard (import their `.concert` files)
- Custom device profile editor (currently only JSON)
- Community device profile sharing infrastructure

## Show analytics

- "You played Song 4's Patch 3 60% slower this week — practice it"
- Per-show metrics: time per Song, patches skipped, panic activations
- Useful for post-show review

## Practice mode

- Metronome + loop sections
- Slow-down for practice ("play this Song at 75%")
- Self-rehearsal tooling

## DMX / lighting integration

Originally on the wishlist but **dropped** — no MD interviewed needed this. Could be revisited if community demand emerges.

## Linux support

Originally post-1.0; depends on community demand. Most plugins don't have Linux versions, so the practical use is limited unless using JACK + plugins like Surge XT or Vital. Not a priority.

## Related pages

- [Roadmap](/roadmap/)
- [v1.0](/roadmap/v1-0-public-release/)
- [Marketplace](/features/marketplace/)
- [Community Sharing](/features/community-sharing/)
- [AU Hosting](/features/au-hosting/)
- [Mobile Companion](/features/mobile-companion/)
- [Multi-keyboardist Sync](/features/multi-keyboardist-sync/)
- [Hot-spare Rig](/features/hot-spare-rig/)
