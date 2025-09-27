import React, { useState, useEffect, useMemo } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import WorkCard from "./Ourworkcard";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { db } from "@/firebase/firebaseconfig";

interface WorkItem {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  medium: string;
  size: string;
  year: number;
  sales?: number;
  materials?: string[];
  [key: string]: any;
}

interface Category {
  id: any;
  name: string;
  bannerImage: string;
  [key: string]: any;
}

const NavDetailBrowse = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    priceRange: [0, 20000] as [number, number],
    year: [] as string[],
    artist: [] as string[],
    medium: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [sortBy, setSortBy] = useState("featured");
  const [expandedFilterSection, setExpandedFilterSection] = useState<
    string | null
  >(null);

  // Helper function to safely extract price as number
  const getPriceAsNumber = (price: any): number => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const cleanPrice = price.replace(/[^0-9.]/g, "");
      return parseFloat(cleanPrice) || 0;
    }
    return 0;
  };

  // Calculate max price from works data
  const maxPrice = useMemo(() => {
    if (works.length === 0) return 20000;
    const prices = works.map((work) => getPriceAsNumber(work.price));
    return Math.max(...prices, 20000);
  }, [works]);

  // Fetch category and artworks from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!categoryId) {
        setError("No category specified.");
        setLoading(false);
        return;
      }

      try {
        // Fetch category document
        const categoryRef = doc(db, "productCategories", categoryId);
        const categorySnap = await getDoc(categoryRef);

        if (!categorySnap.exists()) {
          setError("Category not found.");
          setLoading(false);
          return;
        }

        const catData: Category = {
          id: categorySnap.id,
          ...categorySnap.data(),
        };
        setCategory(catData);

        // Fetch products filtered by category name
        const productsQuery = query(
          collection(db, "products"),
          where("categoryName", "==", catData.name),
          where("status", "==", "active")
        );
        const productsSnap = await getDocs(productsQuery);
        const worksData: WorkItem[] = productsSnap.docs.map((doc) => ({
          id: doc.id,
          sales: doc.data()?.sales || 0,
          ...doc.data(),
        })) as WorkItem[];
        setWorks(worksData);
        setFilteredWorks(worksData);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to load category or artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  // Update price range when works data changes
  useEffect(() => {
    if (works.length > 0 && activeFilters.priceRange[1] === 20000) {
      setActiveFilters((prev) => ({
        ...prev,
        priceRange: [0, maxPrice],
      }));
    }
  }, [works, maxPrice]);

  // Extract filter options dynamically from fetched data
  const filterOptions = useMemo(
    () => ({
      category: [...new Set(works.map((a) => a.category))]
        .filter(Boolean)
        .sort(),
      artist: [...new Set(works.map((a) => a.artistName))]
        .filter(Boolean)
        .sort(),
      medium: [...new Set(works.map((a) => a.materials?.[0] || a.medium))]
        .filter(Boolean)
        .sort(),
      year: [...new Set(works.map((a) => a.year?.toString()))]
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)),
    }),
    [works]
  );

  // Filter & sort artworks
  useEffect(() => {
    let filtered = [...works];

    // Category filter
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.category.includes(artwork.category)
      );
    }

    // Artist filter
    if (activeFilters.artist.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.artist.includes(artwork.artistName)
      );
    }

    // Medium filter
    if (activeFilters.medium.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.medium.includes(artwork.materials?.[0] || artwork.medium)
      );
    }

    // Year filter
    if (activeFilters.year.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.year.includes(artwork.year?.toString())
      );
    }

    // Price range filter
    filtered = filtered.filter((artwork) => {
      const priceNum = getPriceAsNumber(artwork.price);
      return (
        priceNum >= activeFilters.priceRange[0] &&
        priceNum <= activeFilters.priceRange[1]
      );
    });

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.title?.toLowerCase().includes(query) ||
          artwork.artistName?.toLowerCase().includes(query) ||
          artwork.category?.toLowerCase().includes(query) ||
          artwork.medium?.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => {
          const priceA = getPriceAsNumber(a.price);
          const priceB = getPriceAsNumber(b.price);
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const priceA = getPriceAsNumber(a.price);
          const priceB = getPriceAsNumber(b.price);
          return priceB - priceA;
        });
        break;
      case "newest":
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "oldest":
        filtered.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "best-sellers":
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "alphabetical":
        filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "artist-name":
        filtered.sort((a, b) =>
          (a.artistName || "").localeCompare(b.artistName || "")
        );
        break;
      default:
        // Featured - keep original order or sort by sales
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
    }

    setFilteredWorks(filtered);
    setDisplayCount(12); // Reset display count when filters change
  }, [activeFilters, searchQuery, sortBy, works]);

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 8, filteredWorks.length));
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      priceRange: [0, maxPrice],
      year: [],
      artist: [],
      medium: [],
    });
    setSearchQuery("");
    setSortBy("featured");
  };

  const toggleFilterItem = (
    type: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const current = [...(prev[type] as string[])];
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
      (activeFilters.artist.length > 0 ? 1 : 0) +
      (activeFilters.medium.length > 0 ? 1 : 0) +
      (activeFilters.year.length > 0 ? 1 : 0) +
      (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < maxPrice
        ? 1
        : 0)
    );
  };

  const toggleFilterSection = (section: string) => {
    setExpandedFilterSection(
      expandedFilterSection === section ? null : section
    );
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setActiveFilters((prev) => ({ ...prev, priceRange: value }));
  };

  // Filter section component
  const FilterSection = ({
    title,
    options,
    type,
  }: {
    title: string;
    options?: string[];
    type: string;
  }) => (
    <div className="border-b border-gray-200 py-4 px-4">
      <button
        onClick={() => toggleFilterSection(type)}
        className="flex w-full items-center justify-between text-left font-medium text-gray-800 hover:text-blue-600 transition-colors"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            expandedFilterSection === type ? "rotate-180" : ""
          }`}
        />
      </button>

      {expandedFilterSection === type && (
        <div className="mt-3 space-y-2 pl-1 max-h-[240px] overflow-y-auto pr-1">
          {type === "priceRange" ? (
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={activeFilters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{activeFilters.priceRange[0].toLocaleString()}</span>
                <span>₹{activeFilters.priceRange[1].toLocaleString()}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <input
                  type="number"
                  placeholder="Min"
                  value={activeFilters.priceRange[0]}
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value));
                    handlePriceRangeChange([
                      value,
                      activeFilters.priceRange[1],
                    ]);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={activeFilters.priceRange[1]}
                  onChange={(e) => {
                    const value = Math.min(maxPrice, Number(e.target.value));
                    handlePriceRangeChange([
                      activeFilters.priceRange[0],
                      value,
                    ]);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                />
              </div>
            </div>
          ) : (
            options?.map((option) => (
              <div
                key={option}
                className="flex items-center hover:bg-gray-50 rounded p-1"
              >
                <Checkbox
                  id={`${type}-${option}`}
                  checked={activeFilters[
                    type as keyof typeof activeFilters
                  ].includes(option)}
                  onCheckedChange={() =>
                    toggleFilterItem(type as keyof typeof activeFilters, option)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor={`${type}-${option}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer flex-1 py-1"
                >
                  {option}
                </label>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  // Sort options for the dropdown
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Year: Newest First" },
    { value: "oldest", label: "Year: Oldest First" },
    { value: "alphabetical", label: "Title: A to Z" },
    { value: "artist-name", label: "Artist: A to Z" },
    { value: "best-sellers", label: "Best Sellers" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50/30 ">
        <div className="">
          {category?.bannerUrl && (
            <img
              src={category.bannerUrl}
              alt={`${category.name} banner`}
              className="w-full h-auto  object-cover  mb-8"
            />
          )}
          {/* <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Our {category?.name || "Art"} Collection
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Browse our curated selection of{" "}
              {category?.name?.toLowerCase() || "artworks"} from talented
              artists worldwide. Find the perfect piece to inspire and elevate
              your space.
            </p>
            <div className="relative w-full max-w-md mx-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder={`Search ${
                  category?.name?.toLowerCase() || "artworks"
                } or artists...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div> */}
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-800">Filters</h2>
                {countActiveFilters() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Clear all ({countActiveFilters()})
                  </button>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                <FilterSection
                  title="Artist"
                  options={filterOptions.artist}
                  type="artist"
                />
                <FilterSection
                  title="Medium"
                  options={filterOptions.medium}
                  type="medium"
                />
                {/* <FilterSection
                  title="Year"
                  options={filterOptions.year}
                  type="year"
                /> */}
                <FilterSection title="Price Range" type="priceRange" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Toolbar */}
            <div className="md:hidden flex items-center justify-between mb-6 gap-4">
              <Button
                onClick={() => setShowMobileFilters(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal size={16} />
                Filters
                {countActiveFilters() > 0 && (
                  <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-semibold h-5 min-w-5 rounded-full flex items-center justify-center">
                    {countActiveFilters()}
                  </span>
                )}
              </Button>

              <div className="relative flex-1 max-w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">
                Browse Artworks
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {Math.min(displayCount, filteredWorks.length)} of{" "}
                  {filteredWorks.length} results
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 min-w-44"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Loading artworks...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-500 mb-4">{error}</div>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                {/* Active Filters Pills */}
                {countActiveFilters() > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {/* Category pills */}
                    {activeFilters.category.map((item) => (
                      <button
                        key={`category-${item}`}
                        onClick={() => toggleFilterItem("category", item)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center hover:bg-blue-200 transition-colors"
                      >
                        Category: {item} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {/* Artist pills */}
                    {activeFilters.artist.map((item) => (
                      <button
                        key={`artist-${item}`}
                        onClick={() => toggleFilterItem("artist", item)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center hover:bg-green-200 transition-colors"
                      >
                        Artist: {item} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {/* Medium pills */}
                    {activeFilters.medium.map((item) => (
                      <button
                        key={`medium-${item}`}
                        onClick={() => toggleFilterItem("medium", item)}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center hover:bg-purple-200 transition-colors"
                      >
                        Medium: {item} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {/* Year pills */}
                    {activeFilters.year.map((item) => (
                      <button
                        key={`year-${item}`}
                        onClick={() => toggleFilterItem("year", item)}
                        className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center hover:bg-orange-200 transition-colors"
                      >
                        Year: {item} <X size={14} className="ml-1" />
                      </button>
                    ))}
                    {/* Price range pill */}
                    {(activeFilters.priceRange[0] > 0 ||
                      activeFilters.priceRange[1] < maxPrice) && (
                      <button
                        onClick={() =>
                          setActiveFilters((prev) => ({
                            ...prev,
                            priceRange: [0, maxPrice],
                          }))
                        }
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center hover:bg-red-200 transition-colors"
                      >
                        Price: ₹{activeFilters.priceRange[0].toLocaleString()} -
                        ₹{activeFilters.priceRange[1].toLocaleString()}
                        <X size={14} className="ml-1" />
                      </button>
                    )}
                  </div>
                )}

                {/* Artworks Grid */}
                {filteredWorks.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                      {filteredWorks.slice(0, displayCount).map((work) => (
                        <WorkCard
                          key={work.id}
                          id={work.id}
                          imageUrl={work.imageUrl}
                          title={work.title}
                          artistName={work.artistName}
                          price={work.price}
                          category={work.category}
                          props={work}
                        />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {displayCount < filteredWorks.length && (
                      <div className="mt-12 text-center">
                        <Button
                          onClick={loadMore}
                          className="bg-transparent border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 px-8 py-3 rounded-md transition-colors duration-300"
                        >
                          Load More Artworks (
                          {filteredWorks.length - displayCount} remaining)
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
                      search criteria or clearing some filters.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
          <div
            className="bg-white w-full max-w-xs h-full overflow-y-auto ml-auto transform transition-transform duration-300 ease-out"
            style={{
              animation: "slideInRight 0.3s ease-out",
            }}
          >
            <div className="sticky top-0 bg-white px-4 py-4 border-b border-gray-200 flex justify-between items-center z-10">
              <h3 className="font-medium">Filter Options</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="divide-y divide-gray-200">
              {/* Category filter removed as it's category-specific page */}
              <FilterSection
                title="Artist"
                options={filterOptions.artist}
                type="artist"
              />
              <FilterSection
                title="Medium"
                options={filterOptions.medium}
                type="medium"
              />
              <FilterSection
                title="Year"
                options={filterOptions.year}
                type="year"
              />
              <FilterSection title="Price Range" type="priceRange" />
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 z-10">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters ({countActiveFilters()})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NavDetailBrowse;
