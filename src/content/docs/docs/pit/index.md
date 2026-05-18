---
title: Stardust Pit docs
description: Concepts, architecture, features, reliability, and version roadmap for Stardust Pit.
---

Documentation for **Stardust Pit** — the virtual instrument host for musical theatre keyboardists. If you're looking for the marketing/product overview, that's at **[Stardust Pit](/pit/)**. This section is the reference: concepts, architecture, every feature, every reliability commitment, and the full version-by-version roadmap.

## Where to start

If you're trying to understand Pit:

- **[Shows, Songs, and Patches](/docs/pit/concepts/shows-songs-patches/)** — the core mental model. The vocabulary every page assumes.
- **[Cascading settings](/docs/pit/concepts/cascading-settings/)** — set up your rig once, override only where you need to.
- **[Edit Mode vs Live Mode](/docs/pit/concepts/edit-vs-live/)** — the two modes you'll use the app in.
- **[Architecture Overview](/docs/pit/architecture/overview/)** — how the pieces fit together under the hood.

If you're sizing Pit against the alternatives:

- **[Comparison](/docs/pit/comparison/)** — Pit vs MainStage, Gig Performer, Cantabile, Camelot Pro, and others.

If you're tracking development:

- **[Pit roadmap](/docs/pit/roadmap/)** — version-by-version milestones with exit criteria. Current focus: v0.1 Foundations.

## What's in this section

| Section | Pages | What's there |
|---|---|---|
| [Concepts](/docs/pit/concepts/shows-songs-patches/) | 3 | Shows / Songs / Patches model, cascading settings, Edit vs Live |
| [Architecture](/docs/pit/architecture/overview/) | 2 | System overview, Tauri + Rust + React stack |
| [Reliability](/docs/pit/reliability/latency-budget/) | 6 | The properties that make Pit usable mid-show |
| [Features](/docs/pit/features/plugin-hosting/) | 18 | Every feature, current and planned, with status |
| [Roadmap](/docs/pit/roadmap/) | 1 page | Versions v0.1 through v2.0+ on a single consolidated page |
| [Comparison](/docs/pit/comparison/) | 1 | Feature table vs other live-performance hosts |

## Reliability is the point

Live performance has different failure modes than studio work. A plugin crash mid-show ends the night. Stardust takes this seriously:

- **[Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)** — plugins run out-of-process; a crashing plugin can't take down the host
- **[Latency Budget](/docs/pit/reliability/latency-budget/)** — keeping the audio chain tight
- **[Pre-Show Validation](/docs/pit/reliability/pre-show-validation/)** — catch problems before going live
- **[Performance Lock](/docs/pit/reliability/performance-lock/)** — disable destructive operations during a show

The full reliability story is its own [section](/docs/pit/reliability/latency-budget/).
