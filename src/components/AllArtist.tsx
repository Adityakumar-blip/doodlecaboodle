import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Artist data - could be fetched from an API in a real application
const artists = [
  {
    id: 1,
    name: "Sophia Nguyen",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Contemporary Aesthetic",
    location: "San Francisco, CA",
    artworks: 24,
    featured: true,
    category: "Paintings",
  },
  {
    id: 2,
    name: "Marcus Bennett",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Abstract Expressionism",
    location: "New York, NY",
    artworks: 18,
    featured: true,
    category: "Mixed Media",
  },
  {
    id: 3,
    name: "Amara Wilson",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Minimalism",
    location: "Portland, OR",
    artworks: 31,
    featured: true,
    category: "Sculptures",
  },
  {
    id: 4,
    name: "Daniel Lee",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Digital Art",
    location: "Austin, TX",
    artworks: 15,
    featured: false,
    category: "Digital Art",
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Photography",
    location: "Miami, FL",
    artworks: 42,
    featured: false,
    category: "Photography",
  },
  {
    id: 6,
    name: "James Wilson",
    photoUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Street Art",
    location: "Chicago, IL",
    artworks: 27,
    featured: false,
    category: "Paintings",
  },
  {
    id: 7,
    name: "Zara Ahmed",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Sculpture",
    location: "Seattle, WA",
    artworks: 19,
    featured: false,
    category: "Sculptures",
  },
  {
    id: 8,
    name: "Thomas Chen",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Conceptual Art",
    location: "Boston, MA",
    artworks: 23,
    featured: false,
    category: "Mixed Media",
  },
];

// Categories for filter
const categories = [
  "All",
  "Paintings",
  "Photography",
  "Sculptures",
  "Prints",
  "Drawings",
  "Digital Art",
  "Mixed Media",
];

const AllArtists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 6;

  // Filter artists based on search term and category
  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.artStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || artist.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="pt-28 md:pt-40 pb-24">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Artists
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of talented artists from around the
            world, each bringing their unique perspective and style to our
            gallery.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Search Bar */}
          <div className="relative w-full md:w-72 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search artists..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-auto">
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 cursor-pointer group">
              <span className="pr-10">Filter by: {selectedCategory}</span>
              <ChevronDown size={16} className="text-gray-500" />

              {/* Dropdown Menu */}
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-100 rounded-md shadow-lg z-10 hidden group-hover:block">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="px-4 py-2 hover:bg-pastel-pink/10 cursor-pointer text-left"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:rounded-3xl transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-pastel-pink/10">
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {artist.featured && (
                  <div className="absolute top-4 right-4 bg-pastel-pink text-black text-xs uppercase tracking-wider py-1 px-2 rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <Button className="w-full bg-white text-gray-900 hover:bg-white/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 group">
                      View Profile
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-poppins font-bold text-xl text-gray-900">
                    {artist.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        artist.category === "Paintings"
                          ? "bg-pastel-blue"
                          : artist.category === "Photography"
                          ? "bg-pastel-green"
                          : artist.category === "Sculptures"
                          ? "bg-pastel-yellow"
                          : artist.category === "Prints"
                          ? "bg-pastel-peach"
                          : artist.category === "Drawings"
                          ? "bg-pastel-purple"
                          : artist.category === "Digital Art"
                          ? "bg-pastel-pink"
                          : "bg-pastel-blue"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-500">
                      {artist.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{artist.artStyle}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{artist.location}</span>
                  <span>{artist.artworks} Artworks</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => paginate(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AllArtists;
