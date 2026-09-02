import React, { useState, useEffect, useContext } from "react";
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { productPath, shareContent } from "@/lib/utils";
import { toast } from "sonner";

interface WorkCardProps {
  id?: string | number; // Added ID prop for navigation
  imageUrl?: string;
  title?: string;
  artistName?: string;
  price?: any;
  category?: string;
  props?: any;
  isClickable?: boolean;
  showPrice?: boolean;
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
  showPrice = true,
}: WorkCardProps) => {
  const { addToCart, toggleCart } = useContext(CartContext);
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
    navigate(productPath(props?.categoryName, props?.name, props?.id || id), {
      state: { id: props?.id || id },
    });
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = props?.name || title || "Doodle Caboodle";
    const result = await shareContent({
      title: shareTitle,
      text: `Check out "${shareTitle}" on Doodle Caboodle`,
      url: `${window.location.origin}${productPath(props?.categoryName, props?.name, props?.id || id)}`,
    });
    if (result === "copied") toast.success("Share link copied to clipboard!");
    if (result === "failed") toast.error("Unable to share right now");
  };

  // Add to cart — uses prop if provided, otherwise builds item from props data directly
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(e);
      return;
    }
    // Fallback: build cart item from props and add via context
    if (!props) return;
    const firstSize =
      Array.isArray(props.dimensions) && props.dimensions.length > 0
        ? props.dimensions[0]
        : null;
    const cartItem: any = {
      id: `${props.id}-${Date.now()}`,
      artworkId: props.id,
      title: props.name,
      price: props.price,
      quantity: 1,
      artistName: props.artistName,
      size: firstSize
        ? {
            value: `${firstSize.length}x${firstSize.width}`,
            label: firstSize.name,
            priceAdjustment: firstSize.priceAdjustment || 0,
          }
        : null,
      uploadedImageUrl: props.images?.[0]?.url,
      timestamp: Date.now(),
      deliveryNote: "",
      productCategory: props.categoryName,
    };
    addToCart(cartItem);
    toggleCart(); // open cart drawer for feedback
  };

  // Calculate discount percentage based on price and slashedPrice
  // Show badge ONLY when both real price AND slashed price are present, valid, and slashed > real
  const getDiscountPercentage = () => {
    if (!price || !props?.slashedPrice) return 0;
    const cleanPrice = parseFloat(String(price).replace(/[^0-9.]/g, ""));
    const cleanSlashed = parseFloat(String(props.slashedPrice).replace(/[^0-9.]/g, ""));
    // Guard: both must be positive finite numbers, and slashed must be strictly greater
    if (
      !isFinite(cleanPrice) || cleanPrice <= 0 ||
      !isFinite(cleanSlashed) || cleanSlashed <= 0 ||
      cleanSlashed <= cleanPrice
    ) return 0;
    return Math.round(((cleanSlashed - cleanPrice) / cleanSlashed) * 100);
  };
  const discountPercentage = getDiscountPercentage();

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
        <div className="relative overflow-hidden aspect-square">
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

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-0 right-0 z-20 bg-brand-charcoal text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg shadow-md">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Hover actions: Add to Cart + Share */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              type="button"
              onClick={handleAddToCartClick}
              className="flex-1 flex items-center justify-center bg-primary/95 hover:bg-primary text-primary-foreground py-2.5 backdrop-blur-sm transition-colors duration-200"
              aria-label="Add to cart"
              title="Add to cart"
            >
              <ShoppingCart size={16} strokeWidth={2.25} />
            </button>
            <span className="w-px bg-white/25" aria-hidden="true" />
            <button
              type="button"
              onClick={handleShareClick}
              className="flex-1 flex items-center justify-center bg-brand-charcoal/95 hover:bg-brand-charcoal text-white py-2.5 backdrop-blur-sm transition-colors duration-200"
              aria-label="Share product"
              title="Share"
            >
              <Share2 size={16} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
      {/* Card details */}
      {/* <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{artistName}</p>
        <p className="text-md text-gray-700">{price}</p>
      </div> */}
      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        {/* Responsive title: smaller on mobile, larger on tablet/desktop. Truncate to keep card tidy. */}
        <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-3 truncate leading-tight">
          {props?.name}
        </h3>
        <div className="flex items-center gap-3">
          {/* Price: scale up with screen size */}
          {showPrice && (
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              MRP : ₹{price}
            </p>
          )}
          {props?.slashedPrice && showPrice && (
            <p className="text-xs sm:text-sm md:text-base text-gray-500 line-through">
              ₹{props.slashedPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
