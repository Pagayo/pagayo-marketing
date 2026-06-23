import contentEn from '../content/one-stack.json';
import contentNl from '../content/one-stack.nl.json';
import type { Locale } from './i18n';

export type OneStackContent = typeof contentEn;

export function loadOneStack(locale: Locale): OneStackContent {
  switch (locale) {
    case 'nl':
      return contentNl as OneStackContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German one-stack content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for one-stack: ${_exhaustive}`);
    }
  }
}
