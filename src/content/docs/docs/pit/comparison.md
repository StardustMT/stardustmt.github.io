---
title: "Comparison"
description: "A factual comparison between Stardust and other live-performance plugin hosts. Capabilities marked \"yes/no\" reflect publicly-documented behaviour at time of..."
---

A factual comparison between Stardust and other live-performance plugin hosts. Capabilities marked "yes/no" reflect publicly-documented behaviour at time of writing.

> [!NOTE]
> Some entries differ by edition (free / standard / pro). Where this applies, the table reflects the most capable edition. Where a capability is on the Stardust roadmap but not yet shipped, the target version is noted in parentheses.

## Feature matrix

| Capability | Stardust | MainStage | Gig Performer | Cantabile | Camelot Pro |
|---|---|---|---|---|---|
| Platforms | macOS, Windows | macOS only | macOS, Windows | Windows only | macOS, Windows, iOS, Android |
| Licence | Open source (GPL v3) | Commercial | Commercial | Commercial (free + paid tiers) | Commercial |
| Audio formats hosted | VST3, CLAP (v0.3) | AU | VST3, VST2, AU | VST3, VST2 | VST3, VST2, AU |
| Out-of-process plugin sandboxing | Yes (v0.3) | No | No | No | No |
| Built-in Show / Song / Patch hierarchy | Yes | Yes (Concert / Set / Patch) | Yes (Rackspace / Variation) | Yes (Song / State) | Yes (Setlist / Song / Layer) |
| Cascading settings across hierarchy | Yes | Limited | Limited | Limited | Limited |
| MIDI Learn with device-profile templates | Yes (v0.4) | Manual | Manual | Manual | Manual |
| Built-in click track | Yes (v0.5) | Yes | Via plugin | Via plugin | Yes |
| Built-in transpose | Yes (v0.5) | Yes | Yes | Yes | Yes |
| forScore (iPad sheet music) integration | Planned (v0.5) | No | Via MIDI | Via MIDI | Yes |
| Hot-spare rig sync | Planned (v2.0+) | No | Plugin-based | No | No |
| Customisable Live Mode layout | Yes (v0.4) | Limited | Yes | Yes | Yes |
| Touchscreen-first Live Mode | Yes (v0.4) | No | Limited | Limited | Yes (mobile) |

## What this table doesn't capture

A capability matrix is a starting point, not a verdict. Things that genuinely differ between hosts but resist a yes/no:

- **CPU efficiency** — varies by plugin mix, buffer size, and OS configuration. Benchmark on your own rig.
- **Latency** — driven by the audio interface and buffer settings far more than by the host itself.
- **UI ergonomics** — personal preference. Demo the apps yourself.
- **Plugin compatibility** — even within a single format (e.g. VST3), some plugins behave differently across hosts.
- **Documentation and community** — these mature over time; a new project will always be behind a long-established one here.

## What Stardust is optimising for

Three things, in this order:

1. **Reliability under live conditions.** Plugin sandboxing, voice tracking, pre-show validation, Performance Lock.
2. **Cross-platform parity.** macOS and Windows are tier-1 from day one — no second-class platform.
3. **Show structure that matches how live shows are actually run.** Show / Song / Patch hierarchy with cascading settings, designed around the workflow of a music director programming a multi-Number show.

If those aren't your priorities, one of the other hosts above may be a better fit. The point of this page is to make the trade-offs visible, not to claim Stardust is the only reasonable choice.

## Related pages

- [Home](/)
- [Roadmap](/docs/pit/roadmap/)
- [Architecture Overview](/docs/pit/architecture/overview/)
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Cascading Settings](/docs/pit/concepts/cascading-settings/)

---

<sub>MainStage and Logic are trademarks of Apple Inc. Gig Performer is a trademark of Deskew Technologies. Cantabile is a trademark of Topten Software. Camelot Pro is a trademark of Audio Modeling. forScore is a trademark of forScore LLC. All trademarks are property of their respective owners. Stardust is not affiliated with or endorsed by any of them.</sub>
