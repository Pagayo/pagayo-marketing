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
  vite: {
    build: {
      // Keystatic admin-bundles zijn route-specifiek en groter dan de standaard 500kB waarschuwing.
      // Verhoogde limiet voorkomt ruis, terwijl echte regressies boven 2.5MB zichtbaar blijven.
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output: {
          // Houd de keystatic-editor payload geïsoleerd van de publieke portal-bundles.
          manualChunks(id) {
            if (id.includes('@keystatic') || id.includes('@markdoc') || id.includes('slate')) {
              return 'keystatic-editor';
            }

            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor';
            }

            return undefined;
          },
        },
      },
    },
  },
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
