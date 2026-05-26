---
title: "Community Sharing"
description: "Target version: v0.5–v1.0"
---

> Free hub for sharing device profiles, UI layouts, color themes, effect presets, patch presets — anything users want to give away.

**Status:** v1.x — free anonymous bridge step before the full [marketplace](/docs/ecosystem/marketplace-architecture/).

## What it does

The free community sharing hub. Users upload reusable content; other users browse and install. No payment processing — purely free, contribution-based.

This is distinct from the [Marketplace](/docs/pit/features/marketplace/) (which handles paid content via Lemon Squeezy). Same UI, same backend — different "free" vs "paid" filters.

## What's shareable

Anything that's a JSON config + optional asset bundle:

| Content type | Format | What it is |
|---|---|---|
| **Device profile** | JSON | Mapping of a hardware device's controls |
| **UI layout** | JSON | Live Mode widget arrangement |
| **Color theme** | JSON (CSS variable map) | Dark / light / custom palettes |
| **Effect preset** | JSON | Settings for built-in EQ / reverb / compressor |
| **Patch preset** | JSON + VST state blob | A single sound configuration |
| **Sample pack** | SFZ + WAV files | Recorded sounds for the Custom Sampler |

## Browse / install flow

1. In Stardust, **Settings → Community** opens the hub browser
2. Browse by content type, sort by popularity / recency / rating
3. Click a listing → detail page with description, screenshots, requirements
4. Click "Install" → downloads + installs automatically
5. Item appears in the relevant in-app location (device profile in Device Profiles list, layout in Layout templates, etc.)

## Why bother with sharing?

Specific examples:
- **"I just bought a Roland RD-2000 but Stardust doesn't ship a profile for it"** — install community profile, done
- **"I want a dark theme that matches my band's aesthetic"** — install community theme
- **"I'm setting up a worship rig and want a layout designed for that workflow"** — install community layout
- **"I love this MD's go-to organ patch sound"** — install community patch

Multiplies the value of Stardust by the size of the community.

## Attribution and licensing

Each shared item declares:
- **Author** (linked to their profile)
- **License** (CC0, CC-BY, CC-BY-SA, MIT, custom)
- **Version** (semver)

Stardust enforces attribution requirements on install (e.g. CC-BY items show author credit in the UI).

## Verified creators

v1.0+: a verified-creator program for users who consistently produce high-quality content. Verified items get a badge in browse listings.

Verification is lightweight — just identity confirmation via email + GitHub, plus a community vouching system.

## Free vs paid

The same hub UI shows free and paid content side-by-side, with clear price indicators. Users can filter "Free only" if preferred.

For content creators:
- **Free** — share via the hub, get attribution, build reputation
- **Paid** — see [Marketplace](/docs/pit/features/marketplace/) for the payment side

A creator can publish a free item AND a "premium" version with more samples / better quality / commercial support.

## Backend infrastructure

Same backend as the marketplace (see [Marketplace](/docs/pit/features/marketplace/)):
- API service (Rust or Node), hosted on Fly.io / Railway
- Postgres for users / listings / ratings
- S3 / Cloudflare R2 for asset storage
- License verification (account-bound downloads — even free items require an account)
- Search / filtering / sorting

## Tag-based discovery

Items tagged for discovery:
- Genre tags (musical theatre, rock, electronic, worship, jazz, etc.)
- Show tags ("Hadestown", "Sondheim", "Disney")
- Device tags (RD-2000, Nord, Yamaha)
- Style tags (vintage, modern, dark, bright)

## Phase status

| Phase | What's available |
|---|---|
| v0.5 | Free hub: device profiles, themes, layouts (small initial scope) |
| v1.0 | Patch presets, effect presets, sample packs |
| v1.0+ | Verified creator program, ratings, reviews |

## Related pages

- [Marketplace](/docs/pit/features/marketplace/)
- [Device Profiles](/docs/pit/features/device-profiles/)
- [Custom Sampler](/docs/pit/features/custom-sampler/)
- Widget Registry (layouts share widget configurations)
- Theme System
