import React from "react";
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

const Index = () => {
  // const carouselItems: CarouselItem[] = [
  //   {
  //     type: "video",
  //     src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/b7e7be80f60543bf9adf14277970d2c9/b7e7be80f60543bf9adf14277970d2c9.HD-1080p-2.5Mbps-35679579.mp4?v=0",
  //     thumbnail:
  //       "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/b7e7be80f60543bf9adf14277970d2c9.thumbnail.0000000000_600x.jpg?v=1727814424",
  //   },
  //   {
  //     type: "video",
  //     src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/6751f232383a4c6ea139f990e7ef7f8a/6751f232383a4c6ea139f990e7ef7f8a.HD-1080p-2.5Mbps-35679580.mp4?v=0",
  //     thumbnail:
  //       "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/6751f232383a4c6ea139f990e7ef7f8a.thumbnail.0000000000_600x.jpg?v=1727814418",
  //   },
  //   {
  //     type: "video",
  //     src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/aef9dcf97db24259809db789affa87a3/aef9dcf97db24259809db789affa87a3.HD-1080p-2.5Mbps-35679578.mp4?v=0",
  //     thumbnail:
  //       "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/aef9dcf97db24259809db789affa87a3.thumbnail.0000000000_600x.jpg?v=1727814418",
  //   },
  //   {
  //     type: "video",
  //     src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/0306f3a88dec4702ae1f0231b5bdbac2/0306f3a88dec4702ae1f0231b5bdbac2.HD-1080p-2.5Mbps-35704677.mp4?v=0",
  //     thumbnail:
  //       "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/0306f3a88dec4702ae1f0231b5bdbac2.thumbnail.0000000000_600x.jpg?v=1727861116",
  //   },
  //   {
  //     type: "video",
  //     src: "https://wonder-theme-fashion.myshopify.com/cdn/shop/videos/c/vp/14f26a880ac04dda9905e50192f7a443/14f26a880ac04dda9905e50192f7a443.HD-1080p-2.5Mbps-35679576.mp4?v=0",
  //     thumbnail:
  //       "https://wonder-theme-fashion.myshopify.com/cdn/shop/files/preview_images/14f26a880ac04dda9905e50192f7a443.thumbnail.0000000000_600x.jpg?v=1727814418",
  //   },

  // ];
  return (
    <div className="min-h-screen">
      <HeroSection />

      <GalleryShowcase />
      <QuoteSection />

      <ArtworkGrid />

      <ArtCategorySection />

      <FeaturedArtistCarousel />

      <TestimonialsSection />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-pastel-pink to-pastel-purple">
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
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
