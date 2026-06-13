import contentEn from '../content/how-we-build.json';
import contentNl from '../content/how-we-build.nl.json';
import type { Locale } from './i18n';

export type HowWeBuildContent = typeof contentEn;

export function loadHowWeBuild(locale: Locale): HowWeBuildContent {
  switch (locale) {
    case 'nl':
      return contentNl as HowWeBuildContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German how-we-build content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for how-we-build: ${_exhaustive}`);
    }
  }
}
