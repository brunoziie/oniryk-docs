import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { MenuContext } from '../menu-context';

export default function ApplicationLayoutContent({ children }: React.PropsWithChildren) {
  const { isOpen } = useContext(MenuContext);

  return (
    <section
      className={cn('flex-1 flex transition-all duration-200 ease-in-out', {
        'pr-4 pb-4': !isOpen,
      })}
    >
      <div
        className={cn(
          `flex-1 transition-all duration-200 ease-in-out rounded-tl-xl bg-white dark:bg-zinc-800`,
          `dark:border-zinc-700 dark:border shadow p-8 overflow-auto`,
          { 'rounded-tr-xl rounded-bl-xl rounded-br-xl': !isOpen }
        )}
      >
        {children}
      </div>
    </section>
  );
}
