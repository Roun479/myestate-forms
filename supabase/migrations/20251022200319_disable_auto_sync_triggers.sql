/*
  # Disable automatic sync triggers

  1. Changes
    - Drop all automatic sync triggers from form tables
    - Sync will now only happen manually via Admin Panel
  
  2. Reason
    - Prevents duplicate entries when manually syncing
    - Gives admin full control over when to sync
*/

DROP TRIGGER IF EXISTS on_land_search_submission ON land_search_submissions;
DROP TRIGGER IF EXISTS on_property_sale_submission ON property_sale_submissions;
DROP TRIGGER IF EXISTS on_project_submission ON project_submissions;

DROP FUNCTION IF EXISTS trigger_sheets_sync();