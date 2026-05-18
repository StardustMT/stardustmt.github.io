---
title: "v0.1 Foundations"
description: "Duration estimate: 1–3 weeks
Status: 🟢 In progress"
---

> Set up everything we need to start building, with professional polish from day one.

**Duration estimate:** 1–3 weeks
**Status:** 🟢 In progress

## Goals

Get the project infrastructure in place so that as soon as we start writing the audio engine and UI, every aspect of the dev environment, CI, and documentation is ready.

## Deliverables

### Repositories

- ✅ [`StardustMT/stardust-pit`](https://github.com/StardustMT/stardust-pit) (GPL v3) — the app
- ✅ [`StardustMT/stardust-core`](https://github.com/StardustMT/stardust-core) (Apache 2.0) — the audio library
- ✅ Professional READMEs with badges, links, quickstart
- ✅ License files

### Wiki (this!)

- ✅ Stardust wiki bootstrapped (you're reading it)
- ⚪ Overture wiki bootstrapped
- ✅ Feature-first organization with roadmap linking to features
- ✅ ADRs for major decisions
- ⚪ Learning materials section

### GitHub Pages site

- ⚪ Astro or VitePress scaffold at `chasecondon.github.io/Stardust/`
- ⚪ Auto-deploy on push to `main` via GitHub Actions
- ⚪ Pages: home, features, download, docs, guides, FAQ, community

### Project management

- ⚪ GitHub Project board for issue tracking
- ⚪ Issue templates (bug, feature, ADR)
- ⚪ `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`

### Code scaffolding (in this phase, just scaffolds — no real implementation)

- ⚪ Tauri 2 + React + TypeScript + Tailwind + shadcn/ui in Stardust repo
- ⚪ Rust workspace + library crate in Overture repo
- ⚪ Cargo workspace integration between the two locally
- ⚪ Storybook bootstrapped in Stardust

### Storybook

The big v0.1 lift: **stub every UI screen, widget, modal, and component in Storybook** before any are wired up. This becomes the canvas to iterate on the entire app's visual design before functional code exists.

See **Screen Inventory** <!-- TODO: dead wiki link to 'UI: Screen Inventory' --> for the full list.

- ⚪ Color palette + theme tokens as a Storybook page
- ⚪ All MVP widgets stubbed
- ⚪ All screens stubbed with placeholder data
- ⚪ All modals/dialogs stubbed
- ⚪ Form primitives (buttons, inputs, sliders, toggles, etc.) ready

### CI

- ⚪ macOS build + test on every push
- ⚪ Windows build + test on every push
- ⚪ Rust clippy + fmt
- ⚪ TypeScript ESLint + Prettier
- ⚪ Storybook build verification

### Decisions to confirm in v0.1

Before v0.2 starts, we want clarity on:

- Final naming (Stardust + Overture working names; potential rename before 1.0)
- Branding direction (color palette previewed in Storybook)
- Initial GitHub org migration (currently personal account)

## Exit criteria

v0.1 is done when:

- Both repos are public with READMEs that look like serious OSS projects
- This wiki has roadmap + key concepts + features outlined (even if stub content for some pages)
- GitHub Pages site is live, even if minimal
- Storybook covers every UI component we expect to build
- CI is running and green on both platforms
- Anyone landing on the project can understand what it is, what's planned, and how to contribute

## What we explicitly do NOT do in v0.1

- Real audio engine code (v0.2)
- Real plugin hosting (v0.2)
- Real UI wiring (v0.4)

v0.1 is foundation only. Resist scope creep.

## Related pages

- [Roadmap](/roadmap/)
- [v0.2 Core Engine](/roadmap/v0-2-core-engine/)
- **Screen Inventory** <!-- TODO: dead wiki link to 'UI: Screen Inventory' -->
- **Widget Registry** <!-- TODO: dead wiki link to 'UI: Widget Registry' -->
- **Theme System** <!-- TODO: dead wiki link to 'UI: Theme System' -->
