import React, { useState } from 'react';
import { Send, Car, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    services: [],
    location: '',
    message: ''
  });
	
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Reset Detail (Premium Package)',
    'Full Interior & Exterior Detailing',
    'Paint Correction',
    'Paint Enhancement', 
    'Headlight Ceramic Coating',
    'Interior Deep Clean Only',
    'Exterior Wash & Wax Only'
  ];

  const vehicleTypes = [
    'Sedan',
    'SUV',
    'Truck',
    'Convertible',
    'Coupe',
    'Van/Minivan',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to actual backend API
      const response = await axios.post(`${API}/quotes`, formData);
      
      if (response.data.success) {
        toast({
          title: "Quote Request Sent!",
          description: "We'll contact you within 24 hours with a detailed quote.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicleType: '',
          services: [],
          location: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "There was an issue sending your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && 
                     formData.vehicleType && formData.services.length > 0;

  return (
    <section id="quote" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Free Quote</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Tell us about your vehicle and the services you need. We'll provide you with a detailed quote within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 text-orange-400" />
                  Request Quote
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
			  
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(XXX) XXX-XXXX"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Car className="h-4 w-4 inline mr-2" />
                        Vehicle Type *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {vehicleTypes.map(type => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-slate-700">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Services Needed * (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {services.map(service => (
                        <div key={service} 
                             className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                               formData.services.includes(service)
                                 ? 'border-orange-400 bg-orange-400/10'
                                 : 'border-white/20 bg-white/5 hover:border-white/40'
                             }`}
                             onClick={() => handleServiceToggle(service)}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.services.includes(service)
                                ? 'border-orange-400 bg-orange-400'
                                : 'border-white/40'
                            }`}>
                              {formData.services.includes(service) && (
                                <CheckCircle className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{service}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Service Location (City, State)
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Where should we come to you?"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Additional Details
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your vehicle or specific requirements like window dont work..."
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Request...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-3" />
                        Get My Free Quote
                      </div>
                    )}
                  </Button>
                </form>
				
              </CardContent>
            </Card>

            {/* Info Panel */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-300 text-sm">Call us directly</p>
                        <p className="text-white font-semibold text-lg">(973) 534-0023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-300 text-sm">Email us</p>
                        <p className="text-white font-semibold">zazprecisionautodetailingllc@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Why Choose Zaz Precision?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-300">30+ years of experience in professional auto detailing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-300">Premium products and professional equipment</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-300">Comprehensive interior and exterior services</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-slate-300">Expert paint correction and enhancement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
