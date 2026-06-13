import en from '../content/i18n/en.json';
import nl from '../content/i18n/nl.json';
import de from '../content/i18n/de.json';

export type Locale = 'en' | 'nl' | 'de';

export type Messages = typeof en;

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALES: readonly Locale[] = ['en', 'nl', 'de'];

export function localeFromPath(pathname: string): Locale {
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  return 'en';
}

export function loadMessages(locale: Locale): Messages {
  switch (locale) {
    case 'nl':
      return nl as Messages;
    case 'de':
      return de as Messages;
    case 'en':
      return en;
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale: ${_exhaustive}`);
    }
  }
}

export function localeHtmlLang(locale: Locale): string {
  switch (locale) {
    case 'nl':
      return 'nl';
    case 'de':
      return 'de';
    case 'en':
      return 'en';
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}

export function localeOgLocale(locale: Locale): string {
  switch (locale) {
    case 'nl':
      return 'nl_NL';
    case 'de':
      return 'de_DE';
    case 'en':
      return 'en_US';
    default: {
      const _exhaustive: never = locale;
      return _exhaustive;
    }
  }
}
