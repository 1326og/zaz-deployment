import React, { useEffect, useRef } from 'react';
import { siteContent } from '../data/siteContent';

const QuoteForm = () => {
  const { quote } = siteContent;
  const formContainerRef = useRef(null);

  useEffect(() => {
    // Load GoHighLevel form script
    const loadScript = () => {
      if (window.hhl_loaded) return;
      
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
      window.hhl_loaded = true;
    };

    loadScript();
  }, []);

  return (
    <section id="quote" className="bg-[#1e293b] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Get Your <span className="text-[#f97316]">Free Quote</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {quote.subtitle}
          </p>
        </div>

        {/* GoHighLevel Form Embed */}
        <div
          ref={formContainerRef}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <iframe
            src={quote.goHighLevelFormUrl}
            style={{
              width: '100%',
              height: '700px',
              border: 'none',
              borderRadius: '8px',
            }}
            id="inline-h4f6WzsFMMODF5Tmp2oh"
            data-layout="{'id':'INLINE'}" 
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Quote Request Form"
            data-height="700"
            data-layout-iframe-id="inline-h4f6WzsFMMODF5Tmp2oh"
            data-form-id="h4f6WzsFMMODF5Tmp2oh"
            title="Quote Request Form"
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
