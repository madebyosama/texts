-- ============================================
-- ShareText Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query)
-- ============================================

-- Create the texts table
CREATE TABLE IF NOT EXISTS texts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(20) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    delete_password_hash VARCHAR(255) NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_texts_slug ON texts(slug);

-- Create index on created_at for potential cleanup queries
CREATE INDEX IF NOT EXISTS idx_texts_created_at ON texts(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE texts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations from the API
-- Note: This uses the anon key, so we allow all operations
-- In production, you might want more restrictive policies

-- Allow anyone to read texts
CREATE POLICY "Allow public read" ON texts
    FOR SELECT
    USING (true);

-- Allow anyone to insert texts
CREATE POLICY "Allow public insert" ON texts
    FOR INSERT
    WITH CHECK (true);

-- Allow anyone to update texts (for view count)
CREATE POLICY "Allow public update" ON texts
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Allow anyone to delete texts (password verified in application)
CREATE POLICY "Allow public delete" ON texts
    FOR DELETE
    USING (true);

-- ============================================
-- Optional: Function to clean up old texts
-- Uncomment and modify as needed
-- ============================================

-- CREATE OR REPLACE FUNCTION cleanup_old_texts()
-- RETURNS void AS $$
-- BEGIN
--     DELETE FROM texts 
--     WHERE created_at < NOW() - INTERVAL '365 days';
-- END;
-- $$ LANGUAGE plpgsql;

-- ============================================
-- Optional: Scheduled cleanup using pg_cron
-- Requires pg_cron extension enabled in Supabase
-- ============================================

-- SELECT cron.schedule(
--     'cleanup-old-texts',
--     '0 0 * * 0', -- Run weekly at midnight on Sunday
--     $$SELECT cleanup_old_texts()$$
-- );
