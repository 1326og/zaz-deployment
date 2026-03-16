import React from 'react';
import { CheckCircle, Zap, Car, Shield, Paintbrush, Eye, Droplets } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const Services = () => {
  const { services, mobileBanner } = siteContent;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getServiceIcon = (serviceName) => {
    const iconMap = {
      'Reset Detail': Zap,
      'Full Interior & Exterior Detailing': Car,
      'Paint Correction': Paintbrush,
      'Paint Enhancement': Paintbrush,
      'Headlight Restoration': Eye,
    };
    const Icon = iconMap[serviceName] || Shield;
    return <Icon className="w-7 h-7" />;
  };

  const getIconBgColor = (serviceName, isPremium) => {
    if (isPremium) return 'bg-[#f97316]';
    const colors = {
      'Full Interior & Exterior Detailing': 'bg-[#0ea5e9]',
      'Paint Correction': 'bg-[#f97316]',
      'Paint Enhancement': 'bg-[#10b981]',
      'Headlight Restoration': 'bg-[#ec4899]',
    };
    return colors[serviceName] || 'bg-[#6366f1]';
  };

  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {services.title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Premium' ? 'text-[#f97316]' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.items.map((service, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                service.isPremium
                  ? 'border-[#f97316] border-2 relative overflow-hidden'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Premium Badge */}
              {service.isPremium && (
                <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white text-sm font-semibold py-1.5 px-4 absolute top-0 left-0 right-0 text-center">
                  ⭐ PREMIUM PACKAGE ⭐
                </div>
              )}

              <div className={service.isPremium ? 'mt-8' : ''}>
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${getIconBgColor(
                    service.name,
                    service.isPremium
                  )} rounded-xl flex items-center justify-center text-white mb-4`}
                >
                  {getServiceIcon(service.name)}
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    service.isPremium ? 'text-[#f97316]' : 'text-gray-900'
                  }`}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Service Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-2xl p-8 md:p-10 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8" />
            <h3 className="text-2xl md:text-3xl font-bold">{mobileBanner.title}</h3>
          </div>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {mobileBanner.description}
          </p>
          <button
            onClick={() => scrollToSection('quote')}
            className="bg-white text-[#f97316] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
          >
            {mobileBanner.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
