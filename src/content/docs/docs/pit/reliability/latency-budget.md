---
title: "Latency budget"
description: "Where every microsecond of latency comes from, what's achievable today across platforms and APIs, and the hardware recommendations that get you there."
---

> Where every microsecond of latency comes from, and what Broadway-grade actually looks like in 2026.

Live performance has different latency requirements than studio work. A 30 ms roundtrip is invisible in mixing. It's painful at the instrument. The goal: ≤ 10 ms is imperceptible to the musician's nervous system; ≤ 6 ms is competitive with hardware synths.

## Target latencies

| Platform | Configuration | Target roundtrip |
|---|---|---|
| **macOS** | CoreAudio, 128 samples, 48 kHz | **3–6 ms** |
| **Windows** | WASAPI Exclusive, 128 samples, 48 kHz | **6–12 ms** |
| **Windows** | ASIO via dedicated interface (Focusrite, MOTU, RME) | **3–8 ms** |
| **Linux** | PipeWire, 128 samples, 48 kHz | **4–10 ms** |
| **UI updates** | Meters, MIDI activity, patch changes | 30–60 ms (imperceptible, runs on separate thread) |

These are **Broadway-grade**. Most touring Broadway pits run 6–12 ms on dedicated rigs.

## Audio latency landscape (2026)

| Path | Best-case 2026 latency | Notes |
|---|---|---|
| Analog SDI / composite | 0–5 ms | Physics limit, electron speed |
| Apple Silicon CoreAudio | 2–4 ms | M-series tuned for audio; AU3 sandboxing helps |
| Intel/AMD Windows ASIO | 3–8 ms | Good ASIO driver + 64-sample buffer |
| Windows WASAPI Exclusive | 5–15 ms | Catching up to ASIO |
| Linux PipeWire | 4–10 ms | Near-parity with CoreAudio after PipeWire 1.0 |
| USB Audio Class 2 | adds 1–3 ms over native | Universal driver, mature |
| USB Audio Class 3 | adds 0.5–2 ms | 2018 standard, not widely adopted |
| Thunderbolt audio | adds <1 ms over native | UA Apollo, Apogee Symphony |
| DSP-accelerated (UAD-2, AAX DSP) | effectively 0 ms for DSP | FX on dedicated chip on interface |
| NDI (network video) | 30–80 ms | Improving with NDI HX3 |
| WebRTC video | 100–400 ms | Browser-dependent |
| USB UVC webcam | 100–300 ms | Hardware + codec + browser overhead |

### What's changing

- **Apple Silicon** is the biggest move. M-series chips run ~2 ms reliably; the OS audio stack is tuned for it.
- **Thunderbolt 4 / USB4** make external interfaces nearly indistinguishable from internal. Universal Audio Apollo on TB is ~1.1 ms claimed.
- **DSP-accelerated processing** — running effects on the interface's chip — gives "0 ms" plugin latency for supported plugins (UA, Antelope, Apogee, RME).
- **Linux PipeWire** has made real strides for pro audio. Approaching CoreAudio/ASIO parity.
- **Windows low-latency drivers** — Microsoft incrementally improved WASAPI. Some pro interfaces ship Class-Compliant USB drivers that are competitive without vendor ASIO.

### What's not changing

Video stays an order of magnitude behind audio. Even cutting-edge NDI HX3 is ~30 ms. **Analog remains king for conductor cam in any serious venue.**

## Where the latency comes from

For a keypress → audio output cycle:

```
[Physical key press]
   ↓ MIDI debounce / electronics:         ~1 ms
[USB MIDI message arrives at OS]
   ↓ OS MIDI driver dispatch:              ~0.5 ms
[midir delivers message to our thread]
   ↓ Lock-free queue push:                 ~0.01 ms (essentially free)
[Audio callback dequeues + sends to plugin]
   ↓ IPC to plugin process (v0.7.0+):      ~1 ms (shared memory ring buffer)
[Plugin processes note-on, generates audio]
   ↓ Plugin processing:                    ~1–5 ms (plugin-dependent)
   ↓ IPC back from plugin process:         ~1 ms
[Audio callback returns buffer]
   ↓ Audio interface buffer fill:          buffer size / sample rate
                                           (128 / 48000 = 2.67 ms)
   ↓ DAC + output to speakers:             ~1 ms
[Sound waves leaving speakers]
```

