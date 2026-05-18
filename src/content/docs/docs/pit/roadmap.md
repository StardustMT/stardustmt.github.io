---
title: Pit roadmap
description: Version-by-version milestones for Stardust Pit, with exit criteria per release. From v0.1 Foundations through v2.0+ Post-1.0 on a single page.
---

Stardust Pit is built version by version. Every version is a real release with a defined scope and clear exit criteria — not a planning convenience.

> [!NOTE]
> Versioning is intentionally release-shaped: **v1.0 is the public release**, not a separate "polish phase." Everything pre-1.0 is the path to it; everything post-1.0 builds on it. The ecosystem-wide trajectory (Pit → Sheets → speculative future) lives on the [ecosystem roadmap](/docs/ecosystem/roadmap/).

## At a glance

| Version | Goal | Status |
|---|---|---|
| [v0.1 — Foundations](#v01--foundations) | Repos, docs migration, Storybook scaffold, ADR system | 🟢 In progress |
| [v0.2 — Vertical slice](#v02--vertical-slice) | Minimum Pit + minimum stardust-core in tandem | ⚪ Not started |
| [v0.3 — Plugin sandboxing + CLAP](#v03--plugin-sandboxing--clap) | Out-of-process plugins, hot-plug resilience, CLAP support | ⚪ Not started |
| [v0.4 — Data model + UI](#v04--data-model--ui) | Show/Song/Patch model + full Edit/Live UI | ⚪ Not started |
| [v0.5 — MT features](#v05--mt-features) | Click, transpose, notes, custom sampler, forScore | ⚪ Not started |
| [v1.0 — Public release](#v10--public-release) | Cross-platform release, demo shows, beta → 1.0 | ⚪ Not started |
| [v2.0+ — Post-1.0](#v20--post-10) | Marketplace, AU, mobile companion, multi-keys sync | ⚪ Planning only |

Legend: 🟢 in progress · 🟡 partially complete · ⚪ not started · ✅ done

---

## v0.1 — Foundations

*Duration estimate: 1–3 weeks*

> Set up everything we need to start building, with professional polish from day one.

**Duration estimate:** 1–3 weeks
**Status:** 🟢 In progress

### Goals

Get the project infrastructure in place so that as soon as we start writing the audio engine and UI, every aspect of the dev environment, CI, and documentation is ready.

### Deliverables

#### Repositories

- ✅ [`StardustMT/stardust-pit`](https://github.com/StardustMT/stardust-pit) (GPL v3) — the app
- ✅ [`StardustMT/stardust-core`](https://github.com/StardustMT/stardust-core) (Apache 2.0) — the audio library
- ✅ Professional READMEs with badges, links, quickstart
- ✅ License files

#### Wiki (this!)

- ✅ Stardust wiki bootstrapped (you're reading it)
- ⚪ Overture wiki bootstrapped
- ✅ Feature-first organization with roadmap linking to features
- ✅ ADRs for major decisions
- ⚪ Learning materials section

#### GitHub Pages site

- ⚪ Astro or VitePress scaffold at `chasecondon.github.io/Stardust/`
- ⚪ Auto-deploy on push to `main` via GitHub Actions
- ⚪ Pages: home, features, download, docs, guides, FAQ, community

#### Project management

- ⚪ GitHub Project board for issue tracking
- ⚪ Issue templates (bug, feature, ADR)
- ⚪ `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`

#### Code scaffolding (in this phase, just scaffolds — no real implementation)

- ⚪ Tauri 2 + React + TypeScript + Tailwind + shadcn/ui in Stardust repo
- ⚪ Rust workspace + library crate in Overture repo
- ⚪ Cargo workspace integration between the two locally
- ⚪ Storybook bootstrapped in Stardust

#### Storybook

The big v0.1 lift: **stub every UI screen, widget, modal, and component in Storybook** before any are wired up. This becomes the canvas to iterate on the entire app's visual design before functional code exists.

See Screen Inventory for the full list.

- ⚪ Color palette + theme tokens as a Storybook page
- ⚪ All MVP widgets stubbed
- ⚪ All screens stubbed with placeholder data
- ⚪ All modals/dialogs stubbed
- ⚪ Form primitives (buttons, inputs, sliders, toggles, etc.) ready

#### CI

- ⚪ macOS build + test on every push
- ⚪ Windows build + test on every push
- ⚪ Rust clippy + fmt
- ⚪ TypeScript ESLint + Prettier
- ⚪ Storybook build verification

#### Decisions to confirm in v0.1

Before v0.2 starts, we want clarity on:

- Final naming (Stardust + Overture working names; potential rename before 1.0)
- Branding direction (color palette previewed in Storybook)
- Initial GitHub org migration (currently personal account)

### Exit criteria

v0.1 is done when:

- Both repos are public with READMEs that look like serious OSS projects
- This wiki has roadmap + key concepts + features outlined (even if stub content for some pages)
- GitHub Pages site is live, even if minimal
- Storybook covers every UI component we expect to build
- CI is running and green on both platforms
- Anyone landing on the project can understand what it is, what's planned, and how to contribute

### What we explicitly do NOT do in v0.1

- Real audio engine code (v0.2)
- Real plugin hosting (v0.2)
- Real UI wiring (v0.4)

v0.1 is foundation only. Resist scope creep.

### Related pages

- [Roadmap](/docs/pit/roadmap/)
- [v0.2 Core Engine](/docs/pit/roadmap/v0-2-core-engine/)
- Screen Inventory
- Widget Registry
- Theme System

---

## v0.2 — Vertical slice

*Duration estimate: Weeks 3–8 (6 weeks)*

> Get audio working end-to-end. MIDI input → VST3 plugin → audio output, with measurable latency.

**Duration estimate:** Weeks 3–8 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.1](/docs/pit/roadmap/v0-1-foundations/) complete

### Goals

The audio engine works. You can plug in a keyboard, load a free VST3 plugin (e.g. Surge XT or Spitfire BBC SO Discover), play notes, and hear them — with single-digit-millisecond latency on macOS and low-teens on Windows.

This phase establishes Overture as a real, working Rust audio library. It also gives Stardust a basic UI for loading plugins and routing MIDI.

### What gets built

#### Overture (library)

- **CPAL audio loop** — initialize an audio device, run a callback at audio-thread priority, output buffers
- **midir MIDI input** — open MIDI devices, receive messages on a dedicated thread, queue lock-free to the audio thread
- **VST3 plugin hosting** — small C++ shim around Steinberg SDK, called from Rust via FFI. In-process for v0.2 (sandboxing comes in v0.3).
- **Voice tracker** — pre-allocated tracking of active notes by `(channel, note, plugin)` so we can issue clean note-offs on patch change
- **Panic** — `all-notes-off` + `sustain-off` broadcast on every channel
- **Lock-free UI↔audio command channel** — parameter changes from UI dequeued in audio thread without blocking
- **Real-time-safety enforcement** — no allocations, no syscalls, no logging in the audio callback. CI assertion via `rt-assert` style tests.
- **`overture-cli`** — test binary that loads a config, plays a plugin, validates the engine works without any UI

#### Stardust (app)

- Basic Tauri UI: load a plugin, route MIDI in from a device, play notes
- Plugin parameter panel (raw — no styling, just functional)
- Audio I/O selection dialog
- MIDI input selection dialog

### Linked features

These features are first introduced in v0.2:

- [Plugin Hosting](/docs/pit/features/plugin-hosting/) — VST3 only, in-process
- [MIDI Learn](/docs/pit/features/midi-learn/) — basic (manual mapping in code, full UI in v0.4)
- [Audio I/O Control](/docs/pit/features/audio-io/) — basic device selection, full settings panel in v0.4

### Library testing strategy (pre-UI)

A major v0.2 question: how do we know the engine works before the UI is built?

- **`overture-cli`** — Rust binary, loads a config file, runs the engine, outputs audio. Lets us validate via command line.
- **Headless integration tests** — load a plugin, send MIDI events via virtual MIDI device, capture audio buffer, assert characteristics (non-silent, expected frequency, no NaN, no clicks).
- **Test fixtures** — known-good audio recordings for deterministic replay comparison.
- **Example apps** in `overture/examples/`: `simple_playback.rs`, `midi_through.rs`, `audio_loopback.rs`.
- **Virtual MIDI loopback** in CI — spawn virtual MIDI device, send canned MIDI sequences, validate audio output. Works headless.
- **Benchmarks** via `criterion`: measure callback time under varying buffer sizes, plugin counts, parameter activity.

### Latency targets (verified in v0.2)

Measured via audio loopback test (audio out → audio in via cable, count samples):

- macOS (CoreAudio, 128-sample buffer @ 48 kHz): **< 6 ms roundtrip**
- Windows (WASAPI exclusive, 128 samples): **< 12 ms**
- Windows (ASIO via dedicated interface): **< 8 ms**

See [Latency Budget](/docs/pit/reliability/latency-budget/) for the full breakdown.

### Test plugins for v0.2

Free VST3 plugins for validating different plugin behaviors:

- **Surge XT** (synth, CPU-heavy)
- **Spitfire BBC SO Discover** (sampler, RAM-heavy)
- **Dexed** (small, lots of parameters)
- **TyrellN6** (u-he, classic analog character)

See [Plugin Hosting](/docs/pit/features/plugin-hosting/) for the full test matrix.

### Exit criteria

v0.2 is done when:

- A keyboard plays a VST3 plugin and you hear sound
- Latency is measured and within targets on both macOS and Windows
- Voice tracking prevents stuck notes on patch change
- Panic key works
- `overture-cli` validates the engine without UI
- Headless tests pass in CI on both platforms
- Tauri UI can: select plugin, select MIDI input, select audio output, play notes

### What we explicitly do NOT do in v0.2

- Plugin sandboxing (v0.3)
- CLAP support (v0.3)
- Show/Song/Patch data model (v0.4)
- Live Mode (v0.4)
- Click track / transpose / notes (v0.5)

### Related pages

- [v0.1](/docs/pit/roadmap/v0-1-foundations/)
- [v0.3](/docs/pit/roadmap/v0-3-plugin-sandboxing-clap/)
- [Roadmap](/docs/pit/roadmap/)
- [Real-Time Audio](/docs/pit/reliability/latency-budget/)
- [Overture](https://github.com/StardustMT/stardust-core)
- [Latency Budget](/docs/pit/reliability/latency-budget/)
- [Plugin Hosting](/docs/pit/features/plugin-hosting/)
- [RT Audio Constraints](/docs/pit/reliability/latency-budget/)

---

## v0.3 — Plugin sandboxing + CLAP

*Duration estimate: Weeks 9–12 (4 weeks)*

> Make the engine reliable. Plugin crashes don't kill the app. Hardware hot-plugs don't kill the show.

**Duration estimate:** Weeks 9–12 (4 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.2](/docs/pit/roadmap/v0-2-core-engine/) complete

### Goals

Take the working but fragile v0.2 engine and make it **Broadway-grade reliable**. The big shift: plugin processes become **out-of-process** with shared-memory IPC, so a crashing plugin never takes down the show.

This is the phase that turns Stardust from "works in my dev environment" into "would actually trust this on a Broadway stage."

### What gets built

#### Plugin sandboxing

Each plugin (or small group) runs in a **child process**. The audio engine communicates with plugin processes via **shared-memory ring buffers** for sub-millisecond IPC latency.

If a plugin crashes:
1. The audio engine detects the disconnect on the next callback
2. Sends `all-notes-off` to all channels (panic)
3. Either restarts the plugin or falls back to silence + sustain-off
4. UI gets a notification toast
5. Plugin gets flagged for quarantine if it crashes twice in the same session

See [Plugin Sandboxing](/docs/pit/reliability/plugin-crash-isolation/) for IPC details.

#### Watchdog process

Small supervisor process monitors the audio engine and can restart it if it deadlocks. The UI keeps running; the engine cycles in < 500 ms.

#### CLAP support

Add [`clack`](https://github.com/prokopyl/clack) for CLAP plugin hosting alongside VST3.

CLAP is a newer, open-source plugin format with built-in real-time guarantees. The ecosystem is small but growing — Surge XT, Vital, u-he Diva/Hive/Repro, Bitwig devices, Helm all ship CLAP versions. Not a replacement for VST3 (most commercial plugins are still VST3-only) but a real bonus.

See [Plugin Hosting](/docs/pit/features/plugin-hosting/) and [why we support CLAP](/docs/pit/features/plugin-hosting/).

#### Hot-plug resilience

USB MIDI / audio device disconnect handled gracefully:
- Detect disconnect via platform-specific notifications (CoreAudio Property Listeners on macOS, WASAPI device notifications on Windows)
- Mute the affected channel
- Surface UI warning toast
- Attempt reconnect on device reappearance
- Auto-resume on reconnect

Most music software doesn't bother with this. Every working musician has had a USB MIDI cable wiggle mid-show. We will not have this problem.

See [Hot-Plug Resilience](/docs/pit/reliability/hot-plug/).

#### Pre-show validation

Before "Go Live," run a check:
- All plugins load successfully
- All MIDI devices present and responsive
- Audio device matches saved config
- Sample rate matches
- No parameter mappings reference missing plugins
- Disk space adequate
- CPU baseline reasonable
- No quarantined plugins

Surface a green/yellow/red dashboard. See [Pre-Show Validation](/docs/pit/reliability/pre-show-validation/).

#### Performance Lock mode

Single toggle ("Go Live" / "End Show") that disables file ops, plugin scanning, allocation-heavy ops, and accidental edits. See [Performance Lock](/docs/pit/reliability/performance-lock/).

#### Soak tests in CI

Automated 4-hour playback test on both platforms, asserting:
- No audio dropouts
- No memory growth
- No CPU drift
- No file handle leaks
- All notes properly cleaned up at end

Every release branch must pass this before tagging.

### Linked features

Features that gain critical functionality in v0.3:

- [Plugin Hosting](/docs/pit/features/plugin-hosting/) — sandboxing + CLAP
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/docs/pit/reliability/hot-plug/)
- [Pre-Show Validation](/docs/pit/reliability/pre-show-validation/)
- [Performance Lock](/docs/pit/reliability/performance-lock/)
- [Voice Tracking & Panic](/docs/pit/reliability/voice-tracking/)

### v0.3 minimum device support

For end-to-end testing, ship device profiles for the actual hardware we'll be testing on:

- Roland RD-2000 (88-key with knobs/faders)
- Boss FS-5U (single footswitch)
- Roland EV-5 (expression pedal)
- Roland DP-10 (sustain pedal)

Other device profiles ship before 1.0 release but aren't blockers here.

See [Device Profiles](/docs/pit/features/device-profiles/).

### Exit criteria

v0.3 is done when:

- Killing a plugin's process mid-playback does NOT crash the app; audio resumes within 500 ms
- USB MIDI hot-plug recovers seamlessly
- 4-hour soak test passes in CI on both platforms — zero dropouts
- CLAP plugins host correctly (test with Surge XT in CLAP mode)
- Pre-show health check works
- Performance Lock toggle blocks all file/destructive ops

### Related pages

- [v0.2](/docs/pit/roadmap/v0-2-core-engine/)
- [v0.4](/docs/pit/roadmap/v0-4-data-model-ui/)
- [Plugin Sandboxing](/docs/pit/reliability/plugin-crash-isolation/)
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/docs/pit/reliability/hot-plug/)
- [Sandboxing ADR](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0002-out-of-process-plugin-sandboxing.md)
- [CLAP ADR](/docs/pit/features/plugin-hosting/)

---

## v0.4 — Data model + UI

*Duration estimate: Weeks 13–18 (6 weeks)*

> The Stardust app proper. Show / Song / Patch hierarchy, cascading settings, full Edit Mode + Live Mode, MIDI Learn, three core widgets, cue system MVP.

**Duration estimate:** Weeks 13–18 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.3](/docs/pit/roadmap/v0-3-plugin-sandboxing-clap/) complete

### Goals

By the end of v0.4, Stardust is a working live-performance host. You can:
- Create a Show with multiple Songs, each with sequenced Patches
- Set up your MIDI rig once at Show level (cascading settings)
- Customize a Live Mode layout for the show
- Play through patches with a footswitch, with zero stuck notes
- MIDI Learn parameters interactively

This is when Stardust becomes recognizable as the app — not just an audio engine with a debug UI.

### What gets built

#### Show / Song / Patch data model

- Full data structures (see Data Model)
- JSON + binary blob serialization
- `.stardust-show` file format (zip bundle)
- Save / load / autosave
- Import / export with plugin validation

#### Cascading settings

- Show → Song → Patch override resolution
- Override UI affordance (●  indicator, right-click reset menu)
- Reset-to-layer with displayed values

See [Cascading Settings](/docs/pit/concepts/cascading-settings/) for the user-facing model.

#### Show Setup Wizard

Multi-step wizard for new shows:
1. Audio device + buffer + sample rate
2. MIDI input devices (with light-up indicator confirmation)
3. Channel routing
4. Device profiles
5. UI layout (start from template)
6. Master settings

#### Edit Mode

- Single workspace, two tabs: Patch + Layout
- VST chain editor with drag/drop
- Plugin parameter panels
- Built-in effects rack
- MIDI mapping table
- Cue editor (footswitch + MIDI-event triggers)
- Layout editor with widget drag/drop, grid snap

See [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/).

#### Live Mode

- Fully customizable layout from Edit Mode's Layout tab
- Touch-friendly, large-text, beautiful
- Show/Song/Patch labels, next-patch preview, patch list strip
- Visual keyboard with real-time notes
- Footswitch + expression pedal widgets
- VU meters, CPU+latency, MIDI activity
- Show notes pane (markdown)
- Parameter favorites (live-tweakable widgets)
- Panic button

See [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/) and Widget Registry.

#### Three core widgets

The MVP widget set:

- `<KeyboardWidget>` — 25/49/61/76/88 key configurable, real-time note display
- `<FootswitchWidget>` — N buttons configurable, per-switch label + action
- `<ExpressionPedalWidget>` — position bar, settings popup

Plus supporting widgets: VU meters, CPU/latency indicator, MIDI activity, patch list strip, notes pane, panic button.

See Widget Registry for the full catalogue and v0.4+ widgets.

#### MIDI Learn (full UI)

- Click any parameter's MIDI Learn button
- Modal: "Move a control..."
- Detected message displayed with source device, channel, CC/note
- Range capture, curve selection
- Auto-suggest based on device profile

See [MIDI Learn](/docs/pit/features/midi-learn/).

#### Device profile auto-detection

- USB device manufacturer/product ID matched against shipped profiles
- Auto-applies labels and pre-set mappings on plug-in
- v0.3 test devices + a handful of others (Nord Stage 3, Yamaha CP88, Kawai MP11SE)

See [Device Profiles](/docs/pit/features/device-profiles/).

#### Cue system (MVP)

- Footswitch advance/jump
- MIDI-event triggers (conductor's note, etc.)
- Per-Song cue list editor
- Min patch-advance interval debounce
- Roland-sustain-slot-as-footswitch handling (no multi-advance bug)

See [Cue System](/docs/pit/features/cue-system/).

#### Settings panels

- Audio panel (device, buffer, rate, routing, latency, test tones, meters)
- MIDI panel (devices, virtual ports, channel routing)
- Performance panel (thread priority, sandbox toggle, power plan)
- Plugins panel (scan folders, scan progress, quarantine list)
- General panel (theme, autosave, terminology)

See File Format for what gets persisted.

#### Performance Lock toggle

Full implementation per [Performance Lock](/docs/pit/reliability/performance-lock/).

### Linked features (first complete in v0.4)

- [Patch Sequencing](/docs/pit/features/patch-sequencing/)
- [MIDI Learn](/docs/pit/features/midi-learn/)
- [Device Profiles](/docs/pit/features/device-profiles/)
- [Cue System](/docs/pit/features/cue-system/)
- [Setlist Mode](/docs/pit/features/setlist-mode/)
- [Audio I/O](/docs/pit/features/audio-io/) (full settings panel)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)
- [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/)

### Exit criteria

v0.4 is done when:

- You can build a Show in Stardust with 5+ Songs, each with sequenced Patches
- Patches advance via footswitch with no stuck notes
- MIDI Learn works for keyboard + expression pedal + footswitches
- Cascading settings resolve correctly with visible overrides + reset
- Live Mode looks polished, large-text, touch-friendly
- Edit Mode lets you build a patch from scratch
- Performance Lock blocks edits during a show
- Cue system MVP works (footswitch + MIDI-event)
- Roland sustain-slot footswitch doesn't multi-advance

### Related pages

- [v0.3](/docs/pit/roadmap/v0-3-plugin-sandboxing-clap/)
- [v0.5](/docs/pit/roadmap/v0-5-mt-features/)
- [Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)
- [Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/)
- Widget Registry
- Screen Inventory
- Data Model
- File Format

---

## v0.5 — MT features

*Duration estimate: Weeks 19–24 (6 weeks)*

> The features that make Stardust genuinely useful for a musical theatre pit player.

**Duration estimate:** Weeks 19–24 (6 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.4](/docs/pit/roadmap/v0-4-data-model-ui/) complete

### Goals

By the end of v0.5, Stardust has everything a working MD or pit keyboardist needs to actually run a show — click track for tempo coordination, transpose for vocal-friendly key changes, integrated show notes, automatic page turns via forScore, the custom sampler for one-off sounds, and a complete device profile library.

### What gets built

#### Click track (per Song)

- Configurable BPM, time signature, count-in bars
- Audio output to a dedicated channel (often a "clicks-only" output for in-ear use)
- Visual indicator in Live Mode
- MIDI clock output (sync external sequencers / lighting)
- Tap-tempo footswitch assignment for live conductor follow

See [Click Track](/docs/pit/features/click-track/).

#### Show notes / lyrics / chord chart

- Per-Song markdown-rendered notes pane
- Per-Patch notes (smaller, contextual)
- Inline chord notation
- Font size + theme controls

See [Show Notes](/docs/pit/features/show-notes/).

#### Transpose

- Per-Song transpose in semitones
- Honors instrument range (warn if notes go below MIDI range)
- Different transpose per Patch within a Song (rare, but supported)

See [Transpose](/docs/pit/features/transpose/).

#### Patch-change MIDI output

- Configurable MIDI message sent on patch advance (Program Change, Note, CC)
- Per-patch override (one patch sends a specific message, others use default)
- Useful for:
  - **forScore page turns** (send PC or Note → forScore advances page)
  - **QLab cue triggers** (v0.5–v1.0 deeper integration)
  - **External sequencers / lighting consoles**

See [forScore Integration](/docs/pit/features/forscore-integration/).

#### Custom sampler

The v0.4-promoted "custom sound maker":
- Record live input or import audio file
- Auto-map across keyboard with pitch shifting
- Time-stretching options
- Save as Stardust-native sampler patch (uses SFZ format underneath for compatibility)

See [Custom Sampler](/docs/pit/features/custom-sampler/).

#### Setlist mode

- Define show order: Song 1 → Song 2 → ... → Bow
- Auto-advance through Songs (manual or footswitch)
- Free-jump to any Song
- "Up Next" display in Live Mode

See [Setlist Mode](/docs/pit/features/setlist-mode/).

#### Built-in effects (full implementation)

- 3-band EQ (configurable Q + frequency)
- Reverb (algorithmic + multi-preset)
- Compression (threshold, ratio, attack, release, makeup gain)
- Wired through `effects` module in Overture
- Per-patch insert chains

#### Full device profile library

Beyond v0.3's minimal set, ship profiles for:
- Roland RD-2000, RD-88, RD-08
- Nord Stage 3, Stage 4, Electro 6, Grand
- Yamaha Montage M, MODX, CP88, CK88
- Kawai MP11SE, MP7SE, VPC1
- Korg Kronos, Nautilus, SV-2
- Casio PX-S series
- Boss FS-5U, FS-6, FS-7
- Roland DP-10, DP-2, EV-5, EV-7
- M-Audio EX-P, Yamaha FC7, Moog EP-3
- iRig Blueboard, Behringer FCB1010, AirTurn (BT-105, BT500, Quad6)
- Akai MPK / MPD, NI Komplete Kontrol S, Arturia KeyLab, Novation Launchkey/Control

See [Device Profiles](/docs/pit/features/device-profiles/).

### Linked features

- [Click Track](/docs/pit/features/click-track/)
- [Show Notes](/docs/pit/features/show-notes/)
- [Transpose](/docs/pit/features/transpose/)
- [forScore Integration](/docs/pit/features/forscore-integration/)
- [Custom Sampler](/docs/pit/features/custom-sampler/)
- [Setlist Mode](/docs/pit/features/setlist-mode/)

### Exit criteria

v0.5 is done when:

- Click track plays per Song with correct tempo + visual indicator
- Transpose works correctly (audible pitch shift, no MIDI range errors)
- Show notes render per Song and per Patch
- forScore page-turns triggered by Stardust patch advance
- Custom sampler can record/import a sound and map it across the keyboard
- Setlist mode lets you walk through a complete Show
- Full device profile library shipping with the app

### Related pages

- [v0.4](/docs/pit/roadmap/v0-4-data-model-ui/)
- [v1.0](/docs/pit/roadmap/v1-0-public-release/)
- [Click Track](/docs/pit/features/click-track/)
- [Show Notes](/docs/pit/features/show-notes/)
- [Transpose](/docs/pit/features/transpose/)
- [Custom Sampler](/docs/pit/features/custom-sampler/)
- [forScore Integration](/docs/pit/features/forscore-integration/)
- [Setlist Mode](/docs/pit/features/setlist-mode/)
- [Device Profiles](/docs/pit/features/device-profiles/)

---

## v1.0 — Public release

*Duration estimate: Weeks 25–28 (4 weeks)*

> The public release. Cross-platform testing matrix, demo shows, open beta, public launch.

**Duration estimate:** Weeks 25–28 (4 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.5](/docs/pit/roadmap/v0-5-mt-features/) complete

### Goals

By the end of v1.0, Stardust 1.0 is publicly available. Real working musicians can download a stable build, program a real show, and use it on stage with confidence.

### What gets built

#### Cross-platform testing matrix

- macOS (Apple Silicon + Intel)
- Windows 10 + Windows 11
- Multiple audio interfaces tested (built-in, USB class-compliant, ASIO via Focusrite/MOTU/etc.)
- Multiple MIDI controllers tested
- Multiple plugin combinations tested
- Documented compatibility list

#### Demo shows

Five demo shows shipped with the app, all using free/public-domain content:

- **Pirates of Penzance** (G&S) — full G&S operetta
- **HMS Pinafore** (G&S)
- **Mikado** (G&S)
- **Original community show** — open call for an original composition
- **Tech demo show** — designed to showcase Stardust capabilities (cue system, multi-patch song, click, transpose)

All public-domain or community-contributed. No commercial musical theatre IP.

#### Documentation site

- `chasecondon.github.io/Stardust/` — polished docs site
- Getting Started guide (with screenshots)
- Feature walkthroughs (with GIFs)
- FAQ
- Troubleshooting common issues
- Download page with platform-specific instructions
- Compatibility matrix

#### Open beta program

- Invite 10-20 friendly MDs / keyboardists for closed beta
- Beta builds via GitHub Releases
- Discord channel for feedback
- 2-3 week beta window before public 1.0

#### Release infrastructure

- macOS signed + notarized installer (or DMG)
- Windows signed installer (or portable zip)
- Auto-update mechanism (v1.0 or 5?)
- Crash reporting (Sentry or similar, opt-in)
- Telemetry (anonymous, opt-in)
- Release notes process

#### Final polish

- Onboarding tour (first-run wizard + welcome tour)
- Performance profiling: ensure smooth on a 4-year-old laptop
- Accessibility audit: WCAG AA contrast, keyboard navigation
- Localized error messages (English MVP, structure for translation)
- Final brand assets (logo, marquee graphic, icon)

#### Community infrastructure

- Discord server (or alternative)
- GitHub Discussions enabled and organized
- Contributor docs polished
- Tutorial videos (3-5 short YouTube videos covering key concepts)

### Exit criteria

v1.0 is done when:

- A 1.0.0 build is publicly available on macOS and Windows
- The Pages site is live with full documentation
- 5 demo shows ship with the app
- Open beta feedback addressed (or triaged to post-1.0)
- Discord / community channels active
- Public release announcement made
- Build pipeline auto-publishes to GitHub Releases on tag

### What's explicitly NOT in 1.0

These are v2.0+:

- Marketplace
- AU plugin hosting (macOS)
- Mobile companion
- Multi-keyboardist LAN sync
- AI sound search
- Backing tracks
- Advanced cue system (MSC, OSC, QLab deep integration)

### Related pages

- [v0.5](/docs/pit/roadmap/v0-5-mt-features/)
- [v2.0+](/docs/pit/roadmap/v2-0-post-1-0/)
- [Roadmap](/docs/pit/roadmap/)
- Contributing

---

## v2.0+ — Post-1.0

*Status: ⚪ Planning only — no committed timelines*

> Everything that doesn't make 1.0. Major features that build on the 1.0 foundation.

**Status:** ⚪ Planning only — no committed timelines
**Prerequisite:** 1.0 released, community feedback collected

### Goals

v2.0+ is a backlog, not a sequential phase. Items are prioritized post-1.0 based on user demand and contributor interest. Each item links to its feature page; check those for current status.

### Community marketplace

[Full feature page](/docs/pit/features/marketplace/)

- Paid + free show sharing
- Show creators set pricing
- Lemon Squeezy (or Paddle) as Merchant of Record for tax compliance
- 15% platform commission
- License verification, account binding
- Verified creator badges

Beyond just shows, the marketplace handles device profile presets, UI layout presets, color theme presets, effect presets, patch presets, and sample packs.

### Community sharing (free hub)

[Full feature page](/docs/pit/features/community-sharing/)

- Free share hub for non-monetized content
- Same backend as marketplace, no payment gate
- Device profiles, layouts, themes, effect presets, patch presets

### AU plugin hosting (macOS)

[Full feature page](/docs/pit/features/au-hosting/)

- Audio Units (AU) plugin format
- Native Objective-C++ AU host module bridged to Rust
- macOS-only (no Windows equivalent)
- Significant work — full plugin format implementation

### Mobile companion

[Full feature page](/docs/pit/features/mobile-companion/)

- Phone/tablet remote control of desktop Stardust
- Tauri Mobile (iOS + Android)
- Patch browse, parameter tweak, show notes view
- Talks to desktop engine over LAN
- **Not** a mobile audio engine — that's a separate project beyond v2.0+

### Multi-keyboardist LAN sync

[Full feature page](/docs/pit/features/multi-keyboardist-sync/)

- Multiple Stardust instances on a LAN share Show/Song/Patch position
- Keys 1 advances and Keys 2's UI follows
- Useful for: multi-keyboardist shows, conductor-driven cue forwarding, hot-spare rig sync

### Hot-spare rig sync protocol

[Full feature page](/docs/pit/features/hot-spare-rig/)

- Primary + backup Stardust rigs wired in parallel
- Backup mirrors primary's current state (Show, Song, Patch position)
- Physical MIDI A/B switch (or software-controlled router) handles takeover
- Brodway MD-standard redundancy pattern

### Backing track playback

- Audio track import per Song (stems, click, guide tracks)
- Sync to internal click track
- Playback controls in Live Mode
- Cue points marking sections (Verse 1, Chorus, etc.)
- MIDI export of click for external sequencers

### Advanced cue system

Beyond MVP cue scope:
- **Timed cues** — "At 1:30 elapsed, advance patch"
- **Bar/beat cues** — "On bar 17, advance"
- **MIDI Show Control (MSC)** — industry-standard show coordination protocol
- **QLab deep integration** — bidirectional cue triggers via OSC + MIDI
- **Cue list timeline view** — visual editor showing all cues for a Song

### AI sound search

- "Find me a dark string sound with reverb"
- Search by description → recommend installed plugins + presets
- Search by reference audio (hum a tune → similar patches)
- ML backend trained on community-tagged patches

### Pure Rust VST3 SDK (long-term)

- Extract a pure Rust VST3 host SDK from Overture's C++ shim
- 3-6 months dedicated work for an experienced Rust audio engineer
- Becomes a side-effect of years of hosting real plugins
- Published as separate crate (`overture-vst3` or similar)

### More device profiles

- MainStage / Gig Performer migration wizard (import their `.concert` files)
- Custom device profile editor (currently only JSON)
- Community device profile sharing infrastructure

### Show analytics

- "You played Song 4's Patch 3 60% slower this week — practice it"
- Per-show metrics: time per Song, patches skipped, panic activations
- Useful for post-show review

### Practice mode

- Metronome + loop sections
- Slow-down for practice ("play this Song at 75%")
- Self-rehearsal tooling

### DMX / lighting integration

Originally on the wishlist but **dropped** — no MD interviewed needed this. Could be revisited if community demand emerges.

### Linux support

Originally post-1.0; depends on community demand. Most plugins don't have Linux versions, so the practical use is limited unless using JACK + plugins like Surge XT or Vital. Not a priority.

### Audio input rigs (guitar, bass, vocals, winds)

Pivot from "synth host" to "realtime performance graph engine." Add audio-input as a first-class source type alongside MIDI: route a guitar, bass, vocal, or wind instrument through plugin effects with the same Show / Song / Patch model as a keys rig. Theatre-first competitor to Helix-style pedalboards — cue-aware, song-structured, doubler-friendly (clarinet → flute → EWI, electric → upright, etc.). Hosts existing amp-sim ecosystems (NAM, Guitarix, AIDA-X, Neural DSP) rather than building its own.

Full design in [Audio input rigs](/docs/pit/features/audio-input/).

### Plugin bundles + one-click installer

Ship a curated set of theatre-ready open-source plugins out of the box, with optional downloadable packs (Synth Essentials, Guitar Pit Pack, Orchestral Toolkit, Mixing Essentials). The bundle infrastructure is the value, not the plugin count — schools, community theatre, and self-taught keyboardists get a working rig immediately instead of a Google search. Linked/discovery model for commercial plugins; auto-detect for already-installed system plugins.

Could start with a basic plugin browser in v0.5 and grow through v1.x. Full design in [Plugin bundles + installer](/docs/pit/features/plugin-bundles/).

### Related pages

- [Roadmap](/docs/pit/roadmap/)
- [v1.0](/docs/pit/roadmap/v1-0-public-release/)
- [Audio input rigs](/docs/pit/features/audio-input/)
- [Plugin bundles + installer](/docs/pit/features/plugin-bundles/)
- [Marketplace](/docs/pit/features/marketplace/)
- [Community Sharing](/docs/pit/features/community-sharing/)
- [AU Hosting](/docs/pit/features/au-hosting/)
- [Mobile Companion](/docs/pit/features/mobile-companion/)
- [Multi-keyboardist Sync](/docs/pit/features/multi-keyboardist-sync/)
- [Hot-spare Rig](/docs/pit/features/hot-spare-rig/)
