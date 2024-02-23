import 'server-only';

import { LOCALES } from '@/shared/i18n';
import { getDictionary } from '@/shared/i18n/dictionary';
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

interface DesktopHeaderProps extends ClassNameProp, LangProp {
  links: Array<{ title: string; href: string }>;
  headerHeightClass: string;
}

export const DesktopHeader = async ({
  className,
  headerHeightClass,
  lang,
  links,
}: DesktopHeaderProps) => {
  const dictionary = await getDictionary(lang);

  const leftLinks = [links[0]];
  const rightLinks = links.slice(1);

  return (
    <nav
      className={cn(
        className,
        headerHeightClass,
        'p-[12rem] flex items-center justify-between bg-background',
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
