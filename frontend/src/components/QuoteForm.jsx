import React, { useEffect } from 'react';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const QuoteForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="quote" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Free Quote</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Tell us about your vehicle and the services you need. We'll provide you with a detailed quote within 24 hours.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* GHL form */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardContent className="p-6">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/FORM_ID"
                  style={{ width: '100%', height: '600px', border: 'none', borderRadius: '4px' }}
                  id="inline-FORM_ID"
                  data-layout='{"id":"INLINE"}'
                  data-trigger-type="alwaysShow"
                  data-activation-type="alwaysActivated"
                  data-deactivation-type="neverDeactivate"
                  data-form-id="FORM_ID"
                  title="Get a Free Quote"
                ></iframe>
              </CardContent>
            </Card>
            {/* Contact info and why choose */}
            <div className="space-y-8">
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
