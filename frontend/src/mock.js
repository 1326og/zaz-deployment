// Mock data for the car detailing website

export const mockServices = [
  {
    id: 1,
    title: "Full Interior & Exterior Detailing",
    description: "Complete comprehensive cleaning and restoration of your vehicle inside and out.",
    price: "Starting at $150",
    duration: "3-4 hours",
    features: [
      "Deep interior cleaning and conditioning",
      "Exterior wash and wax application", 
      "Leather and fabric protection",
      "Dashboard and trim restoration",
      "Window and mirror cleaning"
    ]
  },
  {
    id: 2,
    title: "Paint Correction", 
    description: "Professional paint restoration to remove swirl marks, scratches, and imperfections.",
    price: "Starting at $300",
    duration: "4-6 hours",
    features: [
      "Multi-stage paint correction process",
      "Swirl mark and scratch removal",
      "Paint depth restoration",
      "High-quality finishing compounds",
      "Machine polishing techniques"
    ]
  },
  {
    id: 3,
    title: "Paint Enhancement",
    description: "Enhance your vehicle's paint finish with professional-grade treatments.",
    price: "Starting at $200",
    duration: "2-3 hours",
    features: [
      "Paint clarity improvement",
      "Gloss enhancement treatments",
      "Surface preparation and cleaning",
      "Professional grade products",
      "Long-lasting shine protection"
    ]
  },
  {
    id: 4,
    title: "Headlight Restoration",
    description: "Restore clarity and brightness to foggy, yellowed, or oxidized headlights.",
    price: "Starting at $80",
    duration: "1-2 hours",
    features: [
      "UV damage restoration",
      "Oxidation removal",
      "Clarity enhancement",
      "Protective coating application",
      "Improved visibility and safety"
    ]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "John Smith",
    rating: 5,
    comment: "Amazing mobile service! My car looks brand new. The paint correction work was exceptional.",
    vehicleType: "BMW 3 Series"
  },
  {
    id: 2,
    name: "Sarah Johnson", 
    rating: 5,
    comment: "Professional, reliable, and convenient. Love that they come to my house!",
    vehicleType: "Honda Accord"
  },
  {
    id: 3,
    name: "Mike Wilson",
    rating: 5,
    comment: "Best detailing service I've ever used. The headlight restoration made such a difference.",
    vehicleType: "Ford F-150"
  }
];

export const mockQuoteRequests = [];

// Mock functions for demo purposes
export const submitQuoteRequest = async (formData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const quoteRequest = {
    id: Date.now(),
    ...formData,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  
  mockQuoteRequests.push(quoteRequest);
  
  return {
    success: true,
    message: "Quote request submitted successfully!",
    quoteId: quoteRequest.id
  };
};

export const getServicesByType = (type) => {
  return mockServices.filter(service => 
    service.title.toLowerCase().includes(type.toLowerCase())
  );
};

export const mockBusinessInfo = {
  name: "Zaz Precision Auto Detailing LLC",
  phone: "(973) 534-0023",
  email: "zazprecisionautodetailingllc@gmail.com",
  serviceType: "Mobile Only",
  requirements: ["Water spigot access", "Electrical outlet"],
  serviceArea: "Local area and surrounding regions",
  hours: "By appointment - Flexible scheduling"
};