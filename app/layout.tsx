import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chinese Name Generator | 中文名字生成器',
  description: 'Generate meaningful Chinese names based on your English name, personality, and cultural preferences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  );
}
