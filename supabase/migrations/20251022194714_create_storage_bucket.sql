/*
  # Create storage bucket for form uploads

  1. Storage
    - Create public bucket `form-uploads` for storing form attachments
    - Enable RLS on bucket
    - Add policies for public uploads and reads
  
  2. Security
    - Allow anyone to upload files (for anonymous form submissions)
    - Allow anyone to read files (public bucket)
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('form-uploads', 'form-uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'form-uploads');

CREATE POLICY "Anyone can view files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'form-uploads');