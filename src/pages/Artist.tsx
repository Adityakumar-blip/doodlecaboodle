// src/pages/Artist.tsx
import ArtistCard from "@/components/ArtistCard";
import { dummyArtists } from "@/data/dummyArtist";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Artist: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [filteredArtists, setFilteredArtists] = useState(dummyArtists);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique art types from artists
  const artTypes = [
    "all",
    ...Array.from(new Set(dummyArtists.map((artist) => artist.artType))),
  ];

  // Filter artists based on selected filter and search term
  useEffect(() => {
    let result = dummyArtists;

    // Filter by art type
    if (selectedFilter !== "all") {
      result = result.filter((artist) => artist.artType === selectedFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (artist) =>
          artist.name.toLowerCase().includes(term) ||
          artist.services.some((service) =>
            service.toLowerCase().includes(term)
          )
      );
    }

    setFilteredArtists(result);
  }, [selectedFilter, searchTerm]);

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Find Your Creative Partner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with exceptional artists across various disciplines and
              bring your creative vision to life
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by name, expertise, or style..."
                className="w-full px-6 py-4 rounded-full border-none shadow-lg focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-6 h-6 absolute right-5 top-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-6 ">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="font-medium text-gray-500">
              <span className="text-indigo-600 font-bold">
                {filteredArtists.length}
              </span>{" "}
              artists available
            </p>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
          </div>

          <div
            className={`md:flex gap-2 justify-end ${
              isFilterOpen
                ? "block absolute top-full left-0 right-0 bg-white p-4 shadow-md"
                : "hidden"
            } md:static md:bg-transparent md:shadow-none md:p-0`}
          >
            {artTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedFilter(type);
                  setIsFilterOpen(false);
                }}
                className={`px-4 py-2 rounded-full transition-all text-sm ${
                  selectedFilter === type
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "all"
                  ? "All Artists"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-10 ">
        {filteredArtists.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={`/artists/${artist.id}`} className="block h-full">
                  <ArtistCard artist={artist} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg mx-auto">
              <svg
                className="w-20 h-20 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No artists found
              </h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any artists matching your criteria.
              </p>
              <button
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
                onClick={() => {
                  setSelectedFilter("all");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Artist;
