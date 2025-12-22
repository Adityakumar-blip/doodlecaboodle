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
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "./store/store";
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
import { fetchConfigurations } from "./store/slices/ConfigurationSlice";
import BestSellers from "./pages/BestSellers";

const queryClient = new QueryClient();

// WhatsApp Button Component
const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+917985315979";
    const message = "Hello! I would like to know more about your products..";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="
        fixed bottom-6 right-6 
        bg-accent hover:bg-accent 
        text-primary hover:text-primary 
        rounded-full shadow-lg 
        z-50 
        w-[60px] h-[60px] 
        flex items-center justify-center
        border-2 border-primary
        transition-all duration-300
        hover:scale-110
      "
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </button>
  );
};

/* COMMENTED OUT - Scroll to Top Button
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
        bg-accent hover:bg-accent 
        text-black hover:text-primary 
        rounded-full shadow-lg 
        z-50 
        w-[60px] h-[60px] 
        flex items-center justify-center
        border-2 border-primary
      "
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M7 14l5-5 5 5"
        />
        <circle cx="6" cy="18" r="0.5" fill="currentColor" />
        <circle cx="18" cy="18" r="0.5" fill="currentColor" />
        <circle cx="12" cy="6" r="0.5" fill="currentColor" />
      </svg>
    </button>
  );
};
*/

function ScrollToTop() {
  const pathName = useLocation();

  // This effect runs whenever the path name changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathName]);

  return null;
}

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const hideNavbarAndFooter = location.pathname === "/login";

  useEffect(() => {
    dispatch(fetchConfigurations());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Sonner />
      {!hideNavbarAndFooter && <Navbar />}
      <div className={`${!hideNavbarAndFooter ? "mt-14" : ""}`}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/portraits" element={<ArtworkBrowse />} />
          <Route
            path="/:categoryName"
            element={<NavDetailBrowse />}
          />
          <Route path="/product-detail/:productName" element={<ArtworkDetailPage />} />
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
          <Route path="/best-sellers" element={<BestSellers />} />

          {/* <Route path="/occasions/:id" element={<OccasionDetail />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavbarAndFooter && <Footer />}
      {!hideNavbarAndFooter && <WhatsAppButton />}
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
