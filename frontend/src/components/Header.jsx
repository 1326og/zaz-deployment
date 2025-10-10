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
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl tracking-wider transform hover:scale-105 transition-all duration-300 cursor-pointer">
              ZAZ
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-slate-800 font-bold text-lg leading-tight">PRECISION</span>
              <span className="text-orange-500 font-semibold text-sm tracking-wide">AUTO DETAILING</span>
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
              onClick={() => window.location.href = 'https://api.leadconnectorhq.com/widget/form/Tvl7RXwuSx4ltzvxnBJ6'} 
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