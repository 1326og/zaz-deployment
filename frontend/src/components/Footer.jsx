import React from 'react';
import { Phone, Mail, MapPin, Car } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl tracking-wider">
                  ZAZ
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg leading-tight">PRECISION</span>
                  <span className="text-orange-400 font-semibold text-sm tracking-wide">AUTO DETAILING LLC</span>
                </div>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
                Professional mobile auto detailing services that bring showroom-quality results directly to your location. I specialize in comprehensive detailing, paint correction, and enhancement services.
              </p>

              {/* Mobile Service Highlight */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Car className="h-5 w-5 text-orange-400" />
                  <span className="text-white font-semibold">100% Mobile Service</span>
                </div>
                <p className="text-slate-300 text-sm">
                  I come to you! Only need water spigot and electrical access.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-left"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('gallery')}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-left"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('quote')}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-left"
                  >
                    Get Quote
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-300 hover:text-orange-400 transition-colors duration-200 text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">(973) 534-0023</p>
                    <p className="text-slate-300 text-sm">Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold break-words">
                      zazprecisionautodetailingllc@gmail.com
                    </p>
                    <p className="text-slate-300 text-sm">24 hour response time</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Mobile Service</p>
                    <p className="text-slate-300 text-sm">I come to your location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-4">Our Specialized Services</h4>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                  Full Interior & Exterior Detailing
                </span>
                <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                  Paint Correction
                </span>
                <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                  Paint Enhancement
                </span>
                <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                  Headlight Restoration
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 text-sm text-center md:text-left">
                © {currentYear} Zaz Precision Auto Detailing LLC. All rights reserved.
              </p>
              <div className="text-center md:text-right">
                <p className="text-slate-400 text-sm">
                  Professional Mobile Auto Detailing Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;