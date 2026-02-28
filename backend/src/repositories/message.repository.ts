import { supabase } from '../config/supabase';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  idea_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

export class MessageRepository {
  async create(message: {
    sender_id: string;
    receiver_id: string;
    idea_id?: string;
    content: string;
  }): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findConversation(
    userId1: string,
    userId2: string,
    page: number = 1,
    limit: number = 50
  ): Promise<{ messages: Message[]; total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(full_name), receiver:users!receiver_id(full_name)', { count: 'exact' })
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return { messages: data || [], total: count || 0 };
  }

  async getConversationList(userId: string): Promise<unknown[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(id, full_name), receiver:users!receiver_id(id, full_name)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    if (error) throw error;

    const conversations = new Map<string, unknown>();
    for (const msg of data || []) {
      const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!conversations.has(otherId)) {
        conversations.set(otherId, {
          userId: otherId,
          lastMessage: msg,
          user: msg.sender_id === userId ? msg.receiver : msg.sender,
        });
      }
    }
    return Array.from(conversations.values());
  }

  async markAsRead(messageIds: string[], receiverId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .in('id', messageIds)
      .eq('receiver_id', receiverId);
    if (error) throw error;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('is_read', false);
    if (error) throw error;
    return count || 0;
  }
}
