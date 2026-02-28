import { PrismaClient } from '@prisma/client';
import { OTP_EXPIRY_MINUTES } from '../utils/constants';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const generateAndSendOtp = async (userId: string, contact: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.user.update({
    where: { id: userId },
    data: { otpCode: otp, otpExpiresAt: expiresAt },
  });

  // In production, send via email/SMS service
  logger.info(`OTP for ${contact}: ${otp}`);
  console.log(`\n📧 OTP Code: ${otp} (expires in ${OTP_EXPIRY_MINUTES} minutes)\n`);

  return { success: true };
};

export const resendOtp = async (email?: string, mobile?: string) => {
  const where = email ? { email } : { mobile };
  const user = await prisma.user.findFirst({ where });

  if (!user) throw new Error('User not found');
  if (user.isVerified) throw new Error('Account already verified');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: otp, otpExpiresAt: expiresAt },
  });

  logger.info(`Resent OTP for ${email || mobile}: ${otp}`);
  console.log(`\n📧 Resent OTP Code: ${otp} (expires in ${OTP_EXPIRY_MINUTES} minutes)\n`);

  return { success: true };
};
