'use client';

import ApplicationLayoutContent from '@/components/application-layout/content';
import ApplicationLayoutSidebar from '@/components/application-layout/sidebar';
import TopNav from '@/components/application-layout/topnav';

export default function AppLayout({
  children,
  boxed,
}: React.PropsWithChildren & { boxed?: boolean }) {
  return (
    <main className="flex	h-lvh flex-col bg-zinc-50 dark:bg-zinc-900">
      <TopNav />

      <div className="flex h-fit flex-auto flex-row">
        <ApplicationLayoutSidebar />
        <ApplicationLayoutContent emptyCanvas={!boxed}>
          {children}
        </ApplicationLayoutContent>
      </div>
    </main>
  );
}
