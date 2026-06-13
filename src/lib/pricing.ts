import pricingEn from '../content/pricing.json';
import pricingNl from '../content/pricing.nl.json';
import type { Locale } from './i18n';

export type PricingData = typeof pricingEn;

export function loadPricing(locale: Locale): PricingData {
  switch (locale) {
    case 'nl':
      return pricingNl as PricingData;
    case 'en':
      return pricingEn;
    case 'de':
      throw new Error('German pricing is not available yet.');
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unsupported locale for pricing: ${_exhaustive}`);
    }
  }
}
