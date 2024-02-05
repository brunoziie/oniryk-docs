'use client';

import ApplicationLayoutContent from '@/components/application-layout/content';
import ApplicationLayoutSidebar from '@/components/application-layout/sidebar';
import { CommandBar } from '@/components/command-bar/command-bar';
import DarkMode from '@/components/darkmode/darkmode';
import IconLogo from '@/components/icons/logo';
import Providers from '@/components/providers';
import Image from 'next/image';

export default function AuthenticatedLayout({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <main className="bg-zinc-50	h-lvh flex-col flex dark:bg-zinc-900">
        <nav className="px-4 py-4 flex flex-none">
          <div className="flex gap-3 items-center">
            <IconLogo className="w-8 h-8" />
            <span className="font-semibold text-lg">Oniryk</span>
          </div>

          <div className="flex-1 flex justify-end items-center px-4 gap-4">
            <DarkMode />
            <CommandBar />
          </div>

          <div>
            <Image
              className="rounded-full"
              src="/avatar.png"
              width={32}
              height={32}
              alt="Avatar"
            />
          </div>
        </nav>

        <div className="flex flex-auto h-fit flex-row">
          <ApplicationLayoutSidebar />
          <ApplicationLayoutContent>{children}</ApplicationLayoutContent>
        </div>
      </main>
    </Providers>
  );
}
