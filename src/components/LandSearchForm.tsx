import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Upload, X, CheckCircle, MapPin } from 'lucide-react';
import ContactButtons from './ContactButtons';
import FileUpload from './FileUpload';

interface LandSearchFormProps {
  onBack: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  price: string;
  location: string;
  size: string;
  description: string;
  gdprConsent: boolean;
  howDidYouHear: string;
}

const LandSearchForm: React.FC<LandSearchFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    price: '',
    location: '',
    size: '',
    description: '',
    gdprConsent: false,
    howDidYouHear: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      alert('Prašome sutikti su duomenų tvarkymo sąlygomis');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { submitLandSearch } = await import('../lib/supabase');
      await submitLandSearch({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        area: formData.size,
        budget: formData.price,
        additional_info: formData.description,
        source: formData.howDidYouHear
      }, files);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Nežinoma klaida';
      alert(`Įvyko klaida pateikiant užklausą: ${errorMessage}\n\nPrašome susisiekti telefonu arba el. paštu.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="/stone-texture color copy copy copy.jpg"
            alt=""
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center relative z-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Užklausa pateikta!</h3>
          <p className="text-gray-600 mb-6">
            Ačiū už jūsų sklypo pardavimo užklausą! Susisieksime su jumis per 24 valandas ir aptarsime pirkimo sąlygas.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-[#D1A572] to-[#C9965E] text-white py-3 rounded-xl font-semibold hover:from-[#C9965E] hover:to-[#B8854D] transition-colors duration-200"
          >
            Grįžti į pagrindinį puslapį
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/stone-texture color copy copy copy.jpg"
          alt=""
          className="w-full h-full object-cover brightness-110"
        />
        <div className="absolute inset-0 bg-white/40"></div>
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Grįžti
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#D1A572] to-[#C9965E] px-8 py-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Sklypo pardavimas pajūryje</h2>
                <p className="text-white/90">Nupirksime jūsų sklypą už gerą kainą</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vardas, pavardė *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                    placeholder="Jūsų vardas ir pavardė"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefono numeris *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                    placeholder="+370 xxx xxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  El. pašto adresas *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="jusu.pastas@email.com"
                />
              </div>

              {/* Property Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pageidaujama suma (EUR)
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                    placeholder="Įveskite pageidaujamą sumą"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sklypo vietovė
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pasirinkite vietovę</option>
                    <option value="palanga">Palanga</option>
                    <option value="klaipeda">Klaipėda</option>
                    <option value="nida">Nida</option>
                    <option value="sventoji">Šventoji</option>
                    <option value="juodkrante">Juodkrantė</option>
                    <option value="preila">Preila</option>
                    <option value="pervalka">Pervalka</option>
                    <option value="karklė">Karklė</option>
                    <option value="giruliai">Giruliai</option>
                    <option value="melnrage">Melnragė</option>
                    <option value="other">Kita pajūrio vietovė</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sklypo dydis (arų)
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                    placeholder="Įveskite sklypo dydį arais"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Papildoma informacija
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Aprašykite savo sklypą, jo ypatumus, privalumus..."
                />
              </div>

              {/* File Upload */}
              <FileUpload
                files={files}
                onFilesChange={setFiles}
                acceptedTypes=".jpg,.jpeg,.png,.pdf"
                maxSizeMB={5}
                title="Pridėti sklypo nuotraukas ir dokumentus"
                description="Pridėkite sklypo nuotraukas, planą, dokumentus (iki 5MB, .jpg, .png, .pdf)"
              />

              {/* How did you hear about us */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kaip sužinojote apie mus?
                </label>
                <select
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Pasirinkite šaltinį</option>
                  <option value="facebook-ad">Facebook reklama</option>
                  <option value="instagram-ad">Instagram reklama</option>
                  <option value="google-search">Google paieška</option>
                  <option value="recommendation">Rekomendacija</option>
                  <option value="website">Internetinė svetainė</option>
                  <option value="other">Kita</option>
                </select>
              </div>

              {/* GDPR Consent */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="gdprConsent"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleCheckboxChange}
                    className="mt-1 w-5 h-5 text-[#D1A572] border-gray-300 rounded focus:ring-[#D1A572]"
                    required
                  />
                  <label htmlFor="gdprConsent" className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">Sutinku su duomenų tvarkymo sąlygomis *</span>
                    <br />
                    Sutinku, kad mano pateikti asmens duomenys būtų tvarkomi susisiekimo ir paslaugų teikimo tikslais. 
                    Duomenys bus saugomi saugiai ir naudojami tik susisiekimui su jumis dėl jūsų užklausos.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!formData.gdprConsent || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transform transition-all duration-200 shadow-lg ${
                  formData.gdprConsent && !isSubmitting
                    ? 'bg-gradient-to-r from-[#D1A572] to-[#C9965E] text-white hover:from-[#C9965E] hover:to-[#B8854D] hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Siunčiama...' : 'Pateikti sklypo pardavimo užklausą'}
              </button>
            </div>

            {/* Contact Buttons */}
            <ContactButtons />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandSearchForm;