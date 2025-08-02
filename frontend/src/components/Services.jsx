import React from 'react';
import { Car, Shield, Sparkles, Eye, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Services = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Zap,
      title: "Reset Detail",
      description: "Our ultimate comprehensive detailing package that completely transforms your vehicle inside and out.",
      features: [
        "Complete interior blow out and vacuum",
        "Steam extraction of upholstery and carpets",
        "Interior deodorizing and leather conditioning",
        "Paint clay bar treatment and machine polishing",
        "Premium paint sealant (up to 8 months protection)",
        "Wheels, tires, and door jambs detailed"
      ],
      gradient: "from-yellow-500 to-orange-500",
      premium: true
    },
    {
      icon: Car,
      title: "Full Interior & Exterior Detailing",
      description: "Complete comprehensive cleaning and restoration of your vehicle inside and out.",
      features: [
        "Deep interior cleaning and conditioning",
        "Exterior wash and wax application", 
        "Leather and fabric protection",
        "Dashboard and trim restoration",
        "Window and mirror cleaning"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Paint Correction", 
      description: "Professional paint restoration to remove swirl marks, scratches, and imperfections.",
      features: [
        "Multi-stage paint correction process",
        "Swirl mark and scratch removal",
        "Paint depth restoration",
        "High-quality finishing compounds",
        "Machine polishing techniques"
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "Paint Enhancement",
      description: "Enhance your vehicle's paint finish with professional-grade treatments.",
      features: [
        "Paint clarity improvement",
        "Gloss enhancement treatments",
        "Surface preparation and cleaning",
        "Professional grade products",
        "Long-lasting shine protection"
      ],
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Eye,
      title: "Headlight Restoration",
      description: "Restore clarity and brightness to foggy, yellowed, or oxidized headlights.",
      features: [
        "UV damage restoration",
        "Oxidation removal",
        "Clarity enhancement",
        "Protective coating application",
        "Improved visibility and safety"
      ],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our Premium <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Professional mobile auto detailing services delivered with precision and care. We bring showroom-quality results directly to your location.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Service Highlight */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 mr-3" />
            <h3 className="text-3xl font-bold">100% Mobile Service</h3>
          </div>
          <p className="text-xl mb-6 opacity-95">
            We come to your location! All we need is access to a water spigot and electricity, and we'll handle the rest.
          </p>
          <Button 
            onClick={() => scrollToSection('quote')}
            className="bg-white text-orange-600 hover:bg-slate-100 font-bold px-8 py-3 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Schedule Your Service
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;