# stardust-site

Marketing site and documentation for the Stardust ecosystem, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Local development

```bash
bun install
bun run dev          # http://localhost:4321
```

Or from the workspace root:

```bash
just docs-dev
```

## Build

```bash
bun run build        # output to ./dist/
bun run preview      # serve the built site locally
```

## Content

Docs pages live in [`src/content/docs/`](./src/content/docs/). Sidebar structure is configured in [`astro.config.mjs`](./astro.config.mjs) — the Reliability and Features sections are auto-generated from their folders; everything else is hand-ordered.

To add a page: drop a markdown file in the appropriate subfolder with `title:` / `description:` frontmatter. Starlight picks it up automatically (and for auto-generated sections, the sidebar updates without config changes).

## Migration history

The current content was migrated one-shot from the legacy GitHub wiki at `_wiki-source/` via [`../scripts/migrate-wiki.py`](../scripts/migrate-wiki.py). Pages with broken `[[Wiki Link]]` references are rendered as bold text with an inline TODO comment — grep `TODO: dead wiki link` to find them.

Once verified, the `_wiki-source/` directory at the workspace root should be deleted.

## Deployment

Not wired up yet. Target is Cloudflare Pages or GitHub Pages once the StardustMT GitHub org exists.
