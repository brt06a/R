-- Storage bucket configuration (run via Supabase dashboard or API)
-- These are documented here for reference

-- Bucket: idea-documents (private)
-- Allowed MIME types: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document
-- Max file size: 10MB

-- Bucket: idea-prototypes (private)
-- Allowed MIME types: application/pdf, image/png, image/jpeg, image/webp, application/zip
-- Max file size: 50MB

-- File metadata table for additional tracking
CREATE TABLE file_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  idea_id UUID REFERENCES ideas(id) ON DELETE SET NULL,
  bucket_name VARCHAR(50) NOT NULL,
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  scan_status VARCHAR(20) DEFAULT 'pending' CHECK (scan_status IN ('pending', 'clean', 'infected', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_file_meta_user ON file_metadata(user_id);
CREATE INDEX idx_file_meta_idea ON file_metadata(idea_id);

ALTER TABLE file_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY file_meta_select_own ON file_metadata
  FOR SELECT USING (user_id = auth.uid() OR current_setting('app.current_user_role', true) = 'admin');
