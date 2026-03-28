import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Chinese Name Generator',
  description: 'Discover a meaningful Chinese name that resonates with your identity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
