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
  1. Drain hardware + UI MIDI ingress (events arrive pre-routed to a source node — see MIDI ingress below)
  2. If a panic was requested, flush every tracked voice + reset controllers (see Panic below)
  3. Iterate nodes in topo order
  4. Process each (CLAP plugin / native testtone synth / 3-band EQ / mix / sink)
  5. Distribute outbox MIDI events to consumers via the routing table, maintaining the voice tracker

### Guarantees

- **Allocation-free per block** — RT-safe; no heap allocation, no locks, no syscalls in `Plan::process`
- **Per-output-port stereo edge buffers** pre-allocated at build time
- **MIDI routing tables** (with zone filters for split-keyboard outputs) built per producing node
- **Soft failures** — a node that fails to load becomes `PlannedNode::Silent`; the rest of the plan still loads and plays

### `!Send` plugin pinning

clack-host's `PluginInstance<H>` is `!Send`. The engine thread is the only thread that touches plugins — they're pinned to it. UI ↔ engine communication is lock-free ring buffers (`crossbeam` / `rtrb`), never shared plugin state.

## MIDI ingress + per-source binding (shipped, v0.6.0)

Up to 8 hardware MIDI devices feed the plan simultaneously, one pre-allocated SPSC ring each. Every source node may carry a `hardwareBinding` in its config — device (midir's opaque port id, display name as replug fallback), channel, note range, CC range. The midir input callback matches each event against the bindings that resolve to its device and pushes **pre-routed** `(source node, event)` pairs, so the audio thread does no matching at all.

- **Fan-out, not first-match** — overlapping bindings all receive the event (splits and layers depend on this)
- **`deviceId: null` = any device** — the v0.5.0 single-device back-compat path
- **Kind event classes** — a sustain-pedal source only accepts CC 64, a pitch wheel only pitch bend, keyboards everything; wiring a pedal next to a keyboard can't double note events
- **Disconnected ≠ unbound** — bindings persist across unplug and re-match on reconnect

> **Changing in v0.6.0 rig-lite ([#122](https://github.com/StardustMT/stardust-pit/issues/122), refined 2026-07-06):** node-level `hardwareBinding` goes away. Source nodes reference a rig component (`rigComponentId`); the component owns the device binding, and a schema v2→v3 migration converts existing node blobs into rig components. Unassigned nodes are silent (the any-device path is removed). The ingress machinery above — SPSC rings, pre-routed fan-out, kind event classes — is unchanged; only where bindings *live* moves. The engine's open-input set becomes the union of rig-bound devices, session-wide.

## Device rebind (shipped, v0.6.0)

`engine_rebind_routing` swaps the cpal stream and/or the open MIDI input set **in place**. The plan lives in a callback-state bundle owned by the audio callback through a Drop-carrier: tearing a stream down hands the plan back to the engine thread, which reopens it on the new device — no plugin reloads, no buffer reallocation, held voices intact. On failure the previous device stays (or is restored) active.

**Decision tree:** device identity change → rebind (same plan, new I/O). Sample-rate or buffer-size change → full plan rebuild (edge buffers and plugin activations are sized to the audio config).

## Panic (shipped, v0.6.0)

The plan keeps a per-instrument **voice tracker** (16 channels × 128 notes, a fixed bitset maintained inline during MIDI fan-out). `engine_panic` sets an atomic flag the callback consumes at the top of the next block — within the ≤1-block latency budget — writing straight into every instrument's inbox: sustain-off first, an explicit note-off + poly-aftertouch-clear per tracked voice, then all-notes-off (CC 123), pitch-bend center, mod-wheel 0, and channel-pressure 0 on all 16 channels. Allocation-free, idempotent, safe to spam.

## What's shipped

- `engine_graph` Plan model (ADR-0006, Accepted) — v0.5.0
- Multi-plugin chain hosting — v0.5.0
- Native nodes: 3-band stereo EQ, transpose, mix — v0.5.0
- Topo-sorted, allocation-free per-block processing — v0.5.0
- Soft per-node failure handling — v0.5.0
- Per-source hardware MIDI binding + multi-device ingress — v0.6.0
- `engine_rebind_routing` device swap without plan teardown — v0.6.0
- Voice tracker + engine-level Panic — v0.6.0

## Trajectory

| Version | Engine work |
|---|---|
| **v0.6.0** | ✅ `engine_rebind_routing`, per-source hardware MIDI binding, engine-level Panic (all shipped 2026-07-03, PR stardust-pit#118); plugin scan caching still open |
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
