import { PrismaClient, SaleType } from '@prisma/client';
import { uploadFile } from './supabaseStorage.service';
import { SUBMISSION_COST_COINS } from '../utils/constants';

const prisma = new PrismaClient();

export const submitIdea = async (
  userId: string,
  data: {
    categoryId: string;
    problemDesc: string;
    solutionDesc: string;
    saleType: SaleType;
    fixedPrice?: number;
    prototypeLink?: string;
  },
  files?: {
    document?: Express.Multer.File;
    prototype?: Express.Multer.File;
  }
) => {
  // Check coin balance
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { coinBalance: true },
  });

  if (!user) throw new Error('User not found');
  if (user.coinBalance < SUBMISSION_COST_COINS) {
    throw Object.assign(new Error('Insufficient coins. Please buy more coins.'), { status: 402 });
  }

  // Validate category
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category || !category.isActive) throw new Error('Invalid or inactive category');

  // Upload files
  let documentUrl: string | undefined;
  let prototypeUrl: string | undefined;
  let prototypeType: string | undefined;

  if (files?.document) {
    documentUrl = await uploadFile(files.document, 'documents');
  }

  if (files?.prototype) {
    prototypeUrl = await uploadFile(files.prototype, 'prototypes');
    prototypeType = files.prototype.mimetype.startsWith('image/') ? 'IMAGE' : 'VIDEO';
  } else if (data.prototypeLink) {
    prototypeUrl = data.prototypeLink;
    prototypeType = 'LINK';
  }

  // Transaction: deduct coins and create idea
  const [idea] = await prisma.$transaction([
    prisma.idea.create({
      data: {
        userId,
        categoryId: data.categoryId,
        problemDesc: data.problemDesc,
        solutionDesc: data.solutionDesc,
        documentUrl,
        prototypeUrl,
        prototypeType,
        saleType: data.saleType,
        fixedPrice: data.fixedPrice,
        status: 'PENDING',
      },
      include: { category: true },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { coinBalance: { decrement: SUBMISSION_COST_COINS } },
    }),
    prisma.walletTransaction.create({
      data: {
        userId,
        type: 'DEBIT',
        reason: 'IDEA_SUBMISSION',
        amount: 0,
        coins: SUBMISSION_COST_COINS,
        status: 'COMPLETED',
      },
    }),
  ]);

  return idea;
};

export const getUserIdeas = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [ideas, total] = await Promise.all([
    prisma.idea.findMany({
      where: { userId },
      include: { category: { select: { name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.idea.count({ where: { userId } }),
  ]);

  return { ideas, total };
};

export const getIdeaById = async (ideaId: string, userId: string) => {
  const idea = await prisma.idea.findFirst({
    where: { id: ideaId, userId },
    include: { category: true },
  });
  if (!idea) throw new Error('Idea not found');
  return idea;
};
