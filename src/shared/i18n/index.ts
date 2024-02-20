import 'server-only';

export type Locale = 'ru' | 'en';

export const LOCALES: Locale[] = ['en', 'ru'];
export const DEFAULT_LOCALE: Locale = 'en';

/** Check whether the path is under [lang] path prefix in /app folder */
export function isNotTranslatablePath(path: string) {
  return path.startsWith('/admin');
}

export const i18n = {
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
} as const;

const dictionaries = {
  en: () => import('./dictionary.en.json').then(module => module.default),
  ru: () => import('./dictionary.ru.json').then(module => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.en();
}
