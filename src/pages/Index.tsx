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
import ProductReviewSection from "../components/ProductReviewCarousel";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import OurWorks from "@/components/OurWorks";
import FAQPage from "@/components/Faq";
import DiscountModal from "@/components/DiscountModal";

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
      <DiscountModal />
      <HeroSection />

      {/* <GalleryShowcase /> */}
      <QuoteSection />

      <ArtworkGrid />

      {/* <OurWorks /> */}

      {/* <ArtCategorySection collections={collections} /> */}

      {/* <FeaturedArtistCarousel /> */}

      {/* <TestimonialsSection /> */}
      <ProductReviewSection/>

      <FAQPage />
    </div>
  );
};

export default Index;
