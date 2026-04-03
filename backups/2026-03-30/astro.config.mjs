// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://pagayo.com',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: {
          nl: 'nl-NL',
          de: 'de-DE',
          en: 'en-US',
        },
      },
      filter: (page) => !page.includes('/keystatic'),
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
});
