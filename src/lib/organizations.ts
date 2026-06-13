import contentEn from '../content/organizations.json';
import contentNl from '../content/organizations.nl.json';
import type { Locale } from './i18n';

export type OrganizationsContent = typeof contentEn;

export function loadOrganizations(locale: Locale): OrganizationsContent {
  switch (locale) {
    case 'nl':
      return contentNl as OrganizationsContent;
    case 'en':
      return contentEn;
    case 'de':
      throw new Error('German organizations content is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for organizations: ${_exhaustive}`);
    }
  }
}
