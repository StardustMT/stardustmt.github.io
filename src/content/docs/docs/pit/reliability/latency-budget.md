---
title: "Latency Budget"
description: "| Platform | Configuration | Target roundtrip |
|---|---|---|
| macOS | CoreAudio, 128 samples, 48 kHz | 3–6 ms |
| Windows | WASAPI Exclusive, 128 samples,..."
---

> Where every microsecond of latency comes from, and what Broadway-grade actually looks like.

## Target latencies

| Platform | Configuration | Target roundtrip |
|---|---|---|
| **macOS** | CoreAudio, 128 samples, 48 kHz | **3–6 ms** |
| **Windows** | WASAPI Exclusive, 128 samples, 48 kHz | **6–12 ms** |
| **Windows** | ASIO via dedicated interface (Focusrite, MOTU, etc.) | **3–8 ms** |
| **UI updates** | Meters, MIDI activity, patch changes | 30–60 ms (imperceptible, runs on separate thread) |

These are **Broadway-grade**. Most touring Broadway pits run 6–12 ms on dedicated rigs. Under 10 ms is imperceptible to a musician's nervous system.

## Where the latency comes from

For a keypress → audio output cycle:

```
[Physical key press]
   ↓ MIDI debounce / electronics:        ~1 ms
[USB MIDI message arrives at OS]
   ↓ OS MIDI driver dispatch:             ~0.5 ms
[midir delivers message to our thread]
   ↓ Lock-free queue push:                ~0.01 ms (essentially free)
[Audio callback dequeues + sends to plugin]
   ↓ IPC to plugin process:               ~1 ms (shared memory ring buffer)
[Plugin processes note-on, generates audio]
   ↓ Plugin processing:                   ~1-5 ms (plugin-dependent)
   ↓ IPC back from plugin process:        ~1 ms
[Audio callback returns buffer]
   ↓ Audio interface buffer fill:         buffer size / sample rate
                                          (128 / 48000 = 2.67 ms)
   ↓ DAC + output to speakers:            ~1 ms
[Sound waves leaving speakers]
```

**Total**: 8-13 ms typical, dominated by plugin processing + audio buffer time.

## Why buffer size matters

The audio buffer is the **biggest controllable latency factor**:

| Buffer | Latency contribution (at 48 kHz) | CPU pressure |
|---|---|---|
| 32 samples | 0.67 ms | Very high — risk of dropouts |
| 64 samples | 1.33 ms | High — dedicated machine required |
| **128 samples** | **2.67 ms** | **Sweet spot** |
| 256 samples | 5.33 ms | Comfortable |
| 512 samples | 10.67 ms | Very safe, audible |
| 1024 samples | 21.33 ms | Only for backing tracks |

Smaller buffer → less latency, but more CPU pressure (the audio callback must complete faster on a tighter schedule). Stardust's default is 128 — the live-performance sweet spot.

## Real-time-safety in the audio thread

The audio callback fires every buffer cycle (2.67 ms at 128 samples / 48 kHz). To never miss a cycle:

- **No allocations** in the callback — heap allocations can take milliseconds in bad cases
- **No locks** — a contended lock can stall for arbitrary time
- **No syscalls** — file I/O, network I/O can block
- **No logging** — write to a lock-free ring buffer, async flusher in another thread does the actual write
- **Bounded operations only** — every loop, every conditional, every memory access has a known upper bound

Enforced via:
- Lock-free queues from `crossbeam` / `rtrb` for UI ↔ audio communication
- Pre-allocated buffers for voice tracking, plugin state, intermediate audio
- Dynamic-dispatch-free plugin chain (flat array, indexed access)
- `rt-assert`-style debug checks that catch allocations in the audio path

See [RT Audio Constraints](/docs/pit/reliability/latency-budget/).

## Thread priority

The audio thread runs at the **highest possible priority** without preempting kernel work:

| Platform | Mechanism |
|---|---|
| macOS | `pthread_set_qos_class_self_np` with `QOS_CLASS_USER_INTERACTIVE` + `thread_policy_set` with `THREAD_TIME_CONSTRAINT_POLICY` |
| Windows | `THREAD_PRIORITY_TIME_CRITICAL`, `AvSetMmThreadCharacteristics("Pro Audio")` |
| Linux | `SCHED_FIFO` with `chrt`-style priority |

Plus **CPU pinning** — the audio thread runs on a dedicated core. Plugin processes pinned to other cores where possible. Reduces cache thrashing.

## ASIO on Windows

CPAL's Windows backend defaults to WASAPI (good). For lowest latency, **ASIO** is the gold standard — manufacturer-specific drivers for pro audio interfaces.

CPAL's ASIO support is limited. Stardust adds a thin direct ASIO binding (`asio-sys` or similar) and abstracts both behind the same `AudioBackend` trait.

Why ASIO matters: most pro Windows audio interfaces (Focusrite, MOTU, RME, Behringer UMC) ship optimized ASIO drivers that beat WASAPI by 5-10 ms. For live performance, this is the difference between acceptable and great.

## Measuring latency

Stardust includes a built-in **latency measurement tool**:

1. Connect an audio cable from one output to one input on your interface
2. Run the tool
3. It sends a click out, listens for it to come back in, measures sample-accurate latency
4. Displays roundtrip latency in samples and milliseconds

Also surfaces in the **Settings → Audio panel** with green/yellow/red zones:
- **Green**: < 10 ms (you're set)
- **Yellow**: 10-20 ms (acceptable; could tighten)
- **Red**: > 20 ms (something's wrong — check buffer size or driver)

## Reducing latency

If your measured latency is higher than target:

1. **Smaller buffer** in Audio Settings (128 → 64 if CPU allows)
2. **WASAPI Exclusive** instead of shared (Windows)
3. **ASIO** if interface supports it (Windows)
4. **Reduce plugin count** in chains
5. **Disable plugin sandboxing** for testing only (don't ship a show like this — sandboxing is critical for reliability)
6. **Disable other system tasks** during performance (close browsers, disable Wi-Fi power-save)

## Version status

| Version | What's measured |
|---|---|
| **v0.6.0** | Engine reports latency through to the engine-monitor surface; basic measurement |
| **v0.7.0** | Continuous monitoring with alert on mid-show degradation (rides on the sandboxing watchdog) |
| **v0.11.0** | Engine monitor widget in Perform mode surfaces latency live |
| **v0.15.0** | Latency-budget breakdown UI (per-API timings, hardware recommendations); shipped as a dedicated diagnostic surface |

The numbers above are **target latencies** — what Stardust commits to delivering under recommended hardware configurations. The engine-monitor widget (v0.11.0) and the latency measurement tool (v0.6.0+) are how you verify what you're actually getting.

## Related pages

- [Hot-Plug Resilience](/docs/pit/reliability/hot-plug/)
- [Real-Time Audio](/docs/pit/reliability/latency-budget/)
- [Plugin Sandboxing](/docs/pit/reliability/plugin-crash-isolation/)
- [Audio I/O](/docs/pit/features/audio-io/)
- [RT Audio Constraints](/docs/pit/reliability/latency-budget/)
