# 🔗 Linkify - Modern URL Shortener

A professional URL shortener built with **Next.js**, **Express.js**, and **Supabase**. Create short, shareable links with real-time analytics and click tracking.

![Linkify Banner](https://img.shields.io/badge/Linkify-URL%20Shortener-blue?style=for-the-badge)

## ✨ Features

- 🚀 **Fast URL Shortening** - Instant short link generation
- 📊 **Real-time Analytics** - Track clicks and view statistics  
- 🎯 **Custom Short Codes** - Create personalized short links
- 🛡️ **Rate Limiting** - Built-in protection against abuse
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Edge Deployment** - Lightning-fast global performance
- 🔐 **Secure & Reliable** - Production-ready with comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Radix UI** - Accessible component primitives

### Backend  
- **Express.js** - Node.js web framework
- **TypeScript** - End-to-end type safety
- **Prisma** - Modern database toolkit
- **Joi** - Input validation

### Database & Deployment
- **Supabase** - PostgreSQL database with real-time features
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free)
- Vercel account (free)

### 1. Clone & Install
```bash
git clone https://github.com/himanshu07p/linkify-url-shortener.git
cd linkify-url-shortener
npm install
cd backend && npm install
```

### 2. Environment Setup

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=3002
DATABASE_URL=your_supabase_connection_string
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SHORT_CODE_LENGTH=7
```

### 3. Database Setup
```bash
cd backend
npm run db:push      # Apply schema to Supabase
npm run db:seed      # Add sample data (optional)
```

### 4. Development
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Visit: `http://localhost:3000`

## 📁 Project Structure

```
linkify-url-shortener/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Security & validation
│   │   ├── config/          # Database configuration
│   │   └── utils/           # Helper functions
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── src/                     # Next.js frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utilities & API calls
│   └── hooks/               # Custom React hooks
├── docs/                    # Documentation
└── README.md
```

## 🔌 API Endpoints

### URLs
- `POST /api/urls` - Create short URL
- `GET /api/urls` - List all URLs (paginated)

### Redirects & Analytics  
- `GET /api/redirect/:shortCode` - Redirect to original URL
- `GET /api/stats/:shortCode` - Get URL statistics

### Health Check
- `GET /health` - API health status

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy Linkify"
   git push origin main
   ```

2. **Deploy Backend:**
   - Import repository in Vercel
   - Root directory: `backend`
   - Framework: Other
   - **Copy the deployment URL** (e.g., `https://linkify-backend-abc123.vercel.app`)
   - **Important:** Add all environment variables manually in Vercel dashboard

3. **Deploy Frontend:**
   - Import same repository (or create new project)
   - Root directory: `.` (root)
   - Framework: Next.js
   - Add environment variables with your actual backend URL

### Environment Variables

**⚠️ Important:** Set these manually in Vercel dashboard (not as secrets)

**Backend (Vercel Dashboard → Settings → Environment Variables):**
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:himanshu07p@db.jvrceinkmviyjknjdyhw.supabase.co:5432/postgres
FRONTEND_URL=https://your-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SHORT_CODE_LENGTH=7
```

**Frontend (Vercel):**
```env
NEXT_PUBLIC_API_URL=https://[your-actual-backend-url].vercel.app/api
```

**Example with real URLs:**
```env
# If your backend deploys to: https://linkify-backend-abc123.vercel.app
# Then set: NEXT_PUBLIC_API_URL=https://linkify-backend-abc123.vercel.app/api
```

### Troubleshooting Deployment

**Environment Variable Issues:**
- Set environment variables directly in Vercel dashboard (not as secrets)
- Ensure `NEXT_PUBLIC_API_URL` points to your deployed backend URL
- Get backend URL from Vercel dashboard after backend deployment
- URL format: `https://[project-name]-[random-id].vercel.app/api`

**Common Fixes:**
```bash
# Remove .next cache if build fails
rm -rf .next

# Reinstall dependencies
npm install

# Check environment variables
vercel env ls
```

## 📊 Usage Examples

### Create Short URL
```bash
curl -X POST https://api.yourapp.com/api/urls \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

### Get Statistics
```bash
curl https://api.yourapp.com/api/stats/github
```

## 🛡️ Security Features

- **Rate Limiting** - Prevents abuse with configurable limits
- **Input Validation** - Joi schemas validate all inputs
- **CORS Protection** - Configurable cross-origin resource sharing
- **Helmet Security** - Security headers and protections
- **Environment Variables** - Secure configuration management

## 🎨 Design System

- **Primary Color** - Vibrant blue (#4285F4)
- **Background** - Light gray (#F5F5F5)  
- **Accent** - Teal (#009688)
- **Typography** - Inter (body), Playfair Display (headlines)
- **Components** - Radix UI with custom Tailwind styling

## 📈 Performance

- **Edge Functions** - Global CDN deployment
- **Database Pooling** - Optimized connection management
- **Caching Headers** - Browser and CDN caching
- **Code Splitting** - Automatic Next.js optimizations
- **Image Optimization** - Next.js image components

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Himanshu Patel** ([@himanshu07p](https://github.com/himanshu07p))

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Database platform
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Radix UI](https://radix-ui.com/) - Component primitives

---

<div align="center">
  <strong>Built with ❤️ for the web</strong>
</div>
# linkify
