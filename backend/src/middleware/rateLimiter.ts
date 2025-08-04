import rateLimit from 'express-rate-limit';

export const createRateLimit = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const redirectRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 redirects per minute
  message: {
    success: false,
    error: 'Too many redirect requests, please try again later.'
  },
  skip: (req) => {
    // Skip rate limiting for health checks or specific paths
    return req.path === '/health';
  }
});
