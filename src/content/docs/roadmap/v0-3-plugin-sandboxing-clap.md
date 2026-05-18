---
title: "v0.3 Plugin Sandboxing + CLAP"
description: "Duration estimate: Weeks 9–12 (4 weeks)
Status: ⚪ Not started
Prerequisite: [v0.2](/roadmap/v0-2-core-engine/) complete"
---

> Make the engine reliable. Plugin crashes don't kill the app. Hardware hot-plugs don't kill the show.

**Duration estimate:** Weeks 9–12 (4 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.2](/roadmap/v0-2-core-engine/) complete

## Goals

Take the working but fragile v0.2 engine and make it **Broadway-grade reliable**. The big shift: plugin processes become **out-of-process** with shared-memory IPC, so a crashing plugin never takes down the show.

This is the phase that turns Stardust from "works in my dev environment" into "would actually trust this on a Broadway stage."

## What gets built

### Plugin sandboxing

Each plugin (or small group) runs in a **child process**. The audio engine communicates with plugin processes via **shared-memory ring buffers** for sub-millisecond IPC latency.

If a plugin crashes:
1. The audio engine detects the disconnect on the next callback
2. Sends `all-notes-off` to all channels (panic)
3. Either restarts the plugin or falls back to silence + sustain-off
4. UI gets a notification toast
5. Plugin gets flagged for quarantine if it crashes twice in the same session

See **Plugin Sandboxing** <!-- TODO: dead wiki link to 'Architecture: Plugin Sandboxing' --> for IPC details.

### Watchdog process

Small supervisor process monitors the audio engine and can restart it if it deadlocks. The UI keeps running; the engine cycles in < 500 ms.

### CLAP support

Add [`clack`](https://github.com/prokopyl/clack) for CLAP plugin hosting alongside VST3.

CLAP is a newer, open-source plugin format with built-in real-time guarantees. The ecosystem is small but growing — Surge XT, Vital, u-he Diva/Hive/Repro, Bitwig devices, Helm all ship CLAP versions. Not a replacement for VST3 (most commercial plugins are still VST3-only) but a real bonus.

See [Plugin Hosting](/features/plugin-hosting/) and **why we support CLAP** <!-- TODO: dead wiki link to 'ADR: CLAP Support' -->.

### Hot-plug resilience

USB MIDI / audio device disconnect handled gracefully:
- Detect disconnect via platform-specific notifications (CoreAudio Property Listeners on macOS, WASAPI device notifications on Windows)
- Mute the affected channel
- Surface UI warning toast
- Attempt reconnect on device reappearance
- Auto-resume on reconnect

Most music software doesn't bother with this. Every working musician has had a USB MIDI cable wiggle mid-show. We will not have this problem.

See [Hot-Plug Resilience](/reliability/hot-plug/).

### Pre-show validation

Before "Go Live," run a check:
- All plugins load successfully
- All MIDI devices present and responsive
- Audio device matches saved config
- Sample rate matches
- No parameter mappings reference missing plugins
- Disk space adequate
- CPU baseline reasonable
- No quarantined plugins

Surface a green/yellow/red dashboard. See [Pre-Show Validation](/reliability/pre-show-validation/).

### Performance Lock mode

Single toggle ("Go Live" / "End Show") that disables file ops, plugin scanning, allocation-heavy ops, and accidental edits. See [Performance Lock](/reliability/performance-lock/).

### Soak tests in CI

Automated 4-hour playback test on both platforms, asserting:
- No audio dropouts
- No memory growth
- No CPU drift
- No file handle leaks
- All notes properly cleaned up at end

Every release branch must pass this before tagging.

## Linked features

Features that gain critical functionality in v0.3:

- [Plugin Hosting](/features/plugin-hosting/) — sandboxing + CLAP
- [Plugin Crash Isolation](/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/reliability/hot-plug/)
- [Pre-Show Validation](/reliability/pre-show-validation/)
- [Performance Lock](/reliability/performance-lock/)
- [Voice Tracking & Panic](/reliability/voice-tracking/)

## v0.3 minimum device support

For end-to-end testing, ship device profiles for the actual hardware we'll be testing on:

- Roland RD-2000 (88-key with knobs/faders)
- Boss FS-5U (single footswitch)
- Roland EV-5 (expression pedal)
- Roland DP-10 (sustain pedal)

Other device profiles ship before 1.0 release but aren't blockers here.

See [Device Profiles](/features/device-profiles/).

## Exit criteria

v0.3 is done when:

- Killing a plugin's process mid-playback does NOT crash the app; audio resumes within 500 ms
- USB MIDI hot-plug recovers seamlessly
- 4-hour soak test passes in CI on both platforms — zero dropouts
- CLAP plugins host correctly (test with Surge XT in CLAP mode)
- Pre-show health check works
- Performance Lock toggle blocks all file/destructive ops

## Related pages

- [v0.2](/roadmap/v0-2-core-engine/)
- [v0.4](/roadmap/v0-4-data-model-ui/)
- **Plugin Sandboxing** <!-- TODO: dead wiki link to 'Architecture: Plugin Sandboxing' -->
- [Plugin Crash Isolation](/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/reliability/hot-plug/)
- **Sandboxing ADR** <!-- TODO: dead wiki link to 'ADR: Plugin Sandboxing Approach' -->
- **CLAP ADR** <!-- TODO: dead wiki link to 'ADR: CLAP Support' -->
