CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL CHECK (type IN ('coin_purchase', 'coin_deduction', 'earning', 'withdrawal', 'refund')),
  amount DECIMAL(12,2) NOT NULL,
  coins INTEGER DEFAULT 0,
  balance_after DECIMAL(12,2),
  coin_balance_after INTEGER,
  reference_id TEXT,
  payment_provider VARCHAR(30),
  payment_order_id TEXT,
  payment_signature TEXT,
  idempotency_key VARCHAR(255) UNIQUE,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wallet_tx_user ON wallet_transactions(user_id);
CREATE INDEX idx_wallet_tx_type ON wallet_transactions(type);
CREATE INDEX idx_wallet_tx_idempotency ON wallet_transactions(idempotency_key);
CREATE INDEX idx_wallet_tx_reference ON wallet_transactions(reference_id);
CREATE INDEX idx_wallet_tx_created ON wallet_transactions(created_at DESC);
