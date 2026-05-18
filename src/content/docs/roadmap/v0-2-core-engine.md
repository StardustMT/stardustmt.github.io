---
title: "v0.2 Core Engine"
description: "Duration estimate: Weeks 3–8 (6 weeks)
Status: ⚪ Not started
Prerequisite: [v0.1](/roadmap/v0-1-foundations/) complete"
---

> Get audio working end-to-end. MIDI input → VST3 plugin → audio output, with measurable latency.

**Duration estimate:** Weeks 3–8 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.1](/roadmap/v0-1-foundations/) complete

## Goals

The audio engine works. You can plug in a keyboard, load a free VST3 plugin (e.g. Surge XT or Spitfire BBC SO Discover), play notes, and hear them — with single-digit-millisecond latency on macOS and low-teens on Windows.

This phase establishes Overture as a real, working Rust audio library. It also gives Stardust a basic UI for loading plugins and routing MIDI.

## What gets built

### Overture (library)

- **CPAL audio loop** — initialize an audio device, run a callback at audio-thread priority, output buffers
- **midir MIDI input** — open MIDI devices, receive messages on a dedicated thread, queue lock-free to the audio thread
- **VST3 plugin hosting** — small C++ shim around Steinberg SDK, called from Rust via FFI. In-process for v0.2 (sandboxing comes in v0.3).
- **Voice tracker** — pre-allocated tracking of active notes by `(channel, note, plugin)` so we can issue clean note-offs on patch change
- **Panic** — `all-notes-off` + `sustain-off` broadcast on every channel
- **Lock-free UI↔audio command channel** — parameter changes from UI dequeued in audio thread without blocking
- **Real-time-safety enforcement** — no allocations, no syscalls, no logging in the audio callback. CI assertion via `rt-assert` style tests.
- **`overture-cli`** — test binary that loads a config, plays a plugin, validates the engine works without any UI

### Stardust (app)

- Basic Tauri UI: load a plugin, route MIDI in from a device, play notes
- Plugin parameter panel (raw — no styling, just functional)
- Audio I/O selection dialog
- MIDI input selection dialog

## Linked features

These features are first introduced in v0.2:

- [Plugin Hosting](/features/plugin-hosting/) — VST3 only, in-process
- [MIDI Learn](/features/midi-learn/) — basic (manual mapping in code, full UI in v0.4)
- [Audio I/O Control](/features/audio-io/) — basic device selection, full settings panel in v0.4

## Library testing strategy (pre-UI)

A major v0.2 question: how do we know the engine works before the UI is built?

- **`overture-cli`** — Rust binary, loads a config file, runs the engine, outputs audio. Lets us validate via command line.
- **Headless integration tests** — load a plugin, send MIDI events via virtual MIDI device, capture audio buffer, assert characteristics (non-silent, expected frequency, no NaN, no clicks).
- **Test fixtures** — known-good audio recordings for deterministic replay comparison.
- **Example apps** in `overture/examples/`: `simple_playback.rs`, `midi_through.rs`, `audio_loopback.rs`.
- **Virtual MIDI loopback** in CI — spawn virtual MIDI device, send canned MIDI sequences, validate audio output. Works headless.
- **Benchmarks** via `criterion`: measure callback time under varying buffer sizes, plugin counts, parameter activity.

## Latency targets (verified in v0.2)

Measured via audio loopback test (audio out → audio in via cable, count samples):

- macOS (CoreAudio, 128-sample buffer @ 48 kHz): **< 6 ms roundtrip**
- Windows (WASAPI exclusive, 128 samples): **< 12 ms**
- Windows (ASIO via dedicated interface): **< 8 ms**

See [Latency Budget](/reliability/latency-budget/) for the full breakdown.

## Test plugins for v0.2

Free VST3 plugins for validating different plugin behaviors:

- **Surge XT** (synth, CPU-heavy)
- **Spitfire BBC SO Discover** (sampler, RAM-heavy)
- **Dexed** (small, lots of parameters)
- **TyrellN6** (u-he, classic analog character)

See [Plugin Hosting](/features/plugin-hosting/) for the full test matrix.

## Exit criteria

v0.2 is done when:

- A keyboard plays a VST3 plugin and you hear sound
- Latency is measured and within targets on both macOS and Windows
- Voice tracking prevents stuck notes on patch change
- Panic key works
- `overture-cli` validates the engine without UI
- Headless tests pass in CI on both platforms
- Tauri UI can: select plugin, select MIDI input, select audio output, play notes

## What we explicitly do NOT do in v0.2

- Plugin sandboxing (v0.3)
- CLAP support (v0.3)
- Show/Song/Patch data model (v0.4)
- Live Mode (v0.4)
- Click track / transpose / notes (v0.5)

## Related pages

- [v0.1](/roadmap/v0-1-foundations/)
- [v0.3](/roadmap/v0-3-plugin-sandboxing-clap/)
- [Roadmap](/roadmap/)
- **Real-Time Audio** <!-- TODO: dead wiki link to 'Architecture: Real-Time Audio' -->
- **Overture** <!-- TODO: dead wiki link to 'Architecture: Overture Library' -->
- [Latency Budget](/reliability/latency-budget/)
- [Plugin Hosting](/features/plugin-hosting/)
- **RT Audio Constraints** <!-- TODO: dead wiki link to 'Learning: Real-Time Audio' -->
