'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ExternalLink, Calendar, MousePointer, Link2 } from 'lucide-react';

interface UrlStats {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://linkify-backend-tawny.vercel.app/api'
    : 'http://localhost:3002/api');

export default function StatsPage() {
  const params = useParams();
  const router = useRouter();
  const shortCode = params.code as string;
  
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shortCode) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/stats/${shortCode}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Short URL not found');
          } else {
            setError('Failed to fetch URL statistics');
          }
          return;
        }

        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError('Failed to fetch URL statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortCode]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-64" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/')} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            URL Statistics
          </h1>
          <p className="text-gray-600">
            Detailed analytics for your shortened URL
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              {stats.shortCode}
            </CardTitle>
            <CardDescription>
              Created on {formatDate(stats.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Click Statistics */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Clicks</p>
                  <p className="text-3xl font-bold">{stats.clicks.toLocaleString()}</p>
                </div>
                <MousePointer className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            {/* URLs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original URL */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Original URL
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600 break-all mb-2">
                    {stats.originalUrl}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(stats.originalUrl)}
                    >
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(stats.originalUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Short URL */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Short URL
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600 break-all mb-2">
                    {stats.shortUrl}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(stats.shortUrl)}
                    >
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(stats.shortUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-gray-500">Short Code</p>
                <Badge variant="secondary" className="mt-1">
                  {stats.shortCode}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium mt-1 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(stats.createdAt)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(stats.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <Button onClick={() => router.push('/')} size="lg">
            Create Another Short URL
          </Button>
        </div>
      </div>
    </div>
  );
}
