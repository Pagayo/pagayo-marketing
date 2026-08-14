import contentEn from '../content/powered-by.json';
import contentNl from '../content/powered-by.nl.json';
import type { Locale } from './i18n';

export type PoweredByContent = typeof contentEn;

export function loadPoweredBy(locale: Locale): PoweredByContent {
  switch (locale) {
    case 'nl':
      return contentNl as PoweredByContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German powered-by content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for powered-by: ${_exhaustive}`);
    }
  }
}
