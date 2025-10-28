import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactButtons: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:rokas@myestate.lt';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+37065899633';
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="text-center mb-4">
        <p className="text-gray-600 font-medium">Arba susisiekite tiesiogiai:</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleEmailClick}
          className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          <Mail className="w-5 h-5 mr-2" />
          El. paštas
        </button>

        <button
          onClick={handlePhoneClick}
          className="flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          <Phone className="w-5 h-5 mr-2" />
          Skambinti
        </button>
      </div>
    </div>
  );
};

export default ContactButtons;