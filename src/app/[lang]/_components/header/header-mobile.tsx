'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';
import { BiPlus as PlusIcon } from 'react-icons/bi';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

import { MenuLink } from './menu-link';

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
  const [activeLinkIndex, setActiveLinkIndex] = useState(
    links.findIndex(link => link.href === pathname),
  );

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

  return (
    <div className={cn(className, 'flex flex-col z-50', isTransitionActive ? 'min-h-screen' : '')}>
      <AnimatePresence onExitComplete={() => !isMenuVisible && setTransitionActive(false)}>
        {isMenuVisible && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="bg-background bg-opacity-[0.84] absolute backdrop-blur-[6px] h-full w-full"
          />
        )}
      </AnimatePresence>

      <div>
        {links.map((link, index) => (
          <motion.div
            key={link.href}
            className={cn(`transition duration-1000 ease-in-out`, {
              'opacity-0': !(isMenuVisible || link.href === pathname),
            })}
            style={{ translateY: isMenuVisible ? 0 : `-${32 * activeLinkIndex}rem` }}
            onClick={() => {
              setActiveLinkIndex(index);
              isMenuVisible && closeMenu();
            }}>
            <MenuItem
              {...link}
              className={headerHeightClass}
              append={
                <button
                  className="px-[8rem] -mr-[8rem] text-[20rem] text-"
                  onClick={() => {
                    setActiveLinkIndex(index);
                    (isMenuVisible ? closeMenu : openMenu)();
                  }}>
                  <PlusIcon
                    className={cn('text-red-500 transition-transform duration-200 ease-in-out', {
                      'rotate-45': isTransitionActive && link.href === pathname,
                      'opacity-[.44]': link.href !== pathname,
                    })}
                  />
                </button>
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
