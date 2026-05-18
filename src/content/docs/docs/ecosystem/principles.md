---
title: Principles
description: The architectural and product rules every Stardust product is built against.
---

These principles are why Stardust products feel like Stardust products. They're enforced in code review, in design discussions, and in the workspace [`CLAUDE.md`](https://github.com/StardustMT/stardust-workspace/blob/main/CLAUDE.md) that guides any AI agent touching the codebase. None of them bend without a corresponding [ADR](https://github.com/StardustMT/stardust-workspace/tree/main/docs/adr).

## Architectural

### UI never owns realtime

React, webview lifecycle, and Tauri IPC must never own audio scheduling, MIDI timing, or protocol timing. The signal flow is always:

```
UI (React)  →  Tauri IPC  →  Rust orchestration  →  Native realtime engine
```

Crossing that boundary in the wrong direction is a bug. Realtime correctness is non-negotiable; UI ergonomics are not allowed to compromise it.

### Out-of-process plugin hosting

VST3 / CLAP / AU plugins run in sandboxed child processes communicating with the host via shared-memory IPC. A crashing plugin substitutes silence for its output and surfaces a recoverable error — it does not take down the host. The full rationale is in [ADR-0002](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0002-out-of-process-plugin-sandboxing.md).

### Core crates are UI-agnostic

`stardust-core` and any future shared crate cannot depend on Tauri, React, or any frontend lifecycle. Core ships engines; UIs consume them. This makes the engine reusable across products and across rendering technologies (a native macOS Sheets reader and a Tauri Pit host should both depend on the same core).

### Protocol abstractions over raw protocols

Apps consume Stardust's MIDI / OSC / DMX abstractions, not raw protocol implementations directly. This means a feature like "MIDI device profile" exists once in core and works the same way in Pit, in Sheets, and in any future product.

### Schemas are versioned, formats are stable

Every persisted file (shows, songs, patches, rig profiles, library entries) carries an explicit `schema_version`. Old documents continue to load forever via a chain of migration functions. See [ADR-0003](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0003-schema-versioning.md) for the discipline.

## Product

### Local-first, cloud-optional

Every workflow must function without a network connection. Galaxy (cloud sync, marketplace, collaboration) is **additive**, never required. A musician on a tour bus with no signal still has a working app.

### Theatre vocabulary over DAW vocabulary

The mental model is **Show → Song → Patch → Sound**, not Project → Track → Channel → Voice. Vamps, codas, transposition, cascading settings, cue advancement — these are first-class concepts, not accommodations bolted onto a generic music tool.

DAW analogues are *familiar* but *wrong* for the user. A keys player thinks in songs and patches, not tracks and channels. The UI vocabulary, the file model, and the API names all reflect this.

### Reliability over novelty

A musician's career depends on the patch loading mid-show. That is the single most important property of any Stardust live tool. Features that improve flash but introduce reliability risk lose. Features that improve reliability at the cost of flash win.

This is why plugins are out-of-process. Why every persisted format is versioned. Why there's a Performance Lock mode. Why pre-show validation is green/yellow/red explicit. Why the audio thread never allocates and never locks.

### Apps work standalone

Pit is useful without Sheets. Sheets is useful without Pit. Ecosystem integration is *additive*, not *required*. A user should be able to adopt one Stardust product without committing to all of them.

### UX scales from solo performer to full production

A cabaret musician and a regional MD use the same app. The complexity is hidden under progressive disclosure, not partitioned into different SKUs. If a feature only makes sense for a 50-person production company, it doesn't ship.

### Open-source platform, commercial products

The shared infrastructure (`stardust-core`) is MPL 2.0 so it can be embedded in commercial and proprietary tools. Apps are commercial products with perpetual licenses — paid software people own, not SaaS people rent.

The community can run anything they want on top of the platform. Stardust the company makes money from polish, distribution, and the cloud-optional Galaxy layer when it exists.

## Process

### Significant architecture changes require an ADR

See [`docs/adr/`](https://github.com/StardustMT/stardust-workspace/tree/main/docs/adr). Status: Proposed → Accepted → (Deprecated | Superseded). Decisions get written down so the *why* outlives the people in the room.

### Incremental architectural evolution, never big-bang rewrites

The platform evolves through small, reviewable PRs and accepted ADRs. There is no rewrite phase. Migration paths are designed in.

### PRs land small

A reviewer should be able to read the whole diff in one sitting. If you can't, split it.

## Things explicitly avoided

- **No premature microservices.** Within `stardust-core`, prefer shared crates over IPC.
- **No heavyweight build orchestration.** `just` + scripts now; Moonrepo only when CI complexity warrants it.
- **No mandatory cloud or subscription gates.** Apps work fully offline forever.
- **No full OMR.** Sheets uses PDFs + semantic overlays, not optical music recognition.
- **No AI features without a clear theatre-specific value proposition.** AI for AI's sake doesn't ship.
- **No premature shared-UI extraction.** A `stardust-ui` library only exists when Sheets is real and there is genuine duplication.
- **No plugin ABI stabilization before there are real plugin authors.**
