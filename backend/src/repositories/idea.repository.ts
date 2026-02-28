import { supabase } from '../config/supabase';

export interface Idea {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  detailed_description: string | null;
  document_url: string | null;
  document_path: string | null;
  prototype_url: string | null;
  prototype_path: string | null;
  status: string;
  price: number | null;
  coins_spent: number;
  rejection_reason: string | null;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface IdeaQuery {
  page: number;
  limit: number;
  status?: string;
  categoryId?: string;
  search?: string;
  sortBy: string;
  sortOrder: string;
  userId?: string;
}

export class IdeaRepository {
  async create(idea: {
    user_id: string;
    category_id: string;
    title: string;
    description: string;
    detailed_description?: string;
    document_path?: string;
    prototype_path?: string;
    price?: number;
  }): Promise<Idea> {
    const { data, error } = await supabase
      .from('ideas')
      .insert(idea)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findById(id: string): Promise<Idea | null> {
    const { data, error } = await supabase
      .from('ideas')
      .select('*, categories(name, slug)')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findMany(query: IdeaQuery): Promise<{ ideas: Idea[]; total: number }> {
    const offset = (query.page - 1) * query.limit;

    let queryBuilder = supabase
      .from('ideas')
      .select('*, categories(name, slug)', { count: 'exact' });

    if (query.userId) {
      queryBuilder = queryBuilder.eq('user_id', query.userId);
    }
    if (query.status) {
      queryBuilder = queryBuilder.eq('status', query.status);
    }
    if (query.categoryId) {
      queryBuilder = queryBuilder.eq('category_id', query.categoryId);
    }
    if (query.search) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${query.search}%,description.ilike.%${query.search}%`
      );
    }

    const ascending = query.sortOrder === 'asc';
    queryBuilder = queryBuilder
      .order(query.sortBy, { ascending })
      .range(offset, offset + query.limit - 1);

    const { data, error, count } = await queryBuilder;
    if (error) throw error;
    return { ideas: data || [], total: count || 0 };
  }

  async update(id: string, updates: Partial<Idea>): Promise<Idea> {
    const { data, error } = await supabase
      .from('ideas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('ideas')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async countByUser(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('ideas')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    if (error) throw error;
    return count || 0;
  }
}
