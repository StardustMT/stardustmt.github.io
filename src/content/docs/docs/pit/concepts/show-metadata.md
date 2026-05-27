---
title: "Show metadata model"
description: "Show metadata splits into three sections: Production (this run), Source (the work itself), Distribution (when sharing). The structure handles MT-specific needs like revivals, licensing, and anonymous sharing."
---

Show metadata in Stardust is structured in three sections rather than a flat blob. The split handles musical-theatre-specific needs: revivals (same work, different orchestration), licensing (publisher + performance license tracking), and sharing (strip personal info on export).

Lands in **v0.9.0** alongside the Setup → Show Settings screen.

## Production — this performance / run

The specific production this show file is for.

- Show name, subtitle
- Production type (regional / community / school / tour / etc.)
- Venue
- Run dates (start / end / preview / opening / closing)
- MD credit
- Keys / instrument credit
- Production company
- Production notes (markdown)

## Source — the work itself (often immutable)

The underlying work, which may have multiple productions over time.

- Title
- Composer / Lyricist / Book writer
- **Productions list** — covers revivals. Each entry: production label, year, venue, director, MD, orchestration credit (Original / Reduced / Custom / etc.). Example: *Little Shop of Horrors* 1982 Off-Broadway vs 2003 Broadway Revival vs 2018 West End — each a different orchestration.
- **This show uses production** — dropdown selecting which production this show file's score/orchestration is based on
- Music publisher (often varies per production)
- License version (e.g., "MTI Educational Edition v2", "Concord Standard Orchestration")
- Performance license number
- ISMN / ISBN / catalog number

## Distribution — when sharing / marketplace

Metadata about the show *file* (distinct from the work).

- Author / creator (of this show file specifically)
- Last modified by
- Description
- Tags / categories
- License (MIT / CC-BY / Proprietary / Commercial — for the *file*, not the work)
- Suggested price (for marketplace)
- Required plugins (auto-computed per v0.7.0 plugin requirements tracking)
- Distribution notes

## On share / export

Two privacy toggles when exporting a show:

- **Strip Production fields** (venue, MD, dates) — makes the share generic, reusable by other productions
- **Strip Distribution author info** — for anonymity

This means an MD can share a fully-programmed *Little Shop* without leaking which theatre they work at or which run it was for.

## Why three sections, not one

- **Revivals** — the same Source (work) carries multiple productions; a show file points at one. Without the split, you'd re-enter composer/publisher every time.
- **Licensing** — Source-level publisher + license tracking survives across productions; Production-level credits change per run.
- **Sharing** — Distribution metadata is about the file as an artifact; it's the only section a marketplace cares about, and the only one you'd strip for privacy.

## Related pages

- [Setup, Program, and Perform](/docs/pit/concepts/setup-program-perform/) (Setup → Show Settings)
- [New Show wizard](/docs/pit/features/new-show-wizard/) (step 1 collects initial Production metadata)
- [Marketplace architecture](/docs/ecosystem/marketplace-architecture/) (Distribution metadata feeds the marketplace)
