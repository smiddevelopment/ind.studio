import { DEFAULT_LOCALE, LOCALES, Locale } from '@/shared/i18n';

export function clearPathnameFromLocale(pathname: string, locale: Locale) {
  if (pathname === `/${locale}`) {
    return '/';
  }

  return pathname.replace(`/${locale}/`, '/');
}

export function createHrefWithLocale(href: string, locale: Locale) {
  for (const l of LOCALES) {
    href = clearPathnameFromLocale(href, l);
  }

  if (locale === DEFAULT_LOCALE) return href;

  if (href === '/') {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}
