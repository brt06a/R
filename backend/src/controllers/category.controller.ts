import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSuccess } from '../utils/apiResponse';

const prisma = new PrismaClient();

export const getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        estimatedEarningMin: true,
        estimatedEarningMax: true,
        icon: true,
      },
    });
    sendSuccess(res, 'Categories fetched successfully', categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
    });
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    sendSuccess(res, 'Category fetched successfully', category);
  } catch (error) {
    next(error);
  }
};
