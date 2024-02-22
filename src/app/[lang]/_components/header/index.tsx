import 'server-only';

import { LangProp } from '@/shared/types';

import { PCHeader } from './header-pc';

export function Header({ lang }: LangProp) {
  return (
    <header>
      <div className="pc:hidden text-[14rem]">mobile</div>
      <PCHeader className="pc:flex hidden" lang={lang} />
    </header>
  );
}
