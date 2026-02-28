import { Worker, Job } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { createRedisConnection } from '../../config/redis';
import { PayoutJobData } from '../payoutQueue';
import { initiateCashfreePayout } from '../../services/cashfree.service';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

const processPayoutJob = async (job: Job<PayoutJobData>): Promise<void> => {
  const { withdrawalId, amount, bankAccount, ifsc, name, email } = job.data;

  logger.info(`Processing payout job for withdrawal: ${withdrawalId}`);

  try {
    const result = await initiateCashfreePayout({
      transferId: withdrawalId,
      amount,
      bankAccount,
      ifsc,
      name,
      email,
    });

    await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'COMPLETED',
        cashfreeTransferId: result.transferId,
        processedAt: new Date(),
      },
    });

    logger.info(`Payout completed for withdrawal: ${withdrawalId}`);
  } catch (error) {
    logger.error(`Payout failed for withdrawal ${withdrawalId}:`, error);
    await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: { status: 'FAILED' },
    });
    throw error;
  }
};

export const startPayoutWorker = () => {
  const worker = new Worker<PayoutJobData>('payout', processPayoutJob, {
    connection: createRedisConnection(),
    concurrency: 2,
  });

  worker.on('completed', (job) => {
    logger.info(`Payout job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Payout job ${job?.id} failed:`, err);
  });

  worker.on('error', (err) => {
    logger.error('Payout worker error:', err);
  });

  return worker;
};
