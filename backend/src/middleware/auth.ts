import { Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { sendError } from '../utils/apiResponse';
import { AuthRequest } from '../types';
import { logger } from '../utils/logger';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'Authorization token required', 401);
      return;
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    req.user = {
      userId: payload.userId,
      email: payload.email,
      mobile: payload.mobile,
      role: payload.role,
    };
    next();
  } catch (error) {
    logger.debug('Auth middleware error:', error);
    sendError(res, 'Invalid or expired token', 401);
  }
};
