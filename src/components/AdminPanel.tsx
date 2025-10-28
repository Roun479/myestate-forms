import React, { useState } from 'react';
import { RefreshCw, Database, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const syncToSheets = async () => {
    setSyncing(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-to-sheets`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: 'Duomenys sėkmingai sinchronizuoti į Google Sheets!' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: `Klaida: ${error.error || 'Nepavyko sinchronizuoti'}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Įvyko klaida bandant sinchronizuoti duomenis' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          ← Grįžti
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Google Sheets Sinchronizavimas</h2>
            <p className="text-gray-600 mb-4">
              Sinchronizuokite nesinchronizuotus duomenis į Google Sheets. <strong className="text-red-600">SVARBU: Spauskite tik vieną kartą!</strong> Sistema automatiškai persiųs visus naujus įrašus.
            </p>

            <button
              onClick={syncToSheets}
              disabled={syncing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Sinchronizuojama...' : 'Sinchronizuoti dabar'}
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p>{message.text}</p>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Informacija</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Formos: Žemės paieška, NT pardavimas, Projektai</li>
              <li>• Duomenys saugomi Supabase duomenų bazėje</li>
              <li>• <strong>Rankinis sinchronizavimas</strong> - spauskite "Sinchronizuoti dabar" kai norite perkelti duomenis</li>
              <li>• Spreadsheet ID: 1DWv5-6T_HXq6JVK1Sh_B7iKmcH7vGODJ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
