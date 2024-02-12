import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export type CardGroupProps = HTMLAttributes<HTMLDivElement>;

export default function CardGroup(props: CardGroupProps) {
  const { children, className, ...rest } = props;
  return (
    <div className={cn('-m-2 flex flex-wrap', className)} {...rest}>
      {children}
    </div>
  );
}
