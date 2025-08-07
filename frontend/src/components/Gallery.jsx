import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Using the provided images from the client
  const galleryImages = [
    {
      src: "https://customer-assets.emergentagent.com/job_car-spa-pro-1/artifacts/ye68oxte_dtp5.jpg",
      title: "Blue Mustang - Before & After",
      description: "Complete paint correction and enhancement on this beautiful blue Mustang",
      alt: "Blue Ford Mustang after professional paint correction and detailing by Zaz Precision Auto Detailing"
    },
    {
      src: "https://customer-assets.emergentagent.com/job_car-spa-pro-1/artifacts/9yb5mp0v_dtp6.jpg", 
      title: "Luxury SUV - Paint Perfection",
      description: "Full exterior detailing with paint correction on this premium SUV",
      alt: "Black luxury SUV after comprehensive exterior detailing and paint correction service"
    },
    {
      src: "https://customer-assets.emergentagent.com/job_car-spa-pro-1/artifacts/9bo97esu_dtp8.jpg",
      title: "Interior Deep Clean",
      description: "Professional interior detailing showcasing our attention to detail",
      alt: "Luxury vehicle interior showing professional deep cleaning and leather conditioning results"
    },
    {
      src: "https://customer-assets.emergentagent.com/job_car-spa-pro-1/artifacts/wha5fb9c_dtp2.jpg",
      title: "Convertible Restoration", 
      description: "Complete paint enhancement and detailing on this stylish convertible",
      alt: "Silver convertible car after Reset Detail premium package treatment"
    },
    {
      src: "https://customer-assets.emergentagent.com/job_car-spa-pro-1/artifacts/o1zmh9gc_dt4.jpg",
      title: "SUV Paint Correction",
      description: "Professional paint correction and protection applied to this SUV",
      alt: "Dark SUV showcasing professional paint correction and enhancement results"
    }
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Results</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See the incredible transformations we achieve through our precision auto detailing services. Quality speaks for itself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-slate-100"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
                
                {/* View Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Maximize2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors duration-200 z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-200 bg-black/20 backdrop-blur-sm rounded-full p-2 z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors duration-200 bg-black/20 backdrop-blur-sm rounded-full p-2 z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-lg opacity-90">{selectedImage.description}</p>
                <div className="mt-2 text-sm opacity-70">
                  {currentImageIndex + 1} of {galleryImages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;