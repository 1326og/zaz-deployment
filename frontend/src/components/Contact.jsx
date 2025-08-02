import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      primary: "(973) 534-0023",
      secondary: "Call or text anytime",
      action: () => window.location.href = 'tel:+19735340023',
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "zazprecisionautodetailingllc@gmail.com",
      secondary: "We respond within 24 hours",
      action: () => window.location.href = 'mailto:zazprecisionautodetailingllc@gmail.com',
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: MapPin,
      title: "Service Area",
      primary: "Mobile Service",
      secondary: "We come to your location",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Clock,
      title: "Availability",
      primary: "Flexible Scheduling",
      secondary: "Book appointments that fit your schedule",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Contact <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ready to experience professional mobile auto detailing? Get in touch with us today to schedule your service or ask any questions.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card 
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-slate-50 overflow-hidden ${contact.action ? 'cursor-pointer' : ''}`}
                  onClick={contact.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${contact.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {contact.title}
                    </h3>
                    <p className="text-slate-800 font-semibold mb-1 break-words">
                      {contact.primary}
                    </p>
                    <p className="text-slate-600 text-sm">
                      {contact.secondary}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Contact Section */}
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-6">
                  Ready to Transform Your Vehicle?
                </h3>
                <div className="space-y-4 text-slate-700 text-lg leading-relaxed mb-8">
                  <p>
                    Experience the convenience of professional mobile auto detailing. Our team brings all the equipment and expertise needed to make your vehicle look its absolute best.
                  </p>
                  <p className="font-semibold text-orange-600">
                    Simple Requirements: Just water spigot access and electrical outlet - we handle everything else!
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Call Now</p>
                      <p className="text-slate-600">(973) 534-0023</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Email Us</p>
                      <p className="text-slate-600 break-words">zazprecisionautodetailingllc@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Call to Action */}
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <MessageCircle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-slate-800 mb-4">
                    Get Your Free Quote Today!
                  </h4>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Tell us about your vehicle and the services you need. We'll provide you with a detailed quote within 24 hours.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={() => scrollToSection('quote')}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Request Quote
                    </Button>
                    
                    <Button 
                      onClick={() => window.location.href = 'tel:+19735340023'}
                      variant="outline"
                      className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Service Info */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white inline-block">
              <h4 className="text-xl font-bold mb-2">Mobile Service Benefits</h4>
              <p className="text-lg opacity-95">
                ✓ We come to you  ✓ Professional equipment  ✓ Premium products  ✓ Flexible scheduling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;