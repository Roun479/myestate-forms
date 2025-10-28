/*
  # Add Condition and Urgency Columns to Property Sales

  1. Changes
    - Add `condition` column to property_sale_submissions (property condition)
    - Add `urgency` column to property_sale_submissions (sale urgency)

  2. Notes
    - These fields help track property status and sale timeline
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_sale_submissions' AND column_name = 'condition'
  ) THEN
    ALTER TABLE property_sale_submissions ADD COLUMN condition text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_sale_submissions' AND column_name = 'urgency'
  ) THEN
    ALTER TABLE property_sale_submissions ADD COLUMN urgency text;
  END IF;
END $$;
