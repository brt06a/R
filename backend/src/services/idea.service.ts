import { IdeaRepository } from '../repositories/idea.repository';
import { WalletRepository } from '../repositories/wallet.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuditRepository } from '../repositories/audit.repository';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors';
import { logger } from '../utils/logger';
import { StorageService } from './storage.service';

const ideaRepo = new IdeaRepository();
const walletRepo = new WalletRepository();
const userRepo = new UserRepository();
const auditRepo = new AuditRepository();
const storageService = new StorageService();

const IDEA_COST_COINS = 2;

export class IdeaService {
  async submitIdea(
    userId: string,
    input: {
      categoryId: string;
      title: string;
      description: string;
      detailedDescription?: string;
      price?: number;
    },
    documentFile?: Express.Multer.File,
    prototypeFile?: Express.Multer.File
  ) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (user.coin_balance < IDEA_COST_COINS) {
      throw new BadRequestError(
        `Insufficient coins. You need ${IDEA_COST_COINS} coins to submit an idea. Current balance: ${user.coin_balance}`,
        'INSUFFICIENT_COINS'
      );
    }

    let documentPath: string | undefined;
    let prototypePath: string | undefined;

    try {
      if (documentFile) {
        documentPath = await storageService.uploadFile(
          'idea-documents',
          userId,
          documentFile
        );
      }

      if (prototypeFile) {
        prototypePath = await storageService.uploadFile(
          'idea-prototypes',
          userId,
          prototypeFile
        );
      }

      const newBalance = await walletRepo.updateUserWallet(userId, 0, -IDEA_COST_COINS);

      const idea = await ideaRepo.create({
        user_id: userId,
        category_id: input.categoryId,
        title: input.title,
        description: input.description,
        detailed_description: input.detailedDescription,
        document_path: documentPath,
        prototype_path: prototypePath,
        price: input.price,
      });

      await walletRepo.createTransaction({
        user_id: userId,
        type: 'coin_deduction',
        amount: 0,
        coins: -IDEA_COST_COINS,
        balance_after: Number(newBalance.wallet_balance),
        coin_balance_after: Number(newBalance.coin_balance),
        reference_id: idea.id,
        description: `Idea submission: ${input.title}`,
      });

      await auditRepo.create({
        user_id: userId,
        action: 'idea.submit',
        entity_type: 'idea',
        entity_id: idea.id,
        new_values: { title: input.title, coins_spent: IDEA_COST_COINS },
      });

      logger.info('Idea submitted', { userId, ideaId: idea.id });

      return idea;
    } catch (error) {
      if (documentPath) {
        await storageService.deleteFile('idea-documents', documentPath).catch(() => {});
      }
      if (prototypePath) {
        await storageService.deleteFile('idea-prototypes', prototypePath).catch(() => {});
      }
      throw error;
    }
  }

  async getIdea(ideaId: string, userId?: string) {
    const idea = await ideaRepo.findById(ideaId);
    if (!idea) {
      throw new NotFoundError('Idea not found');
    }

    if (idea.status !== 'approved' && idea.user_id !== userId) {
      throw new ForbiddenError('You do not have access to this idea');
    }

    let documentUrl: string | null = null;
    let prototypeUrl: string | null = null;

    if (idea.document_path && idea.user_id === userId) {
      documentUrl = await storageService.getSignedUrl('idea-documents', idea.document_path);
    }
    if (idea.prototype_path && idea.user_id === userId) {
      prototypeUrl = await storageService.getSignedUrl('idea-prototypes', idea.prototype_path);
    }

    return { ...idea, documentUrl, prototypeUrl };
  }

  async listIdeas(query: {
    page: number;
    limit: number;
    status?: string;
    categoryId?: string;
    search?: string;
    sortBy: string;
    sortOrder: string;
    userId?: string;
  }) {
    const { ideas, total } = await ideaRepo.findMany(query);
    return {
      ideas,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getUserIdeas(
    userId: string,
    page: number = 1,
    limit: number = 20
  ) {
    return this.listIdeas({
      page,
      limit,
      userId,
      sortBy: 'created_at',
      sortOrder: 'desc',
    });
  }

  async updateIdea(
    ideaId: string,
    userId: string,
    updates: {
      title?: string;
      description?: string;
      detailedDescription?: string;
      price?: number;
    }
  ) {
    const idea = await ideaRepo.findById(ideaId);
    if (!idea) {
      throw new NotFoundError('Idea not found');
    }
    if (idea.user_id !== userId) {
      throw new ForbiddenError('You can only update your own ideas');
    }
    if (idea.status !== 'pending') {
      throw new BadRequestError('Can only update ideas with pending status');
    }

    const updateData: Record<string, unknown> = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.description) updateData.description = updates.description;
    if (updates.detailedDescription !== undefined) updateData.detailed_description = updates.detailedDescription;
    if (updates.price !== undefined) updateData.price = updates.price;

    const updated = await ideaRepo.update(ideaId, updateData as any);

    await auditRepo.create({
      user_id: userId,
      action: 'idea.update',
      entity_type: 'idea',
      entity_id: ideaId,
      new_values: updateData,
    });

    return updated;
  }

  async deleteIdea(ideaId: string, userId: string) {
    const idea = await ideaRepo.findById(ideaId);
    if (!idea) {
      throw new NotFoundError('Idea not found');
    }
    if (idea.user_id !== userId) {
      throw new ForbiddenError('You can only delete your own ideas');
    }
    if (idea.status !== 'pending') {
      throw new BadRequestError('Can only delete ideas with pending status');
    }

    if (idea.document_path) {
      await storageService.deleteFile('idea-documents', idea.document_path).catch(() => {});
    }
    if (idea.prototype_path) {
      await storageService.deleteFile('idea-prototypes', idea.prototype_path).catch(() => {});
    }

    await ideaRepo.delete(ideaId);

    await auditRepo.create({
      user_id: userId,
      action: 'idea.delete',
      entity_type: 'idea',
      entity_id: ideaId,
    });
  }
}
