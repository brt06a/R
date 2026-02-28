import { Response, NextFunction } from 'express';
import { IdeaService } from '../services/idea.service';
import { AuthenticatedRequest } from '../middlewares/auth';
import { sendSuccess } from '../utils/response';

const ideaService = new IdeaService();

export class IdeaController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const documentFile = files?.document?.[0];
      const prototypeFile = files?.prototype?.[0];

      const idea = await ideaService.submitIdea(
        req.user!.userId,
        req.body,
        documentFile,
        prototypeFile
      );

      sendSuccess(res, idea, 'Idea submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const idea = await ideaService.getIdea(req.params.id, req.user?.userId);
      sendSuccess(res, idea);
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ideaService.listIdeas(req.query as any);
      sendSuccess(res, result.ideas, undefined, 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  async myIdeas(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await ideaService.getUserIdeas(req.user!.userId, page, limit);
      sendSuccess(res, result.ideas, undefined, 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const idea = await ideaService.updateIdea(req.params.id, req.user!.userId, req.body);
      sendSuccess(res, idea, 'Idea updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await ideaService.deleteIdea(req.params.id, req.user!.userId);
      sendSuccess(res, null, 'Idea deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
