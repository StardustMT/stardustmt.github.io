---
title: "Feature: Marketplace"
description: "Target version: v1.0-5"
---

> Paid sharing of programmed shows, patch presets, and other content. Lemon Squeezy as Merchant of Record. Creators set pricing. Stardust takes a 15% commission.

**Target version:** v1.0-5

## What it does

A storefront where users can sell programmed shows, patch presets, sample packs, and other content. Solves the chicken-and-egg problem of "professional patch programmers should be able to make a living."

Specifically:
- An MD who programmed *Hadestown* for a touring production over 6 months can list it for sale
- A patch programmer who specializes in Sondheim sound design can publish a "Sondheim Pack" of 50 patches
- A sound designer who built a custom sampler library can offer it commercially

## Why this is worth building

Programmed shows are already traded informally — Facebook groups, MD networks, paid Google Drive shares. The marketplace formalises that with:
- **Legitimate payment processing** (no Venmo / Cash App workarounds)
- **License validation** (paid items account-bound, no piracy via casual sharing)
- **Plugin requirement validation** (buyer knows what plugins they need before purchase)
- **Review system** (quality signal beyond word-of-mouth)
- **Tax compliance** (sellers don't need to register as international businesses)

## Pricing model

- **Creators set the price** — no minimums, no maximums (within reason)
- **Stardust commission**: **15%** of each sale
  - Lower than App Store (30%) or many marketplaces (Etsy 6.5%+ + listing fees)
  - Competitive with established music marketplaces (Splice ~15-30%, Pianobook free, etc.)
- **Lemon Squeezy / Paddle MoR fee**: ~5% + payment processing
- **Creator net**: ~80% of sale price

Sellers get monthly payouts after reaching a minimum threshold ($50-100).

## Why Lemon Squeezy as Merchant of Record

Tax compliance for international digital sales is **brutal**:
- VAT collection in every EU country (different rates, registration requirements)
- US state sales tax (variable per state)
- Goods and Services Tax in Australia, Canada, etc.
- 1099 / equivalent reporting in many jurisdictions

A Merchant of Record (Lemon Squeezy, Paddle) handles all of this — they collect payment, remit tax in each jurisdiction, issue invoices, deal with chargebacks. We pay their ~5% fee and avoid hiring an international tax accountant.

Trade-off: slightly higher fees vs DIY Stripe. Worth every penny at any scale.

## Buyer protections

- **Plugin requirement check** — before purchase, Stardust verifies which plugins the show requires. If you don't own them, clear list shown with affiliate purchase links.
- **Preview** — creators can upload preview audio/video showing the show in action
- **Reviews + ratings** — verified-purchase reviews after some use time (prevents review bombing)
- **Refund window** — 7-day no-questions-asked refund (per Lemon Squeezy policy)
- **Chargeback handling** — handled by MoR

## Creator dashboard

Each creator has:
- Listing management (create, edit, unpublish)
- Sales analytics (units sold, revenue, refunds, by region)
- Payout history
- Customer messages (private support channel per listing)
- Bundle creation (offer multiple shows as a discounted pack)

## Content types

Same as Community Sharing, but with paid pricing:
- **Full programmed shows** (the headline product — Hadestown, Hamilton, etc.)
- **Patch packs** (themed collections of patches)
- **Sample packs** (custom samples + SFZ mappings)
- **Premium device profiles** (rare hardware with detailed mappings)
- **UI layout sets** (themed layouts for specific genres or shows)

## DRM-light

Paid downloads are **account-bound** but not heavily DRM'd:
- Download is tied to your Stardust account
- You can re-download to any of your authorized devices
- License file is included in the bundle; Stardust validates on import
- No always-online validation (works offline)
- Casual sharing detected and flagged, but not technically blocked (the social cost of pirating from a working MD is the deterrent)

Approach: "make it cheap and easy to buy, hard to want to pirate."

## Legal / IP considerations

**Important**: programmed shows are *configurations* — they describe what plugins to load and how to set parameters. They don't contain the plugins' audio engines or sample data. So a sold "Hamilton" show doesn't include Hamilton's copyrighted music — it includes the sound design recipe for playing Hamilton's piano book.

Creators are responsible for ensuring their listings don't infringe on copyrights (e.g. don't include actual Hamilton sheet music PDFs in the bundle). Stardust marketplace's terms enforce this.

## Phase status

| Phase | What's available |
|---|---|
| v1.0 | Marketplace MVP: listings, payments via Lemon Squeezy, basic dashboard |
| v1.0-5 | Reviews, ratings, verified creators, bundles |
| v2.0+ | Affiliate links for plugin purchases, advanced analytics |

## Related pages

- [Community Sharing](/docs/pit/features/community-sharing/) (free side)
- **File Format** <!-- TODO: dead wiki link to 'Architecture: File Format' --> (Show file format designed for marketplace from day one)
- [Plugin Hosting](/docs/pit/features/plugin-hosting/) (plugin requirement validation)
