import { UserRepository } from '../repositories/user.repository';
import { AuditRepository } from '../repositories/audit.repository';
import { hashPassword, comparePassword, isStrongPassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, generateVerificationToken, generateOTP, verifyRefreshToken } from '../utils/tokens';
import { BadRequestError, UnauthorizedError, ConflictError, TooManyRequestsError } from '../utils/errors';
import { logger } from '../utils/logger';

const userRepo = new UserRepository();
const auditRepo = new AuditRepository();

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 30 * 60 * 1000;

export class AuthService {
  async register(input: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
  }) {
    if (!isStrongPassword(input.password)) {
      throw new BadRequestError(
        'Password must be 8+ chars with uppercase, lowercase, number, and special character',
        'WEAK_PASSWORD'
      );
    }

    const existing = await userRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await hashPassword(input.password);
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const user = await userRepo.create({
      email: input.email,
      password_hash: passwordHash,
      full_name: input.fullName,
      phone: input.phone,
      email_verification_token: verificationToken,
      email_verification_expires: verificationExpires,
    });

    await auditRepo.create({
      user_id: user.id,
      action: 'user.register',
      entity_type: 'user',
      entity_id: user.id,
    });

    logger.info('User registered', { userId: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        isEmailVerified: user.is_email_verified,
      },
      verificationToken,
    };
  }

  async login(input: { email: string; password: string }, ip?: string, userAgent?: string) {
    const user = await userRepo.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.account_locked_until) {
      const lockExpiry = new Date(user.account_locked_until);
      if (lockExpiry > new Date()) {
        const minutesLeft = Math.ceil((lockExpiry.getTime() - Date.now()) / 60000);
        throw new TooManyRequestsError(
          `Account locked. Try again in ${minutesLeft} minutes`
        );
      }
      await userRepo.resetFailedAttempts(user.id);
    }

    const isValid = await comparePassword(input.password, user.password_hash);
    if (!isValid) {
      await userRepo.incrementFailedAttempts(user.id);
      const remaining = MAX_FAILED_ATTEMPTS - (user.failed_login_attempts + 1);
      if (remaining <= 0) {
        throw new TooManyRequestsError('Account locked due to too many failed attempts');
      }
      throw new UnauthorizedError(
        `Invalid email or password. ${remaining} attempts remaining`
      );
    }

    if (!user.is_email_verified) {
      throw new BadRequestError('Please verify your email before logging in', 'EMAIL_NOT_VERIFIED');
    }

    await userRepo.resetFailedAttempts(user.id);

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await userRepo.update(user.id, {
      refresh_token: refreshToken,
      refresh_token_expires: refreshExpires,
    });

    await auditRepo.create({
      user_id: user.id,
      action: 'user.login',
      entity_type: 'user',
      entity_id: user.id,
      ip_address: ip,
      user_agent: userAgent,
    });

    logger.info('User logged in', { userId: user.id });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        walletBalance: user.wallet_balance,
        coinBalance: user.coin_balance,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await userRepo.findByVerificationToken(token);
    if (!user) {
      throw new BadRequestError('Invalid verification token');
    }

    if (user.email_verification_expires) {
      const expiry = new Date(user.email_verification_expires);
      if (expiry < new Date()) {
        throw new BadRequestError('Verification token has expired');
      }
    }

    await userRepo.update(user.id, {
      is_email_verified: true,
      email_verification_token: null,
      email_verification_expires: null,
    } as any);

    await auditRepo.create({
      user_id: user.id,
      action: 'user.email_verified',
      entity_type: 'user',
      entity_id: user.id,
    });

    return { message: 'Email verified successfully' };
  }

  async refreshTokens(currentRefreshToken: string) {
    const payload = verifyRefreshToken(currentRefreshToken);
    const user = await userRepo.findById(payload.userId);

    if (!user || user.refresh_token !== currentRefreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (user.refresh_token_expires) {
      const expiry = new Date(user.refresh_token_expires);
      if (expiry < new Date()) {
        throw new UnauthorizedError('Refresh token has expired');
      }
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await userRepo.update(user.id, {
      refresh_token: refreshToken,
      refresh_token_expires: refreshExpires,
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await userRepo.update(userId, {
      refresh_token: null,
      refresh_token_expires: null,
    } as any);

    await auditRepo.create({
      user_id: userId,
      action: 'user.logout',
      entity_type: 'user',
      entity_id: userId,
    });
  }

  async getProfile(userId: string) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      phone: user.phone,
      isEmailVerified: user.is_email_verified,
      role: user.role,
      walletBalance: user.wallet_balance,
      coinBalance: user.coin_balance,
      createdAt: user.created_at,
    };
  }

  async sendOtp(email: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await userRepo.update(user.id, {
      otp_code: otp,
      otp_expires: otpExpires,
    });

    logger.info('OTP generated', { userId: user.id, otp });

    return { message: 'OTP sent to email' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (!user.otp_code || user.otp_code !== otp) {
      throw new BadRequestError('Invalid OTP');
    }

    if (user.otp_expires) {
      const expiry = new Date(user.otp_expires);
      if (expiry < new Date()) {
        throw new BadRequestError('OTP has expired');
      }
    }

    await userRepo.update(user.id, {
      otp_code: null,
      otp_expires: null,
      is_email_verified: true,
    } as any);

    return { message: 'OTP verified successfully' };
  }
}
