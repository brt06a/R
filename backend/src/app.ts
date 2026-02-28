import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { generalRateLimiter } from './middleware/rateLimiter';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { csrfProtection, setCsrfCookie } from './middleware/csrf';
import { logger } from './utils/logger';
import { env } from './config/env';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import ideaRoutes from './routes/idea.routes';
import walletRoutes from './routes/wallet.routes';
import withdrawalRoutes from './routes/withdrawal.routes';
import categoryRoutes from './routes/category.routes';
import messageRoutes from './routes/message.routes';
import webhookRoutes from './routes/webhook.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));

// Rate limiting
app.use(generalRateLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CSRF protection (double-submit cookie pattern)
app.use(csrfProtection);

// CSRF token endpoint — frontend calls this to get a token
app.get('/api/csrf-token', (req, res) => {
  const token = setCsrfCookie(res);
  res.json({ success: true, csrfToken: token });
});

// Request logging
app.use((req, _res, next) => {
  logger.debug(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/webhooks', webhookRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
