import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const Footer = () => {
  const { footer, business } = siteContent;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0f172a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <div className="mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_2930c9d8-9cc0-4c98-bfa6-159e6921e348/artifacts/0m3sovej_9b8b716f-e11a-45ba-8aa8-9d1c57d6790f.png" 
                alt="ZAZ Precision Auto Detailing"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">{footer.tagline}</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-gray-400 hover:text-[#f97316] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{business.phone}</span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-gray-400 hover:text-[#f97316] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{business.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Gallery', 'About', 'Quote'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-gray-400 hover:text-[#f97316] transition-colors"
                  >
                    {link === 'Quote' ? 'Get a Quote' : link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-[#1e293b] rounded-xl p-6">
            <h4 className="font-bold text-lg mb-2">Get Your Free Quote Today!</h4>
            <p className="text-gray-400 text-sm mb-4">
              Tell me about your vehicle and the services you need. I'll provide you with a detailed quote within 24 hours.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('quote')}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors"
              >
                Request Quote
              </button>
              <a
                href={`tel:${business.phone}`}
                className="bg-transparent border border-white hover:bg-white hover:text-[#0f172a] text-white px-4 py-2 rounded-full font-semibold text-sm text-center transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
