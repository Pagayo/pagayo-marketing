export type SupportedLanguage = 'nl' | 'de' | 'en';

export interface CountryConfig {
  code: string;
  region: string;
  name: string;
  locale: string;
  currency: string;
  language: string;
  nav: {
    cta: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  meta: {
    tagline: string;
  };
}

type CountryModule = { default: CountryConfig };

const countryModules = import.meta.glob<CountryModule>('../data/countries/*.json', {
  eager: true,
});

const getCodeFromPath = (modulePath: string): string => {
  const parts = modulePath.split('/');
  const filename = parts[parts.length - 1] ?? '';
  return filename.replace(/\.json$/u, '').toLowerCase();
};

const byCode: Record<string, CountryConfig> = Object.fromEntries(
  Object.entries(countryModules).map(([modulePath, module]) => [
    getCodeFromPath(modulePath),
    module.default,
  ])
);

const EN_FALLBACK_COUNTRY_CODE = 'ie';

export const getCountryConfigByLanguage = (language: SupportedLanguage): CountryConfig => {
  const code = language === 'en' ? EN_FALLBACK_COUNTRY_CODE : language;
  const country = byCode[code];

  if (!country) {
    throw new Error(`Country config not found for language '${language}' (resolved to '${code}')`);
  }

  return country;
};

export const getCountryConfigByCode = (countryCode: string): CountryConfig => {
  const code = countryCode.toLowerCase();
  const country = byCode[code];

  if (country) return country;

  return getCountryConfigByLanguage('en');
};
