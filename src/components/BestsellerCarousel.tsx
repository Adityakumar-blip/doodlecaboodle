import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WorkCard from "./Ourworkcard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Next"
    >
      <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Previous"
    >
      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
    </button>
  );
};

// Simple Carousel Component (without external library)
const BestsellerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
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
    scrollRef.current.style.scrollSnapType = "none"; // Disable snapping while dragging
    scrollRef.current.style.scrollBehavior = "auto"; // Disable smooth scroll while dragging
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
    const walk = (x - startX.current) * 1.5; // multiplier for speed
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const maxSlide = Math.max(0, products.length - slidesToShow);

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

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [products, slidesToShow]);

  // Fetch bestsellers from Firestore
  useEffect(() => {
    const fetchBestsellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("isBestSeller", "==", true),
          where("status", "==", "active")
        );
        const snap = await getDocs(q);
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        setProducts(items);
      } catch (err: any) {
        console.error("Error fetching bestsellers:", err);
        setError(err?.message || "Failed to load bestsellers");
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <div className="w-full mt-0 md:mt-4">
      <div className=" mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-4 px-4 md:px-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-1 font-['Jost']">
              Shop Best Sellers
            </h2>
            <p className="text-xs md:text-base text-gray-500 font-medium tracking-wide">
              OUR MOST LOVED MASTERPIECES
            </p>
          </div>
          <a 
            href="/best-sellers" 
            className="group flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full font-bold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
          >
            View All
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 md:px-12">
          <PrevArrow onClick={prevSlide} />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              <span className="ml-3 text-gray-600">Loading bestsellers...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
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
              <div className="flex">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 gap-6 px-1 md:px-3 py-6 snap-start"
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    <WorkCard
                      id={product.id}
                      title={product.name || product.title}
                      price={product.price}
                      props={product}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <NextArrow onClick={nextSlide} />
        </div>

        {/* Dots Indicator */}
        <div className="hidden md:flex justify-center gap-2 mt-10">
          {Array.from({ length: products.length - slidesToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.clientWidth / slidesToShow;
                  scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-accent w-8"
                  : "bg-gray-400 w-2 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellerCarousel;
