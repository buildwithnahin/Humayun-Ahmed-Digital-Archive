-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for Work Types
CREATE TYPE work_category AS ENUM ('NOVEL', 'NATOK', 'MOVIE', 'SCIENCE_FICTION', 'MEMOIR', 'SHORT_STORY');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Works Table (Novels, Natoks, etc.)
CREATE TABLE works (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255), -- For Bengali original titles
    category work_category NOT NULL,
    publication_year INTEGER,
    publisher VARCHAR(150),
    description TEXT,
    cover_image_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Characters Table (e.g., Himu, Misir Ali, Shuvro)
CREATE TABLE characters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    alias VARCHAR(150),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Work-Characters Join Table (Many-to-Many)
CREATE TABLE work_characters (
    work_id UUID REFERENCES works(id) ON DELETE CASCADE,
    character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
    role_description VARCHAR(100), -- E.g., 'Protagonist', 'Antagonist'
    PRIMARY KEY (work_id, character_id)
);

-- Quotes Table
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
    character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    page_number INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Favorites Table (Many-to-Many)
CREATE TABLE user_favorites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    work_id UUID REFERENCES works(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, work_id)
);

-- Function to automatically update 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_works_modtime BEFORE UPDATE ON works FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_characters_modtime BEFORE UPDATE ON characters FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- INDEXING STRATEGY --

-- 1. Foreign Key Indexes (Essential for JOIN performance and cascading deletes)
CREATE INDEX idx_quotes_work_id ON quotes(work_id);
CREATE INDEX idx_quotes_character_id ON quotes(character_id);
CREATE INDEX idx_work_characters_character_id ON work_characters(character_id);

-- 2. Search & Filtering Indexes
CREATE INDEX idx_works_category ON works(category);
CREATE INDEX idx_works_publication_year ON works(publication_year);

-- 3. Text Search Indexes (Using GIN for partial matching on titles and names)
-- Requires pg_trgm extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_works_title_trgm ON works USING GIN (title gin_trgm_ops);
CREATE INDEX idx_characters_name_trgm ON characters USING GIN (name gin_trgm_ops);


-- SEED DATA EXAMPLES --

INSERT INTO users (id, username, email, password_hash) VALUES 
('11111111-1111-1111-1111-111111111111', 'reader_one', 'reader1@example.com', 'hashed_pw_here');

INSERT INTO works (id, title, original_title, category, publication_year, description) VALUES
('22222222-2222-2222-2222-222222222222', 'Daruchini Dip', 'দারুচিনি দ্বীপ', 'NOVEL', 1991, 'A story of a group of young people travelling to St. Martin''s Island.'),
('33333333-3333-3333-3333-333333333333', 'Devi', 'দেবী', 'NOVEL', 1985, 'The first novel featuring Misir Ali, exploring psychological mystery.');

INSERT INTO characters (id, name, description) VALUES
('44444444-4444-4444-4444-444444444444', 'Misir Ali', 'A part-time professor of Psychology at Dhaka University, parapsychologist.'),
('55555555-5555-5555-5555-555555555555', 'Himu', 'A young man who wears a yellow panjabi and walks barefoot.');

-- Link Misir Ali to Devi
INSERT INTO work_characters (work_id, character_id, role_description) VALUES
('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Protagonist');

-- Add a Quote
INSERT INTO quotes (id, work_id, character_id, content) VALUES
('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Human mind is deeply mysterious.');

-- User favorites a work
INSERT INTO user_favorites (user_id, work_id) VALUES
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
