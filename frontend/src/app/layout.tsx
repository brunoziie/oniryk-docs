import type { Metadata } from 'next';
import './globals.css';

import { GeistSans } from 'geist/font/sans';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: 'oniryk-docs',
  description: 'a documentation manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: 'light' }}>
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="icon" href="/brand.svg" sizes="any" />
      </head>

      <body className={`${GeistSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
