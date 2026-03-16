import React from 'react';
import { Truck, Shield, Sparkles, Phone, Mail } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const Hero = () => {
  const { hero, featureCards, business } = siteContent;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      truck: Truck,
      shield: Shield,
      sparkles: Sparkles
    };
    const Icon = icons[iconName] || Sparkles;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section id="hero" className="relative pt-20">
      {/* Hero Background */}
      <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            {/* Contact Info in Hero */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-[#f97316] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#f97316]" />
                <span className="text-base">{business.phone}</span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-[#f97316] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#f97316]" />
                <span className="text-base">{business.email}</span>
              </a>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-[#f97316]">{hero.title}</span>
              <br />
              <span className="text-white">{hero.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {hero.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {hero.features.map((feature, index) =>
              <div
                key={index}
                className="flex items-center gap-2 bg-[#334155] px-4 py-2 rounded-full text-sm">

                  {index === 0 && <Truck className="w-4 h-4 text-[#f97316]" />}
                  {index === 1 && <Shield className="w-4 h-4 text-[#f97316]" />}
                  {index === 2 && <Sparkles className="w-4 h-4 text-[#f97316]" />}
                  <span>{feature}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection('quote')}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105">

                {hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1e293b] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300">

                {hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20">
            {featureCards.map((card, index) =>
            <div
              key={index}
              className="border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center p-6 rounded-xl shadow-lg !bg-[#141D30]">

                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-xl text-white !bg-[#F99316]">
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2 !text-[#F97316]">
                  {card.title}
                </h3>
                <p className="!text-[#F7F7F7]">{card.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default Hero;