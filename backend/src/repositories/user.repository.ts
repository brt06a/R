import { supabase } from '../config/supabase';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  phone: string | null;
  is_email_verified: boolean;
  email_verification_token: string | null;
  email_verification_expires: string | null;
  otp_code: string | null;
  otp_expires: string | null;
  failed_login_attempts: number;
  account_locked_until: string | null;
  wallet_balance: number;
  coin_balance: number;
  refresh_token: string | null;
  refresh_token_expires: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async create(user: {
    email: string;
    password_hash: string;
    full_name: string;
    phone?: string;
    email_verification_token: string;
    email_verification_expires: string;
  }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...user,
        email: user.email.toLowerCase(),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async incrementFailedAttempts(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_failed_attempts', { user_id: id });
    if (error) {
      const user = await this.findById(id);
      if (user) {
        const attempts = user.failed_login_attempts + 1;
        const updates: Partial<User> = { failed_login_attempts: attempts };
        if (attempts >= 5) {
          const lockUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString();
          updates.account_locked_until = lockUntil;
        }
        await this.update(id, updates);
      }
    }
  }

  async resetFailedAttempts(id: string): Promise<void> {
    await this.update(id, {
      failed_login_attempts: 0,
      account_locked_until: null,
    } as Partial<User>);
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email_verification_token', token)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
}
