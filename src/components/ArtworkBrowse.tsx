import React, { useState, useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Search,
  ChevronDown,
  SlidersHorizontal,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";

// Sample artwork data (expanded from your original data)
const allArtworkData = [
  // Your original 8 artworks
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Abstract Harmony",
    artistName: "Emily Chen",
    price: "$1,200",
    category: "Painting",
    medium: "Oil on Canvas",
    size: '24" x 36"',
    year: 2023,
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1599757266893-b78cbe70ffb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29hc3RhbCUyMGRyZWFtcyUyMHBhaXRpbmd8ZW58MHx8MHx8fDA%3D",
    title: "Coastal Dreams",
    artistName: "Michael Rivera",
    price: "$950",
    category: "Painting",
    medium: "Acrylic on Canvas",
    size: '18" x 24"',
    year: 2024,
  },
  // Additional artworks (12 more to make a grid of 20 total)
  // ... existing artwork data...
  {
    id: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Vivid Currents",
    artistName: "Sophia Lee",
    price: "$1,750",
    category: "Painting",
    medium: "Mixed Media",
    size: '30" x 48"',
    year: 2023,
  },
  {
    id: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Marble Visage",
    artistName: "Antonio Rossi",
    price: "$3,200",
    category: "Sculpture",
    medium: "White Marble",
    size: '18" x 12" x 10"',
    year: 2022,
  },
  {
    id: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Digital Dreams",
    artistName: "Alex Turner",
    price: "$850",
    category: "Digital",
    medium: "Digital Art",
    size: "4K Resolution",
    year: 2024,
  },
  {
    id: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Concrete & Glass",
    artistName: "Nina Patel",
    price: "$1,800",
    category: "Mixed Media",
    medium: "Found Objects & Resin",
    size: '24" x 36"',
    year: 2023,
  },
  {
    id: 13,
    imageUrl:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Ethereal Moments",
    artistName: "Liam Johnson",
    price: "$1,100",
    category: "Photography",
    medium: "Film Photography",
    size: '20" x 30"',
    year: 2022,
  },
  {
    id: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Terra Forms",
    artistName: "Maria Garcia",
    price: "$2,500",
    category: "Sculpture",
    medium: "Clay & Bronze",
    size: '24" x 14" x 12"',
    year: 2023,
  },
  {
    id: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Harmonic Disruption",
    artistName: "Jason Wright",
    price: "$1,350",
    category: "Digital",
    medium: "Generative Art",
    size: "Variable",
    year: 2024,
  },
  {
    id: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Textured Memories",
    artistName: "Claire Bennett",
    price: "$1,900",
    category: "Mixed Media",
    medium: "Fabric & Acrylic",
    size: '36" x 48"',
    year: 2022,
  },
  {
    id: 17,
    imageUrl:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Geometric Harmony",
    artistName: "Thomas Wilson",
    price: "$2,100",
    category: "Painting",
    medium: "Oil on Canvas",
    size: '40" x 40"',
    year: 2023,
  },
  {
    id: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Urban Fragment",
    artistName: "Zoe Miller",
    price: "$1,050",
    category: "Photography",
    medium: "Digital Photography",
    size: '24" x 36"',
    year: 2024,
  },
  {
    id: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1573221566340-81bdde00e00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Suspended Motion",
    artistName: "Robert Chen",
    price: "$3,500",
    category: "Sculpture",
    medium: "Steel & Glass",
    size: '30" x 20" x 15"',
    year: 2023,
  },
  {
    id: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    title: "Digital Landscape",
    artistName: "Priya Singh",
    price: "$950",
    category: "Digital",
    medium: "Digital Art",
    size: "5K Resolution",
    year: 2024,
  },
];

const categories = [
  "All",
  "Painting",
  "Photography",
  "Digital",
  "Sculpture",
  "Mixed Media",
];
const priceRanges = [
  "All",
  "Under $1,000",
  "$1,000-$2,000",
  "$2,000-$3,000",
  "Over $3,000",
];
const years = ["All", "2024", "2023", "2022", "Earlier"];

