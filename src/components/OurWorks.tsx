import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import WorkCard from "./Ourworkcard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase/firebaseconfig";

interface WorkItem {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
  displayOrder?: number;
  [key: string]: any; // for any other extra fields
}

const OurWorks: React.FC = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const displayLimit = 8;

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const worksData: WorkItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WorkItem[];

        // Sort by displayOrder, fallback to a large number for undefined orders
        const sortedWorks = worksData.sort((a, b) => {
          const orderA = a.displayOrder ?? 999999;
          const orderB = b.displayOrder ?? 999999;
          return orderA - orderB;
        });

        setWorks(sortedWorks);
      } catch (err: any) {
        console.error("Error fetching works:", err);
        setError("Failed to load artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-black text-3xl font-bold text-center mb-8">
          Explore Our Works
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-600">Loading artworks...</div>
        )}

        {/* Error */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* No Data */}
        {!loading && !error && works.length === 0 && (
          <div className="text-center text-gray-600">No artworks found.</div>
        )}

        {/* Grid Display */}
        {!loading && !error && works.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {works.slice(0, displayLimit).map((work) => (
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
        )}

        {/* Load More */}
        {!loading && !error && works.length > displayLimit && (
          <div className="mt-12 text-center">
            <Button
              className="bg-transparent border border-gray-300 text-gray-700 hover:bg-blue-100 px-8 py-3 rounded-md transition-colors duration-300"
              onClick={() => navigate("/artwork-browse")}
            >
              Load More Artworks
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurWorks;
