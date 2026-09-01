import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts, Product } from "@/store/slices/ProductSlice";
import { cn, productPath } from "@/lib/utils";

const DEBOUNCE_MS = 200;
const MAX_SUGGESTIONS = 8;

function productDisplayName(product: Product): string {
  return product.name || product.title || "Untitled";
}

function productImage(product: Product): string | undefined {
  return (
    product.images?.[0]?.url ||
    product.images?.[1]?.url ||
    product.imageUrl ||
    undefined
  );
}

function matchesQuery(product: Product, query: string): boolean {
  const q = query.toLowerCase();
  const fields = [
    product.name,
    product.title,
    product.artistName,
    product.categoryName,
    product.category,
  ];
  return fields.some((f) => f?.toLowerCase().includes(q));
}

interface GlobalSearchBoxProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  /** Called after navigating away (e.g. close mobile menu) */
  onNavigate?: () => void;
  autoFocus?: boolean;
}

const GlobalSearchBox: React.FC<GlobalSearchBoxProps> = ({
  className,
  inputClassName,
  placeholder = "Search products...",
  onNavigate,
  autoFocus = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, fetched } = useSelector(
    (state: RootState) => state.products
  );

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Products are loaded once on focus (thunk skips if already cached)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const suggestions = useMemo(() => {
    if (!debouncedQuery) return [];
    return products
      .filter((p) => matchesQuery(p, debouncedQuery))
      .slice(0, MAX_SUGGESTIONS);
  }, [products, debouncedQuery]);

  const goToProduct = (product: Product) => {
    const path = productPath(
      product.categoryName || product.category,
      product.name || product.title,
      product.id
    );
    setIsOpen(false);
    setQuery("");
    onNavigate?.();
    navigate(path, { state: { id: product.id } });
  };

  const goToSearchPage = () => {
    const q = query.trim();
    if (!q) return;
    setIsOpen(false);
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goToProduct(suggestions[activeIndex]);
      return;
    }
    goToSearchPage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder={placeholder}
          aria-label="Search products"
          aria-expanded={showDropdown}
          aria-controls="global-search-suggestions"
          onFocus={() => {
            setIsOpen(true);
            if (!fetched && !loading) dispatch(fetchProducts());
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pl-9 pr-9 py-2 rounded-full border border-white/20",
            "bg-white/10 text-white placeholder:text-white/60 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:bg-white/15",
            "transition-all duration-200",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            inputClassName
          )}
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              inputRef.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        ) : loading && !fetched ? (
          <Loader2
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 animate-spin"
          />
        ) : null}
      </form>

      {showDropdown && (
        <div
          id="global-search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden"
        >
          {loading && !fetched ? (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Loading products...
            </div>
          ) : suggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No products match “{debouncedQuery || query.trim()}”
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {suggestions.map((product, index) => {
                const name = productDisplayName(product);
                const img = productImage(product);
                const category = product.categoryName || product.category;
                const isActive = index === activeIndex;

                return (
                  <li key={product.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                        isActive ? "bg-gray-100" : "hover:bg-gray-50"
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => goToProduct(product)}
                    >
                      <div className="h-10 w-10 shrink-0 rounded-md overflow-hidden bg-gray-100">
                        {img ? (
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-300">
                            <Search size={14} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {[category, product.price != null && `₹${product.price}`]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {query.trim() && (
            <button
              type="button"
              onClick={goToSearchPage}
              className="w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm font-medium text-primary hover:bg-gray-50"
            >
              View all results for “{query.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBox;
