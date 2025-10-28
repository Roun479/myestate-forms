import React, { useState } from 'react';
import { Home, Building2, MapPin, Phone, MessageCircle, Upload, X, CheckCircle } from 'lucide-react';
import LandingPage from './components/LandingPage';
import LandSearchForm from './components/LandSearchForm';
import PropertySaleForm from './components/PropertySaleForm';
import ProjectsForm from './components/ProjectsForm';
import AdminPanel from './components/AdminPanel';

export type FormType = 'landing' | 'land-search' | 'property-sale' | 'projects' | 'admin';

function App() {
  const [currentForm, setCurrentForm] = useState<FormType>('landing');

  const renderCurrentForm = () => {
    switch (currentForm) {
      case 'land-search':
        return <LandSearchForm onBack={() => setCurrentForm('landing')} />;
      case 'property-sale':
        return <PropertySaleForm onBack={() => setCurrentForm('landing')} />;
      case 'projects':
        return <ProjectsForm onBack={() => setCurrentForm('landing')} />;
      case 'admin':
        return <AdminPanel onBack={() => setCurrentForm('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentForm} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {renderCurrentForm()}
    </div>
  );
}

export default App;