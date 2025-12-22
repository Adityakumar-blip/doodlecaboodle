import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";

interface SectionCategory {
  id: string;
  title?: string;
  label?: string;
  image?: string;
  bgColor?: string;
  [key: string]: any;
}

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<SectionCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const col = collection(db, "productCategories");
        const q = query(col, where("isSection", "==", true));
        const snap = await getDocs(q);
        const items: SectionCategory[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as object),
        })) as SectionCategory[];

        // Provide reasonable defaults for UI fields
        const normalized = items.map((it, idx) => ({
          title: it.title || it.name || `Section ${idx + 1}`,
          label: it.label || it.title || it.name || "",
          image:
            it.image ||
            it.bannerUrl ||
            it.bannerImage ||
            "https://via.placeholder.com/800?text=Section",
          bgColor: it.bgColor || "bg-gray-800",
          ...it,
        }));

        setCategories(normalized);
      } catch (err: any) {
        console.error("Error fetching section categories:", err);
        setError(err?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionCategories();
  }, []);

  return (
    <div className="w-full py-16 px-4">
      <div className="container px-4 mx-auto">
        {/* Two Column Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">
            Loading sections...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ maxHeight: "700px" }}
                onClick={() => navigate(`/${category?.name?.toLowerCase()}`, { state: { id: category?.id } })}
              >
                {/* Background Color Overlay */}
                <div className={`${category.bgColor} absolute inset-0`} />

                {/* Image Container */}
                <div className="relative h-full flex items-center justify-center ">
                  <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-auto object-contain  drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Label at Bottom */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-orange-100 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2">
                    <span
                      className="text-gray-800 font-semibold 
      text-xs sm:text-sm md:text-base lg:text-lg 
      uppercase tracking-wider"
                    >
                      {category.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
