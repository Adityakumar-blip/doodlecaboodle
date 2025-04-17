import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share,
  Plus,
  Minus,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";

interface ArtworkDetailProps {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  description: string;
  dimensions: string;
  medium: string;
  yearCreated: string;
  inStock: boolean;
  additionalImages?: string[];
}

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<ArtworkDetailProps | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch artwork data (mock implementation)
  useEffect(() => {
    // In a real app, you would fetch from an API
    const fetchArtwork = async () => {
      setIsLoading(true);

      // Mock data - replace with actual API call
      const mockArtwork: ArtworkDetailProps = {
        id: "art-123",
        imageUrl:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        title: "Abstract Dreams",
        artistName: "Jane Doe",
        price: "$650",
        category: "Abstract",
        description:
          "A stunning piece that captures the essence of dreams through vibrant colors and flowing shapes. Created with a unique technique that gives depth and movement to the canvas.",
        dimensions: '24" × 36"',
        medium: "Acrylic on Canvas",
        yearCreated: "2023",
        inStock: true,
        additionalImages: [
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        ],
      };

      setArtwork(mockArtwork);
      setActiveImage(mockArtwork.imageUrl);
      setIsLoading(false);
    };

    fetchArtwork();
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of ${artwork?.title} to cart`);
  };

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
    <div className="container mx-auto px-4 py-6 md:py-12">
      {/* Back button */}
      <Link
        to="/gallery"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        <span>Back to Gallery</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className="relative overflow-hidden aspect-[3/4] mb-4 rounded-lg">
            <img
              src={activeImage}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
            {/* Category Tag */}
            <div className="absolute top-3 left-3 bg-pastel-yellow px-2 py-0.5 rounded text-xs">
              {artwork.category}
            </div>
          </div>

          {/* Thumbnail Images */}
          {artwork.additionalImages && artwork.additionalImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              <div
                className={`aspect-square cursor-pointer rounded overflow-hidden ${
                  activeImage === artwork.imageUrl ? "ring-2 ring-gray-900" : ""
                }`}
                onClick={() => setActiveImage(artwork.imageUrl)}
              >
                <img
                  src={artwork.imageUrl}
                  alt="Main view"
                  className="w-full h-full object-cover"
                />
              </div>
              {artwork.additionalImages.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer rounded overflow-hidden ${
                    activeImage === img ? "ring-2 ring-gray-900" : ""
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
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
            <p className="text-gray-600">{artwork.artistName}</p>
            <h1 className="font-playfair text-2xl md:text-3xl font-medium text-gray-900 mb-2">
              {artwork.title}
            </h1>
            <p className="text-xl font-medium text-gray-900">{artwork.price}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 my-6">
            {/* Quantity Selector */}
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
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!artwork.inStock}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium ${
                artwork.inStock
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />
              <span>{artwork.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>

            {/* Wishlist Button */}
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart
                size={20}
                className="text-gray-700 hover:text-pink-500 transition-colors"
              />
            </button>

            {/* Share Button */}
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-medium text-lg mb-2">Description</h2>
            <p className="text-gray-600">{artwork.description}</p>
          </div>

          {/* Details */}
          <div className="py-4 border-t border-gray-200">
            <h2 className="font-medium text-lg mb-3">Details</h2>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="text-gray-600">Dimensions</div>
              <div>{artwork.dimensions}</div>

              <div className="text-gray-600">Medium</div>
              <div>{artwork.medium}</div>

              <div className="text-gray-600">Year</div>
              <div>{artwork.yearCreated}</div>

              <div className="text-gray-600">Category</div>
              <div>{artwork.category}</div>
            </div>
          </div>

          {/* Artist Note - optional section */}
          <div className="mt-auto py-4 border-t border-gray-200">
            <h2 className="font-medium text-lg mb-2">About the Artist</h2>
            <p className="text-gray-600">
              {artwork.artistName} is a renowned artist specializing in{" "}
              {artwork.category.toLowerCase()} art. Their unique style captures
              emotion and imagination through expressive brushwork and
              thoughtful composition.
            </p>
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="mt-16">
        <h2 className="font-playfair text-2xl font-medium mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
