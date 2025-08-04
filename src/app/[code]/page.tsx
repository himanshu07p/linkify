import { notFound, redirect } from 'next/navigation';

type Props = {
  params: {
    code: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export default async function ShortCodePage({ params }: Props) {
  const { code } = params;
  
  try {
    // Make a request to the Express backend to get the redirect URL
    const response = await fetch(`${API_BASE_URL}/redirect/${code}`, {
      method: 'GET',
      redirect: 'manual', // Don't follow redirects automatically
    });

    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('location');
      if (location) {
        redirect(location);
      }
    }

    // If we get here, the short code was not found
    notFound();
  } catch (error) {
    notFound();
  }
}
