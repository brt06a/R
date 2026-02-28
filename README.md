# IdeaNax

> A production-ready marketplace platform where users submit, sell, and license ideas.

## Tech Stack

### Frontend
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **React Hook Form** + Zod for form validation
- **Zustand** for state management
- **Chart.js** for analytics
- **Lucide React** for icons

### Backend
- **Node.js + Express** REST API
- **Supabase** (PostgreSQL + Storage + RLS)
- **Redis** (BullMQ) for background jobs
- **JWT** authentication with refresh tokens
- **Razorpay** for payments
- **Cashfree** for payouts
- **Winston** for logging

## Architecture

```
├── backend/                    # Express API server
│   ├── src/
│   │   ├── config/            # Environment, Supabase, Redis, Razorpay
│   │   ├── controllers/       # Route handlers
│   │   ├── services/          # Business logic
│   │   ├── repositories/      # Data access layer
│   │   ├── middlewares/        # Auth, validation, rate limiting, error handling
│   │   ├── validators/        # Zod schemas
│   │   ├── routes/            # Express routes
│   │   ├── workers/           # BullMQ background workers
│   │   └── utils/             # Helpers (tokens, password, logger, errors)
│   └── supabase/
│       ├── migrations/        # SQL schema migrations
│       └── seed/              # Category seed data (100 categories)
│
├── frontend/                   # Next.js application
│   └── src/
│       ├── app/               # App Router pages
│       │   ├── (auth)/        # Login, Register, Verify Email
│       │   ├── (dashboard)/   # Dashboard, Ideas, Wallet, Withdraw, Messages
│       │   └── legal/         # Privacy Policy, Terms & Conditions
│       ├── components/        # Reusable UI components
│       │   ├── ui/            # Button, Input, Card, Modal, Badge, etc.
│       │   ├── layout/        # Sidebar, Header, DashboardLayout
│       │   └── dashboard/     # StatCard, TransactionTable, EarningsChart
│       ├── lib/               # API client, utility functions
│       ├── hooks/             # Custom React hooks
│       ├── store/             # Zustand stores
│       ├── types/             # TypeScript interfaces
│       └── styles/            # Global CSS
```

## Features

### Authentication
- Custom JWT auth system (access + refresh tokens)
- HTTP-only cookies with Secure and SameSite flags
- bcrypt password hashing (12 rounds)
- Strong password policy (uppercase, lowercase, number, special char)
- Email verification with token
- OTP verification
- Account lockout after 5 failed login attempts (30 min)
- Rate limiting on auth endpoints

### Idea Marketplace
- Submit ideas with file uploads (documents, prototypes)
- Category-based organization (100 pre-seeded categories)
- Idea status management (pending → approved/rejected → sold/licensed)
- File storage via Supabase Storage with signed URLs
- File type and size validation
- 2-coin submission cost with atomic wallet deduction

### Wallet & Payments
- Coin purchase via Razorpay
- HMAC signature verification for payment security
- Idempotency keys to prevent duplicate credits
- Atomic wallet transactions
- Complete transaction history with pagination

### Withdrawals
- Minimum ₹500 withdrawal
- 2% platform fee
- Bank transfer and UPI payout modes
- Confirmation modal before submission
- Withdrawal cancellation for pending requests
- Cashfree Payouts integration

### Security
- Supabase Row Level Security (RLS) policies
- Input sanitization middleware
- Zod validation on all endpoints
- Helmet security headers
- CORS configuration
- Rate limiting (general, auth, payment)
- HTTP Parameter Pollution protection
- Audit logging for all critical actions
- Structured error handling

### Dashboard
- Wallet balance and coin balance cards
- Earnings overview chart
- Recent transaction table
- Idea status badges
- Dark mode support
- Responsive mobile-first design
- Skeleton loaders

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project
- Redis instance
- Razorpay account
- Cashfree account (for payouts)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your environment variables
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```

### Database Setup

Run the SQL migrations in your Supabase SQL editor in order:

1. `001_create_users.sql`
2. `002_create_categories.sql`
3. `003_create_ideas.sql`
4. `004_create_wallet_transactions.sql`
5. `005_create_withdrawals.sql`
6. `006_create_messages.sql`
7. `007_create_audit_logs.sql`
8. `008_create_rls_policies.sql`
9. `009_create_storage_buckets.sql`

Then seed categories:
```
001_seed_categories.sql
```

### Create Storage Buckets

In Supabase Dashboard → Storage:
1. Create bucket `idea-documents` (private)
2. Create bucket `idea-prototypes` (private)

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register new user |
| POST | `/api/v1/auth/login` | No | Login |
| POST | `/api/v1/auth/verify-email` | No | Verify email |
| POST | `/api/v1/auth/refresh-token` | No | Refresh tokens |
| POST | `/api/v1/auth/logout` | Yes | Logout |
| GET | `/api/v1/auth/profile` | Yes | Get profile |
| GET | `/api/v1/categories` | No | List categories |
| GET | `/api/v1/ideas` | No | List ideas |
| GET | `/api/v1/ideas/my` | Yes | My ideas |
| POST | `/api/v1/ideas` | Yes | Submit idea |
| PATCH | `/api/v1/ideas/:id` | Yes | Update idea |
| DELETE | `/api/v1/ideas/:id` | Yes | Delete idea |
| POST | `/api/v1/payments/create-order` | Yes | Create Razorpay order |
| POST | `/api/v1/payments/verify` | Yes | Verify payment |
| POST | `/api/v1/payments/webhook` | No | Razorpay webhook |
| GET | `/api/v1/wallet/transactions` | Yes | Transaction history |
| POST | `/api/v1/withdrawals` | Yes | Request withdrawal |
| GET | `/api/v1/withdrawals` | Yes | List withdrawals |
| POST | `/api/v1/withdrawals/:id/cancel` | Yes | Cancel withdrawal |
| POST | `/api/v1/messages` | Yes | Send message |
| GET | `/api/v1/messages/conversations` | Yes | List conversations |
| GET | `/api/v1/messages/unread-count` | Yes | Unread count |

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for required configuration.

## License

Proprietary - All rights reserved.
