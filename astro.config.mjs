// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

export default defineConfig({
  site: "https://stardust-mt.com",
  integrations: [
    starlight({
      title: "Stardust",
      description:
        "Open-source, cross-platform live-performance tools for musical theatre.",
      // TODO: add logo once branding lands.
      // logo: { src: "./src/assets/logo.svg", replacesTitle: false },
      social: {
        github: "https://github.com/StardustMT",
      },
      editLink: {
        baseUrl: "https://github.com/StardustMT/stardust-site/edit/main/",
      },
      lastUpdated: true,
      sidebar: [
        {
          label: "Overview",
          items: [
            { label: "Welcome", link: "/" },
            { label: "Comparison with MainStage et al.", link: "/comparison/" },
          ],
        },
        {
          label: "Concepts",
          items: [
            { label: "Shows, Songs, and Patches", link: "/concepts/shows-songs-patches/" },
            { label: "Cascading settings", link: "/concepts/cascading-settings/" },
            { label: "Edit Mode vs Live Mode", link: "/concepts/edit-vs-live/" },
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "Overview", link: "/architecture/overview/" },
            { label: "Tauri stack", link: "/architecture/tauri-stack/" },
          ],
        },
        {
          label: "Reliability",
          autogenerate: { directory: "reliability" },
        },
        {
          label: "Features",
          collapsed: true,
          autogenerate: { directory: "features" },
        },
        {
          label: "Roadmap",
          items: [
            { label: "Overview", link: "/roadmap/" },
            { label: "v0.1 — Foundations", link: "/roadmap/v0-1-foundations/" },
            { label: "v0.2 — Core engine", link: "/roadmap/v0-2-core-engine/" },
            { label: "v0.3 — Plugin sandboxing + CLAP", link: "/roadmap/v0-3-plugin-sandboxing-clap/" },
            { label: "v0.4 — Data model + UI", link: "/roadmap/v0-4-data-model-ui/" },
            { label: "v0.5 — MT features", link: "/roadmap/v0-5-mt-features/" },
            { label: "v1.0 — Public release", link: "/roadmap/v1-0-public-release/" },
            { label: "v2.0+ Post-1.0", link: "/roadmap/v2-0-post-1-0/" },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
})
