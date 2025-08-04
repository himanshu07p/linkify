import { notFound } from 'next/navigation';
import { getUrlStats } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Calendar, Link as LinkIcon, MousePointerClick, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  params: {
    shortCode: string;
  };
};

function StatCard({ icon: Icon, title, value, description }: { icon: React.ElementType, title: string, value: string | number, description?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

export default async function StatsPage({ params }: Props) {
  const stats = await getUrlStats(params.shortCode);

  if (!stats) {
    notFound();
  }
  
  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <BarChart2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight font-headline">Statistics</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2"><LinkIcon className="h-4 w-4" />Short Link</h3>
            <a href={stats.shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary break-all">{stats.shortUrl}</a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2"><LinkIcon className="h-4 w-4" />Original URL</h3>
            <p className="text-lg font-semibold text-foreground break-all">{stats.originalUrl}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard 
          icon={MousePointerClick}
          title="Total Clicks"
          value={stats.clicks}
          description="Number of times your link has been visited."
        />
        <StatCard 
          icon={Calendar}
          title="Creation Date"
          value={new Date(stats.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          description={new Date(stats.createdAt).toLocaleTimeString()}
        />
      </div>
    </div>
  );
}
