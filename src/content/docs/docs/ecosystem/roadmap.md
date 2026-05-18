---
title: Ecosystem roadmap
description: Where Stardust is going at the platform level — Pit's path to 1.0, Sheets after that, and the speculative apps named so the direction is visible.
---

> [!NOTE]
> This page describes the **ecosystem-wide** trajectory. For the version-by-version Pit roadmap with exit criteria per release, see [Pit roadmap](/docs/pit/roadmap/).

## Where we are

| Layer | Status |
|---|---|
| **Stardust Pit** | 🟢 In active development — v0.1 Foundations |
| **Stardust Sheets** | ⚪ Design intent only — starts post-Pit v1 |
| **`stardust-core` shared library** | 🟢 Cargo workspace scaffolded, MPL 2.0, no implementation yet |
| **`stardust-workspace` meta-repo** | ✅ Set up with ADRs, justfile, scripts, CLAUDE.md |
| **`stardust-site` (this site)** | ✅ Live |
| Speculative future apps | ⚪ Named, not built |

## Trajectory

```
Now ──── Pit v0.x ──── Pit v1.0 ──── Sheets v0.x ──── Sheets v1.0 ──── (eval ecosystem expansion)
```

Two products earning their audience is the gate. The rest of the ecosystem is sized — and only built — based on whether Pit and Sheets land.

### Phase 1 — Pit reaches public release (~now → v1.0)

Build Pit until it's reliable enough to use as a daily driver in a professional pit. The version-by-version plan is on the [Pit roadmap](/docs/pit/roadmap/); the headline arc is:

- **v0.1 Foundations** *(current)* — repos, wiki → docs migration, Storybook screens, ADR system
- **v0.2 Vertical slice** — minimum Pit + minimum stardust-core working in tandem
- **v0.3 Plugin sandboxing + CLAP** — out-of-process plugins, hot-plug resilience
- **v0.4 Data model + UI** — Show / Song / Patch with the full Edit and Live modes
- **v0.5 MT features** — click track, transpose, notes, custom sampler, forScore integration
- **v1.0 Public release** — cross-platform testing matrix, demo shows, public launch

The 1.0 release is the goal. Versions are framed as a release schedule, not as "phases" — every version is a real release with exit criteria, not a planning convenience.

### Phase 2 — Sheets starts (post-Pit v1.0)

Sheets is a substantial second product, deliberately not started until Pit is shipping and stable. The general arc:

- Define the semantic overlay format and migration story
- Build the iPad-first reader experience
- Add the Windows + macOS editors
- Production-aware library + distribution
- v1.0 when Sheets can replace forScore for a working musical theatre pit player

See [Sheets design intent](/docs/sheets/) for the day-one philosophy.

### Phase 3+ — Ecosystem expansion (speculative)

If Pit and Sheets find their audience, the platform expands. The candidate apps are named so the direction is visible — none are committed.

- **Stardust Rehearse** — production participant companion: schedules, distributed materials, rehearsal notes, cast coordination. Mobile-first.
- **Stardust Produce** — creative production collaboration: blocking, staging, design collaboration, scene planning. Consumes content from a future Write / Compose / Arrange family.
- **Stardust Stage** — stage management runtime: backstage operations, cue tracking, show running, reports, comm. Distinct from Pit (musician runtime) and Produce (creative pre-production).
- **Stardust Lighting** — lighting runtime and control: DMX, Art-Net, sACN, OSC, MSC.
- **Stardust Galaxy** — optional cloud layer: sync, marketplace, collaboration, plugin ecosystem. Local-first remains absolute; Galaxy is never required.

The order in which these get built (if any do) depends entirely on what Pit and Sheets reveal about user needs. Listing them isn't a roadmap commitment; it's a way of being explicit about where the platform *could* go so the foundational decisions in Pit and core don't accidentally close those doors.

## What's explicitly off the table

- Replacing notation software (MuseScore, Sibelius, Dorico). Sheets layers metadata on PDFs.
- Full OMR (optical music recognition). The semantic overlay approach sidesteps it.
- Enterprise theatre ERP. If only a 50-person production company would use it, it doesn't ship.
- Mandatory cloud / subscription / DRM. Apps work fully offline forever.
- AI features without theatre-specific value. AI for AI's sake doesn't ship.
- A separate `stardust-ui` library before Sheets exists. Premature shared-UI extraction.
- Plugin ABI stabilization before there are real plugin authors.

## How decisions get made

Significant architecture changes require an [ADR](https://github.com/StardustMT/stardust-workspace/tree/main/docs/adr). Schemas are versioned ([ADR-0003](https://github.com/StardustMT/stardust-workspace/blob/main/docs/adr/0003-schema-versioning.md)). Cross-app protocols carry version discipline. PRs land small. The [principles](/docs/ecosystem/principles/) outlive any individual feature.
