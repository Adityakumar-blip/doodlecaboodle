import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface WorkCardProps {
  id: string | number; // Added ID prop for navigation
  imageUrl: string;
  title: string;
  artistName: string;
  price?: any;
  category: string;
  props: any;
  isClickable?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
}

const WorkCard = ({
  id,
  imageUrl,
  title,
  artistName,
  price,
  category,
  onAddToCart,
  props,
  isClickable = true,
}: WorkCardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check for mobile device on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    navigate(`/work-detail/${id}`, {
      state: props,
    });
  };

  // Modified to prevent event propagation
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the card
    if (onAddToCart) {
      onAddToCart(e);
    }
  };

  return (
    <div
      className="art-card group relative cursor-pointer"
      onClick={isClickable && handleCardClick}
    >
      {/* Image Container */}
      <div
        className="art-card group relative cursor-pointer"
        onClick={isClickable && handleCardClick}
      >
        {/* Image Container with hover effect */}
        <div className="relative overflow-hidden aspect-[3/4]">
          {/* Primary image */}
          <img
            src={props?.images?.[0]?.url}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              props?.images?.[1]?.url ? "group-hover:opacity-0" : ""
            }`}
          />

          {/* Secondary image */}
          {props?.images?.[1]?.url && (
            <img
              src={props.images[1].url}
              alt={`${title} - alternate`}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
