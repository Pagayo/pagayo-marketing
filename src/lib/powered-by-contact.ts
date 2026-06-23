import contentEn from '../content/powered-by-contact.json';
import contentNl from '../content/powered-by-contact.nl.json';
import type { Locale } from './i18n';

export type PoweredByContactContent = typeof contentEn;

export function loadPoweredByContact(locale: Locale): PoweredByContactContent {
  switch (locale) {
    case 'nl':
      return contentNl as PoweredByContactContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German powered-by contact content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for powered-by contact: ${_exhaustive}`);
    }
  }
}
