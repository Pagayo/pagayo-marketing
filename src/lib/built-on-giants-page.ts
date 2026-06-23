import contentEn from '../content/built-on-giants.json';
import contentNl from '../content/built-on-giants.nl.json';
import type { Locale } from './i18n';

export type BuiltOnGiantsContent = typeof contentEn;

export function loadBuiltOnGiants(locale: Locale): BuiltOnGiantsContent {
  switch (locale) {
    case 'nl':
      return contentNl as BuiltOnGiantsContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German built-on-giants content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for built-on-giants: ${_exhaustive}`);
    }
  }
}
