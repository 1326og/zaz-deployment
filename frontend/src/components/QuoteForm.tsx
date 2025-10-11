import React, { useEffect } from 'react';

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
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Free Quote</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Tell us about your vehicle and the services you need. We'll provide you with a detailed quote within 24 hours.
          </p>
          <div className="w-full">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
