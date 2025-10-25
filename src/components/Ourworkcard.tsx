import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface WorkCardProps {
  id?: string | number; // Added ID prop for navigation
  imageUrl?: string;
  title?: string;
  artistName?: string;
  price?: any;
  category?: string;
  props?: any;
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
    navigate(`/product-detail/${id}`, {
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
    // <div
    //   className="art-card group relative cursor-pointer"
    //   onClick={isClickable && handleCardClick}
    // >
    //   {/* Image Container */}
    //   <div
    //     className="art-card group relative cursor-pointer"
    //     onClick={isClickable && handleCardClick}
    //   >
    //     {/* Image Container with hover effect */}
    //     <div className="relative overflow-hidden aspect-[3/4]">
    //       {/* Primary image */}
    //       <img
    //         src={props?.images?.[0]?.url}
    //         alt={title}
    //         className={`w-full h-full object-cover transition-opacity duration-500 ${
    //           props?.images?.[1]?.url ? "group-hover:opacity-0" : ""
    //         }`}
    //       />

    //       {/* Secondary image */}
    //       {props?.images?.[1]?.url && (
    //         <img
    //           src={props.images[1].url}
    //           alt={`${title} - alternate`}
    //           className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    //         />
    //       )}
    //     </div>
    //     <div className="p-4">
    //       <h3 className="font-semibold">{props.name}</h3>
    //       <div className="flex items-center gap-2">
    //         <p className="text-md text-gray-700 font-medium">₹{price}</p>
    //         {props?.slashedPrice && (
    //           <p className="text-sm text-gray-500 line-through">
    //             ₹{props.slashedPrice}
    //           </p>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="art-card group relative cursor-pointer"
      onClick={isClickable ? handleCardClick : undefined}
    >
      {/* Heart Icon */}
      {/* <button
        className="absolute top-3 right-3 z-10  transition"
        onClick={handleHeartClick}
        aria-label={liked ? "Unlike" : "Like"}
        type="button"
      >
        {liked ? (
          <Heart size={28} fill="#e53e3e" color="#000000" strokeWidth={1.5} />
        ) : (
          <Heart size={28} color="#000000" strokeWidth={1.5} />
        )}
      </button> */}

      {/* Image Container */}
      <div
        className="art-card group relative cursor-pointer"
        onClick={isClickable ? handleCardClick : undefined}
      >
        {/* Image Container with hover effect */}
        <div className="relative overflow-hidden aspect square">
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
      {/* Card details */}
      {/* <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{artistName}</p>
        <p className="text-md text-gray-700">{price}</p>
      </div> */}
      <div className="p-4">
        <h3 className="font-semibold">{props?.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-md text-gray-700 font-medium">₹{price}</p>
          {props?.slashedPrice && (
            <p className="text-sm text-gray-500 line-through">
              ₹{props.slashedPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
