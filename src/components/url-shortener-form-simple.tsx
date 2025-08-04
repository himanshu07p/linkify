'use client';

import { shortenUrl, type ShortenUrlState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRef, useState } from 'react';

export function UrlShortenerFormSimple() {
  const [state, setState] = useState<ShortenUrlState>({ success: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
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
        <Card className="bg-secondary border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Your shortened URL:</p>
            <p className="text-lg font-semibold text-primary break-all">{shortUrl}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
