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
import BestsellerCarousel from "@/components/BestsellerCarousel";
import CategorySection from "@/components/CategorySection";
import ShopByCategory from "@/components/ShopByCategory";
import CustomInfo from "@/components/CustomInfo";
import BGDoodle from "@/assets/Bottom BULK Design.png";

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
    <div className="min-h-screen flex flex-col">
      <DiscountModal />
      <HeroSection />

      {/* <GalleryShowcase /> */}
      <QuoteSection />

      <BestsellerCarousel />

      <CategorySection />

      <ShopByCategory />

      {/* <ArtworkGrid /> */}

      {/* <OurWorks /> */}

      {/* <ArtCategorySection collections={collections} /> */}

      {/* <FeaturedArtistCarousel /> */}

      {/* <TestimonialsSection /> */}

      {/* Divider Image Section */}
      <div className="w-full bg-gray-50 pb-8 md:pb-12">
        <div className="px-4 md:px-6 lg:px-8">
          <img
            src={BGDoodle}
            alt="Doodle Art Showcase"
            className="w-full max-w-full md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[89vw] mx-auto rounded-2xl shadow-lg object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[750px]"
          />
        </div>
      </div>

      <ProductReviewSection />

      {/* <CustomInfo /> */}

      <FAQPage />
    </div>
  );
};

export default Index;
