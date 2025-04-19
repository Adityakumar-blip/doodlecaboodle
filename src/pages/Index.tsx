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

      {/* Features Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pastel-blue rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                </svg>
              </div>
              <h3 className="font-playfair font-bold text-xl mb-2">
                Original Artwork
              </h3>
              <p className="text-gray-600">
                Every piece in our collection is an original creation,
                handcrafted by our talented artists.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pastel-pink rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="font-playfair font-bold text-xl mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Shop with confidence using our secure payment options, with
                buyer protection on every purchase.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pastel-green rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <h3 className="font-playfair font-bold text-xl mb-2">
                Worldwide Shipping
              </h3>
              <p className="text-gray-600">
                We carefully package and ship your artwork to anywhere in the
                world, with tracking provided.
              </p>
            </div>
          </div>
        </div>
      </section> */}

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

      <Footer />
    </div>
  );
};

export default Index;
