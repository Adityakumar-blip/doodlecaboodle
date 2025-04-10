import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtworkBrowse from "./components/ArtworkBrowse";
import Navbar from "./components/Navbar";
import AllArtists from "./components/AllArtist";
import Artist from "./pages/Artist";
import ArtistDetail from "./components/ArtistDetail";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Navbar />
      <div className="mt-14">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artwork-browse" element={<ArtworkBrowse />} />
            <Route path="/all-artists" element={<AllArtists />} />
            <Route path="/creators" element={<Artist />} />
            <Route path="/about" element={<About />} />
            <Route path="/artists/:id" element={<ArtistDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
