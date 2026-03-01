import { Queue } from 'bullmq';
import { createRedisConnection } from '../config/redis';
import { logger } from '../utils/logger';

export interface EmailJobData {
  type: 'OTP' | 'WELCOME' | 'NOTIFICATION';
  to: string;
  name: string;
  otp?: string;
  subject?: string;
  body?: string;
}

export const emailQueue = new Queue<EmailJobData>('email', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

export const addEmailJob = async (data: EmailJobData): Promise<void> => {
  await emailQueue.add(data.type, data);
  logger.info(`Email job added: ${data.type} to ${data.to}`);
};
