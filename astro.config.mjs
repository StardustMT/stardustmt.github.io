// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

export default defineConfig({
  // Deployed via GitHub Pages org page (repo: StardustMT/stardustmt.github.io).
  // When a custom domain lands, update `site` accordingly.
  site: "https://stardustmt.github.io",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Stardust",
      description:
        "Open-source, cross-platform live-performance tools for musical theatre.",
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        Header: "./src/components/Header.astro",
      },
      social: {
        github: "https://github.com/StardustMT",
      },
      editLink: {
        baseUrl: "https://github.com/StardustMT/stardustmt.github.io/edit/main/",
      },
      lastUpdated: true,
      // Sidebar only shows on docs pages (splash pages don't render sidebar).
      // Mirror the /docs/ URL structure: ecosystem, pit, sheets.
      sidebar: [
        {
          label: "Stardust ecosystem",
          items: [
            { label: "Overview", link: "/docs/ecosystem/" },
            { label: "Vision", link: "/docs/ecosystem/vision/" },
            { label: "Principles", link: "/docs/ecosystem/principles/" },
            { label: "Roadmap", link: "/docs/ecosystem/roadmap/" },
          ],
        },
        {
          label: "Stardust Pit",
          items: [
            { label: "Overview", link: "/docs/pit/" },
            {
              label: "Concepts",
              items: [
                { label: "Shows, Songs, and Patches", link: "/docs/pit/concepts/shows-songs-patches/" },
                { label: "Cascading settings", link: "/docs/pit/concepts/cascading-settings/" },
                { label: "Setup, Program, and Perform", link: "/docs/pit/concepts/setup-program-perform/" },
              ],
            },
            {
              label: "Architecture",
              items: [
                { label: "Overview", link: "/docs/pit/architecture/overview/" },
                { label: "Tauri stack", link: "/docs/pit/architecture/tauri-stack/" },
              ],
            },
            {
              label: "Reliability",
              autogenerate: { directory: "docs/pit/reliability" },
            },
            {
              label: "Features",
              collapsed: true,
              autogenerate: { directory: "docs/pit/features" },
            },
            { label: "Screens", link: "/docs/pit/screens/" },
            { label: "Roadmap", link: "/docs/pit/roadmap/" },
            { label: "Comparison", link: "/docs/pit/comparison/" },
          ],
        },
        {
          label: "Stardust Sheets",
          items: [
            { label: "Design intent", link: "/docs/sheets/" },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
})
