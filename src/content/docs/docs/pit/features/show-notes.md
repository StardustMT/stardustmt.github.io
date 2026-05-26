---
title: "Show Notes"
description: "Target version: v0.5"
---

> Markdown-rendered notes per Song and per Patch — chord charts, lyrics, conductor cues, anything you need at a glance.

**Status:** Notes widget (notepad + custom markdown) lands in v0.11.0 as part of the widget catalog. Storage model is part of the v0.10.0 patch library work.

## What it does

Each Song and each Patch can have notes attached, rendered as markdown in a dedicated pane in Perform mode.

Typical contents:
- **Chord chart** — chord changes for the Song
- **Lyric snippet** — to know where in the Song you are
- **Conductor cues** — "Watch for tempo change in bridge"
- **Performance notes** — "Use mod wheel for the strings swell"
- **Reminders** — "Floor switch advances to celesta sound after first chorus"
- **Plugin tips** — "Reverb is set to small room — don't push the wet mix above 40%"

## Two levels: Song and Patch

- **Song-level notes** — apply to the whole song; shown when no patch-specific note overrides
- **Patch-level notes** — specific to the current patch; shown when that patch is active

The notes pane shows the most relevant context: Song-level for general info, Patch-level for "now this patch is active and here's what to know about it."

## Markdown rendering

Supports the full markdown spec:
- Headers, lists, bold/italic
- Code blocks (monospace, useful for chord notation)
- Tables (great for chord charts)
- Links (e.g. to YouTube reference recording — opens in browser)
- Inline images (v1.0+; useful for scanned chord sheets)

Custom extensions for musical content (v0.5–v1.0):
- `{C}` / `{Am7}` etc. inline chord notation with theme styling
- Tempo annotations: `[tempo: 120]`
- Section markers: `## Verse 1`, `## Chorus`

## Font size and theme

Independent controls:
- Notes pane font size (16-32pt)
- Notes pane font (system, monospace, or a few high-readability options)
- Background opacity (for over-bright theaters or photo backgrounds)
- Dark mode forces black background regardless of theme

Customize per Song or Patch if needed.

## Storage

Notes are stored as markdown strings in the Show JSON:

```json
"notes": "## Tempo: 120 BPM\n\nWatch conductor at bar 32 for the tempo change.\n\n## Chord chart\n\n| Bar | Chord |\n|---|---|\n| 1-4 | Am |\n| 5-8 | F |\n| 9-12 | C |"
```

## In-app editing

Program mode has a dedicated **Show Notes editor** dialog with markdown preview alongside source. Quick-save, autosaves on close.

For longer notes, an external file reference is supported (v1.0+): `notes_file: "hamilton-song-4-notes.md"` loads from a sidecar file.

## Perform mode display

The `<NotesPane>` widget shows current notes. Resizable from the Layout tab. Scroll wheel scrolls the content for longer notes.

Auto-scrolling on patch advance: when you advance to a Patch with its own notes, the pane updates to show those. Behavior configurable: instant swap, slide animation, or none.

See Widget Registry.

## Use case: forScore alternative

For musicians whose primary need is *sheet music* (not chord charts), they should use forScore on a tablet. Stardust's notes pane is for *contextual information*, not full musical scores.

If you have a notation file you want available, link to it from the notes: `[See PDF](file:///path/to/score.pdf)` — opens in the default PDF viewer.

See [forScore Integration](/docs/pit/features/forscore-integration/) for the proper sheet-music integration.

## Related pages

- [forScore Integration](/docs/pit/features/forscore-integration/)
- Widget Registry
- [Setup, Program, and Perform](/docs/pit/concepts/setup-program-perform/)
