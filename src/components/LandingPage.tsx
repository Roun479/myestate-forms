import React from 'react';
import { MapPin, Building2, Home, ArrowRight, Mail, Phone, Globe, Instagram } from 'lucide-react';
import { FormType } from '../App';

interface LandingPageProps {
  onNavigate: (form: FormType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'land-search' as FormType,
      title: 'Nupirksime jūsų sklypą pajūryje!',
      description: 'Greitai ir už gerą kainą nupirksime jūsų sklypą pajūrio zonoje',
      icon: MapPin,
      color: 'from-[#D1A572] to-[#C9965E]',
      hoverColor: 'hover:from-[#C9965E] hover:to-[#B8854D]'
    },
    {
      id: 'property-sale' as FormType,
      title: 'Galime parduoti jūsų nekilnojamąjį turtą',
      description: 'Profesionaliai ir greitai parduosime jūsų nekilnojamąjį turtą',
      icon: Building2,
      color: 'from-[#D1A572] to-[#C9965E]',
      hoverColor: 'hover:from-[#C9965E] hover:to-[#B8854D]'
    },
    {
      id: 'projects' as FormType,
      title: 'Ieškote naujų projektų pajūryje?',
      description: 'Sužinokite apie naujausius nekilnojamojo turto projektus pajūryje',
      icon: Home,
      color: 'from-[#D1A572] to-[#C9965E]',
      hoverColor: 'hover:from-[#C9965E] hover:to-[#B8854D]'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex items-center justify-center">
            <img
              src="/Horizontalus logotipas_1 copy copy.png"
              alt="MyEstate"
              className="h-6 sm:h-12 brightness-110 contrast-125 drop-shadow-2xl opacity-95"
            />
          </div>
        </div>
      </header>

      {/* Hero Section - Full Bleed */}
      <section className="relative -mx-[calc(50vw-50%)] w-screen min-h-screen overflow-hidden">
        {/* Background - Picture Element */}
        <picture className="absolute inset-0">
          <source media="(max-width: 640px)" srcSet="/7fin fix.jpg" />
          <img
            className="w-full h-full object-cover object-[center_30%] sm:object-center scale-[1.15] sm:scale-100"
            src="/7fin fix.jpg"
            alt="Pajūrio terasa"
          />
        </picture>

        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/20 sm:from-black/20 sm:via-black/10 sm:to-black/20"></div>

        <div className="relative z-10 pt-[72px] sm:pt-32 pb-3 sm:pb-12 px-4">
          <div className="max-w-6xl mx-auto sm:max-w-6xl">
            <div className="text-center mb-4 sm:mb-10 md:mb-12">
              <h2 className="text-[clamp(26px,5.8vw,34px)] sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-6 drop-shadow-2xl leading-[1.15]">
                Nekilnojamasis turtas
                <span className="text-[#D1A572]"> pajūryje</span>
              </h2>
              <p className="text-[clamp(13px,3.2vw,15px)] sm:text-lg md:text-xl text-white max-w-[36ch] sm:max-w-3xl mx-auto leading-relaxed drop-shadow-xl px-2 opacity-90">
                Profesionalūs nekilnojamojo turto sprendimai pajūrio zonoje.
                Padėsime rasti, parduoti ar investuoti į jūsų svajonių nekilnojamąjį turtą.
              </p>
            </div>

            {/* Service Cards - Horizontal Scroll on Mobile */}
            <div className="mt-3 sm:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 sm:grid-flow-row sm:auto-cols-auto overflow-x-auto sm:overflow-visible scroll-snap-type-x scroll-snap-type-mandatory sm:scroll-snap-type-none px-4 sm:px-0 pb-2 sm:pb-0 max-w-[340px] sm:max-w-none mx-auto
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              sm:[display:grid]">
              {services.map((service) => {
                const IconComponent = service.icon;

                return (
                  <div
                    key={service.id}
                    onClick={() => onNavigate(service.id)}
                    className="group cursor-pointer relative rounded-lg sm:rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.18)] transition-all duration-300 transform hover:-translate-y-2 scroll-snap-align-start min-w-full sm:min-w-0 overflow-hidden"
                  >
                    {/* Gradient overlay from top to transparent */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent pointer-events-none"></div>

                    {/* Backdrop blur layer */}
                    <div className="absolute inset-0 backdrop-blur-[4px] [-webkit-backdrop-filter:blur(4px)] group-hover:backdrop-blur-[5px] group-hover:[-webkit-backdrop-filter:blur(5px)] transition-all duration-300 pointer-events-none"></div>
                    <div className="relative z-10 p-4 sm:p-6 md:p-8">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-2.5 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>

                      <h3 className="text-[0.95rem] sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-3 md:mb-4 group-hover:text-gray-900 transition-colors duration-300 drop-shadow-lg leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-[0.81rem] sm:text-sm md:text-base text-white/95 mb-2.5 sm:mb-4 md:mb-6 leading-snug drop-shadow-md">
                        {service.description}
                      </p>

                      <div className="flex items-center text-[#D1A572] font-semibold group-hover:text-gray-900 transition-colors duration-300 drop-shadow-md text-[0.81rem] sm:text-sm md:text-base">
                        <span>Pradėti</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6 text-center md:text-left">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Susisiekite</h3>
              <div className="space-y-3">
                <a href="tel:+37065899633" className="flex items-center justify-center md:justify-start text-gray-400 hover:text-white transition-colors duration-200">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+370 658 99633</span>
                </a>
                <a href="mailto:rokas@myestate.lt" className="flex items-center justify-center md:justify-start text-gray-400 hover:text-white transition-colors duration-200">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>rokas@myestate.lt</span>
                </a>
              </div>
            </div>

            {/* Website & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Apsilankykite</h3>
              <div className="space-y-3">
                <a
                  href="https://www.myestate.lt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Globe className="w-5 h-5 mr-3" />
                  <span>www.myestate.lt</span>
                </a>
                <a
                  href="https://www.instagram.com/myestate.lt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5 mr-3" />
                  <span>myestate.lt</span>
                </a>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center md:justify-start">
              <img
                src="/Horizontalus logotipas_1 copy copy.png"
                alt="MyEstate"
                className="h-10 opacity-80"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 MyEstate. Visos teisės saugomos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;