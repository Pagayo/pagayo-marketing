// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pagayo.com',
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
      filter: (page) => !page.includes('/index-old'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
