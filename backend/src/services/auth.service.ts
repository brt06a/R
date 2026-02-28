import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateTokenPair } from '../utils/jwt';
import { JwtPayload } from '../types';
import { SIGNUP_BONUS_COINS, OTP_EXPIRY_MINUTES, REFRESH_TOKEN_COOKIE } from '../utils/constants';
import { logger } from '../utils/logger';
import { Response } from 'express';
import { env } from '../config/env';

const prisma = new PrismaClient();

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const signupUser = async (data: {
  name: string;
  email?: string;
  mobile?: string;
  dateOfBirth: string;
  password: string;
}) => {
  // Check if user exists
  if (data.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already registered');
  }
  if (data.mobile) {
    const existing = await prisma.user.findUnique({ where: { mobile: data.mobile } });
    if (existing) throw new Error('Mobile number already registered');
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const otpCode = generateOtp();
  const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      dateOfBirth: new Date(data.dateOfBirth),
      password: hashedPassword,
      otpCode,
      otpExpiresAt,
      isVerified: false,
    },
  });

  // Log OTP (will be replaced with email service)
  logger.info(`OTP for ${data.email || data.mobile}: ${otpCode}`);
  console.log(`\n📧 OTP Code: ${otpCode} (expires in ${OTP_EXPIRY_MINUTES} minutes)\n`);

  return { userId: user.id, message: 'OTP sent successfully' };
};

export const verifyOtpAndActivate = async (data: {
  email?: string;
  mobile?: string;
  otp: string;
}) => {
  const where = data.email ? { email: data.email } : { mobile: data.mobile };
  const user = await prisma.user.findFirst({ where });

  if (!user) throw new Error('User not found');
  if (user.isVerified) throw new Error('Account already verified');
  if (!user.otpCode || user.otpCode !== data.otp) throw new Error('Invalid OTP');
  if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) throw new Error('OTP has expired');

  // Activate user with signup bonus
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      otpCode: null,
      otpExpiresAt: null,
      coinBalance: SIGNUP_BONUS_COINS,
    },
  });

  // Create signup bonus transaction
  await prisma.walletTransaction.create({
    data: {
      userId: user.id,
      type: 'CREDIT',
      reason: 'SIGNUP_BONUS',
      amount: 0,
      coins: SIGNUP_BONUS_COINS,
      status: 'COMPLETED',
    },
  });

  const payload: JwtPayload = {
    userId: updatedUser.id,
    email: updatedUser.email ?? undefined,
    mobile: updatedUser.mobile ?? undefined,
    role: updatedUser.role,
  };

  const tokens = generateTokenPair(payload);

  // Store refresh token hash
  const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  return { user: updatedUser, tokens };
};

export const loginUser = async (data: {
  email?: string;
  mobile?: string;
  password: string;
}) => {
  const where = data.email ? { email: data.email } : { mobile: data.mobile };
  const user = await prisma.user.findFirst({ where });

  if (!user) throw new Error('Invalid credentials');
  if (!user.isVerified) throw new Error('Please verify your account first');

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) throw new Error('Invalid credentials');

  const payload: JwtPayload = {
    userId: user.id,
    email: user.email ?? undefined,
    mobile: user.mobile ?? undefined,
    role: user.role,
  };

  const tokens = generateTokenPair(payload);

  // Store refresh token hash
  const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  return { user, tokens };
};

export const refreshUserTokens = async (refreshToken: string) => {
  const { verifyRefreshToken } = await import('../utils/jwt');
  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.refreshToken) throw new Error('Invalid refresh token');

  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
  if (!isValid) throw new Error('Invalid refresh token');

  const newPayload: JwtPayload = {
    userId: user.id,
    email: user.email ?? undefined,
    mobile: user.mobile ?? undefined,
    role: user.role,
  };

  const tokens = generateTokenPair(newPayload);
  const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  return tokens;
};

export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
