import { PCHeader } from './header-pc';

export function Header() {
  return (
    <header>
      <div className="pc:hidden">mobile</div>
      <PCHeader className="pc:flex hidden" />
    </header>
  );
}
