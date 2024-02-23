'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiPlus as PlusIcon } from 'react-icons/bi';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';
import { assert } from '@/shared/utils';

import { MenuLink } from './menu-link';

const MENU_ANIMATION_DURATION_SECONDS = 0.5;

interface MobileHeaderProps extends ClassNameProp {
  links: Array<{ title: string; href: string }>;
  headerHeightClass: string;
}

interface MenuItemsProps extends ClassNameProp {
  title: string;
  href: string;
  append?: ReactNode;
}

function MenuItem({ title, href, className, append }: MenuItemsProps) {
  return (
    <MenuLink
      href={href}
      className={cn(
        'flex justify-between items-center w-full px-[8rem] border-b-[1px] border-gray-3',
        className,
      )}>
      <div>{title}</div>
      {append}
    </MenuLink>
  );
}

export function MobileHeader({ className, headerHeightClass, links }: MobileHeaderProps) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isTransitionActive, setTransitionActive] = useState(false);
  const pathname = usePathname();

  const { openMenu, closeMenu } = useMemo(
    () => ({
      openMenu() {
        // 'if' fixes multiple button clicks
        if (!isTransitionActive) {
          setMenuVisible(true);
          setTransitionActive(true);
        }
      },
      closeMenu() {
        setMenuVisible(false);
      },
    }),
    [isTransitionActive],
  );

  const linkRef = useRef<HTMLDivElement>(null);

  const activeLink = links.find(link => link.href === pathname);

  assert(activeLink);

  const translateY = useCallback(() => {
    if (!linkRef.current) return 0;

    const activeLinkIndex = links.indexOf(activeLink);

    const { height } = linkRef.current.getBoundingClientRect();

    return height * activeLinkIndex * -1;
  }, [activeLink, links]);

  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLink.href]);

  return (
    <div className={cn(className, 'flex flex-col z-50', isTransitionActive ? 'min-h-screen' : '')}>
      <div ref={linkRef}>
        <MenuItem
          {...(links.find(link => link.href === pathname) || links[0])}
          className={cn(headerHeightClass, { 'opacity-0': isTransitionActive })}
          append={
            <button
              className="px-[8rem] -mr-[8rem] text-[20rem]"
              onClick={isMenuVisible ? closeMenu : openMenu}>
              <motion.span animate={{ rotate: '45deg' }}>
                <PlusIcon
                  className={cn('transition-transform duration-200 ease-in-out', {
                    'rotate-45': isTransitionActive,
                  })}
                />
              </motion.span>
            </button>
          }
        />
      </div>

      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: MENU_ANIMATION_DURATION_SECONDS }}
            className="bg-background bg-opacity-[0.84] absolute backdrop-blur-[6px] h-full w-full"
          />
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={() => !isMenuVisible && setTransitionActive(false)}>
        {isMenuVisible && (
          <ul className="absolute left-0 right-0 top-0">
            {links.map(link => (
              <motion.li
                key={link.href}
                animate={{ opacity: 1, translateY: 0 }}
                initial={{
                  opacity: link.href === activeLink.href ? 1 : 0,
                  translateY: translateY(),
                }}
                exit={{ opacity: link.href === activeLink.href ? 1 : 0, translateY: translateY() }}
                transition={{ ease: 'easeInOut', duration: MENU_ANIMATION_DURATION_SECONDS }}>
                <MenuItem
                  {...link}
                  className={headerHeightClass}
                  append={
                    <button
                      className="px-[8rem] -mr-[8rem] text-[20rem] text-"
                      onClick={isMenuVisible ? closeMenu : openMenu}>
                      <PlusIcon
                        className={cn(
                          'text-red-500 transition-transform duration-200 ease-in-out',
                          {
                            'rotate-45': isTransitionActive && link.href === activeLink.href,
                            'opacity-[.44]': link.href !== activeLink.href,
                          },
                        )}
                      />
                    </button>
                  }
                />
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
}
