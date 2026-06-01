---
title: "Locked decisions"
description: "The architectural and product decisions that are baked in. Don't re-litigate without an explicit reopen. Each links to the deep doc or ADR that owns it."
---

These are the locked decisions behind Pit's design — collected here so a contributor (or future-you) can see the shape of the project without trawling old planning conversations. Each links to where the decision actually lives (a feature page, a concept doc, or an ADR).

> Don't re-litigate any of these casually. If a decision genuinely needs reopening, propose it explicitly — preferably with a new ADR — and update this page when it resolves.

## Engine + audio

- **CLAP only for plugins** in v1.0; VST3 + AU as v1.x or v2.0 — see [Plugin hosting](/docs/pit/features/plugin-hosting/)
- **First-party Rust SDKs for VST3 + AU** are v2.0+ initiatives
- **Plugin sandboxing (out-of-process)** is a hard requirement — currently violated, scheduled v0.7.0 — [ADR-0002](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0002-out-of-process-plugin-sandboxing.md)
- **Realtime paths allocation-free** — see [Engine architecture](/docs/pit/architecture/engine/) and CLAUDE.md
- **Engine consumes whole patch graph** — `Plan::build` → topo-sort → allocation-free `Plan::process` per block — [ADR-0006](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0006-engine-graph-walker.md), Accepted
- **Audio I/O on Windows**: ASIO default when a vendor driver is detected AND input + output are the same device; WASAPI Exclusive default otherwise (including any split-I/O configuration — ASIO is single-device by design). WASAPI Shared as fallback when Exclusive fails. macOS uses CoreAudio. Linux uses ALSA → JACK → PipeWire fallback. Separate input/output devices fully supported via WASAPI — see [Latency budget](/docs/pit/reliability/latency-budget/) *(default flipped from "WASAPI Exclusive first" — refined 2026-05-28 during v0.6.0 refinement of [#8](https://github.com/StardustMT/stardust-pit/issues/8))*
- **No VST2 support, ever** — Steinberg deprecated 2018, SDK not available to new licensees
- **Sine synth → `instrument.testtone`** — hidden from catalog, diagnostic-only. Default built-in instrument becomes the bundled GM piano SFZ in v0.14.0
- **Native SFZ player as graph node**, not standalone CLAP (sforzando exists for users wanting CLAP) — see v0.14.0 roadmap
- **Bundled GM piano SFZ** (~3 MB) in install bundle so first-launch isn't silent

## Data model

- **All patches are references to library entries** (no inline-vs-ref dichotomy). Library entries have `scope: "show" | "global"`. Show file bundles snapshots of global entries on share — see [Patch library](/docs/pit/features/patch-library/)
- **Orphan handling**: deleted library entry → refs freeze the last graph as `orphan.snapshot`, banner + reattach/save-new/keep options
- **Patch reference overrides**: Basic (name, notes, tempo, transpose, trim, color, tags) + Advanced (MIDI channel offset, bus routing, plugin params, FX bypass, on-enter/exit triggers, custom CSS). Tempo override = Advanced.
- **Graph edits to shared patches** trigger merge UI with per-instance update/keep/three-way-merge dialog
- **Show metadata** structured as Production (this run) / Source (the work) / Distribution (sharing). Source includes Productions list for revivals — see [Show metadata model](/docs/pit/concepts/show-metadata/)
- **Schema-versioned everything** — [ADR-0003](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0003-schema-versioning.md)
- **All shipping data formats use semver** with explicit migration paths

## File format

- **`.stardustshow/` bundle** (folder with extension) — not single JSON. Contains `show.json`, `libraries/`, `assets/audio`, `assets/images`, `assets/samples`, `thumbnails/`. Opt-in zip export for sharing — see [Patch library](/docs/pit/features/patch-library/) and [Backing tracks](/docs/pit/features/backing-tracks/)
- Migration scheduled v0.13.0 (when backing tracks force the issue anyway)

## UI shell

- **Three modes: Setup / Program / Perform** — see [concept doc](/docs/pit/concepts/setup-program-perform/)
- **Settings is a floating Window**, not a fourth mode
- **Plugin GUIs dock in the bottom panel of the patch editor by default**, with per-plugin pop-out to a floating Window. User's dock-vs-float preference persists per plugin instance — see [Plugin hosting](/docs/pit/features/plugin-hosting/) *(decision reversed from earlier "floating only" — refined 2026-05-28 during v0.6.0 refinement of [#6](https://github.com/StardustMT/stardust-pit/issues/6))*
- **New Show wizard is a Modal** — see [New Show wizard](/docs/pit/features/new-show-wizard/)
- **Splash is pre-shell screen** (separate from the three modes)
- **Native menu bar** for File/Edit/View/Window/Help — mode switches are NOT in the menu bar
- **Song page renders in patch-canvas area** when a song is selected in outline (tabs: Settings / Click / Backing / Patches)
- **No hard-forced Live widgets** — user places everything; layout templates seed sensible starting layouts
- **Confirm-patch-changes-during-Live**: default off (MainStage style instant), opt-in confirm available
- **Layout**: global default + per-song override (cascading)

## Widget customization

- **Every widget has a config inspector**; detailed specs refined in v0.11.0 spec session — see [Widget catalog](/docs/pit/widgets/)
- **MIDI widgets reactive in Live** (keys/pads/wheels/pedals reflect hardware state)
- **Conductor cam**: USB webcam only v1.0; RTSP/NDI/virtual-webcam v2.0+ — see [Conductor cam](/docs/pit/features/conductor-cam/)
- **Engine monitor**: includes CPU/RAM/xrun/peak/MIDI activity/plugin status/crash count/latency/uptime. Excludes thermal pressure + raw temp (cross-platform fragility) — see [Engine monitor](/docs/pit/features/engine-monitor/)
- **Clock widget**: pause + splits (manual / auto-from-songs / auto-from-cuepoints)

## Click track + transport + backing tracks

- **Click track editor: no bake step** — data-driven, always-live — see [Click track editor](/docs/pit/features/click-track-editor/)
- **SMF Type 1 export/import** for DAW interop (tempo + bar markers + cue points; vamps/repeats via our marker naming)
- **Tempo per song + per bar** (no master-show BPM)
- **Backing tracks decouple from patches** — tracks on songs, transport independent, patches optionally interact — see [Backing tracks](/docs/pit/features/backing-tracks/)
- **Vamp interaction**: vamp regions in click track; transport loops; footswitch signals end-of-vamp
- **MIDI clock sync**: song-level (not per-track)
- **MIDI recording + audio bounce** in v0.13.0; **piano roll editor** in v1.x

## Balance tool

- **LUFS via `ebur128`** crate — see [Balance tool](/docs/pit/features/balance-tool/)
- **Offline render** (silent measurement)
- **Velocity-normalized at v80** for v1.0; **velocity-curve at v40/v80/v120** for v1.x
- **True Peak + LRA + Integrated LUFS** reported per patch

## Plugin missing handling

- **Warning icons** on patch name + plugin node + greyed-out missing node
- **"Find this plugin"** link via CLAP `plugin.url` metadata
- **Graph node never removed** when plugin missing — preserved for when plugin returns
- **Show plugin requirements** auto-computed and surfaced in pre-show validation (v0.8.0)

## Extension API

- **Hybrid TypeScript + WASM** for v0.15.0 — TS for UI/importers/commands, WASM for compute-heavy — see [Extension API](/docs/pit/features/extension-api/)
- **Realtime WASM extensions** v2.0+
- **Sandboxed by default** — no native module plugins
- **Stream Deck support** ships as bundled example extension

## Sync + ecosystem (post-v1.0)

- **CRDT (Automerge) for sync + collaboration** — works offline, P2P-capable, server-optional — see [Marketplace architecture](/docs/ecosystem/marketplace-architecture/)
- **Local-first non-negotiable** — every cloud feature is additive, never gates the app
- **MoR for payments**: Lemon Squeezy or Polar.sh (do not build payment infra from scratch)
- **Self-hostable marketplace server** — open source aligns with AGPL ethos
- **No mandatory accounts ever** — anonymous downloads stay available
- **Cloud provider stack** (provisional): Cloudflare R2 + Fly.io + Neon Postgres + Clerk/Ory + Plausible + GlitchTip — see [Infrastructure choices](/docs/ecosystem/infrastructure-choices/). Architecture is provider-agnostic; can swap to AWS/GCP if needed.

## Tooling

- **Bun, not npm** for stardust-pit (uses `@tauri-apps/cli` JS, not `cargo-tauri`)
- **GitHub Projects v2** for kanban tracking — https://github.com/orgs/StardustMT/projects/1
- **GitHub Actions** for CI (basic PR CI in v0.6.0, soak tests in v0.7.0, visual regression in v0.10.0, release pipeline in v0.15.0)
- **No `Co-Authored-By: Claude`** footer in commits. Ever.
- **Storybook stays as design-iteration surface** — real screens in `src/src/screens/*.tsx`, `.stories.tsx` wraps with fixture data
- **Storybook-first for UI features** — CLAUDE.md rule
- **Placeholder icons** in `stardust-pit/src-tauri/icons/` — don't touch until real branding
- **Pre-feature refinement + post-feature review sessions** per CLAUDE.md
- **Accessibility is a hard requirement** — WCAG 2.2 AA, full keyboard nav, screen reader, focus indicators, reduced-motion

## Crate organization

- **Stay flat Cargo workspace** — group by naming convention (`stardust-audio-*` etc.). Revisit if past ~15 crates — [ADR-0008](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0008-crate-organization.md)

## What's NOT in v1.0

- AU plugin hosting (tentatively v1.0 if scope allows; defer otherwise)
- Multi-channel audio input via Dante/AVB (USB multitrack only)
- Cloud sync, marketplace, collaboration (all v2.0+)
- Sheets app (post-Pit-v1)
- Piano roll editor (v1.x or v2.0)
- Pure-Rust VST3 host (v1.x with C++ shim is fine; pure-Rust is v2.0)
- Realtime WASM extensions (v2.0+)
- IP/RTSP/NDI conductor cam (v2.0+)
- DMX / lighting (revisit if Show Control unlocks demand)
- Velocity-curve balance (v0.12.0 does velocity-normalized; curve in v1.x)
- Show Control as full theatre brain (v2.0+) — see [Show Control vision](/docs/pit/features/show-control/)
- Full DAW MIDI import (v1.x or v2.0)

## Related

- [Pit roadmap](/docs/pit/roadmap/) — what ships and in what order
- [ADRs](https://github.com/StardustMT/stardust-workspace/tree/main/docs/adr) — fully-argued decision records
