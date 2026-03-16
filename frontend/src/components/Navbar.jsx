import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { siteContent } from '../data/siteContent';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://customer-assets.emergentagent.com/job_2930c9d8-9cc0-4c98-bfa6-159e6921e348/artifacts/x81skjar_Untitled%20design.png" 
              alt="ZAZ Precision Auto Detailing"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${siteContent.business.phone}`}
              className="flex items-center gap-2 text-gray-600 hover:text-[#f97316] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#f97316]" />
              <span className="text-sm">{siteContent.business.phone}</span>
            </a>
            <a
              href={`mailto:${siteContent.business.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-[#f97316] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#f97316]" />
              <span className="text-sm">{siteContent.business.email}</span>
            </a>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:text-[#f97316] font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('quote')}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#f97316] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-[#f97316] font-medium py-2 text-left transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('quote')}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-full font-medium transition-colors text-center"
              >
                Get Quote
              </button>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`tel:${siteContent.business.phone}`}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Phone className="w-4 h-4 text-[#f97316]" />
                  <span>{siteContent.business.phone}</span>
                </a>
                <a
                  href={`mailto:${siteContent.business.email}`}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Mail className="w-4 h-4 text-[#f97316]" />
                  <span className="text-sm">{siteContent.business.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
