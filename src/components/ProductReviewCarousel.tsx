import React, { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";
import { collection, query, where, getDocs } from "firebase/firestore";
import FaCheckCircle from "../assets/FaCheckCircle.png";
import { db } from "@/firebase/firebaseconfig";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface ArrowProps {
  onClick: () => void;
  show?: boolean;
}

// Custom Arrow Components
const NextArrow: React.FC<ArrowProps> = ({ onClick, show = true }) => {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all"
      aria-label="Next"
    >
      <ChevronRight size={24} className="text-gray-900" />
    </button>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick, show = true }) => {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all"
      aria-label="Previous"
    >
      <ChevronLeft size={24} className="text-gray-900" />
    </button>
  );
};

const ProductReviewCarousel: React.FC<ProductReviewCarouselProps> = ({
  items,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive slides logic
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const maxSlide = Math.max(0, items.length - slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, maxSlide]);

  return (
    <div className="py-16 bg-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-poppins text-gray-800 mb-3">
            Happy Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers say about their purchases!
          </p>
          <div className="h-1 w-24 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-primary-foreground font-poppins font-semibold rounded-lg transition-colors duration-300"
          >
            Write a Review
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12">
          <PrevArrow onClick={prevSlide} show={currentSlide > 0} />

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-primary rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img
                      src={item.src}
                      alt={`Review ${index + 1}`}
                      className="w-full h-[420px] object-cover rounded-t-2xl"
                    />
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="flex flex-col items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-primary-foreground">
                            {item.name}
                          </span>
                          {/* {item.verified && (
                            <img
                              src={FaCheckCircle}
                              alt="Verified"
                              className="w-5 h-5"
                            />
                          )} */}
                        </div>
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={i < item.rating ? "#FFD600" : "#E5E7EB"}
                              className="w-5 h-5"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.174 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-accent text-center max-w-prose mx-auto">
                        {item.review}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NextArrow onClick={nextSlide} show={currentSlide < maxSlide} />

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-accent w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

const ProductReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<ProductReviewItem[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          where("isActive", "==", true),
          where("isPublished", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const fetchedReviews: ProductReviewItem[] = querySnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return {
              type: "image" as const,
              src: data.image,
              name: data.name,
              review: data.reviewText,
              rating: data.rating,
              verified: true, // Assuming all fetched reviews are verified
            };
          }
        );
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return <ProductReviewCarousel items={reviews} />;
};

export default ProductReviewSection;
