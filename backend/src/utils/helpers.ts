import { nanoid } from 'nanoid';

export const generateShortCode = (length: number = 7): string => {
  return nanoid(length);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};
