'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback } from 'react';

import { Locale } from '@/shared/i18n';
import { useCurrentLocale } from '@/shared/i18n/hooks';
import { createHrefWithLocale } from '@/shared/i18n/utils';
import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

interface LocaleSwitchProps extends ClassNameProp {
  locales: Array<{
    locale: Locale;
    title: string;
  }>;
}

export function LocaleSwitch({ className, locales }: LocaleSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = useCurrentLocale();

  const switchLocale = useCallback(
    (newLocale: Locale) => router.push(createHrefWithLocale(pathname, newLocale)),
    [pathname, router],
  );

  return (
    <div className={cn(className, 'flex items-center ml-[50rem]')}>
      {locales.map(({ title, locale }, index) => {
        return (
          <Fragment key={locale}>
            {index > 0 && <span className="filling-up-text--hover">&nbsp;/&nbsp;</span>}
            <button
              onClick={() => locale !== currentLocale && switchLocale(locale)}
              className={
                locale === currentLocale ? 'filling-up-text--active' : 'filling-up-text--hover'
              }>
              {title}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
