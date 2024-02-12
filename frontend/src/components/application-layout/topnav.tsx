import { CommandBar } from '@/components/command-bar/command-bar';
import DarkMode from '@/components/darkmode/darkmode';
import IconLogo from '@/components/icons/logo';

import UserMenu from './user-menu';

export type TopNavProps = {};

export default function TopNav({}: TopNavProps) {
  return (
    <nav className="flex flex-none px-4 py-4">
      <div className="flex items-center gap-3">
        <IconLogo className="h-8 w-8" />
        <span className="text-2xl font-semibold">oniryk</span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 px-4">
        <DarkMode />
        <CommandBar />
      </div>

      <UserMenu />
    </nav>
  );
}
