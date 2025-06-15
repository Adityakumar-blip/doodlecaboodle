import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ArtworkCard from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ArrowLeft, Heart } from "lucide-react";

const OccasionDetail = () => {
  const { occasion } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  console.log("occasion", occasion);

  // Occasion specific data
  const occasionData = {
    wedding: {
      title: "Wedding Gifts",
      icon: "💍",
      description:
        "Celebrate love with meaningful artwork that makes for timeless wedding gifts. From elegant portraits to romantic landscapes, find the perfect piece to mark this special occasion.",
      coverImage:
        "https://images.unsplash.com/photo-1525351159099-81893194469e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      color: "bg-pink-100",
      textColor: "text-pink-800",
      accentColor: "bg-pink-600",
      filters: ["All", "Romantic", "Elegant", "Modern", "Traditional"],
    },
    housewarming: {
      title: "Housewarming",
      icon: "🏠",
      description:
        "Welcome to a new home with artwork that transforms any space into a personal sanctuary. Find pieces that bring warmth, character, and style to any room.",
      coverImage:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      color: "bg-blue-100",
      textColor: "text-blue-800",
      accentColor: "bg-blue-600",
      filters: ["All", "Living Room", "Kitchen", "Bedroom", "Office"],
    },
    birthday: {
      title: "Birthday",
      icon: "🎂",
      description:
        "Celebrate another year with the gift of art. Find unique pieces that speak to individual tastes and personalities, creating memories that last far beyond the day itself.",
      coverImage:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      accentColor: "bg-purple-600",
      filters: ["All", "Colorful", "Playful", "Sophisticated", "Personalized"],
    },
    office: {
      title: "Office Decor",
      icon: "💼",
      description:
        "Elevate your workspace with art that inspires productivity and creativity. From motivational pieces to sophisticated prints, find the perfect complement to your professional environment.",
      coverImage:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      color: "bg-green-100",
      textColor: "text-green-800",
      accentColor: "bg-green-600",
      filters: ["All", "Minimal", "Motivational", "Abstract", "Professional"],
    },
  };

  // Get current occasion data or default to wedding
  const currentOccasion = occasionData[occasion] || occasionData.wedding;

  // Wedding-themed artwork data
  const weddingArtworks = [
    {
      id: "w1",
      imageUrl:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Eternal Bond",
      artistName: "Claire Whitman",
      price: "$350",
      category: "Romantic",
    },
    {
      id: "w2",
      imageUrl:
        "https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Two Hearts",
      artistName: "Michael Chang",
      price: "$280",
      category: "Romantic",
    },
    {
      id: "w3",
      imageUrl:
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Floral Symphony",
      artistName: "Emma Rodriguez",
      price: "$420",
      category: "Elegant",
    },
    {
      id: "w4",
      imageUrl:
        "https://images.unsplash.com/photo-1507217633297-c3d2bd415b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Marble Love",
      artistName: "Julian West",
      price: "$390",
      category: "Modern",
    },
    {
      id: "w5",
      imageUrl:
        "https://images.unsplash.com/photo-1501901609772-df0848060b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Golden Promise",
      artistName: "Olivia Taylor",
      price: "$450",
      category: "Traditional",
    },
    {
      id: "w6",
      imageUrl:
        "https://images.unsplash.com/photo-1518795879763-946943a8e242?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Abstract Devotion",
      artistName: "Daniel Kim",
      price: "$320",
      category: "Modern",
    },
    {
      id: "w7",
      imageUrl:
        "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Together Forever",
      artistName: "Sophia Martinez",
      price: "$380",
      category: "Traditional",
    },
    {
      id: "w8",
      imageUrl:
        "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Elegance in White",
      artistName: "Thomas Wright",
      price: "$290",
      category: "Elegant",
    },
  ];

  // Housewarming artwork data
  const housewarmingArtworks = [
    {
      id: "h1",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Cozy Corner",
      artistName: "Nina Johnson",
      price: "$320",
      category: "Living Room",
    },
    {
      id: "h2",
      imageUrl:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Home Sweet Home",
      artistName: "Mark Stevens",
      price: "$240",
      category: "Living Room",
    },
    {
      id: "h3",
      imageUrl:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Culinary Delight",
      artistName: "Julia Chen",
      price: "$190",
      category: "Kitchen",
    },
    {
      id: "h4",
      imageUrl:
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Dreamy Landscape",
      artistName: "Samuel Garcia",
      price: "$350",
      category: "Bedroom",
    },
    {
      id: "h5",
      imageUrl:
        "https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Productive Space",
      artistName: "Aisha Williams",
      price: "$280",
      category: "Office",
    },
    {
      id: "h6",
      imageUrl:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Kitchen Botanicals",
      artistName: "Leo Zhang",
      price: "$220",
      category: "Kitchen",
    },
    {
      id: "h7",
      imageUrl:
        "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Serene Night",
      artistName: "Emma Peterson",
      price: "$290",
      category: "Bedroom",
    },
    {
      id: "h8",
      imageUrl:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Focused Inspiration",
      artistName: "David Tanaka",
      price: "$310",
      category: "Office",
    },
  ];

  // Birthday artwork data
  const birthdayArtworks = [
    {
      id: "b1",
      imageUrl:
        "https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Celebration Burst",
      artistName: "Maya Wilson",
      price: "$210",
      category: "Colorful",
    },
    {
      id: "b2",
      imageUrl:
        "https://images.unsplash.com/photo-1490535004195-099bc723fa1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Playful Spirits",
      artistName: "Carlos Mendez",
      price: "$180",
      category: "Playful",
    },
    {
      id: "b3",
      imageUrl:
        "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Elegant Celebration",
      artistName: "Sophia Lee",
      price: "$320",
      category: "Sophisticated",
    },
    {
      id: "b4",
      imageUrl:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Name in Lights",
      artistName: "James Peterson",
      price: "$240",
      category: "Personalized",
    },
    {
      id: "b5",
      imageUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Vibrant Joy",
      artistName: "Elena Romano",
      price: "$190",
      category: "Colorful",
    },
    {
      id: "b6",
      imageUrl:
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Confetti Dreams",
      artistName: "Tyler Johnson",
      price: "$220",
      category: "Playful",
    },
    {
      id: "b7",
      imageUrl:
        "https://images.unsplash.com/photo-1579541591970-e5615340b982?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Golden Moments",
      artistName: "Olivia Singh",
      price: "$310",
      category: "Sophisticated",
    },
    {
      id: "b8",
      imageUrl:
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Star Sign",
      artistName: "Marco Sanchez",
      price: "$260",
      category: "Personalized",
    },
  ];

  // Office artwork data
  const officeArtworks = [
    {
      id: "o1",
      imageUrl:
        "https://images.unsplash.com/photo-1507208773393-40d9fc670c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Minimal Structure",
      artistName: "Jae Park",
      price: "$230",
      category: "Minimal",
    },
    {
      id: "o2",
      imageUrl:
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Rise & Conquer",
      artistName: "Bianca Taylor",
      price: "$280",
      category: "Motivational",
    },
    {
      id: "o3",
      imageUrl:
        "https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Geometric Flow",
      artistName: "Alex Morgan",
      price: "$310",
      category: "Abstract",
    },
    {
      id: "o4",
      imageUrl:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Corporate Elegance",
      artistName: "Victoria Lewis",
      price: "$390",
      category: "Professional",
    },
    {
      id: "o5",
      imageUrl:
        "https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Clean Lines",
      artistName: "Noah Johnson",
      price: "$250",
      category: "Minimal",
    },
    {
      id: "o6",
      imageUrl:
        "https://images.unsplash.com/photo-1560819400-434c188aecee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Hustle & Flow",
      artistName: "Zoe Williams",
      price: "$270",
      category: "Motivational",
    },
    {
      id: "o7",
      imageUrl:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Abstract Division",
      artistName: "Daniel Kim",
      price: "$340",
      category: "Abstract",
    },
    {
      id: "o8",
      imageUrl:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      title: "Executive View",
      artistName: "Rebecca Chen",
      price: "$420",
      category: "Professional",
    },
  ];

  // Determine which artwork set to use based on the current occasion
  let artworkSet;
  switch (occasion) {
    case "housewarming":
      artworkSet = housewarmingArtworks;
      break;
    case "birthday":
      artworkSet = birthdayArtworks;
      break;
    case "office":
      artworkSet = officeArtworks;
      break;
    default:
      artworkSet = weddingArtworks;
  }

  // Filter artworks based on the active filter
  const filteredArtworks =
    activeFilter === "All"
      ? artworkSet
      : artworkSet.filter((artwork) => artwork.category === activeFilter);

  const handleAddToCart = (e, artwork) => {
    e.preventDefault();
    console.log("Added to cart:", artwork);
    // Implement your cart logic here
  };

  const handleWishlist = (e, artwork) => {
    e.preventDefault();
    console.log("Added to wishlist:", artwork);
    // Implement your wishlist logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className={`relative h-[40vh] md:h-[50vh] overflow-hidden`}>
        <div
          className={`absolute inset-0 ${currentOccasion.color} opacity-20 z-10`}
        ></div>
        <img
          src={currentOccasion.coverImage}
          alt={currentOccasion.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center z-20">
          <div className="container mx-auto px-4">
            <Button
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/50 text-white mb-4 hover:bg-white/30"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex items-center mb-2">
              <span className="text-4xl mr-3">{currentOccasion.icon}</span>
              <h1 className="text-3xl md:text-5xl font-playfair font-semibold text-white">
                {currentOccasion.title}
              </h1>
            </div>
            <p className="text-white/90 max-w-2xl text-lg">
              {currentOccasion.description}
            </p>
          </div>
        </div>
      </div>

      {/* Collection Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured section */}
        <div
          className={`mb-12 p-6 rounded-xl ${currentOccasion.color} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 opacity-10">
            <span className="text-9xl">{currentOccasion.icon}</span>
          </div>
          <h2
            className={`text-2xl font-semibold mb-3 ${currentOccasion.textColor}`}
          >
            Popular for {currentOccasion.title}
          </h2>
          <p className="text-gray-700 mb-4 max-w-3xl">
            Discover our most sought-after pieces perfect for{" "}
            {currentOccasion.title.toLowerCase()}. These artworks have been
            specially curated to celebrate this special occasion.
          </p>
          <Button className={currentOccasion.accentColor}>
            View all featured pieces
          </Button>
        </div>

        {/* Collection Stats & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <p className="text-gray-600">
              {filteredArtworks.length} artworks for{" "}
              {currentOccasion.title.toLowerCase()}
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
                {currentOccasion.filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      activeFilter === filter
                        ? `${currentOccasion.color} ${currentOccasion.textColor} font-medium`
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
            {currentOccasion.filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={
                  activeFilter === filter
                    ? currentOccasion.accentColor
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
              id={artwork.id}
              //   className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              artistName={artwork.artistName}
              category={artwork.category}
              imageUrl={artwork?.imageUrl}
              price={artwork?.price}
              title={artwork?.title}
              onAddToCart={() => {}}
            ></ArtworkCard>
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

        {/* Recommendations Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artworkSet.slice(0, 4).map((artwork) => (
              <div
                key={`rec-${artwork.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{artwork.title}</h3>
                  <p className="text-gray-500 text-sm">{artwork.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccasionDetail;
