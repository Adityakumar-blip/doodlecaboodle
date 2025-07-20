import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "@/assets/06.png";
import image2 from "@/assets/02.png";
import image3 from "@/assets/03.png";
import mobile1 from "@/assets/04.png";
import mobile2 from "@/assets/mobile-02.png";
import mobile3 from "@/assets/mobile-01.png";
import { Button } from "./ui/button";

interface HeroImage {
  desktopUrl: string;
  mobileUrl: string;
  title: string;
  subtitle: string;
  tag: string;
}

const heroImages: HeroImage[] = [
  {
    desktopUrl: image2,
    mobileUrl: mobile2,
    title: "Your Gift, Their Smile",
    subtitle: "Customized portraits and art gifts that truly connect.",
    tag: "Limited Time: Free Shipping",
  },
  {
    desktopUrl: image3,
    mobileUrl: mobile3,
    title: "Make Moments Memorable",
    subtitle: "Thoughtfully handcrafted gifts for every occasion",
    tag: "Featured: Abstract Expressionism",
  },
  {
    desktopUrl: image1,
    mobileUrl: mobile1,
    title: "Gift, That Stands Out",
    subtitle:
      "Explore our curated collection of handpicked paintings, illustrations, and sculptures from emerging and established artists across the globe.",
    tag: "New Collection: Summer Abstracts",
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px as the mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            src={isMobile ? image.mobileUrl : image.desktopUrl}
            alt={image.title}
            className="object-cover w-full h-full"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 items-start">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-4xl  md:text-5xl lg:text-6xl font-bold text-white">
                {image.title}
              </h2>
              <p className="mb-8 text-lg md:text-xl text-white/90">
                {image.subtitle}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/artwork-browse")}
                  className="px-6 py-3 text-sm font-semibold text-black bg-white rounded-md hover:bg-white/90 transition-colors"
                >
                  Explore Collection
                </button>
                <Button
                  onClick={() => navigate("/get-yours")}
                  className="px-8 py-4 text-sm font-medium text-black bg-transparent text-white border border-white rounded-md hover:bg-white/90 hover:text-black transition-colors"
                >
                  Get Yours
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute hidden md:block left-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden md:block right-4 top-1/2 z-30 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
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
