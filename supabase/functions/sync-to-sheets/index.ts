import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZ7ej-iWspDt8CPiFAXfMy_UgMsLmJlELLzJBSLy9lek9Da69iIEDmAPTYCq6P0qePtA/exec';

function removeLithuanianChars(str: string): string {
  if (!str) return str;
  const map: { [key: string]: string } = {
    'ą': 'a', 'č': 'c', 'ę': 'e', 'ė': 'e', 'į': 'i',
    'š': 's', 'ų': 'u', 'ū': 'u', 'ž': 'z',
    'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I',
    'Š': 'S', 'Ų': 'U', 'Ū': 'U', 'Ž': 'Z'
  };
  return str.replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, char => map[char] || char);
}

function translateToLithuanian(str: string): string {
  if (!str) return str;

  const translations: { [key: string]: string } = {
    'personal': 'asmeninis',
    'investment': 'investicija',
    'houses': 'namai',
    'apartments': 'butai',
    'commercial': 'komercinis',
    'land': 'zeme',
    'cottages': 'vasarnamiai',
    'vacation-home': 'poilsio namai',
    'rental-income': 'nuomos pajamos',
    'primary-residence': 'pagrindine gyvenamoji vieta',
    'quick-resale': 'greitas perpardavimas',
    'family-use': 'seimos naudojimui',
    'instagram-ad': 'Instagram reklama',
    'facebook-ad': 'Facebook reklama',
    'google-search': 'Google paieska',
    'recommendation': 'rekomendacija',
    'other': 'kita',
    'website': 'interneto svetaine',
    'immediate': 'is karto',
    '3-months': '3 menesiai',
    '6-months': '6 menesiai',
    '1-year': '1 metai',
    '1-2-years': '1-2 metai',
    'exploring': 'tyrinetoju',
    'flexible': 'lankstus',
    'good': 'gera',
    'needs-renovation': 'reikalingas remontas',
    'new-construction': 'naujos statybos',
    'asap': 'kuo greiciau',
    'no-rush': 'neskubu',
    'capital-growth': 'turto vertes augimas',
    'diversification': 'diversifikacija',
    'retirement': 'pensijai',
    'hotels': 'viesbuciai',
    'mixed': 'misrus',
    'any': 'bet koks',
    'palanga': 'Palanga',
    'kunigiskes': 'Kunigiskes',
    'monciskes': 'Monciskes',
    'sventoji': 'Sventoji',
    'klaipeda': 'Klaipeda',
    'giruliai': 'Giruliai',
    'melnrage': 'Melnrage',
    'nida': 'Nida',
    'juodkrante': 'Juodkrante',
    'preila': 'Preila',
    'pervalka': 'Pervalka',
    'karkle': 'Karkle',
    'butinge': 'Butinge',
    'any-coastal': 'bet kuri pajurio vietove',
  };

  let result = str;
  for (const [eng, lit] of Object.entries(translations)) {
    const regex = new RegExp(eng, 'gi');
    result = result.replace(regex, lit);
  }

  return removeLithuanianChars(result);
}

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  [key: string]: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting sync...');

    const tables = [
      { name: 'land_search_submissions', sheetName: 'Zemes paieska' },
      { name: 'property_sale_submissions', sheetName: 'NT pardavimas' },
      { name: 'project_submissions', sheetName: 'Projektai' },
    ];

    for (const table of tables) {
      console.log(`Processing ${table.name}...`);

      const { data: submissions, error } = await supabase
        .from(table.name)
        .select('*')
        .eq('synced_to_sheets', false);

      if (error) {
        console.error(`Error fetching ${table.name}:`, error);
        continue;
      }

      if (!submissions || submissions.length === 0) {
        console.log(`No unsynced submissions in ${table.name}`);
        continue;
      }

      console.log(`Found ${submissions.length} unsynced submissions`);

      const rows = submissions.map((sub: FormSubmission) => {
        const date = new Date(sub.created_at);
        const lithuanianDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
        const formattedDate = `${lithuanianDate.getFullYear()}-${String(lithuanianDate.getMonth() + 1).padStart(2, '0')}-${String(lithuanianDate.getDate()).padStart(2, '0')} ${String(lithuanianDate.getHours()).padStart(2, '0')}:${String(lithuanianDate.getMinutes()).padStart(2, '0')}`;

        if (table.name === 'land_search_submissions') {
          const fileLinks = sub.file_urls && sub.file_urls.length > 0
            ? sub.file_urls.join('\n')
            : '';

          return [
            formattedDate,
            sub.name,
            sub.email,
            sub.phone,
            translateToLithuanian(sub.source || ''),
            sub.location || '',
            sub.area || '',
            sub.budget || '',
            sub.additional_info || '',
            fileLinks,
          ];
        } else if (table.name === 'property_sale_submissions') {
          const fileLinks = sub.file_urls && sub.file_urls.length > 0
            ? sub.file_urls.join('\n')
            : '';

          return [
            formattedDate,
            sub.name,
            sub.email,
            sub.phone,
            translateToLithuanian(sub.source || ''),
            translateToLithuanian(sub.property_type || ''),
            sub.location || '',
            sub.area || '',
            sub.price || '',
            translateToLithuanian(sub.condition || ''),
            translateToLithuanian(sub.urgency || ''),
            sub.additional_info || '',
            fileLinks,
          ];
        } else {
          return [
            formattedDate,
            sub.name,
            sub.email,
            sub.phone,
            translateToLithuanian(sub.project_type || ''),
            sub.preferred_location || '',
            translateToLithuanian(sub.property_type || ''),
            sub.budget || '',
            translateToLithuanian(sub.timeline || ''),
            sub.additional_info || '',
            translateToLithuanian(sub.investment_goal || ''),
            translateToLithuanian(sub.source || ''),
          ];
        }
      });

      const payload = {
        sheetName: table.sheetName,
        rows: rows,
      };

      console.log(`Sending to Apps Script: ${JSON.stringify(payload).substring(0, 200)}...`);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Apps Script error for ${table.sheetName}: ${errorText}`);
        continue;
      }

      const result = await response.json();
      console.log(`Apps Script response: ${JSON.stringify(result)}`);

      const ids = submissions.map((s: FormSubmission) => s.id);
      const { error: updateError } = await supabase
        .from(table.name)
        .update({ synced_to_sheets: true })
        .in('id', ids);

      if (updateError) {
        console.error(`Failed to update synced flag: ${updateError.message}`);
      } else {
        console.log(`Marked ${ids.length} rows as synced`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Synced to Google Sheets' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
