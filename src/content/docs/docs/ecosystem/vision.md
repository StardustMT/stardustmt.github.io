---
title: Vision
description: The long-horizon framing for Stardust — a platform for theatre tooling rather than a single product.
---

Stardust starts as a virtual instrument host for keyboardists. That's because keyboardists in musical theatre have a concrete, painful, well-defined problem: the dominant tool for the job (MainStage) is closed-source, macOS-only, and unreliable in ways that have ended performances. That's a real wedge — one product, one audience, one clear shot at being meaningfully better.

But the bigger framing is **a platform for theatre tooling**, because the same patterns repeat across theatre roles:

- A keyboardist needs reliable patch management mid-show. *(Pit)*
- A musician needs annotated, production-aware scores that survive a tour. *(Sheets)*
- A music director needs all of the above plus rehearsal coordination, casting changes, version control across performers. *(future)*
- A stage manager needs cue tracking, comm, scene management. *(future)*
- A lighting designer needs DMX / Art-Net / sACN integration without a $50k console. *(future)*

These are different products for different users, but they share infrastructure: the same data formats for productions, the same understanding of how a Show / Song / Patch / Cue relates to a script and a score, the same local-first commitment, the same theatre vocabulary.

## Why a platform, not a product family

A platform earns its keep in three places:

1. **Shared schemas.** A Show file authored in Pit should be readable by Sheets when it comes time to align music with script. If every app invents its own data model, the integration cost compounds forever.
2. **Shared protocols.** MIDI, OSC, DMX, and show-control protocols already have abstractions in `stardust-core`. New apps consume those abstractions, not raw protocols.
3. **Shared philosophy.** Every Stardust product should feel like a Stardust product: theatre-vocabulary, local-first, reliable, opinionated, no enterprise bloat. That's not enforced by code; it's enforced by a clear principle set and a willingness to say no.

See **[Principles](/docs/ecosystem/principles/)** for the rules every Stardust product is built against.

## What's actually planned vs speculated

This matters because ecosystem-flavored projects tend to overreach. The Stardust position:

- **In active development:** [Stardust Pit](/docs/pit/) — the virtual instrument host. Pre-1.0.
- **Planned next:** [Stardust Sheets](/docs/sheets/) — production-aware score and script library. Development starts after Pit ships.
- **Speculative, named so the direction is visible:**
  - *Stardust Rehearse* — schedules, distributed materials, rehearsal notes, cast coordination
  - *Stardust Produce* — creative pre-production: blocking, staging, design collaboration
  - *Stardust Stage* — stage management runtime: cues, comm, reports
  - *Stardust Lighting* — DMX / Art-Net / sACN runtime
  - *Stardust Galaxy* — optional cloud sync, marketplace, community sharing

The speculative apps are named to make the ecosystem direction legible, not to commit to building them. Each will be evaluated on its own merits when (if) Pit and Sheets earn an audience that wants more.

## What the platform is NOT

- **Not enterprise theatre ERP software.** If a feature only makes sense for a 50-person production company, it doesn't ship.
- **Not cloud-required.** Galaxy is additive. Every workflow must function without a network.
- **Not subscription-locked.** Apps are commercial products, but they're perpetual licenses, not SaaS.
- **Not a competitor to notation software.** Sheets layers semantics on PDFs; it doesn't try to replace MuseScore or Sibelius.
- **Not a generic music tool.** Theatre workflows over generic workflows. Vamps, codas, transposition, cascading settings are first-class, not accommodations.

These constraints make the platform smaller in scope but cohesive in shape. The point isn't to build everything for theatre; it's to build a few things really well that all feel like they belong together.
