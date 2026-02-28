# IdeaNax - Deployment Guide

## Production Deployment

### 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run all migration files in order (001-009)
3. Run the seed file for categories
4. Go to Storage and create two private buckets:
   - `idea-documents`
   - `idea-prototypes`
5. Copy your project URL and keys from Settings → API

### 2. Redis Setup

Use one of:
- **Upstash** (serverless, recommended): https://upstash.com
- **Redis Cloud**: https://redis.com/try-free/
- **Railway**: Add Redis plugin

### 3. Payment Setup

**Razorpay:**
1. Create account at https://razorpay.com
2. Get API keys from Dashboard → Settings → API Keys
3. Configure webhook URL: `https://your-api.com/api/v1/payments/webhook`
4. Set webhook secret

**Cashfree:**
1. Create account at https://cashfree.com
2. Get API credentials from Dashboard
3. Configure webhook for payout status updates

### 4. Backend Deployment (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Environment variables to set:
- All variables from `.env.example`
- Set `NODE_ENV=production`

### 5. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

Environment variables:
- `NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id`

### 6. Production Hardening Checklist

#### Security
- [ ] All environment variables are set securely
- [ ] CORS is configured for production frontend URL only
- [ ] Rate limiting is enabled
- [ ] Helmet security headers are active
- [ ] JWT secrets are strong (32+ characters)
- [ ] Supabase RLS policies are enabled
- [ ] Service role key is never exposed to frontend
- [ ] HTTP-only cookies are configured with Secure flag

#### Database
- [ ] All indexes are created
- [ ] RLS is enabled on all tables
- [ ] Backups are configured
- [ ] Connection pooling is enabled

#### Payments
- [ ] Razorpay webhook secret is configured
- [ ] Cashfree webhook secret is configured
- [ ] Idempotency keys prevent duplicate credits
- [ ] Payment signature verification is active

#### Monitoring
- [ ] Error logging is configured
- [ ] Health check endpoint is accessible
- [ ] Uptime monitoring is set up
- [ ] Alert notifications are configured

#### Performance
- [ ] Redis caching is enabled
- [ ] Database queries are optimized
- [ ] Frontend is using CDN
- [ ] Images are optimized
- [ ] Compression is enabled

#### Legal
- [ ] Privacy Policy is published
- [ ] Terms & Conditions are published
- [ ] Cookie consent is implemented (if needed)
