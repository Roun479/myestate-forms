import React, { useState } from 'react';
import { ArrowLeft, Home, CheckCircle } from 'lucide-react';
import ContactButtons from './ContactButtons';

interface ProjectsFormProps {
  onBack: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  investmentBudget: string;
  customBudget: string;
  preferredLocation: string;
  propertyType: string;
  investmentGoal: string;
  timeframe: string;
  additionalInfo: string;
  gdprConsent: boolean;
  howDidYouHear: string;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    investmentBudget: '',
    customBudget: '',
    preferredLocation: '',
    propertyType: '',
    investmentGoal: '',
    timeframe: '',
    additionalInfo: '',
    gdprConsent: false,
    howDidYouHear: ''
  });
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
      const { submitProject } = await import('../lib/supabase');

      const submissionData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        preferred_location: formData.preferredLocation,
        property_type: formData.propertyType,
        investment_goal: formData.investmentGoal,
        description: formData.additionalInfo || 'Projekto paieška',
        budget: formData.investmentBudget === 'custom' ? formData.customBudget : formData.investmentBudget,
        timeline: formData.timeframe,
        additional_info: formData.additionalInfo,
        source: formData.howDidYouHear
      };

      console.log('=== SUBMISSION DATA ===', submissionData);

      await submitProject(submissionData);
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
            Ačiū už jūsų susidomėjimą! Susisieksime su jumis ir supažindinsime su naujausiais projektais pajūryje.
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
          <div className="bg-gradient-to-r from-[#D1A572] to-[#C9965E] px-8 py-8">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-6">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Nauji projektai pajūryje</h2>
                <p className="text-white/90 text-lg">Sužinokite pirmi apie naujausius investicinius projektus</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="jusu.pastas@email.com"
                />
              </div>

              {/* Project Type Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Projekto tipas *
                </label>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, projectType: 'personal' }))}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.projectType === 'personal'
                        ? 'border-[#D1A572] bg-[#D1A572]/10 shadow-lg'
                        : 'border-gray-300 hover:border-[#D1A572]/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.projectType === 'personal'
                          ? 'border-[#D1A572] bg-[#D1A572]'
                          : 'border-gray-300'
                      }`}>
                        {formData.projectType === 'personal' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Ieškau sau</h4>
                        <p className="text-gray-600">Asmeniniam naudojimui</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setFormData(prev => ({ ...prev, projectType: 'investment' }))}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.projectType === 'investment'
                        ? 'border-[#D1A572] bg-[#D1A572]/10 shadow-lg'
                        : 'border-gray-300 hover:border-[#D1A572]/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.projectType === 'investment'
                          ? 'border-[#D1A572] bg-[#D1A572]'
                          : 'border-gray-300'
                      }`}>
                        {formData.projectType === 'investment' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Investicijai</h4>
                        <p className="text-gray-600">Pajamų generavimui</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {formData.projectType === 'investment' ? 'Investicijų biudžetas (EUR)' : 'Biudžetas (EUR)'}
                  </label>
                  <select
                    name="investmentBudget"
                    value={formData.investmentBudget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pasirinkite biudžetą</option>
                    {formData.projectType === 'investment' ? (
                      <>
                        <option value="100000">100,000 EUR</option>
                        <option value="200000">200,000 EUR</option>
                        <option value="300000">300,000 EUR</option>
                        <option value="500000">500,000 EUR</option>
                        <option value="1000000+">Virš 1,000,000 EUR</option>
                        <option value="custom">Kitas - įrašyti savo sumą</option>
                      </>
                    ) : (
                      <>
                        <option value="50000-150000">50,000 - 150,000 EUR</option>
                        <option value="150000-300000">150,000 - 300,000 EUR</option>
                        <option value="300000-500000">300,000 - 500,000 EUR</option>
                        <option value="500000+">Virš 500,000 EUR</option>
                        <option value="custom">Kitas - įrašyti savo sumą</option>
                      </>
                    )}
                  </select>
                  
                  {formData.investmentBudget === 'custom' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="customBudget"
                        value={formData.customBudget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                        placeholder="Įveskite savo biudžetą (EUR)"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pageidaujama vietovė
                  </label>
                  <select
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pasirinkite vietovę</option>
                    <option value="palanga">Palanga</option>
                    <option value="kunigiskes">Kunigiskės</option>
                    <option value="monciskes">Monciškės</option>
                    <option value="sventoji">Šventoji</option>
                    <option value="klaipeda">Klaipėda</option>
                    <option value="giruliai">Giruliai</option>
                    <option value="melnrage">Melnragė</option>
                    <option value="nida">Nida</option>
                    <option value="juodkrante">Juodkrantė</option>
                    <option value="preila">Preila</option>
                    <option value="pervalka">Pervalka</option>
                    <option value="karkle">Karklė</option>
                    <option value="butinge">Būtingė</option>
                    <option value="any-coastal">Bet kuri pajūrio vietovė</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Turto tipas
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pasirinkite tipą</option>
                    {formData.projectType === 'investment' ? (
                      <>
                        <option value="apartments">Butai (nuomai)</option>
                        <option value="commercial">Komercinis NT</option>
                        <option value="hotels">Viešbučiai/Kurortai</option>
                        <option value="mixed">Mišrūs projektai</option>
                        <option value="any">Bet koks tipas</option>
                      </>
                    ) : (
                      <>
                        <option value="apartments">Butai</option>
                        <option value="houses">Namai/Vilų kvartalai</option>
                        <option value="cottages">Vasarnamiai</option>
                        <option value="any">Bet koks tipas</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {formData.projectType === 'investment' ? 'Investavimo tikslas' : 'Pirkimo tikslas'}
                  </label>
                  <select
                    name="investmentGoal"
                    value={formData.investmentGoal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A572] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Pasirinkite tikslą</option>
                    {formData.projectType === 'investment' ? (
                      <>
                        <option value="rental-income">Nuomos pajamos</option>
                        <option value="capital-growth">Turto vertės augimui</option>
                        <option value="quick-resale">Greitam pardavimui</option>
                        <option value="diversification">Diversifikacijai/portfelio plėtrai</option>
                      </>
                    ) : (
                      <>
                        <option value="primary-residence">Pagrindiniam gyvenimui</option>
                        <option value="vacation-home">Poilsio namui</option>
                        <option value="family-use">Šeimos naudojimui</option>
                        <option value="retirement">Pensijai</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formData.projectType === 'investment' ? 'Investavimo laikotarpis' : 'Pirkimo laikotarpis'}
                </label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Pasirinkite laikotarpį</option>
                  <option value="immediate">Iš karto</option>
                  <option value="3-months">Per 3 mėnesius</option>
                  <option value="6-months">Per 6 mėnesius</option>
                  <option value="1-year">Per metus</option>
                  <option value="exploring">Tik tyrinėju galimybes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Papildomi pageidavimai
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Aprašykite, kokie projektai jus domina, kokių funkcijų ieškote, ar turite specifinių reikalavimų..."
                />
              </div>

              {/* How did you hear about us */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kaip sužinojote apie mus?
                </label>
                <select
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
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
                {isSubmitting ? 'Siunčiama...' : 'Gauti informaciją apie projektus'}
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

export default ProjectsForm;