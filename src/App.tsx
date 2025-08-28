import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtworkBrowse from "./components/ArtworkBrowse";
import Navbar from "./components/Navbar";
import AllArtists from "./components/AllArtist";
import Artist from "./pages/Artist";
import ArtistDetail from "./components/ArtistDetail";
import About from "./pages/About";
import ArtworkDetailPage from "./components/ArtworkDetailPage";
import Footer from "./components/Footer";
import CollectionDetail from "./components/CollectionDetail";
import Profile from "./pages/UserProfile";
import OccasionDetail from "./components/OccasionDetail";
import LoginSignupPage from "./pages/LoginSingupPage";
import UserProvider from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./store/store";
import WorkDetail from "./components/WorkDetail";
import { CartProvider } from "./context/CartContext";
import CustomSketchOrder from "./components/CustomSketchOrder";
import FAQPage from "./components/Faq";
import { Pencil } from "lucide-react";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsService";
import GalleryShowcase from "./components/GalleryShowcase";
import TermsAndConditions from "./components/TermsConditions";
import ShippingAndRefundPolicy from "./components/ShippingRefund";
import PhotoGuidelines from "./components/Photoguide";
import OrderDetails from "./components/OrderDetail";
import NavDetailBrowse from "./components/NavDetailBrowse";

const queryClient = new QueryClient();

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 
        bg-white hover:bg-black 
        text-black hover:text-white 
        rounded-full shadow-lg 
        z-50 
        w-[60px] h-[60px] 
        flex items-center justify-center
        border-2 border-black
      "
    >
      {/* Simple Doodly Up Arrow */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Hand-drawn style up arrow */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M7 14l5-5 5 5"
        />
        {/* Little doodle dots */}
        <circle cx="6" cy="18" r="0.5" fill="currentColor" />
        <circle cx="18" cy="18" r="0.5" fill="currentColor" />
        <circle cx="12" cy="6" r="0.5" fill="currentColor" />
      </svg>
    </button>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/login";

  return (
    <>
      <Toaster />
      <Sonner />
      {!hideNavbarAndFooter && <Navbar />}
      <div className={`${!hideNavbarAndFooter ? "mt-14" : ""}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/artwork-browse" element={<ArtworkBrowse />} />
          <Route
            path="/:categoryName/:categoryId"
            element={<NavDetailBrowse />}
          />
          <Route path="/product-detail/:id" element={<ArtworkDetailPage />} />
          <Route path="/work-detail/:id" element={<WorkDetail />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/collection" element={<GalleryShowcase />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/photo-guideline" element={<PhotoGuidelines />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/shipping-and-refund"
            element={<ShippingAndRefundPolicy />}
          />
          <Route path="/service-terms" element={<TermsOfService />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/get-yours" element={<CustomSketchOrder />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />

          <Route path="/occasions/:id" element={<OccasionDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavbarAndFooter && <Footer />}
      {!hideNavbarAndFooter && <BackToTopButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <UserProvider>
        <CartProvider>
          <TooltipProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </UserProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
