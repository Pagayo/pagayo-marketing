import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.pagayo.com",
  output: "static",
  integrations: [
    sitemap({
      // Exclude nothing by default — every prerendered route in dist/ is included.
      // Draft blog posts are omitted automatically (no static path generated).
    }),
  ],
});
