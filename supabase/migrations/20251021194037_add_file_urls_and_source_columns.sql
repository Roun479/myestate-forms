/*
  # Add File URLs and Source Columns

  1. Changes
    - Add `file_urls` column to land_search_submissions and property_sale_submissions
    - Add `source` column to all three submission tables
    - These columns will store file upload links and marketing source tracking

  2. Notes
    - file_urls stored as text array for multiple file links
    - source stores how user heard about the service (Facebook, Google, etc.)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'land_search_submissions' AND column_name = 'file_urls'
  ) THEN
    ALTER TABLE land_search_submissions ADD COLUMN file_urls text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'land_search_submissions' AND column_name = 'source'
  ) THEN
    ALTER TABLE land_search_submissions ADD COLUMN source text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_sale_submissions' AND column_name = 'file_urls'
  ) THEN
    ALTER TABLE property_sale_submissions ADD COLUMN file_urls text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_sale_submissions' AND column_name = 'source'
  ) THEN
    ALTER TABLE property_sale_submissions ADD COLUMN source text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_submissions' AND column_name = 'source'
  ) THEN
    ALTER TABLE project_submissions ADD COLUMN source text;
  END IF;
END $$;