const ArtworkBrowse = () => {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceRange: [0, 5000],
    year: [],
    artist: [],
    medium: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [artworks, setArtworks] = useState(allArtworkData);
  const [displayCount, setDisplayCount] = useState(12);
  const [sortBy, setSortBy] = useState("featured");
  const [expandedFilterSection, setExpandedFilterSection] = useState(null);

  // Extract all available filter options from artwork data
  const filterOptions = {
    category: [
      "Painting",
      "Photography",
      "Digital",
      "Sculpture",
      "Mixed Media",
    ],
    artist: [...new Set(allArtworkData.map((a) => a.artistName))],
    medium: [...new Set(allArtworkData.map((a) => a.medium))],
    year: ["2024", "2023", "2022", "Earlier"],
  };

  // Filter and sort artworks
  useEffect(() => {
    let filtered = [...allArtworkData];

    // Apply category filter
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.category.includes(artwork.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter((artwork) => {
      const price = parseFloat(artwork.price.replace("$", "").replace(",", ""));
      return (
        price >= activeFilters.priceRange[0] &&
        price <= activeFilters.priceRange[1]
      );
    });

    // Apply year filter
    if (activeFilters.year.length > 0) {
      filtered = filtered.filter((artwork) => {
        if (activeFilters.year.includes("Earlier")) {
          return (
            artwork.year < 2022 ||
            activeFilters.year.includes(artwork.year.toString())
          );
        } else {
          return activeFilters.year.includes(artwork.year.toString());
        }
      });
    }

    // Apply artist filter
    if (activeFilters.artist.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.artist.includes(artwork.artistName)
      );
    }

    // Apply medium filter
    if (activeFilters.medium.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.medium.includes(artwork.medium)
      );
    }

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.artistName.toLowerCase().includes(query) ||
          artwork.category.toLowerCase().includes(query) ||
          artwork.medium.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "").replace(",", "")) -
            parseFloat(b.price.replace("$", "").replace(",", ""))
        );
        break;
      case "price-high-low":
        filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "").replace(",", "")) -
            parseFloat(a.price.replace("$", "").replace(",", ""))
        );
        break;
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // featured is default, no sorting needed
    }

    setArtworks(filtered);
  }, [activeFilters, searchQuery, sortBy]);

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 8, artworks.length));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      priceRange: [0, 5000],
      year: [],
      artist: [],
      medium: [],
    });
    setSearchQuery("");
  };

  const toggleFilterItem = (type, value) => {
    setActiveFilters((prev) => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const countActiveFilters = () => {
    return (
      (activeFilters.category.length > 0 ? 1 : 0) +
      (activeFilters.year.length > 0 ? 1 : 0) +
      (activeFilters.artist.length > 0 ? 1 : 0) +
      (activeFilters.medium.length > 0 ? 1 : 0) +
      (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 5000
        ? 1
        : 0)
    );
  };

  const toggleFilterSection = (section) => {
    setExpandedFilterSection(
      expandedFilterSection === section ? null : section
    );
  };

  // Filter section component
  const FilterSection = ({ title, options, type }) => (
    <div className="border-b border-gray-200 py-4 px-4">
      <button
        onClick={() => toggleFilterSection(type)}
        className="flex w-full items-center justify-between text-left font-medium text-gray-800"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform ${
            expandedFilterSection === type ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {expandedFilterSection === type && (
        <div className="mt-3 space-y-2 pl-1 max-h-[240px] overflow-y-auto pr-1">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <Checkbox
                id={`${type}-${option}`}
                checked={activeFilters[type].includes(option)}
                onCheckedChange={() => toggleFilterItem(type, option)}
                className="h-4 w-4 rounded border-gray-300 text-pastel-blue focus:ring-pastel-blue"
              />
              <label
                htmlFor={`${type}-${option}`}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header with search and navigation */}
      {/* <header
        className="sticky z-20 bg-white shadow-sm"
        style={{ top: "var(--navbar-height, 50px)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
                Art Collection
              </h1>
            </div>

            <div className="relative w-full max-w-md mx-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pastel-blue/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="hidden md:block relative min-w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full pl-4 pr-8 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pastel-blue/50 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="title">Alphabetical</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>
      </header> */}

      <section className="bg-gradient-to-b  from-white to-pastel-blue/5 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Extraordinary Art
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our curated collection featuring works from emerging and
              established artists. From stunning paintings to captivating
              photography, find the perfect piece to elevate your space.
            </p>
            <div className="relative w-full max-w-md mx-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pastel-blue/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {/* <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pastel-blue text-black hover:bg-pastel-blue/80 py-6 px-8">
                Featured Artists
              </Button>
              <Button variant="outline" className="py-6 px-8">
                How to Purchase
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-800">Filters</h2>
                {countActiveFilters() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-pastel-blue hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                {/* Category Filter */}
                <FilterSection
                  title="Category"
                  options={filterOptions.category}
                  type="category"
                />

                {/* Price Range Filter */}
                <div className="py-4 px-4">
                  <button
                    onClick={() => toggleFilterSection("priceRange")}
                    className="flex w-full items-center justify-between text-left font-medium text-gray-800"
                  >
                    Price Range
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        expandedFilterSection === "priceRange"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {expandedFilterSection === "priceRange" && (
                    <div className="mt-6 px-2">
                      <Slider
                        defaultValue={activeFilters.priceRange}
                        min={0}
                        max={5000}
                        step={100}
                        onValueChange={(value) =>
                          setActiveFilters({
                            ...activeFilters,
                            priceRange: value,
                          })
                        }
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          ${activeFilters.priceRange[0]}
                        </span>
                        <span className="text-sm text-gray-600">
                          ${activeFilters.priceRange[1]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Artist Filter */}
                {/* <FilterSection
                  title="Artist"
                  options={filterOptions.artist}
                  type="artist"
                /> */}

                {/* Medium Filter */}
                <FilterSection
                  title="Medium"
                  options={filterOptions.medium}
                  type="medium"
                />

                {/* Year Filter */}
                {/* <FilterSection
                  title="Year"
                  options={filterOptions.year}
                  type="year"
                /> */}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Toolbar */}
            <div className="md:hidden flex items-center justify-between mb-6">
              <Button
                onClick={() => setShowMobileFilters(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal size={16} />
                Filters
                {countActiveFilters() > 0 && (
                  <span className="ml-1 bg-pastel-pink text-xs font-semibold h-5 min-w-5 rounded-full flex items-center justify-center">
                    {countActiveFilters()}
                  </span>
                )}
              </Button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low-High</option>
                  <option value="price-high-low">Price: High-Low</option>
                  <option value="newest">Newest</option>
                  <option value="title">A-Z</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">
                Browse Artworks
              </h2>
              <div className="text-sm text-gray-600">
                Showing {Math.min(displayCount, artworks.length)} of{" "}
                {artworks.length} results
              </div>
            </div>

            {/* Active Filters Pills */}
            {countActiveFilters() > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.category.map((item) => (
                  <button
                    key={`category-${item}`}
                    onClick={() => toggleFilterItem("category", item)}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center"
                  >
                    {item} <X size={14} className="ml-1" />
                  </button>
                ))}

                {activeFilters.year.map((item) => (
                  <button
                    key={`year-${item}`}
                    onClick={() => toggleFilterItem("year", item)}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center"
                  >
                    {item} <X size={14} className="ml-1" />
                  </button>
                ))}

                {activeFilters.artist.map((item) => (
                  <button
                    key={`artist-${item}`}
                    onClick={() => toggleFilterItem("artist", item)}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center"
                  >
                    {item} <X size={14} className="ml-1" />
                  </button>
                ))}

                {activeFilters.medium.map((item) => (
                  <button
                    key={`medium-${item}`}
                    onClick={() => toggleFilterItem("medium", item)}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center"
                  >
                    {item} <X size={14} className="ml-1" />
                  </button>
                ))}

                {(activeFilters.priceRange[0] > 0 ||
                  activeFilters.priceRange[1] < 5000) && (
                  <button
                    onClick={() =>
                      setActiveFilters({
                        ...activeFilters,
                        priceRange: [0, 5000],
                      })
                    }
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center"
                  >
                    ${activeFilters.priceRange[0]} - $
                    {activeFilters.priceRange[1]}{" "}
                    <X size={14} className="ml-1" />
                  </button>
                )}
              </div>
            )}

            {/* Artworks Grid */}
            {artworks.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artworks.slice(0, displayCount).map((artwork) => (
                    <ArtworkCard
                      key={artwork.id}
                      id={artwork.id}
                      imageUrl={artwork.imageUrl}
                      title={artwork.title}
                      artistName={artwork.artistName}
                      price={artwork.price}
                      category={artwork.category}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {displayCount < artworks.length && (
                  <div className="mt-10 text-center">
                    <Button
                      onClick={loadMore}
                      className="bg-transparent border border-gray-300 text-gray-700 hover:bg-pastel-blue px-8 py-6"
                    >
                      Load More Artworks
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No artworks found
                </h3>
                <p className="text-gray-600 mb-6">
                  No artworks match your current filters. Try adjusting your
                  search criteria.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-pastel-blue hover:bg-pastel-blue/80"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
          <div className="bg-white w-full max-w-xs h-full overflow-y-auto ml-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white px-4 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">Filter Options</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {/* Category Filter */}
              <FilterSection
                title="Category"
                options={filterOptions.category}
                type="category"
              />

              {/* Price Range Filter */}
              <div className="py-4 px-4">
                <button
                  onClick={() => toggleFilterSection("priceRange")}
                  className="flex w-full items-center justify-between text-left font-medium text-gray-800"
                >
                  Price Range
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      expandedFilterSection === "priceRange"
                        ? "transform rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {expandedFilterSection === "priceRange" && (
                  <div className="mt-6 px-2">
                    <Slider
                      defaultValue={activeFilters.priceRange}
                      min={0}
                      max={5000}
                      step={100}
                      onValueChange={(value) =>
                        setActiveFilters({
                          ...activeFilters,
                          priceRange: value,
                        })
                      }
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        ${activeFilters.priceRange[0]}
                      </span>
                      <span className="text-sm text-gray-600">
                        ${activeFilters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Artist Filter */}
              <FilterSection
                title="Artist"
                options={filterOptions.artist}
                type="artist"
              />

              {/* Medium Filter */}
              <FilterSection
                title="Medium"
                options={filterOptions.medium}
                type="medium"
              />

              {/* Year Filter */}
              <FilterSection
                title="Year"
                options={filterOptions.year}
                type="year"
              />
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  className="flex-1 bg-pastel-blue hover:bg-pastel-blue/80"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters ({countActiveFilters()})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkBrowse;
