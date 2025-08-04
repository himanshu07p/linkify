import { UrlShortenerFormSimple } from '@/components/url-shortener-form-simple';

export default function Home() {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center text-center px-4">
      <div className="relative mb-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-400 mb-4 font-headline leading-tight md:leading-tight">
          Shorten Your Long Links
        </h1>
      </div>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
        Linkify is a simple and fast URL shortener. Paste your long URL to get a shortened version instantly. Built for performance and reliability.
      </p>
      <div className="w-full max-w-2xl">
        <UrlShortenerFormSimple />
      </div>
    </div>
  );
}
