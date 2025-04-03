
import React from 'react';

const testimonials = [
  {
    quote: "Being featured in Artisan Gallery has transformed my career. The exposure and care they give to artists is unparalleled.",
    author: "Emma Winters",
    role: "Featured Artist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "I've purchased several pieces from Artisan Gallery and each one has brought joy and inspiration to my home. Their curation is exceptional.",
    author: "Michael Chen",
    role: "Collector",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    quote: "The team at Artisan Gallery understands artists' needs and provides a beautiful platform to showcase our work to the world.",
    author: "Sophia Rodriguez",
    role: "Emerging Artist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Artist & Collector Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.author}</h4>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>
              <blockquote>
                <p className="italic text-gray-700 leading-relaxed">"{item.quote}"</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
