import React from "react";
import { ArrowRight, CircleDollarSign, IndianRupee } from "lucide-react";

const ArtCategorySection = () => {
  // jost font
  const categories = [
    {
      title: "Abstract",
      description: "Bold expressions through color & form",
      imageUrl:
        "https://images.unsplash.com/photo-1518713661966-8ce9a2e78bbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWJzdHJhY3QlMjBwYWl0aW5nfGVufDB8fDB8fHww",
      color: "bg-indigo-100",
    },
    {
      title: "Landscapes",
      description: "Serene vistas of natural beauty",
      imageUrl:
        "https://images.unsplash.com/photo-1711315506502-6c6d343384f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxhbmRzY2FwZXMlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      color: "bg-emerald-100",
    },
    {
      title: "Portraits",
      description: "Captivating human expressions",
      imageUrl:
        "https://images.unsplash.com/photo-1535579710123-3c0f261c474e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXRzfGVufDB8fDB8fHww",
      color: "bg-amber-100",
    },
    {
      title: "Digital Art",
      description: "Modern creativity meets technology",
      imageUrl:
        "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlnaXRhbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
      color: "bg-rose-100",
    },
  ];

  const occasions = [
    { title: "Housewarming", color: "bg-blue-100", icon: "🏠" },
    { title: "Wedding Gifts", color: "bg-pink-100", icon: "💍" },
    { title: "Birthday", color: "bg-purple-100", icon: "🎂" },
    { title: "Office Decor", color: "bg-green-100", icon: "💼" },
  ];

  const priceRanges = [
    {
      range: "Under ₹2000",
      description: "Budget-friendly artwork",
      color: "bg-orange-100",
      dots: 1,
    },
    {
      range: "₹2000-₹5000",
      description: "Mid-range treasures",
      color: "bg-red-100",
      dots: 2,
    },
    {
      range: "₹5000-₹10,000",
      description: "Premium selections",
      color: "bg-yellow-100",
      dots: 3,
    },
    {
      range: "₹10,000+",
      description: "Luxury statement pieces",
      color: "bg-indigo-100",
      dots: 4,
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-poppins font-bold mb-4">
          Art for Everyone
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover pieces that speak to your soul - from vibrant abstracts to
          soothing landscapes. Art that transforms spaces and touches hearts.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium mb-6">Explore by Style</h3>
          <p className="text-md text-gray-600 hover:underline hover:cursor-pointer">
            Explore more{" "}
            <span className=" text-blue-500 font-semibold">styles</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <div
                className={`${category.color} absolute inset-0 opacity-80`}
              ></div>
              <div className="aspect-[5/6] relative">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                  <p className="text-sm text-white/80">
                    {category.description}
                  </p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      {/* <div className="mb-16">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium mb-6">Shop by Price</h3>
          <p className="text-md text-gray-600 hover:underline hover:cursor-pointer">
            View all{" "}
            <span className="text-blue-500 font-semibold">price points</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceRanges.map((price, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-102 "
            >
              <div
                className={`bg-gradient-to-r ${price.color} p-6 h-full flex flex-col justify-between text-black`}
              >
                <div>
                  <h4 className="text-xl font-semibold mb-1 font-poppins">
                    {price.range}
                  </h4>
                  <p className="text-sm text-black/90 mb-4">
                    {price.description}
                  </p>
                </div>
                <div className="flex items-center mt-4 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Discover <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Occasions Section */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium mb-6">Shop by Occasion</h3>
          <p className="text-md text-gray-600 hover:underline hover:cursor-pointer">
            Explore more{" "}
            <span className=" text-blue-500 font-semibold">occasions</span>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((occasion, index) => (
            <div
              key={index}
              className={`${occasion.color} rounded-xl p-6 hover:shadow-md transition-all text-center group cursor-pointer`}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {occasion.icon}
              </div>
              <h4 className="font-medium text-lg">{occasion.title}</h4>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all">
                <span className="text-sm font-medium inline-flex items-center">
                  Browse <ArrowRight size={14} className="ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtCategorySection;
