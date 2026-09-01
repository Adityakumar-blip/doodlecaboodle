import React, { useState, useEffect, useContext } from "react";
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { shareContent } from "@/lib/utils";
import { toast } from "sonner";

interface ArtworkCardProps {
  id: string | number; // Added ID prop for navigation
  imageUrl: string;
  title: string;
  // name: string;
  artistName: string;
  price: string;
  category: string;
  props: any;
  isClickable?: boolean;
  liked?: boolean;
  onLike?: () => void;
  onAddToCart?: (e: React.MouseEvent) => void;
  showDetails?: boolean; // <-- Add this line
}

const ArtworkCard = ({
  id,
  imageUrl,
  title,
  artistName,
  price,
  category,
  liked = false,
  onLike,
  onAddToCart,
  props,
  isClickable = true,
  showDetails = true,
}: ArtworkCardProps) => {
  const { cartItems, addToCart, setCartItems, toggleCart } =
    useContext(CartContext);
  const [isMobile, setIsMobile] = useState(false);
  const [artwork, setArtwork] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState<any | null>(null);
  const [artist, setArtist] = useState<any>({});
  const artworkName = props?.name || name || ""; // fallback to prop or field

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

  useEffect(() => {
    const fetchArtwork = async () => {
      // setIsLoading(true);

      setArtwork(props);
      // setActiveImage(props?.images?.[0]?.url);
      setSelectedSize(props.dimensions[0]);

      if (props?.artistId) {
        const artistRef = doc(db, "artists", props.artistId);
        const artistSnap = await getDoc(artistRef);
        if (artistSnap.exists()) {
          setArtist({
            id: artistSnap.id,
            name: artistSnap.data().name || "Unknown Artist",
            description: artistSnap.data().bio || "No description available.",
          });
        } else {
          setArtist(null);
        }
      }
    };

    fetchArtwork();
  }, [id, props]);

  const handleCardClick = () => {
    navigate(`/work-detail/${id}`, {
      state: { id: id },
    });
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = artworkName || title || "Artwork";
    const result = await shareContent({
      title: shareTitle,
      text: `Check out "${shareTitle}" on Doodle Caboodle`,
      url: `${window.location.origin}/work-detail/${id}`,
    });
    if (result === "copied") toast.success("Share link copied to clipboard!");
    if (result === "failed") toast.error("Unable to share right now");
  };

  // Modified to prevent event propagation
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!artwork) return;

    // Auto-use first dimension if none selected — never silently fail on the card
    const sizeToUse =
      selectedSize ??
      (Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0
        ? artwork.dimensions[0]
        : null);

    const cartItem: any = {
      id: `${artwork?.id}-${Date.now()}`,
      artworkId: artwork?.id,
      title: artwork?.name,
      price: artwork?.price,
      quantity: 1,
      artistName: artwork?.artistName,
      size: sizeToUse
        ? {
            value: `${sizeToUse.length}x${sizeToUse.width}`,
            label: sizeToUse.name,
            priceAdjustment: sizeToUse.priceAdjustment || 0,
          }
        : null,
      uploadedImageUrl: artwork?.images?.[0]?.url,
      timestamp: Date.now(),
      deliveryNote: "",
      productCategory: artwork?.categoryName,
    };
    addToCart(cartItem);
    toggleCart(); // open cart drawer for feedback
  };

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
      {showDetails && (
        <div className="p-4">
          <h3 className="font-semibold">{artworkName}</h3>
          <div className="flex items-center gap-2">
            <p className="text-md text-gray-700 font-medium">₹{price}</p>
            {props?.slashedPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹{props.slashedPrice}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkCard;
