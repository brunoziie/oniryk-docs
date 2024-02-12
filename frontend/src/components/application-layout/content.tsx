'use client';

import { cn, cs } from '@/lib/utils';
import { useContext } from 'react';
import { MenuContext } from '../menu-context';

export type ApplicationLayoutContentProps = React.PropsWithChildren & {
  emptyCanvas?: boolean;
};

export default function ApplicationLayoutContent({
  children,
  emptyCanvas,
}: ApplicationLayoutContentProps) {
  const { isOpen } = useContext(MenuContext);

  return (
    <section
      className={cn(
        'flex max-h-[calc(100vh-64px)] flex-1 transition-all duration-200 ease-in-out',
        { 'pb-4 pr-4': !isOpen }
      )}
    >
      {emptyCanvas ? (
        children
      ) : (
        <div
          className={cs({
            light: [
              'flex-1 rounded-tl-xl bg-white transition-all duration-200 ease-in-out dark:bg-black',
              'h-full overflow-auto p-8 shadow',
              { 'rounded-bl-xl rounded-br-xl rounded-tr-xl': !isOpen },
            ],
            dark: ['border border-zinc-700'],
          })}
        >
          {children}
        </div>
      )}
    </section>
  );
}
