import React, { useState, useRef, useEffect } from "react";
import review1 from "../assets/review1.jpeg";
import review2 from "../assets/review2.jpg";
import review3 from "../assets/review3.jpg";
import review4 from "../assets/review4.png";
import review5 from "../assets/review5.jpg";
import review6 from "../assets/review6.jpeg";
import review7 from "../assets/review7.jpeg";
import review8 from "../assets/review8.jpeg";
import review9 from "../assets/review9.jpg";

// Use your verification image
import FaCheckCircle from "../assets/FaCheckCircle.png";

interface ProductReviewItem {
  type: "image";
  src: string;
  review: string;
  rating: number;
  name: string;
  verified?: boolean;
}

interface ProductReviewCarouselProps {
  items: ProductReviewItem[];
}

const ProductReviewCarousel: React.FC<ProductReviewCarouselProps> = ({
  items,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const visibleItems = items;

  useEffect(() => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / visibleItems.length;
    const scrollPosition =
      itemWidth * activeIndex +
      itemWidth / 2 - carouselRef.current.offsetWidth / 2;

    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [activeIndex, visibleItems.length]);

  const goToPrevious = () => {
    if (activeIndex === 0) return;
    setActiveIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (activeIndex === visibleItems.length - 1) return;
    setActiveIndex((prev) => prev + 1);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-poppins text-gray-800 mb-3">
            Happy Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers say about their purchases!
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-pastel-pink to-pastel-purple mx-auto mt-4"></div>
        </div>
        <div className="w-full relative">
          <div
            ref={carouselRef}
            className="flex items-center space-x-4 overflow-x-hidden py-8 p-4 scroll-smooth"
          >
            {visibleItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`${item.src}-${index}`}
                  className={`bg-white transition-all duration-300 flex-shrink-0 relative rounded-2xl shadow-lg flex flex-col items-center
                    ${
                      isActive
                        ? "w-[320px] h-[580px] scale-100 z-10"
                        : "w-[240px] h-[480px] opacity-70"
                    }`}
                >
                  <img
                    src={item.src}
                    alt={`Review ${index + 1}`}
                    width={320}
                    height={440}
                    className={`object-cover rounded-t-2xl mx-auto ${
                      isActive ? "w-[320px] h-[440px]" : "w-[240px] h-[340px]"
                    }`}
                    style={{ aspectRatio: "3/4" }}
                    onClick={() => goToSlide(index)}
                  />
                  <div className="w-full px-4 py-3 flex flex-col items-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center bg-white rounded-lg px-3 py-1 shadow">
                        <span className="font-semibold text-lg text-gray-800">{item.name}</span>
                        {item.verified && (
                          <img
                            src={FaCheckCircle}
                            alt="Verified"
                            className="ml-2"
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={i < item.rating ? "#FFD600" : "#E5E7EB"}
                          className="w-6 h-6"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.174 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 font-medium text-center">{item.review}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 absolute top-[50%] px-6 w-full justify-between mt-4 pointer-events-none">
            {activeIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white pointer-events-auto"
                aria-label="Previous"
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
            )}
            <div />
            {activeIndex < visibleItems.length - 1 && (
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white pointer-events-auto"
                aria-label="Next"
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
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {visibleItems.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === activeIndex
                  ? "bg-pastel-purple"
                  : "bg-gray-300"
              }`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const reviews: ProductReviewItem[] = [
  {
    type: "image",
    src: review1,
    name: "Vaibhav",
    verified: true,
    review: "The portrait captured every detail perfectly.I just love it!",
    rating: 5,
  },
  {
    type: "image",
    src: review2,
    name: "Gulsuppal",
    verified: true,
    review: "Absolutely lifelike! The artist brought out my personality so well.",
    rating: 5,
  },
  {
    type: "image",
    src: review3,
    name: "Komal",
    verified: true,
    review: "I was amazed by the realism and warmth in my portrait. Highly recommended!",
    rating: 5,
  },
  {
    type: "image",
    src: review4,
    name: "Darshan",
    verified: true,
    review: "A wonderful keepsake. The colors and expression are spot on.",
    rating: 4,
  },
  {
    type: "image",
    src: review5,
    name: "Mukul",
    verified: true,
    review: "This portrait means so much to me. It truly feels personal and special.",
    rating: 5,
  },
  {
    type: "image",
    src: review6,
    name: "Anchal",
    verified: true,
    review: "The attention to detail is incredible. I get compliments all the time!",
    rating: 5,
  },
  {
    type: "image",
    src: review7,
    name: "Shivam",
    verified: true,
    review: "Nice work, but I wish the background was a bit brighter.",
    rating: 4,
  },
  {
    type: "image",
    src: review8,
    name: "Kanan V.",
    verified: true,
    review: "Fast delivery and a beautiful portrait. Will order again!",
    rating: 5,
  },
  {
    type: "image",
    src: review9,
    name: "Ajay",
    verified: true,
    review: "The likeness is amazing. My family thought it was a photo!",
    rating: 4,
  },
];

const ProductReviewSection: React.FC = () => (
  <ProductReviewCarousel items={reviews} />
);

export default ProductReviewSection;