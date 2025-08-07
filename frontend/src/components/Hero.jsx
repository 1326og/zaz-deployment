import React from 'react';
import { Car, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                ZAZ PRECISION
              </span>
              <br />
              <span className="text-white">AUTO DETAILING</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional mobile car detailing services that bring showroom quality results directly to your driveway
            </p>

            {/* Service Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Car className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium">Mobile Service</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Shield className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium">Paint Protection</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="h-5 w-5 text-orange-400" />
                <span className="text-white font-medium">Interior Deep Clean</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('quote')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-transparent hover:border-white/30"
              >
                Get Free Quote
              </Button>
              <Button 
                onClick={() => scrollToSection('services')}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm"
              >
                View Services
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Convenience</h3>
              <p className="text-slate-300">We come to you! Only need access to water and electricity at your location.</p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Paint Correction</h3>
              <p className="text-slate-300">Professional paint correction and enhancement services that restore your vehicle's shine.</p>
            </div>

            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Complete Detailing</h3>
              <p className="text-slate-300">Full interior and exterior detailing plus headlight restoration for a complete transformation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;