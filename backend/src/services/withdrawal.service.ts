import { PrismaClient } from '@prisma/client';
import { PLATFORM_FEE_PERCENT, MIN_WITHDRAWAL_AMOUNT } from '../utils/constants';
import { addPayoutJob } from '../queues/payoutQueue';

const prisma = new PrismaClient();

export const requestWithdrawal = async (
  userId: string,
  amount: number,
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  }
) => {
  if (amount < MIN_WITHDRAWAL_AMOUNT) {
    throw new Error(`Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { walletBalance: true, name: true, email: true },
  });

  if (!user) throw new Error('User not found');
  if (user.walletBalance < amount) throw new Error('Insufficient wallet balance');

  const platformFee = (amount * PLATFORM_FEE_PERCENT) / 100;
  const netAmount = amount - platformFee;

  const withdrawal = await prisma.$transaction(async (tx) => {
    const w = await tx.withdrawal.create({
      data: {
        userId,
        amount,
        platformFee,
        netAmount,
        status: 'PENDING',
        accountNumber: bankDetails.accountNumber,
        ifscCode: bankDetails.ifscCode,
        accountHolderName: bankDetails.accountHolderName,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { walletBalance: { decrement: amount } },
    });

    await tx.walletTransaction.create({
      data: {
        userId,
        type: 'DEBIT',
        reason: 'WITHDRAWAL',
        amount,
        coins: 0,
        status: 'COMPLETED',
        metadata: { withdrawalId: w.id },
      },
    });

    return w;
  });

  return withdrawal;
};

export const getWithdrawalHistory = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [withdrawals, total] = await Promise.all([
    prisma.withdrawal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.withdrawal.count({ where: { userId } }),
  ]);

  return { withdrawals, total };
};

export const processApprovedWithdrawal = async (withdrawalId: string) => {
  const withdrawal = await prisma.withdrawal.findUnique({
    where: { id: withdrawalId },
    include: { user: { select: { name: true, email: true, mobile: true } } },
  });

  if (!withdrawal || withdrawal.status !== 'APPROVED') {
    throw new Error('Withdrawal not found or not approved');
  }

  // Update to PROCESSING
  await prisma.withdrawal.update({
    where: { id: withdrawalId },
    data: { status: 'PROCESSING' },
  });

  // Add to payout queue
  await addPayoutJob({
    withdrawalId: withdrawal.id,
    amount: withdrawal.netAmount,
    bankAccount: withdrawal.accountNumber,
    ifsc: withdrawal.ifscCode,
    name: withdrawal.accountHolderName,
    email: withdrawal.user.email || undefined,
  });
};
