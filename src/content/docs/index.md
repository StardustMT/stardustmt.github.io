---
title: "Stardust Wiki"
description: "This wiki is the central reference for Stardust — feature pages, architecture, design decisions, the roadmap, and background reading for contributors."
---

> Open-source, cross-platform virtual instrument host for live performance — a free alternative to industry staples like MainStage and Gig Performer.

This wiki is the central reference for Stardust — feature pages, architecture, design decisions, the roadmap, and background reading for contributors.

---

## 🎬 Start here

New to the project? These pages give you the full picture:

| Page | What it covers |
|---|---|
| [Shows, Songs, and Patches](/concepts/shows-songs-patches/) | The core mental model — how Stardust organizes a show |
| [Cascading Settings](/concepts/cascading-settings/) | Set up your rig once, override only where you need to |
| [Edit Mode vs Live Mode](/concepts/edit-vs-live/) | The two ways you'll use the app |
| [Architecture Overview](/architecture/overview/) | How the pieces fit together under the hood |
| [Roadmap](/roadmap/) | What's built, what's next, what's after that |
| [Comparison](/comparison/) | Stardust vs. other live-performance hosts |

---

## 🎹 Features

The full list of what Stardust does (or will do). Each links to a detailed page.

### Core (MVP)

- [Plugin Hosting (VST3 + CLAP)](/features/plugin-hosting/)
- [Patch Sequencing](/features/patch-sequencing/)
- [MIDI Learn](/features/midi-learn/)
- [Device Profiles](/features/device-profiles/)
- [Cue System](/features/cue-system/)
- [Click Track](/features/click-track/)
- [Show Notes & Lyrics](/features/show-notes/)
- [Transpose](/features/transpose/)
- [Setlist Mode](/features/setlist-mode/)
- [forScore Integration](/features/forscore-integration/)
- [Hot-spare Rig](/features/hot-spare-rig/)
- [Audio I/O Control](/features/audio-io/)

### v0.4+

- [Custom Sampler](/features/custom-sampler/) (v0.4)
- [Community Sharing](/features/community-sharing/) (v0.5)
- [Marketplace](/features/marketplace/) (v1.0)
- [AU Plugin Hosting](/features/au-hosting/) (v2.0+)
- [Mobile Companion](/features/mobile-companion/) (v2.0+)
- [Multi-keyboardist Sync](/features/multi-keyboardist-sync/) (v2.0+)

---

## 🏗️ Architecture

- [Architecture Overview](/architecture/overview/) — the whole stack in one page
- [Tauri + Rust + React](/architecture/tauri-stack/)
- **Plugin Sandboxing (out-of-process)** <!-- TODO: dead wiki link to 'Architecture: Plugin Sandboxing' -->
- **Real-Time Audio** <!-- TODO: dead wiki link to 'Architecture: Real-Time Audio' -->
- **Data Model** <!-- TODO: dead wiki link to 'Architecture: Data Model' -->
- **Show File Format** <!-- TODO: dead wiki link to 'Architecture: File Format' -->
- **Overture (sibling library)** <!-- TODO: dead wiki link to 'Architecture: Overture Library' -->

---

## 🛡️ Reliability & Performance

- [Latency Budget](/reliability/latency-budget/)
- [Plugin Crash Isolation](/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/reliability/hot-plug/)
- [Pre-Show Validation](/reliability/pre-show-validation/)
- [Performance Lock Mode](/reliability/performance-lock/)
- [Voice Tracking & Panic Handling](/reliability/voice-tracking/)

---

## 🎨 UI System

- **Screen Inventory** <!-- TODO: dead wiki link to 'UI: Screen Inventory' --> — every screen in the app
- **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' --> — Live Mode widgets
- **Theme System & Customization** <!-- TODO: dead wiki link to 'UI: Theme System' -->

---

## 📜 Decisions (ADRs)

Why we made the choices we did:

- **ADR: Why Rust + Tauri** <!-- TODO: dead wiki link to 'ADR: Why Rust + Tauri' -->
- **ADR: License Split (GPL + Apache)** <!-- TODO: dead wiki link to 'ADR: License Split (GPL + Apache)' -->
- **ADR: Plugin Sandboxing Approach** <!-- TODO: dead wiki link to 'ADR: Plugin Sandboxing Approach' -->
- **ADR: VST3 C++ Shim** <!-- TODO: dead wiki link to 'ADR: VST3 C++ Shim' -->
- **ADR: CLAP Support** <!-- TODO: dead wiki link to 'ADR: CLAP Support' -->
- **ADR: Show / Song / Patch Hierarchy** <!-- TODO: dead wiki link to 'ADR: Show / Song / Patch Hierarchy' -->

---

## 🗺️ Roadmap

See the **[Roadmap](/roadmap/)** for the full timeline. Per-phase pages:

- [v0.1 Foundations](/roadmap/v0-1-foundations/) — repos, wiki, Storybook, CI
- [v0.2 Core Engine](/roadmap/v0-2-core-engine/) — CPAL + midir + VST3 hosting
- [v0.3 Plugin Sandboxing + CLAP](/roadmap/v0-3-plugin-sandboxing-clap/) — process isolation, plugin failure recovery
- [v0.4 Data Model + UI](/roadmap/v0-4-data-model-ui/) — Show/Song/Patch, Edit + Live modes
- [v0.5 MT Features](/roadmap/v0-5-mt-features/) — click, transpose, notes, sampler
- [v1.0 Public Release](/roadmap/v1-0-public-release/) — the public release
- [v2.0 Post-1.0](/roadmap/v2-0-post-1-0/) — marketplace, AU, mobile, multi-keys sync

---

## 🧑‍💻 Contributing

- **Contributing** <!-- TODO: dead wiki link to 'Contributing' --> — how to help
- **Dev Setup** <!-- TODO: dead wiki link to 'Dev Setup' --> — getting a build going locally
- **Code of Conduct** <!-- TODO: dead wiki link to 'Code of Conduct' -->

---

## 📖 Learning Materials

Background for understanding the codebase:

- **Real-Time Audio Constraints** <!-- TODO: dead wiki link to 'Learning: Real-Time Audio' -->
- **VST3 Plugin Model** <!-- TODO: dead wiki link to 'Learning: VST3 Plugin Model' -->
- **MIDI Internals** <!-- TODO: dead wiki link to 'Learning: MIDI Internals' -->
- **Lock-Free Programming Patterns** <!-- TODO: dead wiki link to 'Learning: Lock-Free Programming' -->

---

## 🔗 External Links

- [Stardust repo](https://github.com/StardustMT/stardust-pit)
- [Overture (audio library) repo](https://github.com/StardustMT/stardust-core)
- [Project site (GitHub Pages)](https://chasecondon.github.io/Stardust/)
- [Issues](https://github.com/StardustMT/stardust-pit/issues)
- [Discussions](https://github.com/StardustMT/stardust-pit/discussions)
