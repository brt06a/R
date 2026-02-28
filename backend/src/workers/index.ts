import { Queue, Worker, Job } from 'bullmq';
import { getRedis } from '../config/redis';
import { logger } from '../utils/logger';

const connection = { connection: getRedis() };

export const paymentQueue = new Queue('payment-verification', connection);
export const withdrawalQueue = new Queue('withdrawal-processing', connection);
export const emailQueue = new Queue('email-sending', connection);

const paymentWorker = new Worker(
  'payment-verification',
  async (job: Job) => {
    logger.info('Processing payment verification', { jobId: job.id, data: job.data });
    const { paymentId, orderId, userId } = job.data;
    logger.info('Payment verification completed', { paymentId, orderId, userId });
  },
  connection
);

const withdrawalWorker = new Worker(
  'withdrawal-processing',
  async (job: Job) => {
    logger.info('Processing withdrawal', { jobId: job.id, data: job.data });
    const { withdrawalId, userId, amount } = job.data;
    logger.info('Withdrawal processing completed', { withdrawalId, userId, amount });
  },
  connection
);

const emailWorker = new Worker(
  'email-sending',
  async (job: Job) => {
    logger.info('Sending email', { jobId: job.id, data: job.data });
    const { to, subject } = job.data;
    logger.info('Email sent', { to, subject });
  },
  connection
);

paymentWorker.on('completed', (job) => {
  logger.info('Payment job completed', { jobId: job.id });
});

paymentWorker.on('failed', (job, err) => {
  logger.error('Payment job failed', { jobId: job?.id, error: err.message });
});

withdrawalWorker.on('completed', (job) => {
  logger.info('Withdrawal job completed', { jobId: job.id });
});

withdrawalWorker.on('failed', (job, err) => {
  logger.error('Withdrawal job failed', { jobId: job?.id, error: err.message });
});

emailWorker.on('completed', (job) => {
  logger.info('Email job completed', { jobId: job.id });
});

emailWorker.on('failed', (job, err) => {
  logger.error('Email job failed', { jobId: job?.id, error: err.message });
});

logger.info('Workers started');

export { paymentWorker, withdrawalWorker, emailWorker };