**Total**: 8–13 ms typical, dominated by plugin processing + audio buffer time.

## Why buffer size matters

The audio buffer is the **biggest controllable latency factor**:

| Buffer | Latency contribution (at 48 kHz) | CPU pressure |
|---|---|---|
| 32 samples | 0.67 ms | Very high — risk of dropouts |
| 64 samples | 1.33 ms | High — dedicated machine required |
| **128 samples** | **2.67 ms** | **Sweet spot** |
| 256 samples | 5.33 ms | Comfortable |
| 512 samples | 10.67 ms | Very safe, audible |
| 1024 samples | 21.33 ms | Only for backing-track playback |

Smaller buffer → less latency, but more CPU pressure (the audio callback must complete faster on a tighter schedule). Stardust's default is 128 — the live-performance sweet spot.

## Real-time safety in the audio thread

The audio callback fires every buffer cycle (2.67 ms at 128 samples / 48 kHz). To never miss a cycle:

- **No allocations** — heap allocations can take milliseconds in pathological cases
- **No locks** — a contended lock can stall for arbitrary time
- **No syscalls** — file I/O, network I/O can block
- **No logging** — write to a lock-free ring buffer; an async flusher in another thread does the actual write
- **Bounded operations only** — every loop, every conditional, every memory access has a known upper bound

Enforced via:

- Lock-free queues from `crossbeam` / `rtrb` for UI ↔ audio communication
- Pre-allocated buffers for voice tracking, plugin state, intermediate audio
- Dynamic-dispatch-free plugin chain (flat array, indexed access)
- `rt-assert`-style debug checks that catch allocations in the audio path

## Thread priority

The audio thread runs at the **highest possible priority** without preempting kernel work:

| Platform | Mechanism |
|---|---|
| macOS | `pthread_set_qos_class_self_np` with `QOS_CLASS_USER_INTERACTIVE` + `thread_policy_set` with `THREAD_TIME_CONSTRAINT_POLICY` |
| Windows | `THREAD_PRIORITY_TIME_CRITICAL`, `AvSetMmThreadCharacteristics("Pro Audio")` |
| Linux | `SCHED_FIFO` with `chrt`-style priority |

Plus **CPU pinning** — the audio thread runs on a dedicated core. Plugin processes pinned to other cores where possible. Reduces cache thrashing.

## ASIO vs WASAPI — the Windows audio API breakdown

| API | Year | Audio path | Typical latency | Notes |
|---|---|---|---|---|
| MME | 1991 | OS mixer → driver | 50–150 ms | Legacy, don't use |
| DirectSound | 1995 | OS mixer → driver | 30–80 ms | Legacy, don't use |
| WASAPI Shared | 2007 (Vista) | OS mixer → driver | 20–50 ms | Default Windows; mixes with system audio |
| WASAPI Exclusive | 2007 (Vista) | Direct to driver | 5–15 ms | Locks device to your app; competitive with ASIO |
| ASIO | 1997 (Steinberg) | Direct to driver | 3–10 ms | Pro audio standard; requires vendor ASIO driver per device |

### Why DAWs prefer ASIO

- **Historical**: when ASIO launched, Windows audio was MME — DirectSound was slow, WDM new. ASIO bypassed everything → only path to < 10 ms.
- **Vendor-tuned**: ASIO drivers are device-specific. Focusrite, RME, MOTU each ship optimized ASIO drivers.
- **Multi-client behavior**: ASIO typically single-client; WASAPI Exclusive also single-client; WASAPI Shared multi-client.
- **Channel count**: pro ASIO drivers expose all hardware channels (32-in/32-out for X32). WASAPI sometimes collapses to stereo.
- **Industry inertia**: every DAW supports it; users expect "ASIO Focusrite USB" in device list.

### ASIO replacement landscape

**Honest answer: no, nothing in the pipeline is meant to replace ASIO.** 28 years of inertia. What's happening:

- WASAPI Exclusive slowly catching up; supports split I/O natively
- WaveRT (kernel-mode under WASAPI) abstracted away
- ASIO 3.0 discussed for 20 years, never materialized
- CLAP organization has discussed audio I/O API alongside plugin spec; nothing public
- PipeWire rapidly displacing JACK + PulseAudio on Linux
- Apple Silicon CoreAudio approaches "no audio API choice needed"

