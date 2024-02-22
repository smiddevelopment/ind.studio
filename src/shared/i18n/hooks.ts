import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { DEFAULT_LOCALE, LOCALES } from '.';

import { clearPathnameFromLocale } from './utils';

export function useCurrentLocale() {
  const pathname = usePathname();

  return (
    LOCALES.find(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) ||
    DEFAULT_LOCALE
  );
}

export function useActivePathCheck() {
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();

  return useCallback(
    (path: string) => {
      if (currentLocale === DEFAULT_LOCALE) {
        return path === pathname;
      } else {
        return clearPathnameFromLocale(pathname, currentLocale) === path;
      }
    },
    [currentLocale, pathname],
  );
}
