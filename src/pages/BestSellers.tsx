import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import WorkCard from "@/components/Ourworkcard";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, X, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
  tags?: string[];
  isBestSeller?: boolean;
  [key: string]: any;
}

// Custom debounce hook for range slider
const useDebounce = (
  value: [number, number],
  delay: number
): [number, number] => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const PRESET_RANGES = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: 100000 },
];

const BestSellers = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [priceRangeUI, setPriceRangeUI] = useState<[number, number]>([0, 50000]);
  const debouncedPriceRange = useDebounce(priceRangeUI, 300);

  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    priceRange: [0, 50000] as [number, number],
    medium: [] as string[],
  });

  const [sortBy, setSortBy] = useState("trending");
  const [displayCount, setDisplayCount] = useState(12);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilterSection, setExpandedFilterSection] = useState<string | null>(null);

  const getPriceAsNumber = (price: any): number => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const cleanPrice = price.replace(/[^0-9.]/g, "");
      return parseFloat(cleanPrice) || 0;
    }
    return 0;
  };

  const maxPrice = useMemo(() => {
    if (works.length === 0) return 50000;
    const prices = works.map((w) => getPriceAsNumber(w.price));
    return Math.max(...prices, 10000);
  }, [works]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("isBestSeller", "==", true),
          where("status", "==", "active")
        );
        const snap = await getDocs(q);
        const items = snap.docs.map((d) => ({
          id: d.id,
          sales: d.data()?.sales || 0,
          ...d.data(),
        })) as WorkItem[];
        setWorks(items);
        setFilteredWorks(items);
      } catch (err: any) {
        console.error("Error fetching bestsellers:", err);
        setError("Failed to load best sellers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  useEffect(() => {
    if (works.length > 0) {
      const initialRange: [number, number] = [0, maxPrice];
      setPriceRangeUI(initialRange);
      setActiveFilters((prev) => ({
        ...prev,
        priceRange: initialRange,
      }));
    }
  }, [works.length, maxPrice]);

  useEffect(() => {
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: debouncedPriceRange,
    }));
  }, [debouncedPriceRange]);

  const filterOptions = useMemo(
    () => ({
      category: [...new Set(works.map((a) => a.categoryName || a.category))].filter(Boolean).sort(),
      medium: [...new Set(works.map((a) => a.materials?.[0] || a.medium))].filter(Boolean).sort(),
    }),
    [works]
  );

  const toggleFilterItem = (type: "category" | "medium", value: string) => {
    setActiveFilters((prev) => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  useEffect(() => {
    let filtered = [...works];

    if (activeFilters.category.length > 0) {
      filtered = filtered.filter((w) => activeFilters.category.includes(w.categoryName || w.category));
    }
    if (activeFilters.medium.length > 0) {
      filtered = filtered.filter((w) => activeFilters.medium.includes(w.materials?.[0] || w.medium));
    }

    filtered = filtered.filter((w) => {
      const priceNum = getPriceAsNumber(w.price);
      return priceNum >= activeFilters.priceRange[0] && priceNum <= activeFilters.priceRange[1];
    });

    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => getPriceAsNumber(a.price) - getPriceAsNumber(b.price));
        break;
      case "price-high-low":
        filtered.sort((a, b) => getPriceAsNumber(b.price) - getPriceAsNumber(a.price));
        break;
      case "trending":
        filtered.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "newest":
        filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      default:
        break;
    }

    setFilteredWorks(filtered);
    setDisplayCount(12);
  }, [activeFilters, sortBy, works]);

  const loadMore = useCallback(() => {
    if (loadingMore || displayCount >= filteredWorks.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 8, filteredWorks.length));
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, displayCount, filteredWorks.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredWorks.length && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);
    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [displayCount, filteredWorks.length, loadingMore, loadMore]);

  const clearFilters = () => {
    const resetRange: [number, number] = [0, maxPrice];
    setActiveFilters({
      category: [],
      priceRange: resetRange,
      medium: [],
    });
    setPriceRangeUI(resetRange);
    setSortBy("trending");
  };

  const FilterSection = ({ title, options, type }: { title: string; options?: string[]; type: string }) => (
    <div className="border-b border-gray-200 py-4 px-4">
      <button
        onClick={() => setExpandedFilterSection(expandedFilterSection === type ? null : type)}
        className="flex w-full items-center justify-between text-left font-medium text-gray-800 hover:text-accent transition-colors"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${expandedFilterSection === type ? "rotate-180" : ""}`}
        />
      </button>
      {expandedFilterSection === type && (
        <div className="mt-3 space-y-2 pl-1 max-h-[240px] overflow-y-auto pr-1">
          {type === "priceRange" ? (
            <div className="p-3 space-y-4">
              <div className="space-y-2">
                {PRESET_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRangeUI([range.min, range.max])}
                    className="w-full text-left px-3 py-2 border rounded-md hover:bg-accent/10 text-sm transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-gray-500 uppercase ml-1">Min</span>
                  <input
                    type="number"
                    value={priceRangeUI[0]}
                    onChange={(e) => setPriceRangeUI([Number(e.target.value), priceRangeUI[1]])}
                    className="w-full px-2 py-1.5 border rounded focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-gray-500 uppercase ml-1">Max</span>
                  <input
                    type="number"
                    value={priceRangeUI[1]}
                    onChange={(e) => setPriceRangeUI([priceRangeUI[0], Number(e.target.value)])}
                    className="w-full px-2 py-1.5 border rounded focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
              </div>
            </div>
          ) : (
            options?.map((opt) => (
              <div key={opt} className="flex items-center p-1.5 hover:bg-gray-50 rounded transition-colors group">
                <Checkbox
                  id={`filter-${type}-${opt}`}
                  checked={activeFilters[type as "category" | "medium"].includes(opt)}
                  onCheckedChange={() => toggleFilterItem(type as "category" | "medium", opt)}
                />
                <label
                  htmlFor={`filter-${type}-${opt}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer flex-1 group-hover:text-black transition-colors"
                >
                  {opt}
                </label>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-primary-foreground">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <TrendingUp size={16} />
            Most Loved Artworks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Jost']">
            Our Best Sellers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the artworks that our community loves the most. These hand-picked best sellers represent our finest craftsmanship and artistic vision.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                </h2>
                {(activeFilters.category.length > 0 || activeFilters.medium.length > 0 || activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < maxPrice) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-accent hover:underline transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="divide-y divide-gray-100">
                <FilterSection title="Categories" options={filterOptions.category} type="category" />
                <FilterSection title="Medium" options={filterOptions.medium} type="medium" />
                <FilterSection title="Price Range" type="priceRange" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="text-gray-600 font-medium">
                Showing <span className="text-gray-900">{Math.min(displayCount, filteredWorks.length)}</span> of <span className="text-gray-900">{filteredWorks.length}</span> best sellers
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="md:hidden flex-1">
                  <Button
                    onClick={() => setShowMobileFilters(true)}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-gray-200"
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                  </Button>
                </div>
                
                <div className="relative min-w-[180px] flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer"
                  >
                    <option value="trending">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                  <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={20} />
                </div>
                <p className="mt-6 text-gray-500 font-medium animate-pulse text-lg">Curating our best sellers...</p>
              </div>
            ) : error ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-red-200">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-accent hover:bg-accent/90">
                  Try Again
                </Button>
              </div>
            ) : filteredWorks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredWorks.slice(0, displayCount).map((work, index) => (
                  <div 
                    key={work.id} 
                    className="group"
                    style={{ 
                      animation: `fade-in-up 0.5s ease-out forwards ${index % 6 * 0.1}s`,
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <WorkCard
                      id={work.id}
                      title={work.name || work.title}
                      price={work.price}
                      props={work}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm px-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No matching best sellers</h3>
                <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">
                  We couldn't find any best sellers that match your selected filters. Try clearing some filters or exploring other categories.
                </p>
                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90 text-white px-8 h-12 rounded-lg font-bold">
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination / Infinity scroll loader */}
            <div ref={loaderRef} className="h-20 flex items-center justify-center mt-12">
              {loadingMore && (
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
                  <div className="w-5 h-5 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                  <span className="text-sm font-semibold text-gray-700">Loading more favorites...</span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-[320px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              <FilterSection title="Categories" options={filterOptions.category} type="category" />
              <FilterSection title="Medium" options={filterOptions.medium} type="medium" />
              <FilterSection title="Price Range" type="priceRange" />
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3">
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  className="flex-1 border-gray-200"
                >
                  Reset
                </Button>
                <Button 
                  onClick={() => setShowMobileFilters(false)} 
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  Show Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default BestSellers;
