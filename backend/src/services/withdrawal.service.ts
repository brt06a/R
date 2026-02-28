import { WithdrawalRepository } from '../repositories/withdrawal.repository';
import { WalletRepository } from '../repositories/wallet.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuditRepository } from '../repositories/audit.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

const withdrawalRepo = new WithdrawalRepository();
const walletRepo = new WalletRepository();
const userRepo = new UserRepository();
const auditRepo = new AuditRepository();

const PLATFORM_FEE_PERCENT = 2;
const MIN_WITHDRAWAL_AMOUNT = 500;

export class WithdrawalService {
  async createWithdrawal(
    userId: string,
    input: {
      amount: number;
      payoutMode: string;
      bankAccountName?: string;
      bankAccountNumber?: string;
      bankIfsc?: string;
      bankName?: string;
      upiId?: string;
    }
  ) {
    if (input.amount < MIN_WITHDRAWAL_AMOUNT) {
      throw new BadRequestError(`Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`);
    }

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (Number(user.wallet_balance) < input.amount) {
      throw new BadRequestError(
        `Insufficient balance. Available: ₹${user.wallet_balance}`,
        'INSUFFICIENT_BALANCE'
      );
    }

    const platformFee = Math.round(input.amount * PLATFORM_FEE_PERCENT) / 100;
    const netAmount = input.amount - platformFee;

    const newBalance = await walletRepo.updateUserWallet(userId, -input.amount, 0);

    const withdrawal = await withdrawalRepo.create({
      user_id: userId,
      amount: input.amount,
      platform_fee: platformFee,
      net_amount: netAmount,
      payout_mode: input.payoutMode,
      bank_account_name: input.bankAccountName,
      bank_account_number: input.bankAccountNumber,
      bank_ifsc: input.bankIfsc,
      bank_name: input.bankName,
      upi_id: input.upiId,
    });

    await walletRepo.createTransaction({
      user_id: userId,
      type: 'withdrawal',
      amount: -input.amount,
      balance_after: Number(newBalance.wallet_balance),
      coin_balance_after: Number(newBalance.coin_balance),
      reference_id: withdrawal.id,
      description: `Withdrawal of ₹${input.amount} (Fee: ₹${platformFee})`,
      status: 'completed',
    });

    await auditRepo.create({
      user_id: userId,
      action: 'withdrawal.created',
      entity_type: 'withdrawal',
      entity_id: withdrawal.id,
      new_values: { amount: input.amount, platformFee, netAmount, payoutMode: input.payoutMode },
    });

    logger.info('Withdrawal created', { userId, withdrawalId: withdrawal.id, amount: input.amount });

    return withdrawal;
  }

  async getWithdrawals(userId: string, page: number = 1, limit: number = 20) {
    return withdrawalRepo.findByUserId(userId, page, limit);
  }

  async getWithdrawal(withdrawalId: string, userId: string) {
    const withdrawal = await withdrawalRepo.findById(withdrawalId);
    if (!withdrawal) {
      throw new NotFoundError('Withdrawal not found');
    }
    if (withdrawal.user_id !== userId) {
      throw new NotFoundError('Withdrawal not found');
    }
    return withdrawal;
  }

  async cancelWithdrawal(withdrawalId: string, userId: string) {
    const withdrawal = await withdrawalRepo.findById(withdrawalId);
    if (!withdrawal) {
      throw new NotFoundError('Withdrawal not found');
    }
    if (withdrawal.user_id !== userId) {
      throw new NotFoundError('Withdrawal not found');
    }
    if (withdrawal.status !== 'pending') {
      throw new BadRequestError('Only pending withdrawals can be cancelled');
    }

    await walletRepo.updateUserWallet(userId, withdrawal.amount, 0);
    const updated = await withdrawalRepo.update(withdrawalId, { status: 'cancelled' } as any);

    await walletRepo.createTransaction({
      user_id: userId,
      type: 'refund',
      amount: withdrawal.amount,
      description: `Withdrawal cancelled - refund of ₹${withdrawal.amount}`,
      reference_id: withdrawalId,
    });

    await auditRepo.create({
      user_id: userId,
      action: 'withdrawal.cancelled',
      entity_type: 'withdrawal',
      entity_id: withdrawalId,
    });

    return updated;
  }
}
