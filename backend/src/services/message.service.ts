import { MessageRepository } from '../repositories/message.repository';
import { UserRepository } from '../repositories/user.repository';
import { BadRequestError, NotFoundError } from '../utils/errors';

const messageRepo = new MessageRepository();
const userRepo = new UserRepository();

export class MessageService {
  async sendMessage(
    senderId: string,
    input: {
      receiverId: string;
      ideaId?: string;
      content: string;
    }
  ) {
    if (senderId === input.receiverId) {
      throw new BadRequestError('Cannot send message to yourself');
    }

    const receiver = await userRepo.findById(input.receiverId);
    if (!receiver) {
      throw new NotFoundError('Receiver not found');
    }

    return messageRepo.create({
      sender_id: senderId,
      receiver_id: input.receiverId,
      idea_id: input.ideaId,
      content: input.content,
    });
  }

  async getConversation(
    userId: string,
    otherUserId: string,
    page: number = 1,
    limit: number = 50
  ) {
    return messageRepo.findConversation(userId, otherUserId, page, limit);
  }

  async getConversationList(userId: string) {
    return messageRepo.getConversationList(userId);
  }

  async markAsRead(messageIds: string[], userId: string) {
    return messageRepo.markAsRead(messageIds, userId);
  }

  async getUnreadCount(userId: string) {
    return messageRepo.getUnreadCount(userId);
  }
}
