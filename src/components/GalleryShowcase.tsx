import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GalleryShowcase = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Trending Artworks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Large Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/5] group">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
              alt="Abstract Art Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl md:text-3xl font-playfair font-semibold mb-2">
                Abstract Art
              </h3>
              <p className="text-white/90 mb-4 max-w-md">
                Explore our curated collection of abstract masterpieces from
                emerging artists.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit"
              >
                View Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Two Smaller Images */}
          <div className="flex flex-col gap-8">
            <div className="relative rounded-xl overflow-hidden  group">
              <img
                src="https://images.unsplash.com/photo-1560850038-f95de6e715b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
                alt="Landscape Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl md:text-2xl font-playfair font-semibold mb-2">
                  Landscapes
                </h3>
                <p className="text-white/90 mb-4">
                  Breathtaking landscape paintings from around the world.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit"
                >
                  Explore
                </Button>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[16/9] group">
              <img
                src="https://images.unsplash.com/photo-1688589011024-d749a432c2d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhbmRzY2FwZSUyMGFydHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Portrait Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl md:text-2xl font-playfair font-semibold mb-2">
                  Portraits
                </h3>
                <p className="text-white/90 mb-4">
                  Captivating portraits that tell a thousand stories.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black w-fit"
                >
                  Discover
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;
