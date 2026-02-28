import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import {
  signupUser,
  verifyOtpAndActivate,
  loginUser,
  refreshUserTokens,
  logoutUser,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../services/auth.service';
import { resendOtp } from '../services/otp.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { REFRESH_TOKEN_COOKIE } from '../utils/constants';
import { logger } from '../utils/logger';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await signupUser(req.body);
    sendSuccess(res, 'OTP sent successfully. Please verify your account.', result, 201);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, tokens } = await verifyOtpAndActivate(req.body);
    setRefreshTokenCookie(res, tokens.refreshToken);
    sendSuccess(res, 'Account verified successfully! Welcome to IdeaNax.', {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        coinBalance: user.coinBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user, tokens } = await loginUser(req.body);
    setRefreshTokenCookie(res, tokens.refreshToken);
    sendSuccess(res, 'Login successful', {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        coinBalance: user.coinBalance,
        walletBalance: user.walletBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies[REFRESH_TOKEN_COOKIE] || req.body.refreshToken;
    if (!token) {
      sendError(res, 'Refresh token required', 401);
      return;
    }

    const tokens = await refreshUserTokens(token);
    setRefreshTokenCookie(res, tokens.refreshToken);
    sendSuccess(res, 'Token refreshed successfully', { accessToken: tokens.accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.userId) {
      await logoutUser(req.user.userId);
    }
    clearRefreshTokenCookie(res);
    sendSuccess(res, 'Logged out successfully');
  } catch (error) {
    logger.error('Logout error:', error);
    clearRefreshTokenCookie(res);
    sendSuccess(res, 'Logged out successfully');
  }
};

export const resendOtpController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await resendOtp(req.body.email, req.body.mobile);
    sendSuccess(res, 'OTP resent successfully');
  } catch (error) {
    next(error);
  }
};
