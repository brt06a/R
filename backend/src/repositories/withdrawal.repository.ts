import { supabase } from '../config/supabase';

export interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  platform_fee: number;
  net_amount: number;
  status: string;
  payout_provider: string;
  payout_reference_id: string | null;
  payout_response: Record<string, unknown>;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_ifsc: string | null;
  bank_name: string | null;
  upi_id: string | null;
  payout_mode: string;
  failure_reason: string | null;
  admin_notes: string | null;
  processed_at: string | null;
  created_at: string;
  updated_at: string;
}

export class WithdrawalRepository {
  async create(withdrawal: {
    user_id: string;
    amount: number;
    platform_fee: number;
    net_amount: number;
    payout_mode: string;
    bank_account_name?: string;
    bank_account_number?: string;
    bank_ifsc?: string;
    bank_name?: string;
    upi_id?: string;
  }): Promise<Withdrawal> {
    const { data, error } = await supabase
      .from('withdrawals')
      .insert(withdrawal)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findById(id: string): Promise<Withdrawal | null> {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ withdrawals: Withdrawal[]; total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from('withdrawals')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return { withdrawals: data || [], total: count || 0 };
  }

  async update(id: string, updates: Partial<Withdrawal>): Promise<Withdrawal> {
    const { data, error } = await supabase
      .from('withdrawals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getPendingWithdrawals(
    page: number = 1,
    limit: number = 20
  ): Promise<{ withdrawals: Withdrawal[]; total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from('withdrawals')
      .select('*, users(full_name, email)', { count: 'exact' })
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return { withdrawals: data || [], total: count || 0 };
  }
}
