/** Canonical marketing site origin — matches astro.config.mjs `site`. */
export const SITE_ORIGIN = 'https://www.pagayo.com';

export const DEFAULT_TITLE = 'Pagayo — Every Sale. One Platform.';
export const DEFAULT_DESCRIPTION =
  'Webshop, POS, WhatsApp, QR — all orders flow into one dashboard. Free forever.';

export function canonicalUrl(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return new URL(normalized === '//' ? '/' : normalized, SITE_ORIGIN).href;
}
