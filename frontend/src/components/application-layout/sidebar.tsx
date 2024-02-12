'use client';

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

import { useContext } from 'react';
import { MenuContext } from '../menu-context';
import RouteLink from '../custom/route-link';

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
        'mx-2 rounded-sm px-2 py-2 font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-600',
        'duration-250 items-center transition-colors ease-in-out',
        { 'w-[32px]': !isOpen }
      )}
    >
      <RouteLink href={href} className="flex h-5 w-[280px] items-center">
        <Icon size={16} className="mr-2" />
        <span
          className={cn('duration-250 transition-all', {
            invisible: !isOpen,
            'opacity-0': !isOpen,
          })}
        >
          {title}
        </span>
      </RouteLink>
    </li>
  );
}

export function GroupTitle({ title }: { title: string }) {
  const { isOpen } = useContext(MenuContext);

  return (
    <li className="flex h-10 items-center px-4">
      <span
        className={cn(
          'select-none text-xs uppercase text-zinc-400 transition-colors dark:text-zinc-300',
          {
            '-m-4 w-[48px] text-center ': !isOpen,
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
      className={`${isOpen ? 'w-[280px]' : 'w-[64px]'} flex flex-col px-2 text-sm transition-all`}
    >
      <ul className="w-[264px] flex-1">
        <GroupTitle title="workspace" />

        <MenuItem href="/" icon={Home} title="Dashboard" />
        <MenuItem href="/projects" icon={FolderOpenDot} title="Projects" />
        <MenuItem href="/teams" icon={Users} title="Teams" />
        <MenuItem href="/calendar" icon={Calendar} title="Calendar" />
        <MenuItem href="/journaling" icon={MessagesSquare} title="Journaling" />

        <GroupTitle title="favorites" />

        <MenuItem href="/projects/a" icon={FolderHeart} title="Rocambole" />
        <MenuItem href="/projects/b" icon={FolderHeart} title="NutriNutri" />
        <MenuItem href="/projects/c" icon={FolderHeart} title="Sabonete Label" />
      </ul>

      <button
        className="m-2 mb-4 w-8 flex-none rounded-sm border border-zinc-200 p-2 hover:bg-zinc-100 dark:border-zinc-500"
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
