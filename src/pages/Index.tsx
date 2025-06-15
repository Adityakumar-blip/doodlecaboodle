import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ArtworkGrid from "../components/ArtworkGrid";
import FeaturedArtists from "../components/FeaturedArtists";
import Footer from "../components/Footer";
import QuoteSection from "../components/QuoteSection";
import GalleryShowcase from "../components/GalleryShowcase";
import TestimonialsSection from "../components/TestimonialsSection";
import ArtCategorySection from "@/components/ArtCategory";
import FeaturedArtistCarousel from "@/components/FeaturedArtistCarousel";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";

const Index = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch collections from Firestore
  useEffect(() => {
    const collectionsRef = collection(db, "collections");

    // Real-time listener for collections
    const unsubscribe = onSnapshot(
      collectionsRef,
      (snapshot) => {
        const fetchedProducts: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any;
        setCollections(fetchedProducts);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching collections:", error);
        setIsLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="min-h-screen">
      <HeroSection />

      <GalleryShowcase />
      <QuoteSection />

      <ArtworkGrid />

      <ArtCategorySection collections={collections} />

      <FeaturedArtistCarousel />

      {/* <TestimonialsSection /> */}

      {/* Newsletter Section */}
      {/* <section className="py-16 bg-gradient-to-r from-pastel-pink to-pastel-purple">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair font-bold text-3xl mb-4">
              Are You an Artist Looking to Showcase Your Work?
            </h2>

            <p className="text-gray-700 mb-8">
              Join our community of talented artists. Create your own store,
              showcase your artwork, and connect with art lovers around the
              world.
            </p>

            <button className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
              Join as an Artist
            </button>
          </div>
        </div>
      </section> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
