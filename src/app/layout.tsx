import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Linkify - Shorten Your URLs',
  description: 'An open-source URL shortener for everyone.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={cn('font-body antialiased h-full bg-background', inter.variable, playfairDisplay.variable)}>
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 flex flex-col items-center py-12 px-4">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
