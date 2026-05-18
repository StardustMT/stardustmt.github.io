---
title: "Plugin Hosting"
description: "Stardust hosts third-party audio plugins to provide the actual sounds. You drag a plugin (e.g. Spitfire BBC SO Discover, Surge XT, MuseSounds Strings) into a..."
---

> Host VST3 and CLAP plugins, in sandboxed child processes so a crashing plugin never kills the show.

## What it does

Stardust hosts third-party audio plugins to provide the actual sounds. You drag a plugin (e.g. Spitfire BBC SO Discover, Surge XT, MuseSounds Strings) into a Patch's VST chain, configure its parameters, and the plugin processes incoming MIDI into output audio. Multiple plugins per Patch are supported — for layered sounds, splits, or effects chains.

## Supported formats

| Format | Status | Notes |
|---|---|---|
| **VST3** | MVP (v0.2) | The industry standard. Spitfire, MuseSounds, Surge XT, Vital, Dexed, all commercial libraries. |
| **CLAP** | v0.3 | Open-source modern format. Smaller ecosystem (mostly synths/effects), but high quality. |
| **AU** | v2.0+ | macOS-only Apple format. Some users prefer it for AU-specific plugins. |
| **VST2** | Never | Deprecated by Steinberg. We won't ship VST2 support. |

## Plugin sandboxing

The single biggest reliability decision in Stardust: **every plugin runs in its own child process**.

If a plugin segfaults — and they do, especially older third-party C++ code:
1. The audio engine catches the disconnect on the next audio callback
2. Sends `all-notes-off` to all channels
3. Either restarts the plugin or falls back to silence + sustain-off
4. UI notification toast: "Spitfire BBC SO crashed — restarted"
5. If a plugin crashes twice, it's quarantined for the rest of the session

Most existing live hosts run plugins in-process for performance reasons, which means a single plugin crash takes the host down with it. Stardust accepts the ~1 ms IPC overhead to keep that from happening. See [Comparison](/docs/pit/comparison/) for how this compares across hosts, and **Plugin Sandboxing** <!-- TODO: dead wiki link to 'Architecture: Plugin Sandboxing' --> for IPC and process-model details.

## Latency cost of sandboxing

Plugin process IPC adds **~1 ms** of latency via shared-memory ring buffers. Worth every microsecond — the reliability gain is enormous.

See [Latency Budget](/docs/pit/reliability/latency-budget/).

## Plugin parameter handling

Once a plugin is loaded:
- Every parameter is exposed in the Patch editor
- Parameters can be mapped to MIDI controls via [MIDI Learn](/docs/pit/features/midi-learn/)
- Plugin state (current parameter values) is saved per-Patch
- Multiple instances of the same plugin can be loaded in different Patches with different state
- "Open Plugin GUI" button launches the plugin's native editor

## Plugin discovery

- Auto-scan on first run (with progress UI)
- Default scan folders:
  - macOS: `~/Library/Audio/Plug-Ins/VST3`, `/Library/Audio/Plug-Ins/VST3`
  - Windows: `C:\Program Files\Common Files\VST3`
- Custom folders configurable in Settings → Plugins
- CLAP folders similarly default + customizable (v0.3)
- Plugin metadata cached for fast re-scan
- Quarantined plugins surfaced with manual re-enable

See [Audio I/O](/docs/pit/features/audio-io/) for related setup.

## VST3 implementation strategy

v0.2 uses a small **C++ shim** around the Steinberg VST3 SDK, called from Rust via FFI. The shim is ~1-2k LOC of C++ following Steinberg's sample host code.

We chose this over:
- **vst3-sys** (pure Rust): Too immature, lags SDK updates, smaller community
- **JUCE plugin host**: Heavy dependency, GPL-incompatible without commercial license
- **Native Rust SDK from scratch**: 3-6 months of dedicated expert work

The C++ shim is hidden behind a clean Rust API in Overture. If a pure Rust alternative emerges, we can swap internals without breaking the public API.

See **VST3 Shim decision** <!-- TODO: dead wiki link to 'ADR: VST3 C++ Shim' -->.

## CLAP implementation (v0.3)

CLAP support uses [`clack`](https://github.com/prokopyl/clack), the leading Rust CLAP host. Adds ~1 week of work; gives users access to Surge XT, Vital, u-he plugins in CLAP mode, and the growing CLAP ecosystem.

See **CLAP decision** <!-- TODO: dead wiki link to 'ADR: CLAP Support' -->.

## Test plugins for development

Free VST3 plugins for validating different behaviors:

| Plugin | Why we test with it |
|---|---|
| **Surge XT** | Open-source, hugely capable, CLAP version available |
| **Spitfire BBC SO Discover** | RAM-heavy sample library |
| **Spitfire LABS** | Variety of free instruments |
| **MuseSounds** | Orchestral, CPU-heavy on streaming |
| **Vital (free)** | Modern wavetable synth, modulation-heavy |
| **Dexed** | Small footprint, lots of params (DX7 emulator) |
| **Sforzando** | SFZ player — for community-shared samples |
| **Helm** | Open-source subtractive synth |
| **Valhalla Supermassive** | Effect plugin in chain |

This stack validates VST3 hosting under all production conditions.

## Phase-by-phase status

| Phase | What's available |
|---|---|
| v0.2 | VST3, in-process, single plugin per chain, basic UI |
| v0.3 | VST3 + CLAP, sandboxed, multi-plugin chains, crash recovery |
| v0.4 | Full UI integration with chains, mappings, transitions |
| v0.5 | Built-in effects rack (EQ, reverb, comp) alongside plugins |
| v2.0+ | AU on macOS |

## Related pages

- **Plugin Sandboxing** <!-- TODO: dead wiki link to 'Architecture: Plugin Sandboxing' -->
- [Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Latency Budget](/docs/pit/reliability/latency-budget/)
- [MIDI Learn](/docs/pit/features/midi-learn/)
- **VST3 Shim ADR** <!-- TODO: dead wiki link to 'ADR: VST3 C++ Shim' -->
- **CLAP ADR** <!-- TODO: dead wiki link to 'ADR: CLAP Support' -->
- **VST3 Internals** <!-- TODO: dead wiki link to 'Learning: VST3 Plugin Model' -->
