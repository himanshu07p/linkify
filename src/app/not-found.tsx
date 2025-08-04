import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 p-8 rounded-lg bg-card border shadow-sm">
      <Frown className="w-20 h-20 text-primary" />
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-headline">Link Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Oops! The link you are looking for does not exist. It might have been deleted or there might be a typo in the URL.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
