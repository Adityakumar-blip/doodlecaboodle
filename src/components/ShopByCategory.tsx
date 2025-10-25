import React, { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";

interface CategoryItem {
  id: string;
  name: string;
  image?: string;
  badge?: string | null;
  [key: string]: any;
}

const ShopByCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoriesRef = collection(db, "productCategories");
        const snap = await getDocs(categoriesRef);
        const items: CategoryItem[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as object),
        })) as CategoryItem[];

        const filtered = items.filter((it) => it.isSection !== true);

        // Map to include an image fallback if none provided
        const normalized = filtered.map((it) => ({
          ...it,
          image:
            it.image ||
            it.bannerUrl ||
            it.bannerImage ||
            "https://via.placeholder.com/600?text=Category",
        }));
        setCategories(normalized);
      } catch (err: any) {
        console.error("Error fetching productCategories:", err);
        setError(err?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: any) => {
    if (category?.name === "Portrait") {
      navigate("/artwork-browse");
    } else {
      navigate(`/${category?.name}/${category?.id}`);
    }
  };

  return (
    <div className="w-full py-16 px-4 bg-white">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our curated collections
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group cursor-pointer overflow-hidden aspect-square bg-gray-100 rounded-lg"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white font-bold text-xl md:text-2xl text-center px-4">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
