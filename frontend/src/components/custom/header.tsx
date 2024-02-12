import { HTMLAttributes } from 'react';

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export default function Header({ title, children, ...props }: HeaderProps) {
  return (
    <div {...props}>
      <div className="flex flex-row place-content-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children}
      </div>

      <div className="mb-4 mt-6 border-b border-zinc-100 dark:border-zinc-700"></div>
    </div>
  );
}
