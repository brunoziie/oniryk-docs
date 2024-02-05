import { cn } from '@/lib/utils';
import {
  Calendar,
  FolderHeart,
  FolderOpenDot,
  Home,
  LucideIcon,
  MessagesSquare,
  PanelRightOpen,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { MenuContext } from '../menu-context';

export type MenuItemProps = {
  icon: LucideIcon;
  title: string;
  href: string;
};

export function MenuItem({ icon: Icon, title, href }: MenuItemProps) {
  const { isOpen } = useContext(MenuContext);

  return (
    <li
      className={cn(
        'font-medium px-2 py-2 hover:bg-zinc-100 dark:text-zinc-400 mx-2 dark:hover:bg-zinc-600 rounded-sm text-zinc-500 hover:text-zinc-800',
        'items-center ease-in-out duration-250 transition-colors',
        { 'w-[32px]': !isOpen }
      )}
    >
      <Link href={href} className="flex items-center h-5 w-[280px]">
        <Icon size={16} className="mr-2" />
        <span
          className={cn('transition-all duration-250', {
            invisible: !isOpen,
            'opacity-0': !isOpen,
          })}
        >
          {title}
        </span>
      </Link>
    </li>
  );
}

export function GroupTitle({ title }: { title: string }) {
  const { isOpen } = useContext(MenuContext);

  return (
    <li className="px-4 h-10 flex items-center">
      <span
        className={cn(
          'uppercase text-zinc-400 dark:text-zinc-300 text-xs select-none transition-colors',
          {
            'text-center w-[48px] -m-4 ': !isOpen,
          }
        )}
      >
        {isOpen ? title : '⎯'}
      </span>
    </li>
  );
}

export default function ApplicationLayoutSidebar() {
  const { isOpen, toggle } = useContext(MenuContext);

  return (
    <aside
      className={`${isOpen ? 'w-[280px]' : 'w-[64px]'} text-sm px-2 flex flex-col transition-all`}
    >
      <ul className="flex-1 w-[264px]">
        <GroupTitle title="workspace" />

        <MenuItem href="/" icon={Home} title="Dashboard" />
        <MenuItem href="/" icon={FolderOpenDot} title="Projects" />
        <MenuItem href="/" icon={Users} title="Teams" />
        <MenuItem href="/" icon={Calendar} title="Calendar" />
        <MenuItem href="/" icon={MessagesSquare} title="Journaling" />

        <GroupTitle title="favorites" />

        <MenuItem href="/" icon={FolderHeart} title="Rocambole" />
        <MenuItem href="/" icon={FolderHeart} title="NutriNutri" />
        <MenuItem href="/" icon={FolderHeart} title="Sabonete Label" />
      </ul>

      <button
        className="p-2 m-2 rounded-sm flex-none w-8 mb-4 border-zinc-200 dark:border-zinc-500 border hover:bg-zinc-100"
        onClick={() => toggle()}
      >
        <PanelRightOpen
          size={16}
          className={`text-zinc-500 ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>
    </aside>
  );
}
