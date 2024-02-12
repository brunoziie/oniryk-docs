import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export type RouteLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function RouteLink({ href, children, className }: RouteLinkProps) {
  const router = useRouter();
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isExternal) {
        router.push(href);
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [router, isExternal, href]
  );

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
