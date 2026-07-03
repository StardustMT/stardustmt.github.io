---
title: "Engine architecture"
description: "How the realtime audio engine works — the Plan model from ADR-0006, what's shipped as of v0.5.0, the allocation-free guarantees, and the per-version trajectory through v0.8.0."
---

The engine is the realtime heart of Pit: hardware MIDI in → patch graph → CLAP plugins (+ native nodes) → audio out, all allocation-free per audio block. This page describes how it works today and where it's going.

The architecture decision behind it is [ADR-0006: Engine graph-walker and realtime execution model](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0006-engine-graph-walker.md).

## The Plan model (shipped, v0.5.0)

The engine consumes the **whole patch graph**, not just the first instrument. The core types:

- **`Plan::build(&PatchGraph)`** produces an executable plan:
  1. Flatten composite nodes
  2. Topo-sort the audio DAG
  3. Pre-allocate edge buffers
  4. Build MIDI routing tables
  5. Load + activate every plugin
- **`Plan::process(cpal_buf, spec)`** runs once per audio block:
  1. Drain hardware + UI MIDI rings
  2. Iterate nodes in topo order
  3. Process each (CLAP plugin / native testtone synth / 3-band EQ / mix / sink)
  4. Distribute outbox MIDI events to consumers via the routing table

### Guarantees

- **Allocation-free per block** — RT-safe; no heap allocation, no locks, no syscalls in `Plan::process`
- **Per-output-port stereo edge buffers** pre-allocated at build time
- **MIDI routing tables** (with zone filters for split-keyboard outputs) built per producing node
- **Soft failures** — a node that fails to load becomes `PlannedNode::Silent`; the rest of the plan still loads and plays

### `!Send` plugin pinning

clack-host's `PluginInstance<H>` is `!Send`. The engine thread is the only thread that touches plugins — they're pinned to it. UI ↔ engine communication is lock-free ring buffers (`crossbeam` / `rtrb`), never shared plugin state.

## What's shipped (v0.5.0)

- `engine_graph` Plan model (ADR-0006, Accepted)
- Multi-plugin chain hosting
- Native nodes: 3-band stereo EQ, transpose, mix
- Topo-sorted, allocation-free per-block processing
- Soft per-node failure handling

## Trajectory

| Version | Engine work |
|---|---|
| **v0.6.0** | `engine_rebind_routing` (swap cpal stream / midir input without rebuilding the Plan), per-source hardware MIDI binding, engine-level Panic, plugin scan caching |
| **v0.7.0** | Out-of-process plugin processes via shared-memory IPC, watchdog supervisor, crash detection + recovery, hot-plug resilience |
| **v0.8.0** | Engine transport state (stopped / playing / paused / position), click track engine node, MIDI clock send |
| **v0.13.0** | Audio file decoding (symphonia) into ring buffers, transport-driven backing-track playback, sample-accurate cue jump |
| **v0.14.0** | Native `instrument.sfz` node (in-process, like the testtone synth) |

## Realtime rules (durable)

These don't change without an ADR:

- **UI never owns realtime.** React / Tauri IPC must never own audio scheduling or MIDI timing.
- **Realtime paths allocation-free.** Audio callback, MIDI dispatch — no allocation, no locks.
- **`!Send` plugin instances pinned to one thread.** The engine thread is the only one that touches plugins.
- **Out-of-process plugin processes** (v0.7.0+) — each plugin runs in a child process; shared-memory ring buffers; sub-ms IPC latency.

## Crate organization

`stardust-core` is a flat Cargo workspace. See [ADR-0008: Crate organization](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0008-crate-organization.md). Current layout:

```
stardust-core/
├── Cargo.toml             # workspace root
└── crates/
    ├── stardust-audio/    # cpal output wrapper
    ├── stardust-midi/     # MIDI types + midir wrapper
    ├── stardust-dsp/      # native DSP nodes (EQ, synth, envelope)
    ├── stardust-patch/    # patch-graph data model
    ├── stardust-show/     # show document data model
    ├── stardust-plugin/   # CLAP host
    └── stardust-rt/       # realtime primitives (SPSC rings)
```

Flat workspace, grouped by naming convention. Nested workspaces only get introduced past ~15 crates.

## Related pages

- [Architecture overview](/docs/pit/architecture/overview/)
- [Tauri stack](/docs/pit/architecture/tauri-stack/)
- [Latency budget](/docs/pit/reliability/latency-budget/)
- [Plugin hosting](/docs/pit/features/plugin-hosting/)
- [Patch library](/docs/pit/features/patch-library/) (the data model the engine consumes)
