---
title: "v1.0 Public Release"
description: "Duration estimate: Weeks 25–28 (4 weeks)
Status: ⚪ Not started
Prerequisite: [v0.5](/roadmap/v0-5-mt-features/) complete"
---

> The public release. Cross-platform testing matrix, demo shows, open beta, public launch.

**Duration estimate:** Weeks 25–28 (4 weeks)
**Status:** ⚪ Not started
**Prerequisite:** [v0.5](/roadmap/v0-5-mt-features/) complete

## Goals

By the end of v1.0, Stardust 1.0 is publicly available. Real working musicians can download a stable build, program a real show, and use it on stage with confidence.

## What gets built

### Cross-platform testing matrix

- macOS (Apple Silicon + Intel)
- Windows 10 + Windows 11
- Multiple audio interfaces tested (built-in, USB class-compliant, ASIO via Focusrite/MOTU/etc.)
- Multiple MIDI controllers tested
- Multiple plugin combinations tested
- Documented compatibility list

### Demo shows

Five demo shows shipped with the app, all using free/public-domain content:

- **Pirates of Penzance** (G&S) — full G&S operetta
- **HMS Pinafore** (G&S)
- **Mikado** (G&S)
- **Original community show** — open call for an original composition
- **Tech demo show** — designed to showcase Stardust capabilities (cue system, multi-patch song, click, transpose)

All public-domain or community-contributed. No commercial musical theatre IP.

### Documentation site

- `chasecondon.github.io/Stardust/` — polished docs site
- Getting Started guide (with screenshots)
- Feature walkthroughs (with GIFs)
- FAQ
- Troubleshooting common issues
- Download page with platform-specific instructions
- Compatibility matrix

### Open beta program

- Invite 10-20 friendly MDs / keyboardists for closed beta
- Beta builds via GitHub Releases
- Discord channel for feedback
- 2-3 week beta window before public 1.0

### Release infrastructure

- macOS signed + notarized installer (or DMG)
- Windows signed installer (or portable zip)
- Auto-update mechanism (v1.0 or 5?)
- Crash reporting (Sentry or similar, opt-in)
- Telemetry (anonymous, opt-in)
- Release notes process

### Final polish

- Onboarding tour (first-run wizard + welcome tour)
- Performance profiling: ensure smooth on a 4-year-old laptop
- Accessibility audit: WCAG AA contrast, keyboard navigation
- Localized error messages (English MVP, structure for translation)
- Final brand assets (logo, marquee graphic, icon)

### Community infrastructure

- Discord server (or alternative)
- GitHub Discussions enabled and organized
- Contributor docs polished
- Tutorial videos (3-5 short YouTube videos covering key concepts)

## Exit criteria

v1.0 is done when:

- A 1.0.0 build is publicly available on macOS and Windows
- The Pages site is live with full documentation
- 5 demo shows ship with the app
- Open beta feedback addressed (or triaged to post-1.0)
- Discord / community channels active
- Public release announcement made
- Build pipeline auto-publishes to GitHub Releases on tag

## What's explicitly NOT in 1.0

These are v2.0+:

- Marketplace
- AU plugin hosting (macOS)
- Mobile companion
- Multi-keyboardist LAN sync
- AI sound search
- Backing tracks
- Advanced cue system (MSC, OSC, QLab deep integration)

## Related pages

- [v0.5](/roadmap/v0-5-mt-features/)
- [v2.0+](/roadmap/v2-0-post-1-0/)
- [Roadmap](/roadmap/)
- **Contributing** <!-- TODO: dead wiki link to 'Contributing' -->
