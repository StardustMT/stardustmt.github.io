---
title: "AU Hosting"
description: "Target version: v2.0+"
---

> Native Audio Unit (AU) plugin support on macOS. The Apple-format equivalent of VST3.

**Target version:** v2.0+

## What it does

Hosts Audio Unit plugins on macOS — the native Apple plugin format used in Logic, GarageBand, MainStage. Stardust treats AU plugins identically to VST3: load into a Patch's chain, route MIDI in, get audio out, parameter mapping, MIDI Learn, all the same.

## Why v2.0+

Two reasons we defer AU:
1. **VST3 is the universal format.** Almost every commercial plugin ships VST3, including most that also ship AU. So VST3 covers the use cases first.
2. **AU hosting requires native Objective-C++ bridging.** No good Rust SDK exists; we'd write a small Obj-C++ module bridged to Rust. Similar effort to the VST3 shim.

So we ship 1.0 with VST3 + CLAP (cross-platform), and add AU as a macOS-only v2.0+ enhancement.

## Implementation strategy

Similar to VST3:
1. Write a small Obj-C++ module that wraps Apple's AU host APIs (`AudioToolbox`, `AudioUnit`)
2. Expose a clean C ABI for Rust to call
3. Use the same plugin orchestration in Overture as for VST3 (sandboxing, parameter mapping, voice tracking)
4. UI integration identical — users don't see the difference between AU and VST3 plugins

## What plugins benefit

Mostly:
- **Apple's own plugins** — Alchemy, Sculpture, ES2, Retro Synth (Logic-bundled, AU-only)
- **A few macOS-only third-party plugins** that didn't ship VST3
- **Some legacy plugins** that have AU versions but discontinued VST3

For most users, VST3 covers what they need. AU is the "completeness" feature.

## Windows users not affected

AU is macOS-only by Apple definition. Windows users use VST3 + CLAP. This is one of the rare areas where macOS users get a feature Windows users don't — but Apple-only formats are inherently platform-specific.

## Related pages

- [Plugin Hosting](/docs/pit/features/plugin-hosting/)
- [Plugin Sandboxing](/docs/pit/reliability/plugin-crash-isolation/)
- [v2.0+](/docs/pit/roadmap/v2-0-post-1-0/)
