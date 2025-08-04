import { z } from 'zod';

export type ShortenUrlState = {
  success: boolean;
  message: string;
  shortUrl?: string;
  error?: {
    url?: string[];
  };
};

export type UrlStats = {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
};

const UrlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export async function shortenUrl(url: string): Promise<ShortenUrlState> {
  const validatedFields = UrlSchema.safeParse({ url });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid URL provided.',
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Making request to:', `${API_BASE_URL}/urls`);
    
    const response = await fetch(`${API_BASE_URL}/urls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: validatedFields.data.url,
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to shorten URL',
      };
    }

    return {
      success: true,
      message: 'URL shortened successfully!',
      shortUrl: data.data.shortUrl,
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      success: false,
      message: `Connection error: ${error instanceof Error ? error.message : 'Please check your internet connection and try again.'}`,
    };
  }
}

export async function getUrlStats(shortCode: string): Promise<UrlStats | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/${shortCode}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching URL stats:', error);
    return null;
  }
}
