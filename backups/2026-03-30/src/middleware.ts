/**
 * @fileoverview Astro Middleware — Content Engine Context Detection
 *
 * BUSINESS CONTEXT:
 * Detecteert bezoeker-context (land, device, referrer) op de edge
 * en haalt de juiste content variant op uit Cloudflare KV.
 * Beschikbaar via `Astro.locals.contentVariant` in page templates.
 *
 * Fallback: als KV niet beschikbaar is of geen variant matcht,
 * wordt `contentVariant` op null gezet → pagina gebruikt default content.
 *
 * DEPENDENCY: @pagayo/config v1.4.0+ (content module)
 * Publiceer @pagayo/config eerst: npm --no-git-tag-version version minor && node build.js && npm publish
 *
 * KV BINDING: CONTENT_KV moet geconfigureerd zijn in Cloudflare Pages dashboard.
 *
 * @module middleware
 */

import { defineMiddleware } from 'astro:middleware';
import { detectVisitorContext, resolveVariant } from '@pagayo/config/content';
import type { ContextRule, ContentVariant, VisitorContext } from '@pagayo/config/content';

// ─── PAGINA URL → CONTENT PAGE MAPPING ─────────────────

/**
 * Map Astro URL pathnames naar content page identifiers.
 * Wordt gebruikt om de juiste regels uit KV te fetchen.
 */
const PATH_TO_PAGE: Record<string, string> = {
  '/': 'marketing-home',
  '/nl': 'marketing-home',
  '/pricing': 'pricing',
};

// ─── MIDDLEWARE ──────────────────────────────────────────

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, url } = context;

  // 0. Detecteer bezoeker context voor ELKE route (o.a. land in nav)
  const visitorContext = detectVisitorContext(request);
  setLocals(locals, visitorContext, null);

  // Bepaal welke content page dit is
  const contentPage = PATH_TO_PAGE[url.pathname];

  if (!contentPage) {
    // Geen content-personalisatie voor deze route, maar visitorContext is al gezet
    return next();
  }

  try {
    // Cloudflare runtime binding — beschikbaar via @astrojs/cloudflare adapter
    const runtime = (locals as Record<string, unknown>).runtime as
      | { env?: { CONTENT_KV?: KVNamespace } }
      | undefined;

    const kv = runtime?.env?.CONTENT_KV;

    if (!kv) {
      // KV niet beschikbaar (dev mode of niet geconfigureerd)
      // visitorContext is al gezet, geen variant
      return next();
    }

    // 2. Haal regels op uit KV
    const rulesKey = `content-rules:${contentPage}`;
    const rulesJson = await kv.get(rulesKey);

    if (!rulesJson) {
      // Geen regels in KV — gebruik default
      setLocals(locals, visitorContext, null);
      return next();
    }

    const rules: ContextRule[] = JSON.parse(rulesJson);

    // 3. Match context tegen regels → variant ID
    const variantId = resolveVariant(rules, visitorContext);

    if (!variantId) {
      // Geen regel matcht — zoek isDefault variant via separate KV lookup
      setLocals(locals, visitorContext, null);
      return next();
    }

    // 4. Haal variant content op uit KV
    const variantKey = `content:${contentPage}:${variantId}`;
    const variantJson = await kv.get(variantKey);

    if (!variantJson) {
      // Variant niet gevonden in KV — fallback
      console.warn(`[content-middleware] Variant niet gevonden in KV: ${variantKey}`);
      setLocals(locals, visitorContext, null);
      return next();
    }

    const variant: ContentVariant = JSON.parse(variantJson);

    // 5. Zet variant op locals voor page templates
    setLocals(locals, visitorContext, variant);
  } catch (error) {
    // Fail-safe: bij elke fout → doorgaan met default content
    console.error('[content-middleware] Error bij content resolution:', error);
    setLocals(locals, detectVisitorContext(request), null);
  }

  return next();
});

// ─── HELPER ─────────────────────────────────────────────

/**
 * Zet content engine data op Astro locals.
 * Page templates gebruiken `Astro.locals.contentVariant` en `Astro.locals.visitorContext`.
 */
function setLocals(
  locals: Record<string, unknown>,
  visitorContext: VisitorContext,
  variant: ContentVariant | null
): void {
  locals.visitorContext = visitorContext;
  locals.contentVariant = variant;
}
