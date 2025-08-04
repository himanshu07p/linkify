'use client';

import { shortenUrl, type ShortenUrlState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Copy, BarChart2, Loader2, AlertCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export function UrlShortenerForm() {
  const [state, setState] = useState<ShortenUrlState>({ success: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [shortUrl, setShortUrl] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    
    const result = await shortenUrl(url);
    setState(result);
    
    if (result.success) {
      setShortUrl(result.shortUrl);
      formRef.current?.reset();
    }
    
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast({
        title: 'Copied to clipboard!',
        description: shortUrl,
        variant: 'default'
      });
    }
  };

  return (
    <div className="space-y-6 w-full">
      <Card className="bg-card/50 border-border shadow-lg">
        <CardContent className="p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input
                  type="url"
                  name="url"
                  placeholder="https://your-long-url.com/to-be-shortened"
                  aria-label="URL to shorten"
                  className="h-12 text-base bg-input border-border/50 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    Shorten URL
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            {state.error?.url && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {state.error.url[0]}
              </p>
            )}
             {!state.success && state.message && !state.error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {state.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {shortUrl && (
        <Card className="bg-secondary border-border/50 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
          <CardHeader>
            <CardTitle className="text-xl">Your Shortened Link!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border/50">
              <Link
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-primary flex-grow truncate hover:underline"
              >
                {shortUrl.replace(/^https?:\/\//, '')}
              </Link>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
                <Copy className="h-5 w-5" />
                <span className="sr-only">Copy URL</span>
              </Button>
            </div>
            <div className="flex justify-end">
              <Button asChild variant="link" className="text-accent-foreground hover:text-accent-foreground/80">
                <Link href={`/stats/${shortUrl.split('/').pop()}`}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Stats
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
