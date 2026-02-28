import { supabase } from '../config/supabase';

export interface WalletTransaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  coins: number;
  balance_after: number | null;
  coin_balance_after: number | null;
  reference_id: string | null;
  payment_provider: string | null;
  payment_order_id: string | null;
  payment_signature: string | null;
  idempotency_key: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  status: string;
  created_at: string;
}

export class WalletRepository {
  async createTransaction(tx: {
    user_id: string;
    type: string;
    amount: number;
    coins?: number;
    balance_after?: number;
    coin_balance_after?: number;
    reference_id?: string;
    payment_provider?: string;
    payment_order_id?: string;
    payment_signature?: string;
    idempotency_key?: string;
    description?: string;
    metadata?: Record<string, unknown>;
    status?: string;
  }): Promise<WalletTransaction> {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert(tx)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findByIdempotencyKey(key: string): Promise<WalletTransaction | null> {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('idempotency_key', key)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ transactions: WalletTransaction[]; total: number }> {
    const offset = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from('wallet_transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return { transactions: data || [], total: count || 0 };
  }

  async updateUserWallet(
    userId: string,
    walletDelta: number,
    coinDelta: number
  ): Promise<{ wallet_balance: number; coin_balance: number }> {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('wallet_balance, coin_balance')
      .eq('id', userId)
      .single();
    if (fetchError) throw fetchError;

    const newWallet = Number(user.wallet_balance) + walletDelta;
    const newCoins = Number(user.coin_balance) + coinDelta;

    if (newWallet < 0) throw new Error('Insufficient wallet balance');
    if (newCoins < 0) throw new Error('Insufficient coin balance');

    const { data, error } = await supabase
      .from('users')
      .update({
        wallet_balance: newWallet,
        coin_balance: newCoins,
      })
      .eq('id', userId)
      .select('wallet_balance, coin_balance')
      .single();
    if (error) throw error;
    return data;
  }
}
