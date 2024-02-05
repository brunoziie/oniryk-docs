'use client';

import { PropsWithChildren, createContext, useCallback, useState } from 'react';

const initialVal = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('oniryk-menu-open') === 'true';
  }

  return false;
};

export const MenuContext = createContext(
  null as { isOpen: boolean; toogle: () => void } | null
);

export function MenuContextProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(initialVal());

  const toogle = useCallback(() => {
    setIsOpen((open) => {
      window.localStorage.setItem('oniryk-menu-open', String(!open));
      return !open;
    });
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, toogle }}>{children}</MenuContext.Provider>
  );
}
