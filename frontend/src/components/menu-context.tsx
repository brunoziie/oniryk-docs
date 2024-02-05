'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

const initialVal = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('oniryk-menu-open') === 'true';
  }

  return false;
};

export type MenuContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

export const MenuContext = createContext({} as MenuContextValue);

export function MenuContextProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(initialVal);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((open) => {
      window.localStorage.setItem('oniryk-menu-open', String(!open));
      return !open;
    });
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, toggle }}>{children}</MenuContext.Provider>
  );
}
