-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users: can only read their own data
CREATE POLICY users_select_own ON users
  FOR SELECT USING (id = auth.uid() OR current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY users_update_own ON users
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() 
    AND wallet_balance = (SELECT wallet_balance FROM users WHERE id = auth.uid())
    AND coin_balance = (SELECT coin_balance FROM users WHERE id = auth.uid())
    AND role = (SELECT role FROM users WHERE id = auth.uid())
  );

-- Categories: public read
CREATE POLICY categories_select_all ON categories
  FOR SELECT USING (is_active = TRUE);

-- Ideas: owner can read own, public can read approved
CREATE POLICY ideas_select ON ideas
  FOR SELECT USING (
    user_id = auth.uid() 
    OR status IN ('approved', 'sold', 'licensed')
    OR current_setting('app.current_user_role', true) = 'admin'
  );

CREATE POLICY ideas_insert ON ideas
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Wallet transactions: only own
CREATE POLICY wallet_tx_select_own ON wallet_transactions
  FOR SELECT USING (user_id = auth.uid() OR current_setting('app.current_user_role', true) = 'admin');

-- Withdrawals: only own
CREATE POLICY withdrawals_select_own ON withdrawals
  FOR SELECT USING (user_id = auth.uid() OR current_setting('app.current_user_role', true) = 'admin');

CREATE POLICY withdrawals_insert_own ON withdrawals
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Messages: sender or receiver
CREATE POLICY messages_select_own ON messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY messages_insert ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Audit logs: admin only
CREATE POLICY audit_logs_select_admin ON audit_logs
  FOR SELECT USING (current_setting('app.current_user_role', true) = 'admin');

-- Service role bypass (for backend operations)
-- Note: The service_role key bypasses RLS by default in Supabase
