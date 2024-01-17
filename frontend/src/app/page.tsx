'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Container } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <Button>
        <Container className="mr-2 h-4 w-4" /> Button
      </Button>
      <Switch
        defaultChecked={theme === 'dark'}
        onCheckedChange={(value) => {
          setTheme(value ? 'dark' : 'light');
        }}
      ></Switch>
    </main>
  );
}
