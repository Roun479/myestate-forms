/*
  # Enable pg_net extension and fix auto-sync trigger

  1. Changes
    - Enables pg_net extension for HTTP requests from database
    - Recreates the trigger function to properly call the edge function
    - Uses net.http_post from pg_net extension
*/

-- Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Drop old function if exists
DROP FUNCTION IF EXISTS trigger_sheets_sync() CASCADE;

-- Create improved function to trigger the edge function
CREATE OR REPLACE FUNCTION trigger_sheets_sync()
RETURNS trigger AS $$
DECLARE
  request_id bigint;
  supabase_url text;
  service_key text;
BEGIN
  -- Get Supabase URL from environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_key := current_setting('app.settings.service_role_key', true);
  
  -- If settings not available, use default (will be set by Supabase)
  IF supabase_url IS NULL THEN
    supabase_url := 'https://ctnbotdbmsddgiuctaua.supabase.co';
  END IF;
  
  -- Make async HTTP request to edge function
  SELECT INTO request_id extensions.http_post(
    url := supabase_url || '/functions/v1/sync-to-sheets',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate triggers on all submission tables
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
