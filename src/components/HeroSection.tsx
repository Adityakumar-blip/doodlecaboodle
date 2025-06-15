import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "@/assets/01.jpg";
import image2 from "@/assets/02.png";
import image3 from "@/assets/03.png";

interface HeroImage {
  url: string;
  title: string;
  subtitle: string;
  tag: string;
}

const heroImages = [
  {
    url: image1, //https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80
    title: "Discover Unique Artworks",
    subtitle:
      "Explore our curated collection of handpicked paintings, illustrations, and sculptures from emerging and established artists across the globe.",
    tag: "New Collection: Summer Abstracts",
  },
  {
    url: image2, //https://images.unsplash.com/photo-1545033131-485ea67fd7c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80
    title: "Limited Edition Prints",
    subtitle:
      "Own a piece of exclusive artwork with our limited edition prints, each one numbered and signed by the artist.",
    tag: "Limited Time: Free Shipping",
  },
  {
    url: image3, //https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80
    title: "Art That Speaks To You",
    subtitle:
      "Find pieces that resonate with your personal style and transform your space into a reflection of your unique taste.",
    tag: "Featured: Abstract Expressionism",
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={image.url}
            alt={image.title}
            className="object-cover w-full h-full"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1 mb-4 text-xs font-medium tracking-wider text-white uppercase bg-black/60 rounded-full">
                {image.tag}
              </span>
              <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {image.title}
              </h2>
              <p className="mb-8 text-lg md:text-xl text-white/90">
                {image.subtitle}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/collections/abstract-art")}
                  className="px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-white/90 transition-colors"
                >
                  Explore Collection
                </button>
                {/* <button
                  onClick={() => navigate("/artists")}
                  className="px-6 py-3 text-sm font-medium text-black bg-transparent text-white border border-white rounded-md hover:bg-white/90 hover:text-black transition-colors"
                >
                  Meet the artist
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
