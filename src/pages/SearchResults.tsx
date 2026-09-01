import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts, Product } from "@/store/slices/ProductSlice";
import WorkCard from "@/components/Ourworkcard";
import GlobalSearchBox from "@/components/GlobalSearchBox";

function matchesQuery(product: Product, query: string): boolean {
  const q = query.toLowerCase();
  return [
    product.name,
    product.title,
    product.artistName,
    product.categoryName,
    product.category,
  ].some((f) => f?.toLowerCase().includes(q));
}

const SearchResults: React.FC = () => {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, fetched, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const results = useMemo(() => {
    if (!query) return [];
    return products.filter((p) => matchesQuery(p, query));
  }, [products, query]);

  return (
    <div className="min-h-[60vh] bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-['Jost']">
            Search
          </h1>
          <GlobalSearchBox
            placeholder="Search products by name..."
            inputClassName="!bg-gray-50 !text-gray-900 !placeholder:text-gray-400 !border-gray-200 focus:!bg-white"
          />
        </div>

        {!query ? (
          <div className="text-center py-16 text-gray-500">
            <Search className="mx-auto mb-3 text-gray-300" size={36} />
            <p>Type a product name to start searching.</p>
          </div>
        ) : loading && !fetched ? (
          <div className="text-center py-16 text-gray-500">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm md:text-base text-gray-600">
                {results.length} result{results.length === 1 ? "" : "s"} for{" "}
                <span className="font-semibold text-gray-900">“{query}”</span>
              </p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm text-primary hover:underline"
              >
                Back to home
              </button>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-gray-600">
                  No products found matching “{query}”.
                </p>
                <Link
                  to="/best-sellers"
                  className="inline-block text-sm font-medium text-primary hover:underline"
                >
                  Browse best sellers
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((product) => (
                  <WorkCard
                    key={product.id}
                    id={product.id}
                    imageUrl={
                      product.images?.[0]?.url || product.imageUrl || ""
                    }
                    title={product.name || product.title}
                    artistName={product.artistName}
                    price={product.price}
                    category={product.categoryName || product.category}
                    props={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
