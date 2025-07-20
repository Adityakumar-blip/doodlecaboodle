import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import WorkCard from "./Ourworkcard"; // Changed to match OurWorks.tsx
import { Button } from "@/components/ui/button";
import {
  Filter,
  Search,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
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
  [key: string]: any;
}

const ArtworkBrowse = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceRange: [0, 5000],
    year: [],
    artist: [],
    medium: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [sortBy, setSortBy] = useState("featured");
  const [expandedFilterSection, setExpandedFilterSection] = useState<
    string | null
  >(null);

  // Fetch artworks from Firestore
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ourworks"));
        const worksData: WorkItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WorkItem[];
        setWorks(worksData);
        setFilteredWorks(worksData);
      } catch (err: any) {
        console.error("Error fetching works:", err);
        setError("Failed to load artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // Extract filter options dynamically from fetched data
  const filterOptions = {
    category: [...new Set(works.map((a) => a.category))].filter(Boolean),
    artist: [...new Set(works.map((a) => a.artistName))].filter(Boolean),
    medium: [...new Set(works.map((a) => a.materials[0]))].filter(Boolean),
    year: [...new Set(works.map((a) => a.year?.toString()))]
      .filter(Boolean)
      .sort((a, b) => parseInt(b) - parseInt(a)),
  };

  // Filter and sort artworks
  useEffect(() => {
    let filtered = [...works];

    // Apply artist filter
    if (activeFilters.artist.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.artist.includes(artwork.artistName)
      );
    }

    // Apply medium filter
    if (activeFilters.medium.length > 0) {
      filtered = filtered.filter((artwork) =>
        activeFilters.medium.includes(artwork.materials[0])
      );
    }

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.name.toLowerCase().includes(query) ||
          artwork.artistName.toLowerCase().includes(query)
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

    setFilteredWorks(filtered);
  }, [activeFilters, searchQuery, sortBy, works]);

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 8, filteredWorks.length));
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

  const toggleFilterItem = (type: string, value: string) => {
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
      (activeFilters.artist.length > 0 ? 1 : 0) +
      (activeFilters.medium.length > 0 ? 1 : 0)
    );
  };

  const toggleFilterSection = (section: string) => {
    setExpandedFilterSection(
      expandedFilterSection === section ? null : section
    );
  };

  // Filter section component
  const FilterSection = ({
    title,
    options,
    type,
  }: {
    title: string;
    options: string[];
    type: string;
  }) => (
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
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
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
      <section className="bg-gradient-to-b from-white to-blue-50/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Our Art Collection
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Browse our curated selection of artworks from talented artists
              worldwide. Find the perfect piece to inspire and elevate your
              space.
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Clear all
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
                  <span className="ml-1 bg-pink-100 text-xs font-semibold h-5 min-w-5 rounded-full flex items-center justify-center">
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
            {loading ? (
              <div className="text-center text-gray-600">
                Loading artworks...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-800">
                    Browse Artworks
                  </h2>
                  <div className="text-sm text-gray-600">
                    Showing {Math.min(displayCount, filteredWorks.length)} of{" "}
                    {filteredWorks.length} results
                  </div>
                </div>

                {/* Active Filters Pills */}
                {countActiveFilters() > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
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
                      <div className="mt-10 text-center">
                        <Button
                          onClick={loadMore}
                          className="bg-transparent border border-gray-300 text-gray-700 hover:bg-blue-100 px-8 py-3 rounded-md transition-colors duration-300"
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
                      className="bg-blue-500 hover:bg-blue-600 text-white"
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
          <div className="bg-white w-full max-w-xs h-full overflow-y-auto ml-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white px-4 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">Filter Options</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
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
    </div>
  );
};

export default ArtworkBrowse;
