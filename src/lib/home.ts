import homeEn from '../content/home.json';
import homeNl from '../content/home.nl.json';
import type { Locale } from './i18n';

export type HomeContent = typeof homeEn;

export function loadHome(locale: Locale): HomeContent {
  switch (locale) {
    case 'nl':
      return homeNl as HomeContent;
    case 'en':
      return homeEn;
    case 'de':
      throw new Error('German homepage content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for homepage: ${_exhaustive}`);
    }
  }
}
