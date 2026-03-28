import React, { useState, useEffect, useRef } from "react";
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
      className="w-8 h-8 md:w-12 md:h-12 absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Next"
    >
      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
    </button>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick, show = true }) => {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 md:w-12 md:h-12 absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Previous"
    >
      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
    </button>
  );
};

const ProductReviewCarousel: React.FC<ProductReviewCarouselProps> = ({
  items,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive slides logic
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(2);
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

  // Mouse Drag to Scroll Logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = "none";
    scrollRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
      scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
      scrollRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const maxSlide = Math.max(0, items.length - slidesToShow);

  const nextSlide = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth / slidesToShow;
      const isAtEnd = scrollLeft + clientWidth >= scrollRef.current.scrollWidth - 10;
      
      if (isAtEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth / slidesToShow;
      const isAtStart = scrollLeft <= 10;
      
      if (isAtStart) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth / slidesToShow;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentSlide) {
        setCurrentSlide(newIndex);
      }
    }
  };

  const goToSlide = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / slidesToShow;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [items, slidesToShow]);

  return (
    <div className="pt-2 md:pt-16 pb-16 bg-primary-foreground">
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
        <div className="relative px-2 md:px-12">
          <PrevArrow onClick={prevSlide} show={currentSlide > 0} />

          <div 
            className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex items-stretch">
              {items.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="flex-shrink-0 px-1 md:px-3 h-full snap-start"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-primary rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col overflow-hidden border border-white/10">
                    <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                      <img
                        src={item.src}
                        alt={`Review ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-3 md:p-6 flex flex-col items-center text-center flex-1">
                      <div className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-center gap-1 md:gap-2 mb-2 md:mb-3">
                          <span className="font-bold text-sm md:text-lg text-primary-foreground tracking-wide font-['Jost']">
                            {item.name}
                          </span>
                          <div className="flex justify-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill={i < item.rating ? "#FFD600" : "#E5E7EB"}
                                className="w-3.5 h-3.5 md:w-5 md:h-5"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.174 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="min-h-[60px] md:min-h-[100px] flex items-center">
                          <p className="text-white/90 text-[10px] md:text-base leading-relaxed italic line-clamp-3 md:line-clamp-4 overflow-hidden text-ellipsis">
                            "{item.review}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NextArrow onClick={nextSlide} show={currentSlide < maxSlide} />

          {/* Dots indicator */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
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
