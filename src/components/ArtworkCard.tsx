import React, { useState, useEffect, useContext } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

interface ArtworkCardProps {
  id: string | number; // Added ID prop for navigation
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  props: any;
  onAddToCart?: (e: React.MouseEvent) => void;
}

const ArtworkCard = ({
  id,
  imageUrl,
  title,
  artistName,
  price,
  category,
  onAddToCart,
  props,
}: ArtworkCardProps) => {
  const { cartItems, addToCart, setCartItems, toggleCart } =
    useContext(CartContext);
  const [isMobile, setIsMobile] = useState(false);
  const [artwork, setArtwork] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState<any | null>(null);
  const [artist, setArtist] = useState<any>({});

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
    navigate(`/product-detail/${id}`, {
      state: props,
    });
  };

  // Modified to prevent event propagation
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (artwork && selectedSize) {
      const cartItem: any = {
        id: `${artwork?.id}-${Date.now()}`,
        artworkId: artwork?.id,
        title: artwork?.name,
        price: artwork?.price,
        quantity: 1,
        artistName: artwork?.artistName,
        size: {
          value: `${artwork?.dimensions[0]?.length}x${artwork?.dimensions[0]?.width}`,
          label: artwork?.dimensions[0]?.name,
          priceAdjustment: selectedSize.priceAdjustment || 0,
        },
        uploadedImageUrl: artwork?.images[0]?.url,
        timestamp: Date.now(),
        deliveryNote: "",
        productCategory: artwork?.categoryName,
      };
      addToCart(cartItem);
    }
  };

  return (
    <div
      className="art-card group relative cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={props?.images[0]?.url}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
          onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking wishlist
        >
          <Heart
            size={18}
            className="text-gray-700 hover:text-pink-500 transition-colors"
          />
        </button>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-pastel-yellow px-2 py-0.5 rounded text-xs">
          {props.tags[0]}
        </div>

        {/* Desktop Hover Add to Cart */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 hidden md:block">
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              onClick={handleAddToCartClick}
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
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900 font-playfair text-lg">
                {props?.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{props?.artistName}</p>
            </div>
            <div className="flex justify-center gap-2">
              <p className="font-medium text-gray-900">₹{price}</p>
              <p className="text-sm text-gray-500 line-through">
                ₹{props?.slashedPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Details with Add to Cart */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-medium text-gray-900 font-playfair">
                {props?.name}
              </h3>
              <p className="text-sm text-gray-600">{props?.artistName}</p>
            </div>
            <div className="text-right">
              <span className="font-medium text-gray-900">₹{price}</span>
              <p className="text-sm text-gray-500 line-through">
                ₹{props?.slashedPrice}
              </p>
            </div>
          </div>
          <button
            onClick={handleAddToCartClick}
            aria-label="Add to cart"
            className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-md flex items-center justify-center gap-2 transition-colors duration-200 z-10"
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
