'use client';

import { ReactNode, useMemo, useState } from 'react';
import { BiPlus as PlusIcon } from 'react-icons/bi';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/shared/libs';
import { ClassNameProp } from '@/shared/types';

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
    <li
      className={cn(
        'flex justify-between items-center px-[8rem] border-b-[1px] border-gray-3 bg-background',
        className,
      )}>
      <MenuLink href={href}>{title}</MenuLink>
      {append}
    </li>
  );
}

export function MobileHeader({ className, headerHeightClass, links }: MobileHeaderProps) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isTransitionActive, setTransitionActive] = useState(false);

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
      <MenuItem
        {...links[0]}
        className={headerHeightClass}
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

      <AnimatePresence onExitComplete={() => !isMenuVisible && setTransitionActive(false)}>
        {isMenuVisible && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: MENU_ANIMATION_DURATION_SECONDS }}
            className="h-full flex-1 relative">
            <div className="bg-background bg-opacity-[0.84] absolute backdrop-blur-[6px] h-full w-full"></div>
            <ul className="absolute left-0 right-0 top-0">
              {links.slice(1).map(link => (
                <MenuItem key={link.href} {...link} className={headerHeightClass} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
