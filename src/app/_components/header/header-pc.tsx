'use server';

import { useMemo } from 'react';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

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

export const PCHeader = ({ className }: ClassNameProp) => {
  const { leftLinks, rightLinks } = useMemo(
    () => ({
      leftLinks: [{ href: '/', title: 'Projects' }],
      rightLinks: [
        { href: '/', title: 'Studio' },
        { href: '/', title: 'Team' },
        { href: '/', title: 'Job' },
        { href: '/', title: 'IND Talks' },
      ],
    }),
    [],
  );

  return (
    <nav
      className={cn(
        className,
        'p-[12rem] text-[14rem] h-[40rem] flex items-center justify-between leading-[16rem]',
      )}>
      <div className="flex items-center">{renderLinks(leftLinks)}</div>
      <div className="flex-1"></div>
      <div className="flex items-center">{renderLinks(rightLinks)}</div>
      <div className="flex items-center ml-[50rem]">
        <MenuLink href="/">Rus</MenuLink>
        <span className="filling-up-text">&nbsp;/&nbsp;</span>
        <MenuLink href="/">Eng</MenuLink>
      </div>
    </nav>
  );
};
