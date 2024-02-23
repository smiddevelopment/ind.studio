export type Locale = 'ru' | 'en';

/** The order of locales is important for interface */
export const LOCALES: Locale[] = ['ru', 'en'];
export const DEFAULT_LOCALE: Locale = 'en';

/** Check whether the path is under [lang] path prefix in /app folder */
export function isNotTranslatablePath(path: string) {
  return path.startsWith('/admin');
}

export const i18n = {
  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,
} as const;
