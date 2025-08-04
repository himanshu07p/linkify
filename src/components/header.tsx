import Link from 'next/link';
import { Link2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-transparent">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Link2 className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground font-headline">
            Linkify
          </span>
        </Link>
      </div>
    </header>
  );
}
