import React, { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";

interface CategoryItem {
  id: string;
  name: string;
  image?: string;
  badge?: string | null;
  displayOrder?: number | string;
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

        const filtered = items.filter(
          (it) => it.isSection !== true && it.isActive
        );

        // Map to include an image fallback if none provided
        const normalized = filtered.map((it) => ({
          ...it,
          image:
            it.image ||
            it.imageUrl ||
            it.bannerImage ||
            "https://via.placeholder.com/600?text=Category",
        }));

        // Sort by numeric displayOrder (ascending). Items with missing or
        // non-numeric displayOrder will be placed at the end.
        const sorted = normalized.slice().sort((a, b) => {
          const aVal = Number(a.displayOrder ?? Number.MAX_SAFE_INTEGER);
          const bVal = Number(b.displayOrder ?? Number.MAX_SAFE_INTEGER);
          const aNum = Number.isFinite(aVal) ? aVal : Number.MAX_SAFE_INTEGER;
          const bNum = Number.isFinite(bVal) ? bVal : Number.MAX_SAFE_INTEGER;
          return aNum - bNum;
        });

        setCategories(sorted);
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
      navigate("/portraits", { state: { id: category?.id } });
    } else {
      navigate(`/${category?.name.toLowerCase().replace(/\s+/g, "-")}`, { state: { id: category?.id } });
    }
  };

  return (
    <div className="w-full py-16 px-4 bg-primary-foreground">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-3 font-['Jost']">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-xl font-['Jost']">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col group cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="relative overflow-hidden aspect-square bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Desktop Hover Overlay */}
                  <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                    <h2 className="text-white font-bold text-2xl text-center px-4 tracking-wide font-['Jost']">
                      {category.name}
                    </h2>
                  </div>
                </div>

                {/* Mobile Category Name */}
                <div className="mt-3 text-center md:hidden">
                  <h3 className="text-gray-900 font-bold text-base font-['Jost']">
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
