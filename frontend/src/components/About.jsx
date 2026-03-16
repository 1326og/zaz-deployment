import React from 'react';
import { Zap, Truck, Calendar, Award, Heart, Car, Paintbrush, Eye } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const About = () => {
  const { about } = siteContent;

  const getIcon = (iconName) => {
    const icons = {
      zap: Zap,
      truck: Truck,
      calendar: Calendar,
      award: Award,
      heart: Heart,
    };
    const Icon = icons[iconName] || Zap;
    return <Icon className="w-6 h-6" />;
  };

  const serviceIcons = {
    'Full Interior & Exterior Detailing': { icon: Car, color: 'bg-[#0ea5e9]' },
    'Paint Correction': { icon: Paintbrush, color: 'bg-[#f97316]' },
    'Paint Enhancement': { icon: Paintbrush, color: 'bg-[#10b981]' },
    'Headlight Restoration': { icon: Eye, color: 'bg-[#ec4899]' },
  };

  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#f97316]">ZAZ Precision</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Left Column - Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {about.mainHeading}
            </h3>
            {about.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.features.map((feature, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl ${
                  feature.highlighted
                    ? 'bg-gradient-to-br from-[#f97316] to-[#fb923c] text-white col-span-1 sm:col-span-2'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    feature.highlighted ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {getIcon(feature.icon)}
                </div>
                <h4
                  className={`font-bold mb-1 ${
                    feature.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {feature.title}
                </h4>
                <p
                  className={`text-sm ${
                    feature.highlighted ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Services */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            My Specialized Services Include:
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {about.specializedServices.map((service, index) => {
              const serviceConfig = serviceIcons[service] || { icon: Car, color: 'bg-gray-500' };
              const Icon = serviceConfig.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 ${serviceConfig.color} rounded-full flex items-center justify-center text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {service}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
