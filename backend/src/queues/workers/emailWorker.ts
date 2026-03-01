import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../../config/redis';
import { EmailJobData } from '../emailQueue';
import { sendOtpEmail, sendWelcomeEmail } from '../../services/email.service';
import { logger } from '../../utils/logger';

const processEmailJob = async (job: Job<EmailJobData>): Promise<void> => {
  const { type, to, name, otp } = job.data;

  logger.info(`Processing email job: ${type} to ${to}`);

  switch (type) {
    case 'OTP':
      if (!otp) throw new Error('OTP is required for OTP email');
      await sendOtpEmail(to, otp, name);
      break;
    case 'WELCOME':
      await sendWelcomeEmail(to, name);
      break;
    case 'NOTIFICATION':
      logger.info(`Notification email to ${to}: ${job.data.subject}`);
      break;
    default:
      throw new Error(`Unknown email type: ${type}`);
  }

  logger.info(`Email job completed: ${type} to ${to}`);
};

export const startEmailWorker = () => {
  const worker = new Worker<EmailJobData>('email', processEmailJob, {
    connection: createRedisConnection(),
    concurrency: 5,
  });

  worker.on('completed', (job) => {
    logger.info(`Email job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Email job ${job?.id} failed:`, err);
  });

  worker.on('error', (err) => {
    logger.error('Email worker error:', err);
  });

  return worker;
};
