import 'server-only';

import { LOCALES } from '@/shared/i18n';
import { getDictionary } from '@/shared/i18n/dictionary';
import { createHrefWithLocale } from '@/shared/i18n/utils';
import { cn } from '@/shared/libs';
import { ClassNameProp, LangProp } from '@/shared/types';

import { LocaleSwitch } from './locale-switch';
import { MenuLink } from './menu-link';

interface Link {
  href: string;
  title: string;
}

function renderLinks(links: Link[]) {
  return (
    <>
      {links.map((link, index) => (
        <MenuLink key={link.title} href={link.href} className={cn({ 'ml-[16rem]': index > 0 })}>
          {link.title}
        </MenuLink>
      ))}
    </>
  );
}

export const PCHeader = async ({ className, lang }: ClassNameProp & LangProp) => {
  const dictionary = await getDictionary(lang);

  const { leftLinks, rightLinks } = {
    leftLinks: [{ href: createHrefWithLocale('/', lang), title: dictionary['title_projects'] }],
    rightLinks: [
      { href: createHrefWithLocale('/studio', lang), title: dictionary['title_studio'] },
      { href: createHrefWithLocale('/team', lang), title: dictionary['title_team'] },
      { href: createHrefWithLocale('/job', lang), title: dictionary['title_job'] },
      { href: createHrefWithLocale('/talks', lang), title: dictionary['title_talks'] },
    ],
  };

  return (
    <nav
      className={cn(
        className,
        'p-[12rem] text-[14rem] h-[40rem] flex items-center justify-between leading-[16rem]',
      )}>
      <div className="flex items-center">{renderLinks(leftLinks)}</div>
      <div className="flex-1"></div>
      <div className="flex items-center">{renderLinks(rightLinks)}</div>
      <LocaleSwitch
        className="ml-[50rem]"
        locales={LOCALES.map(locale => ({
          locale,
          title: dictionary[`locale_${locale}`],
        }))}
      />
    </nav>
  );
};
