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
  isClickable?: boolean;

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
  isClickable = true,
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
    navigate(`/work-detail/${id}`, {
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

export default ArtworkCard;