### Practical answer for Pit

Support all three. Default rules:

- **macOS** — CoreAudio (no driver wars)
- **Linux** — ALSA → JACK if available, PipeWire fallback
- **Windows**:
  - Default to **WASAPI Exclusive** (ships with Windows, no driver install, 5–15 ms achievable)
  - Surface **ASIO** if vendor drivers present (user opt-in for best latency + multi-channel)
  - WASAPI Shared as fallback (casual / desktop use)
- Never default to MME or DirectSound

**Sample-rate sanity**: if user picks a device that doesn't support the show's sample rate, warn + offer resample on the fly (slight quality hit) or switch device.

### Separate I/O on Windows

- WASAPI handles separate input/output natively
- ASIO traditionally locks to one device for both
- macOS solves via CoreAudio Aggregate Devices (combine multiple into one logical device)
- Linux PipeWire handles natively
- **Pit must expose separate input/output device pickers** — known pain point in DAWs

## Hardware recommendations

### Best-in-class (no compromise)

- Apple Silicon Mac (M2 or newer)
- Universal Audio Apollo Twin / x4 / x8 (Thunderbolt) — DSP-accelerated, ~1.5 ms roundtrip
- DIN MIDI 5-pin from controllers where possible (USB MIDI fine but DIN lower jitter)
- Wired Ethernet for any networked components (no Wi-Fi for show-critical paths)

### Pro-grade (excellent value)

- Apple Silicon Mac, or modern Windows with WASAPI Exclusive
- RME Babyface Pro FS or Fireface UCX II (USB) — best-in-class stable drivers, low jitter
- Sustain + expression pedals from Boss / Roland (reliable wear)

### Budget-friendly (school / community)

- Any 2020+ laptop with USB-C
- Focusrite Scarlett 2i2 (4th gen) or Native Instruments Komplete Audio 6 — competent at ~6 ms
- USB MIDI from any class-compliant keyboard

### Avoid

- **Wireless MIDI** (Bluetooth: 30–50 ms, WiFi: variable) for performance-critical paths
- Cheap USB hubs between interface and computer (introduces jitter)
- Power-save modes during shows (forces buffer renegotiation)

## Measuring latency

Stardust includes a built-in **latency measurement tool** (v0.6.0+):

1. Connect an audio cable from one output to one input on your interface
2. Run the tool
3. It sends a click out, listens for it to come back in, measures sample-accurate latency
4. Displays roundtrip latency in samples and milliseconds

Also surfaces in **Settings → Audio panel** with green/yellow/red zones:

- **🟢 Green**: < 10 ms (you're set)
- **🟡 Yellow**: 10–20 ms (acceptable; could tighten)
- **🔴 Red**: > 20 ms (something's wrong — check buffer size or driver)

## Reducing latency

If your measured latency is higher than target:

1. **Smaller buffer** in Audio Settings (128 → 64 if CPU allows)
2. **WASAPI Exclusive** instead of Shared (Windows)
3. **ASIO** if interface supports it (Windows)
4. **Reduce plugin count** in chains
5. **Disable plugin sandboxing for testing only** (don't ship a show like this — sandboxing is critical for reliability)
6. **Disable other system tasks during performance** (close browsers, disable Wi-Fi power-save)

## Version status

| Version | What's available |
|---|---|
| **v0.6.0** | Engine reports latency through to engine-monitor surface; basic measurement tool |
| **v0.7.0** | Continuous monitoring with alert on mid-show degradation (rides on the sandboxing watchdog) |
| **v0.11.0** | Engine monitor widget in Perform mode surfaces latency live |
| **v0.15.0** | Latency-budget breakdown UI (per-API timings, hardware recommendations); shipped as a dedicated diagnostic surface |

The numbers above are **target latencies** — what Stardust commits to delivering under recommended hardware configurations. The engine-monitor widget (v0.11.0) and the latency measurement tool (v0.6.0+) are how you verify what you're actually getting.

## Related pages

- [Hot-plug resilience](/docs/pit/reliability/hot-plug/)
- [Plugin crash isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Audio I/O](/docs/pit/features/audio-io/)
- [Engine monitor](/docs/pit/features/engine-monitor/)
- [Conductor cam](/docs/pit/features/conductor-cam/) — for video-latency context
