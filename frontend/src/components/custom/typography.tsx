import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type ClassName = string | undefined;
type TextProps = PropsWithChildren & {
  className?: ClassName;
};

type HeadingProps = TextProps & { size?: 1 | 2 | 3 | 4 | 5 | 6 };

const mg = (...classes: (undefined | string)[]) => cn(classes.filter(Boolean));
const getHeadingSize = (size?: number) => {
  switch (size) {
    case 1:
      return 'text-4xl';
    case 2:
      return 'text-3xl';
    case 3:
      return 'text-2xl';
    case 4:
      return 'text-xl';
    case 5:
      return 'text-lg';
    case 6:
      return 'text-base';
    default:
      return 'text-4xl';
  }
};

export function TextDefault(props: TextProps) {
  const className = mg('font-regular text-zinc-600', props.className);
  return <span className={className}>{props.children}</span>;
}

export function Title(props: TextProps) {
  const className = mg('font-semibold text-zinc-800', props.className);
  return <h1 className={className}>{props.children}</h1>;
}

export function LightweightTitle(props: TextProps) {
  const className = mg('font-medium text-zinc-800 dark:text-white', props.className);
  return <h1 className={className}>{props.children}</h1>;
}

export function Paragraph(props: TextProps) {
  const className = mg('font-regular text-zinc-600', props.className);
  return <p className={className}>{props.children}</p>;
}

export function Heading({ children, className, size }: HeadingProps) {
  const klassName = mg('font-bold text-zinc-800', className, getHeadingSize(size));
  return <h1 className={klassName}>{children}</h1>;
}

export function TextSecondary(props: TextProps) {
  const className = mg('text-sm text-zinc-400', props.className);
  return <p className={className}>{props.children}</p>;
}
