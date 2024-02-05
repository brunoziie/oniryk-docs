import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MenuContextProvider } from './menu-context';

export default function Providers({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MenuContextProvider>{children}</MenuContextProvider>
    </ThemeProvider>
  );
}
