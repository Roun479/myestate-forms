/*
  # Create automatic Google Sheets sync trigger

  1. Changes
    - Creates a function that calls the edge function when new submissions are added
    - Adds triggers on all three submission tables
    - Triggers fire after INSERT to automatically sync data to Google Sheets

  2. How it works
    - When a new form is submitted, the trigger calls the sync-to-sheets edge function
    - The edge function processes all unsynced records and sends them to Google Sheets
    - Records are marked as synced to prevent duplicates
*/

-- Create function to trigger the edge function
CREATE OR REPLACE FUNCTION trigger_sheets_sync()
RETURNS trigger AS $$
BEGIN
  PERFORM net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/sync-to-sheets',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers to all submission tables
DROP TRIGGER IF EXISTS on_land_search_submission ON land_search_submissions;
CREATE TRIGGER on_land_search_submission
  AFTER INSERT ON land_search_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_sheets_sync();

DROP TRIGGER IF EXISTS on_property_sale_submission ON property_sale_submissions;
CREATE TRIGGER on_property_sale_submission
  AFTER INSERT ON property_sale_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_sheets_sync();

DROP TRIGGER IF EXISTS on_project_submission ON project_submissions;
CREATE TRIGGER on_project_submission
  AFTER INSERT ON project_submissions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_sheets_sync();
