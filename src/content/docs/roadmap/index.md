---
title: "Roadmap"
description: "Stardust is built version by version, each milestone with a clear scope and exit criteria."
---

Stardust is built version by version, each milestone with a clear scope and exit criteria.

> [!NOTE]
> Versioning is intentionally release-shaped — v1.0 is the public release, not a separate "polish phase." Pre-1.0 work is the path to it; post-1.0 work is everything after.

## At a glance

| Version | Goal | Status |
|---|---|---|
| [v0.1 — Foundations](/roadmap/v0-1-foundations/) | Repos, wiki, Storybook scaffold, CI | 🟢 In progress |
| [v0.2 — Core Engine](/roadmap/v0-2-core-engine/) | Audio loop + VST3 hosting + basic UI | ⚪ Not started |
| [v0.3 — Plugin Sandboxing + CLAP](/roadmap/v0-3-plugin-sandboxing-clap/) | Plugin process isolation + CLAP support | ⚪ Not started |
| [v0.4 — Data Model + UI](/roadmap/v0-4-data-model-ui/) | Show/Song/Patch model + full Edit/Live UI | ⚪ Not started |
| [v0.5 — MT Features](/roadmap/v0-5-mt-features/) | Click, transpose, notes, sampler, forScore | ⚪ Not started |
| [v1.0 — Public Release](/roadmap/v1-0-public-release/) | Cross-platform release, demo shows, beta → 1.0 | ⚪ Not started |
| [v2.0+ — Post-1.0](/roadmap/v2-0-post-1-0/) | Marketplace, AU, mobile, multi-keys sync | ⚪ Not started |

Legend: 🟢 in progress · 🟡 partially complete · ⚪ not started · ✅ done

## Version-by-version summary

Each heading links to the dedicated milestone page with full detail.

### [v0.1 — Foundations](/roadmap/v0-1-foundations/)

Set up the project infrastructure. Both repos created and public on GitHub. README files, wiki, GitHub Pages site skeleton, Storybook bootstrap, CI on macOS and Windows.

**Deliverables:**

- `StardustMT/stardust-pit` and `StardustMT/stardust-core` repos
- Wiki (Stardust + Overture)
- GitHub Pages site (`chasecondon.github.io/Stardust/`)
- GitHub Project board for issue tracking
- Storybook with every UI screen, widget, and component stubbed
- Colour palette + theme tokens
- CI pipeline (build, test, lint on macOS + Windows)

### [v0.2 — Core Engine](/roadmap/v0-2-core-engine/)

Get audio working end to end. CPAL audio loop, midir MIDI input, a single VST3 plugin hosted in-process. Basic UI showing it works.

**Deliverables:**

- Audio passes through the engine to the speakers
- MIDI keyboard plays a VST3 plugin
- Lock-free UI ↔ audio command channel
- Voice tracking, panic key

**Linked features:**

- [Plugin Hosting (VST3)](/features/plugin-hosting/)
- [MIDI Learn (basic)](/features/midi-learn/)
- [Audio I/O Control](/features/audio-io/)

### [v0.3 — Plugin Sandboxing + CLAP](/roadmap/v0-3-plugin-sandboxing-clap/)

Make the engine reliable. Out-of-process plugin sandboxing, watchdog, CLAP support, hot-plug resilience, pre-show validation, soak tests.

> [!IMPORTANT]
> This is the version where Stardust becomes safe to put in front of an audience. Without sandboxing, a single buggy plugin can still take the host down.

**Deliverables:**

- Plugin crashes don't kill the app
- 4-hour CI soak test passes on both platforms
- CLAP plugins hostable alongside VST3
- USB hot-plug recovers gracefully

**Linked features:**

- [Plugin Hosting (sandboxed)](/features/plugin-hosting/)
- [Plugin Crash Isolation](/reliability/plugin-crash-isolation/)
- [Hot-Plug Resilience](/reliability/hot-plug/)
- [Pre-Show Validation](/reliability/pre-show-validation/)

### [v0.4 — Data Model + UI](/roadmap/v0-4-data-model-ui/)

The Stardust app proper. Show / Song / Patch data model with cascading settings. Full Edit Mode + Live Mode. Three core widgets (keyboard, footswitch, expression pedal). MIDI Learn flow with device-profile auto-population. Cue system MVP.

**Deliverables:**

- A working Show with multiple Songs, each with sequenced Patches
- Edit Mode (Patch + Layout tabs)
- Live Mode (customisable)
- Performance Lock toggle

**Linked features:**

- [Patch Sequencing](/features/patch-sequencing/)
- [MIDI Learn (full)](/features/midi-learn/)
- [Device Profiles](/features/device-profiles/)
- [Cue System](/features/cue-system/)
- [Setlist Mode](/features/setlist-mode/)
- [Cascading Settings](/concepts/cascading-settings/)
- [Edit Mode vs Live Mode](/concepts/edit-vs-live/)

### [v0.5 — MT Features](/roadmap/v0-5-mt-features/)

The feature set that makes Stardust genuinely useful for a musical-theatre pit player.

**Linked features:**

- [Click Track](/features/click-track/)
- [Show Notes & Lyrics](/features/show-notes/)
- [Transpose](/features/transpose/)
- [forScore Integration](/features/forscore-integration/)
- [Custom Sampler](/features/custom-sampler/)

Plus built-in effects (EQ, reverb, compression) and the first wave of device-profile templates (RD-2000, Nord Stage 3, Yamaha Montage, Kawai MP11SE, etc.).

### [v1.0 — Public Release](/roadmap/v1-0-public-release/)

The public release. Cross-platform testing matrix, demo shows on public-domain musicals (Pirates of Penzance, Mikado, HMS Pinafore), open beta with friendly MDs, then 1.0.

**Deliverables:**

- 1.0 build available for download on macOS and Windows
- Documentation site live
- 5+ demo shows shipped
- Community Discord / discussions active

### [v2.0+ — Post-1.0](/roadmap/v2-0-post-1-0/)

Everything that doesn't make 1.0. No strict ordering yet.

- [Marketplace](/features/marketplace/) (paid show sharing, Lemon Squeezy MoR)
- [Community Sharing](/features/community-sharing/) (free presets, themes, layouts, profiles)
- [AU Plugin Hosting](/features/au-hosting/) (macOS)
- [Mobile Companion](/features/mobile-companion/) (Tauri Mobile remote, not engine)
- [Multi-keyboardist Sync](/features/multi-keyboardist-sync/)
- [Hot-spare Rig Sync Protocol](/features/hot-spare-rig/)
- AI sound search
- Backing tracks
- Advanced cue system (MSC, OSC, QLab integration)
- Pure Rust VST3 SDK extraction from Overture (long-term)

---

## How versions interact

Each version builds on the previous. Some features touch multiple versions — Plugin Hosting starts in v0.2, gains sandboxing and CLAP in v0.3, gains UI polish in v0.4. Per-version pages note where a feature first appears versus where it's considered complete.

## Related pages

- [Home](/)
- [Architecture Overview](/architecture/overview/)
- [Comparison](/comparison/)
