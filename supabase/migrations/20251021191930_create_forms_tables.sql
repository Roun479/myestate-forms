-- MyEstate Forms Database Schema
-- 
-- Overview: Creates three tables to store form submissions from the MyEstate website
-- 
-- New Tables:
-- 1. land_search_submissions - Stores land search form data
-- 2. property_sale_submissions - Stores property sale form data
-- 3. project_submissions - Stores project form data
--
-- Security: RLS enabled on all tables with public insert access

-- Land Search Submissions Table
CREATE TABLE IF NOT EXISTS land_search_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  area text NOT NULL,
  budget text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

ALTER TABLE land_search_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert land search submissions"
  ON land_search_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can view land search submissions"
  ON land_search_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Property Sale Submissions Table
CREATE TABLE IF NOT EXISTS property_sale_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_type text NOT NULL,
  location text NOT NULL,
  area text NOT NULL,
  price text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

ALTER TABLE property_sale_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert property sale submissions"
  ON property_sale_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can view property sale submissions"
  ON property_sale_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Project Submissions Table
CREATE TABLE IF NOT EXISTS project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_type text NOT NULL,
  description text NOT NULL,
  budget text NOT NULL,
  timeline text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now(),
  synced_to_sheets boolean DEFAULT false
);

ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert project submissions"
  ON project_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can view project submissions"
  ON project_submissions
  FOR SELECT
  TO authenticated
  USING (true);