/*
  # Add detailed project information columns

  1. Changes
    - Add `preferred_location` column to store specific location preference
    - Add `property_type` column to store property type selection
    - Add `investment_goal` column to store investment/purchase goal
    
  2. Notes
    - These columns extract data currently stored in `additional_info` field
    - Allows better filtering and analysis in Google Sheets
    - Existing data remains in `additional_info` for backward compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_submissions' AND column_name = 'preferred_location'
  ) THEN
    ALTER TABLE project_submissions ADD COLUMN preferred_location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_submissions' AND column_name = 'property_type'
  ) THEN
    ALTER TABLE project_submissions ADD COLUMN property_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'project_submissions' AND column_name = 'investment_goal'
  ) THEN
    ALTER TABLE project_submissions ADD COLUMN investment_goal text;
  END IF;
END $$;