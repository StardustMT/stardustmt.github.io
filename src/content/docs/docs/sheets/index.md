---
title: Stardust Sheets docs
description: Design intent for Stardust Sheets — a production-aware score and script library with semantic overlays on PDFs.
---

> [!NOTE]
> Sheets is **planned post-Pit v1.0**. There is no shipping product yet, no code, and no firm timeline. This page captures the design philosophy and the day-one decisions so the direction is legible.

For the product overview, see **[Stardust Sheets](/sheets/)**.

## What Sheets is

Sheets is a production-aware score and script library. PDFs are the visual ground truth; Stardust adds **semantic overlays** that make them navigable, annotatable, and shareable across a production.

The shape of the product is closer to **forScore + production-aware metadata** than to a notation editor. Notation tools like MuseScore, Sibelius, and Dorico already exist and are excellent at their job. Sheets is for the layer above — the layer where a musician needs to find page 4 measure 57 fast, jump to the second coda, and have those anchors survive a PDF being re-engraved during tech.

## Why not full OMR (optical music recognition)?

Full OMR is a multi-decade research problem. The path from "scanned PDF" to "fully structured musical document with every note and dynamic captured" is long, expensive, and brittle. Every commercial OMR tool today produces output that needs significant cleanup.

Sheets sidesteps this by treating PDFs as opaque visual assets and only capturing the **navigation-relevant** semantics: measure positions, rehearsal marks, codas, vamp ranges, cue points. These are achievable with manual annotation + assisted detection (e.g., layout-aware ML for measure bounding boxes), and they're enough to enable the workflows musicians actually need.

A future iteration may add CV-assisted layout detection, but that's an enhancement to the same semantic-overlay model — not a different product.

## Core decisions (provisional)

These are the day-one decisions baked into the design. They'll be promoted to ADRs in the workspace once Sheets development starts.

### PDFs stay the source of truth

The PDF is what the musician sees. Sheets does not re-render music. Sheets does not modify PDFs (annotations live in separate layers). If a publisher updates a score, the new PDF drops in and the overlays migrate.

### Semantic overlays are geometric

Each anchor (measure, rehearsal mark, coda, vamp marker) carries page + bounding-box coordinates in a normalized PDF coordinate space, plus its semantic label. This lets overlays be:

- displayed visually on the PDF (highlighted measure)
- targeted programmatically (jump to measure 57)
- migrated across PDF reflows with reasonable fidelity

### Annotation layers are stacked, not merged

Personal markup, production markup, MD markup live in separate layers that compose visually. A performer sees their personal notes on top of production-distributed bowings on top of the conductor's annotations on top of the publisher PDF. Layers can be toggled, exported, shared.

### Production-aware library

The library knows what production a score belongs to, what role uses it, what version is current. A production update pushes updated PDFs + updated semantic anchors to everyone subscribed, while their personal annotations stay intact.

### Local-first

A musician on a tour bus with no signal has a working app, full library, full annotations. Production sync is additive.

### Cross-platform

iPad-first as a reader (where most performance actually happens), but Windows + macOS as full-fat editors. Linux for the same reasons as Pit: people use it, it shouldn't be a second-class citizen.

## What Sheets is NOT

- Not a notation editor
- Not a replacement for MuseScore / Sibelius / Dorico
- Not full OMR
- Not iPad-only (forScore is good; we should not just clone it)
- Not subscription-locked
- Not cloud-required

## When it starts

After Pit ships 1.0. Splitting focus before Pit is done risks shipping two half-products. The full design discussion happens then; this page is the placeholder that says *the direction is decided, the work isn't started.*

For the bigger ecosystem picture — where Sheets fits relative to Pit and to the speculative future apps — see the [ecosystem vision](/docs/ecosystem/vision/) and [ecosystem roadmap](/docs/ecosystem/roadmap/).
