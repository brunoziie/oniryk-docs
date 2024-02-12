import { cs } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { Card, CardContent } from '../../ui/card';

export type BaseCardProps = PropsWithChildren<{
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void | Promise<void>;
}>;

export default function BaseCard({
  children,
  hoverEffect,
  className,
  onClick,
}: BaseCardProps) {
  const baseClasses = ['border-input border shadow-sm'];

  if (hoverEffect) {
    baseClasses.push('transition-all duration-200 hover:-translate-y-1 hover:shadow-md');
  }

  if (className) {
    baseClasses.push(className);
  }

  return (
    <Card
      onClick={onClick}
      className={cs({
        light: baseClasses,
        dark: 'border-zinc-700',
      })}
    >
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}
