import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

const queryClient = new QueryClient();

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
          <Route path="/product-detail/:id" element={<ArtworkDetailPage />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/occasions/:id" element={<OccasionDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <UserProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
