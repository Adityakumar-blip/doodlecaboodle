import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Sample artist data
const artists = [
  {
    id: 1,
    name: "Sophia Nguyen",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Abstract Expressionism",
    location: "San Francisco, CA",
    artworks: 24,
  },
  {
    id: 2,
    name: "Marcus Bennett",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Contemporary Realism",
    location: "New York, NY",
    artworks: 18,
  },
  {
    id: 3,
    name: "Amara Wilson",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    artStyle: "Digital Mixed Media",
    location: "Portland, OR",
    artworks: 31,
  },
];

const FeaturedArtists = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pastel-blue/10 to-pastel-purple/10">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Meet Our Featured Artists</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-2xl  overflow-hidden transition-transform  "
            >
              <div className="p-6 text-center">
                <div className="w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-pastel-pink">
                  <img
                    src={artist.photoUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-playfair font-bold text-xl mb-1">
                  {artist.name}
                </h3>
                <p className="text-gray-600 mb-2">{artist.artStyle}</p>
                <p className="text-gray-500 text-sm mb-4">{artist.location}</p>
                <div className="bg-pastel-green/30 text-gray-700 text-sm rounded-full px-3 py-1 inline-block">
                  {artist.artworks} Artworks
                </div>
              </div>
              <div className="bg-gradient-to-r from-pastel-pink to-pastel-purple p-4 text-center">
                <a
                  href="#"
                  className="text-gray-800 font-medium hover:underline flex items-center justify-center"
                >
                  View Artist Profile
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-pastel-purple hover:bg-pastel-blue text-gray-800 px-8 py-6">
            Explore All Artists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
