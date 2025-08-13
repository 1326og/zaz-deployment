import React from 'react';
import { Car, MapPin, Clock, Award, Users, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: "100% Mobile Service",
      description: "We bring our professional detailing services directly to your location - home, office, or anywhere convenient for you."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling", 
      description: "Book appointments that work with your schedule. We offer flexible timing to accommodate your busy lifestyle."
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Using only premium products and proven techniques to deliver showroom-quality results every time."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We treat every vehicle with the care and attention it deserves."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              About <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Zaz Precision</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Professional mobile auto detailing services that bring convenience and quality directly to you.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Content */}
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">
                Premium Mobile Auto Detailing
              </h3>
              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  At Zaz Precision Auto Detailing LLC, I specialize in bringing professional-grade auto detailing services directly to your doorstep. My mobile approach means you never have to leave the comfort of your home or office.
                </p>
                <p>
                  I pride myself on delivering comprehensive interior and exterior detailing, expert paint correction, paint enhancement, and headlight ceramic coating services that exceed expectations.
                </p>
                <p>
                  <strong className="text-orange-600">All I need is access to water and electricity</strong> - I handle everything else! My professional equipment and premium products ensure your vehicle receives the care it deserves.
                </p>
              </div>

              {/* Requirements Highlight */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                <div className="flex items-center mb-3">
                  <Zap className="h-6 w-6 mr-3" />
                  <h4 className="text-xl font-bold">Simple Requirements</h4>
                </div>
                <p className="text-lg opacity-95">
                  Just provide access to a water spigot and electrical outlet - we bring all the professional equipment and supplies needed for a complete detailing service.
                </p>
              </div>
            </div>

            {/* Right Side - Features Grid */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                            {feature.title}
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Services Overview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Our Specialized Services Include:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Full Interior & Exterior Detailing</h4>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Paint Correction</h4>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Paint Enhancement</h4>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Headlight Ceramic Coating</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;