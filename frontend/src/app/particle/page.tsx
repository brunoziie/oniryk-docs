'use client';

import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ui/particle-background';
import { Switch } from '@/components/ui/switch';
import { Container } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main>
      <ParticleBackground />

      <div className="flex min-h-screen w-full flex-col justify-between p-24 absolute top-0 left-0">
        <Button>
          <Container className="mr-2 h-4 w-4" /> Button
        </Button>
        <Switch
          defaultChecked={theme === 'dark'}
          onCheckedChange={(value) => {
            setTheme(value ? 'dark' : 'light');
          }}
        ></Switch>
      </div>
    </main>
  );
}
