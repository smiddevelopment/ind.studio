import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

interface MenuLinkProps extends PropsWithChildren, ClassNameProp {
  href: string;
}

export function MenuLink({ children, href, className }: MenuLinkProps) {
  return (
    <Link href={href} className={cn(className, 'text-[14rem] font-medium filling-up-text')}>
      {children}
    </Link>
  );
}
