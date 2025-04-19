import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-poppins text-gray-800 mb-3">
            Creative Journeys Shared
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how artists and collectors have found inspiration,
            connection, and opportunity through our vibrant creative marketplace
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-pastel-pink to-pastel-purple mx-auto mt-4"></div>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default TestimonialsSection;
