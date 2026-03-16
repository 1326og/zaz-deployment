import React from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const Contact = () => {
  const { contact, business } = siteContent;

  const getIcon = (iconName) => {
    const icons = {
      phone: Phone,
      mail: Mail,
      mapPin: MapPin,
      clock: Clock
    };
    const Icon = icons[iconName] || Phone;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-[#f97316]">Me</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contact.subtitle}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contact.info.map((item, index) =>
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all duration-300">

              <div className="w-14 h-14 bg-[#f97316] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              {item.icon === 'phone' ?
            <a
              href={`tel:${item.value}`}
              className="text-[#f97316] font-semibold hover:underline">

                  {item.value}
                </a> :
            item.icon === 'mail' ?
            <a
              href={`mailto:${item.value}`}
              className="text-[#f97316] font-semibold hover:underline text-sm break-all">

                  {item.value}
                </a> :

            <p className="text-[#f97316] font-semibold">{item.value}</p>
            }
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {contact.cta.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {contact.cta.description}
              </p>
              <p className="font-semibold text-lg mb-6 !text-[#069DE5]">
                {contact.cta.note}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${business.phone}`}
                  className="hover:bg-[#ea580c] transition-all duration-300 hover:shadow-lg font-semibold text-center px-6 py-3 rounded-full text-white !bg-[#0C5DEA]">

                  Call Now
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1e293b] text-white px-6 py-3 rounded-full font-semibold text-center transition-all duration-300">

                  Email Me
                </a>
              </div>
            </div>

            {/* Right Content - Benefits */}
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-4">Mobile Service Benefits</h4>
              <div className="grid grid-cols-2 gap-3">
                {contact.benefits.map((benefit, index) =>
                <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default Contact;