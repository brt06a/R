import 'dotenv/config';
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { startEmailWorker } from './queues/workers/emailWorker';
import { startPayoutWorker } from './queues/workers/payoutWorker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Start queue workers
    startEmailWorker();
    startPayoutWorker();
    logger.info('Queue workers started');

    const PORT = parseInt(env.PORT) || 5000;
    app.listen(PORT, () => {
      logger.info(`🚀 IdeaNax Backend running on port ${PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
