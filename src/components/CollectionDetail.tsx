import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ArrowLeft } from "lucide-react";

const CollectionDetail = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for the collection
  const collectionData = {
    id: "abstract-art",
    title: "Abstract Art Collection",
    description:
      "Explore our curated collection of abstract masterpieces from emerging artists. Each piece represents a unique vision and perspective in contemporary abstract art.",
    coverImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    itemCount: 12,
    filters: ["All", "Paintings", "Digital Art", "Mixed Media", "Sculptures"],
  };

  // Mock data for artwork items in the collection
  const artworks = [
    {
      id: "art1",
      imageUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Vibrant Abstraction",
      artistName: "Elena Cortez",
      price: "$320",
      category: "Paintings",
    },
    {
      id: "art2",
      imageUrl:
        "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Geometric Harmony",
      artistName: "Marcus Wei",
      price: "$450",
      category: "Paintings",
    },
    {
      id: "art3",
      imageUrl:
        "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Digital Dreamscape",
      artistName: "Sophia Chen",
      price: "$275",
      category: "Digital Art",
    },
    {
      id: "art4",
      imageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Ethereal Flow",
      artistName: "Jordan Rivera",
      price: "$390",
      category: "Mixed Media",
    },
    {
      id: "art5",
      imageUrl:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Chromatic Fusion",
      artistName: "Alex Kim",
      price: "$520",
      category: "Paintings",
    },
    {
      id: "art6",
      imageUrl:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Abstract Form #7",
      artistName: "Toni Morrison",
      price: "$680",
      category: "Sculptures",
    },
    {
      id: "art7",
      imageUrl:
        "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Digital Cascade",
      artistName: "Leo Zhang",
      price: "$295",
      category: "Digital Art",
    },
    {
      id: "art8",
      imageUrl:
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Colorfield Study",
      artistName: "Maria Solano",
      price: "$410",
      category: "Paintings",
    },
  ];

  // Filter artworks based on the active filter
  const filteredArtworks =
    activeFilter === "All"
      ? artworks
      : artworks.filter((artwork) => artwork.category === activeFilter);

  const handleAddToCart = (e, artwork) => {
    e.preventDefault();
    console.log("Added to cart:", artwork);
    // Implement your cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={collectionData.coverImage}
          alt={collectionData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container mx-auto px-4">
            <Button
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/50 text-white mb-4 hover:bg-white/30"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-3xl md:text-5xl font-playfair font-semibold text-white mb-2">
              {collectionData.title}
            </h1>
            <p className="text-white/90 max-w-2xl text-lg">
              {collectionData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Collection Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Collection Stats & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <p className="text-gray-600">
              {collectionData.itemCount} artworks in this collection
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="w-full md:hidden">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter: {activeFilter}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            {showFilters && (
              <div className="mt-2 bg-white shadow-md rounded-md p-2 z-10 relative">
                {collectionData.filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      activeFilter === filter
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex space-x-2">
            {collectionData.filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={
                  activeFilter === filter
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:text-gray-900"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              imageUrl={artwork.imageUrl}
              title={artwork.title}
              artistName={artwork.artistName}
              price={artwork.price}
              category={artwork.category}
              onAddToCart={(e) => handleAddToCart(e, artwork)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No artworks found
            </h3>
            <p className="text-gray-500">Try changing your filter selection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
