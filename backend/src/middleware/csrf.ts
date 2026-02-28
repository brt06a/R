import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { env } from '../config/env';

const CSRF_COOKIE = 'ideanax_csrf';
const CSRF_HEADER = 'x-csrf-token';

/**
 * Generates a cryptographically secure CSRF token.
 */
export const generateCsrfToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Sets the CSRF token cookie (non-HttpOnly so the frontend JS can read it).
 */
export const setCsrfCookie = (res: Response): string => {
  const token = generateCsrfToken();
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
  return token;
};

/**
 * CSRF protection middleware using the double-submit cookie pattern.
 * Validates that the X-CSRF-Token header matches the CSRF cookie value.
 * Applied only to state-changing requests that rely on cookie-based auth.
 */
export const csrfProtection = (req: Request, res: Response, next: NextFunction): void => {
  // Skip CSRF for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    next();
    return;
  }

  // Skip CSRF for requests using Bearer token (JWT in Authorization header)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  // Webhook endpoints verify their own signatures — skip CSRF
  if (req.path.startsWith('/api/webhooks')) {
    next();
    return;
  }

  const cookieToken = req.cookies[CSRF_COOKIE];
  const headerToken = req.headers[CSRF_HEADER] as string | undefined;

  if (!cookieToken || !headerToken) {
    res.status(403).json({
      success: false,
      message: 'CSRF token missing. Please obtain a token from /api/csrf-token.',
    });
    return;
  }

  if (!crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken))) {
    res.status(403).json({
      success: false,
      message: 'Invalid CSRF token.',
    });
    return;
  }

  next();
};
