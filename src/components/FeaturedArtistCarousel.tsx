import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import navya from "../assets/navyaTiwari.png";
import shivam from "../assets/shivam.png";

const artists = [
  {
    id: 1,
    name: "Navya Tiwari",
    photoUrl: navya,
    artStyle: "Contemporary Aesthetic",
    location: "San Francisco, CA",
    artworks: 24,
    featuredArt:
      "https://res.cloudinary.com/dwmrrgaxd/image/upload/v1750393747/asgowoblwpqzwnkirf4o.png",
    artTitle: "Napolean Bonaparte",
    artSubtitle: "FALL IN LOVE WITH ART",
  },
  {
    id: 2,
    name: "Shivam Patel",
    photoUrl: shivam,
    artStyle: "Contemporary Aesthetic",
    location: "New York, NY",
    artworks: 18,
    featuredArt:
      "https://res.cloudinary.com/dwmrrgaxd/image/upload/v1750393917/ggfypdxfgyiesoiukp3j.png",
    artTitle: "Dog with Fur",
    artSubtitle: "DISCOVER NEW PERSPECTIVES",
  },
];

const FeaturedArtistCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [textOffset, setTextOffset] = useState(0);
  const autoplayTimerRef = useRef(null);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setTransitionDirection("next");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
    setTimeout(() => {
      setIsAnimating(false);
      setPreviousIndex(null);
    }, 700);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    setTransitionDirection("prev");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + artists.length) % artists.length
    );
    setTimeout(() => {
      setIsAnimating(false);
      setPreviousIndex(null);
    }, 700);
  };

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 2000);
  };

  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const initialScrollY = window.scrollY;
    setTextOffset((initialScrollY * 0.1) % 100);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOffset = (scrollY * 0.1) % 100;
      setTextOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentArtist = artists[currentIndex];
  const previousArtist = previousIndex !== null ? artists[previousIndex] : null;

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="">
        <h2 className="section-title mb-16">Meet Our Featured Artists</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          <div className="relative overflow-hidden w-full">
            <div className="relative aspect-[3/4] h-[800px] w-full">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={currentArtist.featuredArt}
                  alt={`Artwork by ${currentArtist.name}`}
                  className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    isAnimating
                      ? "opacity-100 scale-110 blur-sm"
                      : "opacity-100 scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div
                    className={`text-center text-white max-w-md px-4 transition-all duration-500 ${
                      isAnimating
                        ? "opacity-0 transform translate-y-8"
                        : "opacity-100 transform translate-y-0"
                    }`}
                  >
                    <p className="uppercase tracking-widest text-sm mb-2 font-light">
                      {currentArtist.artSubtitle}
                    </p>
                    <h2 className="font-playfair text-4xl md:text-7xl lg:text-6xl tracking-wide mb-4">
                      {currentArtist.artTitle}
                    </h2>
                  </div>
                </div>

                <div className="absolute left-0 bottom-0 p-6">
                  <div
                    className={`transition-all duration-500 ${
                      isAnimating
                        ? "opacity-0 transform translate-y-4"
                        : "opacity-100 transform translate-y-0"
                    }`}
                  >
                    <p className="text-white font-medium text-lg tracking-wide">
                      {currentArtist.name}
                    </p>
                    <div className="h-1 w-12 bg-white/70 mt-2"></div>
                  </div>
                </div>
              </div>
              {previousArtist && (
                <div
                  className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 ${
                    isAnimating ? "opacity-0" : "opacity-0"
                  }`}
                >
                  <img
                    src={previousArtist.featuredArt}
                    alt={`Previous artwork`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="px-6 py-2 text-gray-700 uppercase tracking-widest text-sm font-medium hover:bg-gray-100 transition-colors focus:outline-none"
              >
                Prev
              </button>
              <div
                className="relative w-[360px] h-[460px] sm:w-[400px] sm:h-[500px] md:w-[480px] md:h-[600px] lg:w-[500px] lg:h-[640px] mb-8 group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={currentArtist.photoUrl}
                    alt={currentArtist.name}
                    className={`w-full h-full object-contain transition-all duration-700 ${
                      isAnimating ? "scale-110 blur-sm" : "scale-100"
                    }`}
                  />
                  {previousArtist && (
                    <img
                      src={previousArtist.photoUrl}
                      alt={previousArtist.name}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                        isAnimating ? "opacity-0" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className="px-6 py-2 text-gray-700 uppercase tracking-widest text-sm font-medium hover:bg-gray-100 transition-colors focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtistCarousel;
