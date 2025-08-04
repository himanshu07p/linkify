# Linkify Backend

Express.js backend for the Linkify URL shortener application.

## Features

- ✅ URL shortening with custom codes
- ✅ Click tracking and analytics
- ✅ Rate limiting
- ✅ PostgreSQL database with Prisma ORM
- ✅ Redis caching (optional)
- ✅ TypeScript support
- ✅ Input validation
- ✅ Error handling
- ✅ CORS support
- ✅ Security middleware

## API Endpoints

### URLs
- `POST /api/urls` - Create a short URL
- `GET /api/urls` - Get all URLs (with pagination)

### Redirects & Stats
- `GET /api/redirect/:shortCode` - Redirect to original URL
- `GET /api/stats/:shortCode` - Get URL statistics

### Health Check
- `GET /health` - Health check endpoint

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database and Redis URLs.

3. **Set up PostgreSQL database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Optional: Seed with sample data
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/linkify_db"
REDIS_URL="redis://localhost:6379"
FRONTEND_URL="http://localhost:3000"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SHORT_CODE_LENGTH=7
```

## API Usage Examples

### Create Short URL
```bash
curl -X POST http://localhost:3001/api/urls \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "customCode": "example"
  }'
```

### Get URL Stats
```bash
curl http://localhost:3001/api/stats/example
```

### Redirect (in browser)
```
http://localhost:3001/api/redirect/example
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # Express routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Database and Redis config
│   ├── validation/      # Input validation schemas
│   ├── utils/           # Helper functions
│   ├── scripts/         # Database scripts
│   └── app.ts          # Main application file
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

## Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Run migrations: `npm run db:migrate`
4. Start the server: `npm start`
