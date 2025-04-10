import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "Sophia Nguyen",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Contemporary Aesthetic",
    location: "San Francisco, CA",
    artworks: 24,
    featuredArt:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    artTitle: "CURATION",
    artSubtitle: "FALL IN LOVE WITH ART",
  },
  {
    id: 2,
    name: "Marcus Bennett",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Contemporary Aesthetic",
    location: "New York, NY",
    artworks: 18,
    featuredArt:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    artTitle: "EXPRESSION",
    artSubtitle: "DISCOVER NEW PERSPECTIVES",
  },
  {
    id: 3,
    name: "Amara Wilson",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Contemporary Aesthetic",
    location: "Portland, OR",
    artworks: 31,
    featuredArt:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    artTitle: "MOVEMENT",
    artSubtitle: "FEEL THE EMOTION",
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

  // Add scroll-based text rotation
  useEffect(() => {
    // Initial position on mount
    const initialScrollY = window.scrollY;
    setTextOffset((initialScrollY * 0.1) % 100);

    const handleScroll = () => {
      // Calculate text offset based on scroll position
      const scrollY = window.scrollY;
      // Use modulo to keep the value between 0-100 for startOffset
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

                {/* Artist name on the left side */}
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
                className="relative w-[410px] h-[520px] mb-8 group cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* SVG with rotating text on elliptical path - now controlled by scroll */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 410 120" className="w-full h-full">
                    <defs>
                      <path
                        id="ellipticalPath"
                        d="M205,260 a160,200 0 1,1 0.1,0"
                        fill="none"
                      />
                    </defs>

                    {/* Text that follows the elliptical path with scroll-controlled offset */}
                    <text fontSize="16.5" fill="gray">
                      <textPath
                        href="#ellipticalPath"
                        startOffset={`${textOffset}%`}
                        className="tracking-wider uppercase"
                      >
                        {currentArtist.artStyle} • {currentArtist.location} •{" "}
                        {currentArtist.artworks} Artworks •{" "}
                        {currentArtist.artStyle} • {currentArtist.location} •{" "}
                        {currentArtist.artworks} Artworks •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Artist image container */}
                <div className="absolute inset-[15%] rounded-[50%] overflow-hidden bg-pastel-purple/20 border-4 border-pastel-pink/20">
                  <div className="relative w-full h-full">
                    <img
                      src={currentArtist.photoUrl}
                      alt={currentArtist.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        isAnimating ? "scale-110 blur-sm" : "scale-100"
                      }`}
                    />
                    {previousArtist && (
                      <img
                        src={previousArtist.photoUrl}
                        alt={previousArtist.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          isAnimating ? "opacity-0" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
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
