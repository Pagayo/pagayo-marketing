// i18n utilities

export type Language = 'nl' | 'de' | 'en';

export const languages: Record<Language, { code: Language; label: string; flag: string }> = {
  nl: { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  de: { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  en: { code: 'en', label: 'English', flag: '🇺🇸' },
};

export function detectLanguage(pathname: string): Language {
  if (pathname.startsWith('/de')) return 'de';
  if (pathname.startsWith('/us') || pathname.startsWith('/en')) return 'en';
  return 'nl';
}

export function switchLanguage(currentPath: string, toLang: Language): string {
  const fromLang = detectLanguage(currentPath);
  const toPath = toLang === 'en' ? 'us' : toLang;
  const fromPath = fromLang === 'en' ? 'us' : fromLang;

  return currentPath.replace(`/${fromPath}`, `/${toPath}`);
}
