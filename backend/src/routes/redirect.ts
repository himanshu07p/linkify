import { Router } from 'express';
import { redirectToOriginalUrl, getUrlStats } from '../controllers/redirectController';
import { validateParams } from '../middleware/validation';
import { shortCodeSchema } from '../validation/schemas';
import { redirectRateLimit } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting to redirects
router.use(redirectRateLimit);

// GET /api/redirect/:shortCode - Redirect to original URL
router.get('/:shortCode', validateParams(shortCodeSchema), redirectToOriginalUrl);

// GET /api/stats/:shortCode - Get URL statistics
router.get('/stats/:shortCode', validateParams(shortCodeSchema), getUrlStats);

export default router;
