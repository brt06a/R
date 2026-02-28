import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { submitIdea, getUserIdeas, getIdeaById } from '../services/idea.service';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { submitIdeaSchema } from '../validators/idea.validator';

export const submit = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const data = submitIdeaSchema.parse({
      ...req.body,
      fixedPrice: req.body.fixedPrice ? parseFloat(req.body.fixedPrice) : undefined,
    });

    const idea = await submitIdea(
      req.user!.userId,
      data,
      {
        document: files?.document?.[0],
        prototype: files?.prototype?.[0],
      }
    );

    sendSuccess(res, 'Idea submitted successfully! It is now under review.', idea, 201);
  } catch (error) {
    next(error);
  }
};

export const getMyIdeas = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { ideas, total } = await getUserIdeas(req.user!.userId, page, limit);
    sendPaginated(res, 'Ideas fetched successfully', ideas, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getIdea = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await getIdeaById(req.params.id, req.user!.userId);
    sendSuccess(res, 'Idea fetched successfully', idea);
  } catch (error) {
    next(error);
  }
};
