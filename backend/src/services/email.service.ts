import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  // Port 465 uses implicit TLS (secure: true); port 587 uses STARTTLS (secure: false)
  secure: parseInt(env.SMTP_PORT) === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string, name: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"IdeaNax" <${env.SMTP_USER}>`,
      to: email,
      subject: 'Verify Your IdeaNax Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Welcome to IdeaNax, ${name}!</h2>
          <p>Your OTP verification code is:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #6366f1; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr />
          <p style="color: #9ca3af; font-size: 12px;">IdeaNax - Where Ideas Become Value</p>
        </div>
      `,
    });
  } catch (error) {
    logger.error('Failed to send OTP email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"IdeaNax" <${env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to IdeaNax! Your account is verified.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Account Verified! Welcome, ${name}!</h2>
          <p>Your IdeaNax account has been successfully verified.</p>
          <p>You've received <strong>15 free coins</strong> to get started!</p>
          <p>Use these coins to submit your first idea and start earning.</p>
          <a href="${env.FRONTEND_URL}/dashboard" 
             style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 16px 0;">
            Go to Dashboard
          </a>
          <hr />
          <p style="color: #9ca3af; font-size: 12px;">IdeaNax - Where Ideas Become Value</p>
        </div>
      `,
    });
  } catch (error) {
    logger.error('Failed to send welcome email:', error);
    // Don't throw - welcome email failure shouldn't break the flow
  }
};
