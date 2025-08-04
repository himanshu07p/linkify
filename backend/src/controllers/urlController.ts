import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { generateShortCode, normalizeUrl } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

export interface CreateUrlRequest {
  url: string;
  customCode?: string;
}

export interface UrlResponse {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
}

export const createShortUrl = async (req: Request, res: Response) => {
  const { url, customCode }: CreateUrlRequest = req.body;
  
  // Normalize the URL
  const normalizedUrl = normalizeUrl(url);
  
  // Generate or use custom short code
  let shortCode = customCode || generateShortCode();
  
  // Check if custom code is already taken
  if (customCode) {
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode: customCode }
    });
    
    if (existingUrl) {
      throw new AppError('Custom code is already taken', 409);
    }
  }
  
  // Ensure generated code is unique
  while (!customCode) {
    const existingUrl = await prisma.url.findUnique({
      where: { shortCode }
    });
    
    if (!existingUrl) break;
    shortCode = generateShortCode();
  }
  
  // Create URL entry
  const urlEntry = await prisma.url.create({
    data: {
      originalUrl: normalizedUrl,
      shortCode
    }
  });
  
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const shortUrl = `${baseUrl}/api/redirect/${shortCode}`;
  
  const response: UrlResponse = {
    id: urlEntry.id,
    originalUrl: urlEntry.originalUrl,
    shortCode: urlEntry.shortCode,
    shortUrl,
    clicks: urlEntry.clicks,
    createdAt: urlEntry.createdAt
  };
  
  res.status(201).json({
    success: true,
    data: response
  });
};

export const getAllUrls = async (req: Request, res: Response) => {
  const page = parseInt(req.query['page'] as string) || 1;
  const limit = parseInt(req.query['limit'] as string) || 10;
  const skip = (page - 1) * limit;
  
  const [urls, total] = await Promise.all([
    prisma.url.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.url.count()
  ]);
  
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const urlsWithShortUrl = urls.map((url: any) => ({
    ...url,
    shortUrl: `${baseUrl}/api/redirect/${url.shortCode}`
  }));
  
  res.json({
    success: true,
    data: {
      urls: urlsWithShortUrl,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
};
