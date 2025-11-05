import React, { useState, useEffect, useContext } from "react";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share,
  Plus,
  Minus,
} from "lucide-react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

interface SizeOption {
  name: string;
  width: number;
  height: number;
  length: number;
  unit: string;
  priceAdjustment: number;
}

interface ArtworkDetailProps {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  description: string;
  dimensions: SizeOption[];
  medium: string;
  yearCreated: string;
  inStock: boolean;
  additionalImages?: string[];
}

const ArtworkDetailPage = () => {
  const { cartItems, addToCart, setCartItems, toggleCart } =
    useContext(CartContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [artwork, setArtwork] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [artist, setArtist] = useState<any>({});

  // Fetch artwork data (mock implementation)
  useEffect(() => {
    const fetchArtwork = async () => {
      setIsLoading(true);

      setArtwork(state);
      setActiveImage(state?.images?.[0]?.url);
      setSelectedSize(state.dimensions[0]);

      setIsLoading(false);

      if (state?.artistId) {
        const artistRef = doc(db, "artists", state.artistId);
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
  }, [id, state]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  function getYearFromCreatedAt(createdAt) {
    if (!createdAt || typeof createdAt.seconds !== "number") {
      throw new Error("Invalid createdAt object");
    }

    const { seconds, nanoseconds } = createdAt;
    const date = new Date(seconds * 1000 + (nanoseconds || 0) / 1e6);
    return date.getFullYear();
  }

  const handleAddToCart = () => {
    if (artwork && selectedSize) {
      const cartItem: any = {
        id: `${artwork?.id}-${Date.now()}`,
        artworkId: artwork?.id,
        title: artwork?.name,
        price: artwork?.price,
        quantity,
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
        categoryId: artwork?.categoryId,
      };
      addToCart(cartItem);
    }
  };

  const calculatePrice = () => {
    if (!artwork || !selectedSize) return artwork?.price || "₹0";
    const basePrice = parseFloat(artwork.price);
    const adjustedPrice = basePrice + selectedSize.priceAdjustment;
    return `₹${adjustedPrice.toLocaleString()}`;
  };

  const isNotSketch =
    artwork?.categoryName?.toLowerCase().includes("sketch") ||
    artwork?.categoryName?.toLowerCase().includes("painting")
      ? false
      : true;
  const isCandle = artwork?.categoryName?.toLowerCase().includes("candle")
    ? true
    : false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">Loading artwork details...</div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6  md:py-12">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        <span>Back to Gallery</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className="relative overflow-hidden aspect-square mb-4 rounded-lg">
            <img
              src={activeImage}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
            {/* Category Tag */}
            <div className="absolute top-3 left-3 bg-pastel-yellow px-2 py-0.5 rounded text-xs">
              {artwork.categoryName}
            </div>
          </div>

          {/* Thumbnail Images */}
          {state?.images && state.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {state?.images?.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer rounded overflow-hidden ${
                    activeImage === img.url ? "ring-2 ring-gray-900" : ""
                  }`}
                  onClick={() => setActiveImage(img.url)}
                >
                  <img
                    src={img?.url}
                    alt={`Detail view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col h-full">
          {/* Artist and Title */}
          <div className="mb-2">
            {!isNotSketch && (
              <p
                onClick={() =>
                  navigate(`/artists/${state.artistId}`, {
                    state: { collection: "products" },
                  })
                }
                className="text-gray-600 hover:underline hover:text-red-400 cursor-pointer"
              >
                {state.artistName}
              </p>
            )}
            <h1 className="font-playfair text-2xl md:text-3xl font-medium text-gray-900 mb-2">
              {state?.name}
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium text-gray-900">
                {calculatePrice()}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ₹{state?.slashedPrice}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 my-6">
            {/* Quantity Selector
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
              >
                <Plus size={16} />
              </button>
            </div> */}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={artwork?.quantity === 0}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium text-white ${
                artwork?.quantity === 0
                  ? "bg-gray-500"
                  : "bg-gray-900 hover:bg-gray-800"
              }  text-white"
              }`}
            >
              <ShoppingCart size={18} />
              <span>
                {artwork?.quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>

            {/* Wishlist Button */}
            {/* <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart
                size={20}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              />
            </button> */}

            {/* Share Button */}
            {/* <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share size={20} className="text-gray-700" />
            </button> */}
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {artwork.dimensions.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedSize?.name === size.name
                        ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-sm text-gray-500">
                      {size.length}" × {size.width}"
                    </div>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      {size.priceAdjustment > 0
                        ? `+₹${size.priceAdjustment}`
                        : !isNotSketch && "Base Price"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-medium text-lg mb-2">Description</h2>
            <p className="text-gray-600">{state?.description || ""}</p>
          </div>

          {/* Details */}
          <div className="py-4 border-t border-gray-200">
            <h2 className="font-medium text-lg mb-3">Details</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="text-gray-600">Dimensions</div>
              <div>
                {selectedSize
                  ? `${selectedSize.length}" × ${selectedSize.width}"`
                  : "Select a size"}
              </div>

              <div className="text-gray-600">Medium</div>
              <div>{state?.materials[0]}</div>

              {!isNotSketch && <div className="text-gray-600">Year</div>}

              {!isNotSketch && (
                <div>{getYearFromCreatedAt(state?.createdAt)}</div>
              )}

              <div className="text-gray-600">Category</div>
              <div>{artwork.categoryName}</div>

              {!isNotSketch && <div className="text-gray-600">Surface</div>}

              {!isNotSketch && (
                <div>
                  <p>Chitrapat ,440 gsm</p>
                </div>
              )}

              {!isNotSketch && <div className="text-gray-600">Artwork</div>}

              {!isNotSketch && (
                <div>
                  <p>Original</p>
                </div>
              )}

              {!isNotSketch && (
                <div className="text-gray-600">To be Delivered in:</div>
              )}

              {!isNotSketch && (
                <div>
                  <p>rolled</p>
                </div>
              )}

              {isCandle && <div className="text-gray-600">Weight</div>}
              {isCandle && (
                <div>
                  <p>{artwork.Weight}</p>
                </div>
              )}
            </div>
          </div>

          {/* Artist Note - optional section */}
          {!isNotSketch && (
            <div className="mt-auto py-4 border-t border-gray-200">
              <h2 className="font-medium text-lg mb-2">About the Artist</h2>
              <p className="text-gray-600">{artist?.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* You may also like section */}
      {/* <div className="mt-16">
        <h2 className="font-playfair text-2xl font-medium mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse hidden lg:block"></div>
        </div>
      </div> */}
    </div>
  );
};

export default ArtworkDetailPage;
