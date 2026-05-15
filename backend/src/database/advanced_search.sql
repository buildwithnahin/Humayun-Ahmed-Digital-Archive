-- Enable pg_trgm for fuzzy search and transliteration matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add a tsvector column for fast full-text searching across English and Bengali
ALTER TABLE works 
ADD COLUMN IF NOT EXISTS textsearchable_index_col tsvector 
GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') || 
    setweight(to_tsvector('simple', coalesce(original_title, '')), 'A') || 
    setweight(to_tsvector('simple', coalesce(description, '')), 'B')
) STORED;

-- Create GIN index for the tsvector 
CREATE INDEX IF NOT EXISTS idx_works_textsearch ON works USING GIN (textsearchable_index_col);

-- Trigram indexes were already added in root schema for title and character names.
-- Let's add them to original_title to heavily empower Bengali phonetic/fuzzy matching.
CREATE INDEX IF NOT EXISTS idx_works_original_title_trgm ON works USING GIN (original_title gin_trgm_ops);
