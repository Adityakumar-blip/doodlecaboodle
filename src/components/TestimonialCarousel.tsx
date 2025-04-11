import React, { useState, useRef, useEffect, useMemo } from "react";

interface CarouselItem {
  type: "video" | "image";
  src: string;
  thumbnail?: string;
}

interface VideoCarouselProps {
  items: CarouselItem[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  items,
  autoAdvance = false,
  autoAdvanceInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Tracks the real item index (0 to items.length - 1)
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isTransitioning = useRef(false);

  // Create an extended items array for infinite looping
  // Duplicate items to allow seamless looping (e.g., [..., 4, 5, 1, 2, 3, 4, 5, 1, 2, ...])
  const extendedItems = useMemo(() => {
    const extraItems = Math.max(3, Math.ceil(items.length / 2)); // Ensure enough duplicates
    const endItems = items.slice(-extraItems);
    const startItems = items.slice(0, extraItems);
    return [...endItems, ...items, ...startItems];
  }, [items]);

  // Offset to the middle set of real items
  const middleOffset = Math.max(3, Math.ceil(items.length / 2));

  // Set up refs for all videos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, extendedItems.length);
  }, [extendedItems]);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval]);

  // Pause all videos except the active one
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const realIndex = (index - middleOffset) % items.length;
      const isActive =
        realIndex === activeIndex ||
        realIndex === activeIndex - items.length ||
        realIndex === activeIndex + items.length;

      if (isActive) {
        video.currentTime = 0;
        video.play().catch((err) => console.log("Video play failed:", err));
      } else {
        video.pause();
      }
    });
  }, [activeIndex, items.length, middleOffset]);

  const goToPrevious = () => {
    if (isTransitioning.current) return;
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (isTransitioning.current) return;
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    if (isTransitioning.current) return;
    setActiveIndex(index);
  };

  // Center the active slide
  useEffect(() => {
    if (!carouselRef.current) return;

    // Calculate the index in extendedItems corresponding to activeIndex
    const extendedIndex = middleOffset + activeIndex;
    const itemWidth = carouselRef.current.scrollWidth / extendedItems.length;
    const scrollPosition =
      itemWidth * extendedIndex +
      itemWidth / 2 -
      carouselRef.current.offsetWidth / 2;

    isTransitioning.current = true;
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    // Reset transitioning flag after scroll
    const handleScrollEnd = () => {
      isTransitioning.current = false;
    };

    const timeout = setTimeout(handleScrollEnd, 300); // Match CSS transition duration

    return () => clearTimeout(timeout);
  }, [activeIndex, extendedItems.length, middleOffset]);

  return (
    <div className="w-full relative ">
      {/* Main carousel display */}
      <div
        ref={carouselRef}
        className="flex items-center space-x-4 overflow-x-hidden py-8 p-4 scroll-smooth"
      >
        {extendedItems.map((item, index) => {
          const realIndex = (index - middleOffset) % items.length;
          const isActive =
            realIndex === activeIndex ||
            realIndex === activeIndex - items.length ||
            realIndex === activeIndex + items.length;

          return (
            <div
              key={`${item.src}-${index}`}
              className={`transition-all duration-300 flex-shrink-0 relative
                ${
                  isActive
                    ? "w-[400px] h-[500px] scale-100 z-10"
                    : "w-[300px] h-[400px] opacity-70"
                }`}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.src}
                  className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                  loop
                  muted
                  playsInline
                  onClick={() =>
                    goToSlide(
                      realIndex >= 0 ? realIndex : realIndex + items.length
                    )
                  }
                  poster={item.thumbnail}
                />
              ) : (
                <img
                  src={item.src}
                  alt={`Slide ${realIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={() =>
                    goToSlide(
                      realIndex >= 0 ? realIndex : realIndex + items.length
                    )
                  }
                />
              )}

              {/* Add play indicator for videos */}
              {item.type === "video" && isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black bg-opacity-30 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation controls */}
      <div className="flex flex-1 absolute top-[50%] px-6 w-full  justify-between mt-4">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      {/* <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

// Example usage with sample videos (unchanged)
const TestimonialCarousel: React.FC = () => {
  const carouselItems: CarouselItem[] = [
    {
      type: "video",
      src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/b7e7be80f60543bf9adf14277970d2c9/b7e7be80f60543bf9adf14277970d2c9.HD-1080p-2.5Mbps-35679579.mp4?v=0",
      thumbnail:
        "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/b7e7be80f60543bf9adf14277970d2c9.thumbnail.0000000000_600x.jpg?v=1727814424",
    },
    {
      type: "video",
      src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/6751f232383a4c6ea139f990e7ef7f8a/6751f232383a4c6ea139f990e7ef7f8a.HD-1080p-2.5Mbps-35679580.mp4?v=0",
      thumbnail:
        "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/6751f232383a4c6ea139f990e7ef7f8a.thumbnail.0000000000_600x.jpg?v=1727814418",
    },
    {
      type: "video",
      src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/aef9dcf97db24259809db789affa87a3/aef9dcf97db24259809db789affa87a3.HD-1080p-2.5Mbps-35679578.mp4?v=0",
      thumbnail:
        "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/aef9dcf97db24259809db789affa87a3.thumbnail.0000000000_600x.jpg?v=1727814418",
    },
    {
      type: "video",
      src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/0306f3a88dec4702ae1f0231b5bdbac2/0306f3a88dec4702ae1f0231b5bdbac2.HD-1080p-2.5Mbps-35704677.mp4?v=0",
      thumbnail:
        "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/0306f3a88dec4702ae1f0231b5bdbac2.thumbnail.0000000000_600x.jpg?v=1727861116",
    },
    {
      type: "video",
      src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/14f26a880ac04dda9905e50192f7a443/14f26a880ac04dda9905e50192f7a443.HD-1080p-2.5Mbps-35679576.mp4?v=0",
      thumbnail:
        "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/14f26a880ac04dda9905e50192f7a443.thumbnail.0000000000_600x.jpg?v=1727814418",
    },
  ];

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <VideoCarousel items={carouselItems} />
    </div>
  );
};

export default TestimonialCarousel;
