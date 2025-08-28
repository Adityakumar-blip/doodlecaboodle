// import React, { useState } from "react";
// import ArtworkCard from "./ArtworkCard";
// import { Button } from "@/components/ui/button";
// import { Filter } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // Sample artwork data
// const artworkData = [
//   {
//     id: 1,
//     imageUrl:
//       "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//     title: "Abstract Harmony",
//     artistName: "Emily Chen",
//     price: "$1,200",
//     category: "Painting",
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://images.unsplash.com/photo-1599757266893-b78cbe70ffb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29hc3RhbCUyMGRyZWFtcyUyMHBhaXRpbmd8ZW58MHx8MHx8fDA%3D",
//     title: "Coastal Dreams",
//     artistName: "Michael Rivera",
//     price: "$950",
//     category: "Painting",
//   },
//   {
//     id: 3,
//     imageUrl:
//       "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//     title: "Midnight City",
//     artistName: "Sarah Johnson",
//     price: "$1,450",
//     category: "Photography",
//   },
//   {
//     id: 4,
//     imageUrl:
//       "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//     title: "Serenity in Blue",
//     artistName: "David Wong",
//     price: "$2,200",
//     category: "Painting",
//   },
//   {
//     id: 5,
//     imageUrl:
//       "https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//     title: "Geometric Perspectives",
//     artistName: "Olivia Taylor",
//     price: "$1,800",
//     category: "Digital",
//   },
//   {
//     id: 6,
//     imageUrl:
//       "https://images.unsplash.com/photo-1531766235322-0d318d0b216c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvbGRlbiUyMGhvdXJ8ZW58MHx8MHx8fDA%3D",
//     title: "Golden Hour",
//     artistName: "James Peterson",
//     price: "$1,350",
//     category: "Photography",
//   },
//   {
//     id: 7,
//     imageUrl:
//       "https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//     title: "Urban Solitude",
//     artistName: "Emma Martinez",
//     price: "$980",
//     category: "Photography",
//   },
//   {
//     id: 8,
//     imageUrl:
//       "https://images.unsplash.com/photo-1594744357601-a77e1a4d02be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZsb3JhJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
//     title: "Abstract Flora",
//     artistName: "Daniel Kim",
//     price: "$1,550",
//     category: "Painting",
//   },
// ];

// const categories = [
//   "All",
//   "Painting",
//   "Photography",
//   "Digital",
//   "Sculpture",
//   "Mixed Media",
// ];

// const ArtworkGrid = () => {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredArtworks =
//     activeCategory === "All"
//       ? artworkData
//       : artworkData.filter((artwork) => artwork.category === activeCategory);

//   return (
//     <section className="py-16 bg-white ">
//       <div className="container mx-auto px-4">
//         <h2 className="section-title text-black">Explore Our Collection</h2>

//         {/* Category Filter */}
//         {/* <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm transition-all ${
//                     activeCategory === category
//                       ? "bg-pastel-pink text-gray-800"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//             <div className="md:hidden">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center"
//               >
//                 <Filter size={16} className="mr-2" />
//                 Filter
//               </Button>
//             </div>
//             <div className="text-sm text-gray-600">
//               Showing {filteredArtworks.length} results
//             </div>
//           </div> */}

//         {/* Mobile filters */}
//         {/* {showFilters && (
//             <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-4">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
//                     activeCategory === category
//                       ? "bg-pastel-pink text-gray-800"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           )} */}
//         {/* </div> */}

//         {/* Artwork Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredArtworks.map((artwork) => (
//             <ArtworkCard
//               id={artwork.id}
//               key={artwork.id}
//               imageUrl={artwork.imageUrl}
//               title={artwork.title}
//               artistName={artwork.artistName}
//               price={artwork.price}
//               category={artwork.category}
//             />
//           ))}
//         </div>

//         {/* Load More Button */}
//         <div className="mt-12 text-center">
//           <Button
//             className="bg-transparent border border-gray-300 text-gray-700 hover:bg-pastel-blue px-8 py-6"
//             onClick={() => navigate("/artwork-browse")}
//           >
//             Load More Artworks
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArtworkGrid;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store"; // Adjust path to your Redux store
import { fetchProducts } from "@/store/slices/ProductSlice"; // Adjust path to productSlice
import { fetchCategories } from "@/store/slices/CategorySlice";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArtworkGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state: RootState) => state.products);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const displayLimit = 8;

  // Fetch products and categories on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Combine "All" with dynamic categories from Firestore
  const allCategories = [
    "All",
    ...categories
      .filter((item) => item?.name !== "Portrait")
      .map((cat) => cat.name),
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product: any) => product.categoryName === activeCategory
        );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-black">Explore Our Collection</h2>

        {/* Loading State */}
        {(productsLoading || categoriesLoading) && (
          <div className="text-center text-gray-600">Loading artworks...</div>
        )}

        {/* Error State */}
        {(productsError || categoriesError) && (
          <div className="text-center text-red-500">
            {productsError || categoriesError || "An error occurred"}
          </div>
        )}

        {/* Category Filter */}
        {!productsLoading &&
          !categoriesLoading &&
          !productsError &&
          !categoriesError && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2">
                  {allCategories.length >= 2 &&
                    allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          activeCategory === category
                            ? "bg-pastel-pink text-gray-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                </div>
                <div className="md:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center"
                  >
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {filteredProducts.length} results
                </div>
              </div>

              {/* Mobile filters */}
              {showFilters && (
                <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-4">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                        activeCategory === category
                          ? "bg-pastel-pink text-gray-800"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        {/* Product Grid */}
        {!productsLoading &&
          !productsError &&
          filteredProducts.length === 0 && (
            <div className="text-center text-gray-600">
              No artworks found for this category.
            </div>
          )}
        {!productsLoading && !productsError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ArtworkCard
                id={product.id}
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                artistName={product.artistName}
                price={product.price}
                category={product.category}
                props={product}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > displayLimit && (
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

export default ArtworkGrid;
