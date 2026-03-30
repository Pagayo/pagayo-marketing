/// <reference path="../.astro/types.d.ts" />

/**
 * Astro Environment Type Definitions
 *
 * Uitbreiding van Astro.Locals met Content Engine data.
 * Beschikbaar in alle Astro pagina's en middleware via `Astro.locals`.
 */

declare namespace App {
  interface Locals {
    /** Cloudflare Workers runtime (beschikbaar via @astrojs/cloudflare adapter) */
    runtime?: {
      env?: {
        CONTENT_KV?: KVNamespace;
      };
    };

    /** Gedetecteerde bezoeker context (land, device, referrer) */
    visitorContext?: {
      country: string;
      continent?: string;
      device: 'mobile' | 'desktop' | 'tablet';
      referrer: 'whatsapp' | 'tiktok' | 'instagram' | 'facebook' | 'google' | 'direct';
    };

    /** Gematchte content variant (null = gebruik default content) */
    contentVariant?: {
      id: string;
      page: string;
      name: string;
      isDefault: boolean;
      locale: string;
      content: Record<string, unknown>;
    } | null;
  }
}
