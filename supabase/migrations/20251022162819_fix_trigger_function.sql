/*
  # Fix trigger function to use correct pg_net syntax

  1. Changes
    - Update trigger_sheets_sync function to use net.http_post instead of extensions.http_post
    - Add proper authorization header with service role key
    - Fix async HTTP request to edge function
*/

CREATE OR REPLACE FUNCTION trigger_sheets_sync()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_id bigint;
BEGIN
  SELECT INTO request_id net.http_post(
    url := 'https://ctnbotdbmsddgiuctaua.supabase.co/functions/v1/sync-to-sheets',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := '{}'::jsonb
  );
  
  RETURN NEW;
END;
$$;
