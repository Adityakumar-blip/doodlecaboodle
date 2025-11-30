// components/RelatedProducts.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: { url: string; type?: string }[];
  artistName?: string;
  categoryName?: string;
  // ...add what you render
};

function chunk<T>(arr: T[], size = 10): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function RelatedProducts({ ids }: { ids: string[] }) {
  const [items, setItems] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  // const isEmptyArtist = items?.artistName.toLowerCase().includes("none")
  //   ? true
  //   : false;

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const chunks = chunk(ids.filter(Boolean), 10);
        const results: Product[] = [];
        for (const group of chunks) {
          if (group.length === 0) continue;
          const q = query(
            collection(db, "products"),
            where(documentId(), "in", group)
          );
          const snap = await getDocs(q);
          snap.forEach((d) =>
            results.push({ id: d.id, ...(d.data() as any) } as Product)
          );
        }
        if (mounted) setItems(results);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [ids]);

  if (!ids?.length) return null;

  return (
    <div className="mt-12">
      <h2 className="font-playfair text-2xl font-medium mb-6">
        Related Products
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No related products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((p) => {
            const cover = p.images?.[0]?.url;
            return (
              <button
                key={p.id}
                className="text-left"
                onClick={() =>
                  navigate(`/product-detail/${p.id}`, { state: p })
                }
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden border">
                  {cover ? (
                    <img
                      src={cover}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 truncate">
                    {/* {p.artistName?.toLocaleLowerCase().includes("none")
                      ? ""
                      : p.artistName} */}
                  </p>
                  <p className="font-medium truncate">{p.name}</p>
                  <p className="text-sm text-gray-700">
                    ₹{Number(p.price).toLocaleString()}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
