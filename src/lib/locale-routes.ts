import { SITE_ORIGIN } from './site-seo';
import type { Locale } from './i18n';

/** Pages with full locale variants in fase 1. */
export type LocalizedPageId =
  | 'home'
  | 'pricing'
  | 'organizations'
  | 'impact'
  | 'poweredBy'
  | 'poweredByContact'
  | 'howWeBuild'
  | 'oneStack';

const ROUTES: Record<LocalizedPageId, Record<Locale, string | null>> = {
  home: { en: '/', nl: '/nl/', de: null },
  pricing: { en: '/pricing', nl: '/nl/prijzen', de: null },
  organizations: { en: '/organizations', nl: '/nl/organizations', de: null },
  impact: { en: '/impact', nl: '/nl/impact', de: null },
  poweredBy: { en: '/powered-by', nl: '/nl/powered-by', de: null },
  poweredByContact: { en: '/powered-by-contact', nl: '/nl/powered-by-contact', de: null },
  howWeBuild: { en: '/how-we-build', nl: '/nl/how-we-build', de: null },
  oneStack: { en: '/one-stack', nl: '/nl/one-stack', de: null },
};

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export function localizedPath(pageId: LocalizedPageId, locale: Locale): string {
  const path = ROUTES[pageId][locale];
  if (path) return path;
  return ROUTES[pageId].en;
}

export function alternateLinks(pageId: LocalizedPageId): AlternateLink[] {
  const links: AlternateLink[] = [];

  for (const [locale, path] of Object.entries(ROUTES[pageId]) as [Locale, string | null][]) {
    if (!path) continue;
    links.push({
      hreflang: locale === 'en' ? 'en' : locale,
      href: new URL(path, SITE_ORIGIN).href,
    });
  }

  links.push({
    hreflang: 'x-default',
    href: new URL(ROUTES[pageId].en, SITE_ORIGIN).href,
  });

  return links;
}

export function pageIdFromPath(pathname: string): LocalizedPageId | undefined {
  const normalized = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  for (const pageId of Object.keys(ROUTES) as LocalizedPageId[]) {
    for (const path of Object.values(ROUTES[pageId])) {
      if (!path) continue;
      const routeNorm = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
      if (normalized === routeNorm || normalized === path) return pageId;
    }
  }
  return undefined;
}

/** Nav/footer: localized path when available, else English route. */
export function hrefFor(pageId: LocalizedPageId, locale: Locale): string {
  return localizedPath(pageId, locale);
}
