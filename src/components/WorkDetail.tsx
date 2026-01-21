import React, { useState, useEffect, useContext, ReactNode } from "react";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share,
  Plus,
  Minus,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Camera,
} from "lucide-react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore"; // Added getDoc
import { uploadImagesToCloudinary } from "@/lib/UplaodCloudinary";
import { db } from "@/firebase/firebaseconfig";
import { CartContext } from "@/context/CartContext";
import { getYearFromFirebaseTimestamp } from "@/lib/utils";

interface SizeOption {
  name: string;
  width: number;
  height: number;
  length: number;
  unit: string;
  priceAdjustment: number;
}

interface ArtworkDetailProps {
  materials: any;
  name: ReactNode;
  images: any;
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
  artistId?: string;
  categoryId?: string;
  createdAt?: any;
}

interface Artist {
  id: string;
  name: string;
  description: string; // Assuming the artist document has a description field
}

interface CartItem {
  id: string;
  artworkId: string;
  title: any;
  artistName: string;
  price: number;
  quantity: number;
  size: SizeOption;
  uploadedImageUrl: string;
  timestamp: number;
  categoryId?: string;
}

const WorkDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { cartItems, addToCart, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const state = location.state as ArtworkDetailProps | undefined;
  const [artwork, setArtwork] = useState<ArtworkDetailProps | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null); // State for artist data
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const uploadGuidelines = [
    "Photo should be high resolution (minimum 1080x1080px)",
    "Clear, well-lit image with good contrast",
    "Subject should be clearly visible and in focus",
    "Avoid blurry, pixelated, or heavily filtered images",
    "Supported formats: JPG, PNG, HEIC (max 10MB)",
    "For best results, use photos with good lighting and minimal shadows",
  ];

  useEffect(() => {
    const fetchArtworkAndArtist = async () => {
      setIsLoading(true);
      try {
        const stateId = (state as any)?.id || id;
        let artworkData: any = null;

        if (stateId) {
          const artworkRef = doc(db, "ourworks", stateId);
          const artworkSnap = await getDoc(artworkRef);
          if (artworkSnap.exists()) {
            artworkData = { id: artworkSnap.id, ...artworkSnap.data() } as ArtworkDetailProps;
          }
        }

        if (!artworkData && state) {
          artworkData = state as ArtworkDetailProps;
        }

        if (artworkData) {
          setArtwork(artworkData);
          setActiveImage(artworkData.images?.[0]?.url || artworkData.imageUrl || "");
          setSelectedSize(artworkData.dimensions?.[0] || null);

          // Fetch artist data if artistId exists
          if (artworkData.artistId) {
            const artistRef = doc(db, "artists", artworkData.artistId);
            const artistSnap = await getDoc(artistRef);
            if (artistSnap.exists()) {
              setArtist({
                id: artistSnap.id,
                name: artistSnap.data().name || "Unknown Artist",
                description: artistSnap.data().bio || "No description available.",
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworkAndArtist();
  }, [id, state]);

  const validateImage = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic"];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, and HEIC files are allowed";
    }
    return null;
  };

  const handleFileUpload = (file: File) => {
    const error = validateImage(file);
    if (error) {
      setUploadError(error);
      return;
    }
    setUploadError("");
    setUploadedPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setPhotoPreview("");
    setUploadError("");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!artwork || !uploadedPhoto || !id) return;

    // If dimensions exist, a size MUST be selected
    if (Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0 && !selectedSize) {
      return;
    }

    setIsAddingToCart(true);
    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImagesToCloudinary(uploadedPhoto);

      // Calculate final priceleven
      const basePrice = parseFloat(artwork.price);
      const adjustedPrice = basePrice + (selectedSize?.priceAdjustment || 0);

      // Create cart item
      const cartItem: CartItem = {
        id: `${id}-${Date.now()}`, // Unique ID for cart item
        artworkId: id,
        title: artwork.title,
        artistName: artwork.artistName,
        price: adjustedPrice,
        quantity,
        size: selectedSize || ({} as any), // Use empty object or null based on your CartItem definition
        uploadedImageUrl: imageUrl,
        timestamp: Date.now(),
        categoryId: artwork?.categoryId,
      };

      // Add to cart (handles local storage or Firebase based on auth state)
      await addToCart(cartItem);
      setCartItems([cartItem]);

      // Reset upload section
      setShowUploadSection(false);
      setUploadedPhoto(null);
      setPhotoPreview("");
      setQuantity(1);

      // alert("Custom sketch added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setUploadError("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const calculatePrice = () => {
    if (!artwork) return "₹0";
    const basePrice = parseFloat(artwork.price);
    const adjustedPrice = basePrice + (selectedSize?.priceAdjustment || 0);
    return `₹${adjustedPrice.toLocaleString()}`;
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = artwork?.dimensions.find(
      (size) => size.name === e.target.value
    );
    if (selected) {
      setSelectedSize(selected);
    }
  };

  const canAddToCart = 
    uploadedPhoto !== null && 
    (Array.isArray(artwork?.dimensions) && artwork.dimensions.length > 0 ? selectedSize !== null : true);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">
          Loading artwork and artist details...
        </div>
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
    <div className="container mx-auto px-4 py-6 md:py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        <span>Back to Gallery</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative overflow-hidden aspect-[3/4] mb-4 rounded-lg">
            <img
              src={activeImage}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {artwork.images && artwork.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {artwork.images?.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer rounded overflow-hidden ${
                    activeImage === img.url ? "ring-2 ring-blue-600" : ""
                  }`}
                  onClick={() => setActiveImage(img.url)}
                >
                  <img
                    src={img?.url}
                    alt={`Detail view ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p
                onClick={() => navigate(`/artists/${artwork?.artistId}`)}
                className="text-gray-600 hover:underline hover:text-blue-600 cursor-pointer transition-colors"
              >
                {artwork?.artistName}
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-medium text-gray-900 mb-2">
                {artwork?.name}
              </h1>
            </div>
            <div className="mb-6">
              <Button
                onClick={() =>
                  navigate("/get-yours", {
                    state: artwork.categoryId,
                  })
                }
                className={` ${showUploadSection ? "hidden" : ""}`}
              >
                Get Yours
              </Button>
            </div>
          </div>

          {showUploadSection && (
            <>
              <div className="mb-6 p-4 border border-gray-200 rounded-lg animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-lg">Upload Your Photo</h3>
                  <button
                    onClick={() => setShowGuidelines(!showGuidelines)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    {showGuidelines ? "Hide Guidelines" : "View Guidelines"}
                  </button>
                </div>

                {showGuidelines && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-900">
                      Photo Guidelines:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {uploadGuidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!uploadedPhoto ? (
                  <div>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragOver
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-2">
                        Drag and drop your photo here, or
                      </p>
                      <label className="cursor-pointer">
                        <span className="bg-primary text-red-900 px-4 py-2 rounded-lg transition-colors">
                          Choose File
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/jpg,image/png,image/heic"
                          onChange={handleFileInputChange}
                        />
                      </label>
                    </div>
                    {uploadError && (
                      <div className="mt-2 flex items-center text-red-600 text-sm">
                        <AlertCircle size={16} className="mr-1" />
                        {uploadError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle size={16} className="mr-2" />
                      Photo uploaded successfully!
                    </div>
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Uploaded preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={removePhoto}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      File: {uploadedPhoto.name} (
                      {Math.round(uploadedPhoto.size / 1024)} KB)
                    </p>
                  </div>
                )}
              </div>

              {uploadedPhoto && (
                <>
                  {artwork.dimensions && artwork.dimensions.length > 0 && (
                    <div className="mb-6 animate-fade-in">
                      <h3 className="font-medium text-lg mb-3">Select Size</h3>
                      <select
                        value={selectedSize?.name || ""}
                        onChange={handleSizeChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      >
                        <option value="" disabled>
                          Choose a size
                        </option>
                        {artwork.dimensions.map((size, index) => (
                          <option key={index} value={size.name}>
                            {size.name} ({size.width}" × {size.height}") +₹
                            {size?.priceAdjustment?.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-6 animate-fade-in">
                    <h3 className="font-medium text-lg mb-3">Quantity</h3>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 animate-fade-in">
                    <Button
                      onClick={handleAddToCart}
                      disabled={!canAddToCart || isAddingToCart}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        canAddToCart && !isAddingToCart
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      {isAddingToCart
                        ? "Adding to Cart..."
                        : `Add to Cart (${calculatePrice()} × ${quantity})`}
                    </Button>
                    {!canAddToCart && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {uploadedPhoto &&
                          !selectedSize &&
                          "Please select a size"}
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Description</h3>
            <p className="text-gray-600">{artwork?.description || ""}</p>
          </div>

          <div className="py-4 border-t border-gray-200">
            <h3 className="font-medium text-lg mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-y-2">
              {Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0 && (
                <>
                  <div className="text-gray-600">Dimensions</div>
                  <div>
                    {selectedSize
                      ? `${selectedSize.length}${selectedSize.unit} × ${selectedSize.width}${selectedSize.unit}`
                      : "Select a size"}
                  </div>
                </>
              )}
              <div className="text-gray-600">Medium</div>
              <div>{artwork?.materials?.[0]}</div>
              <div className="text-gray-600">Year</div>
              <div>{getYearFromFirebaseTimestamp(artwork.createdAt)}</div>
              <div className="text-gray-600">Category</div>
              <div>{artwork.category}</div>
            </div>

            <div className="mt-6 py-4 border-t border-gray-200">
              <h3 className="font-medium text-lg mb-2">About the Artist</h3>
              <p className="text-gray-600">
                {artist?.description || <>{artwork.description}</>}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WorkDetail;
