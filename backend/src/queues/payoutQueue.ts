import { Queue } from 'bullmq';
import { createRedisConnection } from '../config/redis';
import { logger } from '../utils/logger';

export interface PayoutJobData {
  withdrawalId: string;
  amount: number;
  bankAccount: string;
  ifsc: string;
  name: string;
  email?: string;
}

export const payoutQueue = new Queue<PayoutJobData>('payout', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

export const addPayoutJob = async (data: PayoutJobData): Promise<void> => {
  await payoutQueue.add('process-payout', data);
  logger.info(`Payout job added for withdrawal: ${data.withdrawalId}`);
};
