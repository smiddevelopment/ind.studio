import 'server-only';

import { getDictionary } from '@/shared/i18n/dictionary';
import { createHrefWithLocale } from '@/shared/i18n/utils';
import { LangProp } from '@/shared/types';

import { DesktopHeader } from './header-desktop';
import { MobileHeader } from './header-mobile';

const HEADER_HEIGHT_DESKTOP = 'h-[40rem]';
const HEADER_HEIGHT_MOBILE = 'h-[32rem]';

export const CONTENT_GAP_TOP = `desktop:pt-[40rem] pt-[32rem]`;

export async function Header({ lang }: LangProp) {
  const dictionary = await getDictionary(lang);

  const links = [
    { href: createHrefWithLocale('/', lang), title: dictionary['title_projects'] },
    { href: createHrefWithLocale('/studio', lang), title: dictionary['title_studio'] },
    { href: createHrefWithLocale('/team', lang), title: dictionary['title_team'] },
    { href: createHrefWithLocale('/job', lang), title: dictionary['title_job'] },
    { href: createHrefWithLocale('/talks', lang), title: dictionary['title_talks'] },
  ];

  return (
    <header className="text-[14rem] leading-[16rem] font-medium fixed top-0 left-0 right-0 z-50 block">
      <MobileHeader
        className="desktop:hidden"
        headerHeightClass={HEADER_HEIGHT_MOBILE}
        links={links}
      />
      <DesktopHeader
        className="desktop:flex hidden"
        headerHeightClass={HEADER_HEIGHT_DESKTOP}
        links={links}
        lang={lang}
      />
    </header>
  );
}
