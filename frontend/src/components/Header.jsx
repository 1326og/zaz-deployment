import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              {/* Shield-style logo container */}
              <div className="bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-3 rounded-lg shadow-lg border-2 border-white relative overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)'}}>
                <div className="text-white font-black text-2xl tracking-wider relative z-10">
                  ZAZ
                </div>
                {/* Inner shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              </div>
              {/* Bottom section */}
              <div className="bg-slate-800 text-white px-4 py-1 rounded-b-lg -mt-1 relative z-0">
                <div className="text-xs font-bold tracking-wide text-center">
                  PRECISION
                </div>
                <div className="text-xs font-medium tracking-wider text-center -mt-0.5">
                  AUTO DETAILING
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-700">
              <Phone className="h-4 w-4 text-orange-500" />
              <span className="font-medium">(973) 534-0023</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700">
              <Mail className="h-4 w-4 text-orange-500" />
              <span className="font-medium">zazprecisionautodetailingllc@gmail.com</span>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
              Services
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
              Gallery
            </button>
            <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
              About
            </button>
            <Button 
              onClick={() => scrollToSection('quote')} 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Quote
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-700 hover:text-orange-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('services')} className="text-left text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
                Services
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-left text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
                Gallery
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
                About
              </button>
              <button onClick={() => scrollToSection('quote')} className="text-left text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200">
                Get Quote
              </button>
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-slate-700 mb-2">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">(973) 534-0023</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-sm">zazprecisionautodetailingllc@gmail.com</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;