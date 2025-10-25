import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WorkCard from "./Ourworkcard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Next"
    >
      <ChevronRight size={24} className="text-gray-900" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
      aria-label="Previous"
    >
      <ChevronLeft size={24} className="text-gray-900" />
    </button>
  );
};

// Simple Carousel Component (without external library)
const BestsellerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
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

  const maxSlide = Math.max(0, products.length - slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, maxSlide]);

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
    <div className="w-full mt-4">
      <div className=" mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Bestsellers</h2>
          <p className="text-gray-600 text-lg">
            Discover our most loved artworks
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12">
          <PrevArrow onClick={prevSlide} />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              <span className="ml-3 text-gray-600">Loading bestsellers...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / slidesToShow)
                  }%)`,
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 gap-6 px-3"
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
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-gray-900 w-8"
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
