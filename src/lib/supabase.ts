import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LandSearchSubmission {
  name: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  budget: string;
  additional_info?: string;
  source?: string;
  file_urls?: string[];
}

export interface PropertySaleSubmission {
  name: string;
  email: string;
  phone: string;
  property_type: string;
  location: string;
  area: string;
  price: string;
  condition?: string;
  urgency?: string;
  additional_info?: string;
  source?: string;
  file_urls?: string[];
}

export interface ProjectSubmission {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  preferred_location?: string;
  property_type?: string;
  investment_goal?: string;
  description: string;
  budget: string;
  timeline: string;
  additional_info?: string;
  source?: string;
}

export const uploadFiles = async (files: File[], formType: string): Promise<string[]> => {
  const fileUrls: string[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const filePath = `${formType}/${timestamp}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('form-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('form-uploads')
      .getPublicUrl(filePath);

    fileUrls.push(publicUrl);
  }

  return fileUrls;
};

export const submitLandSearch = async (data: LandSearchSubmission, files?: File[]) => {
  try {
    let fileUrls: string[] = [];

    if (files && files.length > 0) {
      try {
        fileUrls = await uploadFiles(files, 'land-search');
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        throw new Error('Nepavyko įkelti failų. Prašome bandyti be failų arba su mažesniais failais.');
      }
    }

    const submissionData = {
      ...data,
      file_urls: fileUrls.length > 0 ? fileUrls : undefined
    };

    const { error, data: insertedData } = await supabase
      .from('land_search_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Nepavyko išsaugoti duomenų: ${error.message}`);
    }

    try {
      await fetch(`${supabaseUrl}/functions/v1/sync-to-sheets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (syncError) {
      console.error('Sync error (non-critical):', syncError);
    }
  } catch (error) {
    console.error('Submit error:', error);
    throw error;
  }
};

export const submitPropertySale = async (data: PropertySaleSubmission, files?: File[]) => {
  try {
    let fileUrls: string[] = [];

    if (files && files.length > 0) {
      try {
        fileUrls = await uploadFiles(files, 'property-sale');
      } catch (uploadError) {
        console.error('File upload error:', uploadError);
        throw new Error('Nepavyko įkelti failų. Prašome bandyti be failų arba su mažesniais failais.');
      }
    }

    const submissionData = {
      ...data,
      file_urls: fileUrls.length > 0 ? fileUrls : undefined
    };

    const { error, data: insertedData } = await supabase
      .from('property_sale_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Nepavyko išsaugoti duomenų: ${error.message}`);
    }

    try {
      await fetch(`${supabaseUrl}/functions/v1/sync-to-sheets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (syncError) {
      console.error('Sync error (non-critical):', syncError);
    }
  } catch (error) {
    console.error('Submit error:', error);
    throw error;
  }
};

export const submitProject = async (data: ProjectSubmission) => {
  try {
    const { error, data: insertedData } = await supabase
      .from('project_submissions')
      .insert([data])
      .select();

    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Nepavyko išsaugoti duomenų: ${error.message}`);
    }

    try {
      await fetch(`${supabaseUrl}/functions/v1/sync-to-sheets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (syncError) {
      console.error('Sync error (non-critical):', syncError);
    }
  } catch (error) {
    console.error('Submit error:', error);
    throw error;
  }
};
