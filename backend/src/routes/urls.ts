import { Router } from 'express';
import { createShortUrl, getAllUrls } from '../controllers/urlController';
import { validateBody } from '../middleware/validation';
import { createUrlSchema } from '../validation/schemas';
import { createRateLimit } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting to URL creation
router.use(createRateLimit);

// POST /api/urls - Create a new short URL
router.post('/', validateBody(createUrlSchema), createShortUrl);

// GET /api/urls - Get all URLs with pagination
router.get('/', getAllUrls);

export default router;
