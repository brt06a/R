import { supabase } from '../config/supabase';

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export class AuditRepository {
  async create(log: {
    user_id?: string;
    action: string;
    entity_type: string;
    entity_id?: string;
    old_values?: Record<string, unknown>;
    new_values?: Record<string, unknown>;
    ip_address?: string;
    user_agent?: string;
  }): Promise<AuditLog> {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert(log)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findByEntity(
    entityType: string,
    entityId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return { logs: data || [], total: count || 0 };
  }
}
