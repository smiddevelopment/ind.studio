'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

interface MenuLinkProps extends PropsWithChildren, ClassNameProp {
  href: string;
}

export function MenuLink({ children, href, className }: MenuLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'text-[14rem] font-medium ',
        className,
        href === pathname ? 'filling-up-text--active' : 'filling-up-text--hover',
      )}>
      {children}
    </Link>
  );
}
