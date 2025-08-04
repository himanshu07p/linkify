import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  
  if (!shortCode) {
    throw new AppError('Short code is required', 400);
  }
  
  const urlEntry = await prisma.url.findUnique({
    where: { shortCode }
  });
  
  if (!urlEntry) {
    throw new AppError('Short URL not found', 404);
  }
  
  // Increment click count (fire and forget)
  prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } }
  }).catch(console.error);
  
  // Redirect to original URL
  res.redirect(301, urlEntry.originalUrl);
};

export const getUrlStats = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  
  if (!shortCode) {
    throw new AppError('Short code is required', 400);
  }
  
  const urlEntry = await prisma.url.findUnique({
    where: { shortCode }
  });
  
  if (!urlEntry) {
    throw new AppError('Short URL not found', 404);
  }
  
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const shortUrl = `${baseUrl}/api/redirect/${shortCode}`;
  
  res.json({
    success: true,
    data: {
      id: urlEntry.id,
      originalUrl: urlEntry.originalUrl,
      shortCode: urlEntry.shortCode,
      shortUrl,
      clicks: urlEntry.clicks,
      createdAt: urlEntry.createdAt,
      updatedAt: urlEntry.updatedAt
    }
  });
};
