import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number').optional(),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date of birth',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
}).refine((data) => data.email || data.mobile, {
  message: 'Either email or mobile is required',
  path: ['email'],
});

export const verifyOtpSchema = z.object({
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
}).refine((data) => data.email || data.mobile, {
  message: 'Either email or mobile is required',
  path: ['email'],
});

export const loginSchema = z.object({
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  password: z.string().min(1, 'Password is required'),
}).refine((data) => data.email || data.mobile, {
  message: 'Either email or mobile is required',
  path: ['email'],
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().optional(),
});
