'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="cursor-pointer" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </div>
  );
}
