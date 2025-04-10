import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  onAddToCart?: () => void;
}

const ArtworkCard = ({
  imageUrl,
  title,
  artistName,
  price,
  category,
  onAddToCart,
}: ArtworkCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="art-card group relative">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
          <Heart
            size={18}
            className="text-gray-700 hover:text-pink-500 transition-colors"
          />
        </button>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-pastel-yellow px-2 py-0.5 rounded text-xs">
          {category}
        </div>

        {/* Desktop Hover Add to Cart */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 hidden md:block">
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={onAddToCart}
              aria-label="Add to cart"
              className="w-full py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-md flex items-center justify-center gap-2 transition-colors duration-200 font-medium shadow-lg"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Desktop Details */}
        <div className="hidden md:block ">
          <div className="flex  justify-between">
            <div>
              <h3 className="font-medium text-gray-900 font-playfair text-lg">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{artistName}</p>
            </div>
            <p className="font-medium text-gray-900">{price}</p>
          </div>
        </div>

        {/* Mobile Details with Add to Cart */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-medium text-gray-900 font-playfair">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{artistName}</p>
            </div>
            <div className="text-right">
              <span className="font-medium text-gray-900">{price}</span>
            </div>
          </div>
          <button
            onClick={onAddToCart}
            aria-label="Add to cart"
            className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
