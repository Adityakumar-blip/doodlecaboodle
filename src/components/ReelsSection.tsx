import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, Share2, Play, Pause, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import FullscreenReelsViewer from "./FullscreenReelsViewer";
import { useNavigate } from "react-router-dom";

// Standard high-quality fallback reels
const DEFAULT_REELS = [
  {
    id: "default-1",
    title: "Take a Break",
    caption: "Drink coffee in style with your customized doodle mug. ☕✨",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-coffee-cup-with-a-drawing-of-a-heart-in-the-foam-42316-large.mp4",
    productName: "Name Impressions Mug",
    productPrice: 249,
    productId: "default-mug",
    productImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300",
    products: [{
      id: "default-mug",
      name: "Name Impressions Mug",
      price: 249,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300"
    }]
  },
  {
    id: "default-2",
    title: "Handmade Love Note",
    caption: "Perfect gift boxes with red bows for that special someone. 🎁🌹",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gift-box-with-a-red-bow-on-a-wooden-table-42220-large.mp4",
    productName: "Personalised Grace Bouquet",
    productPrice: 1199,
    productId: "default-bouquet",
    productImage: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300",
    products: [{
      id: "default-bouquet",
      name: "Personalised Grace Bouquet",
      price: 1199,
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=300"
    }]
  },
  {
    id: "default-3",
    title: "Unboxing Magic",
    caption: "Surprise your loved ones with customized hand-drawn memories.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-gift-wrapped-in-red-paper-42222-large.mp4",
    productName: "Nuyug Solitaire Pendant",
    productPrice: 1849,
    productId: "default-pendant",
    productImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300",
    products: [{
      id: "default-pendant",
      name: "Nuyug Solitaire Pendant",
      price: 1849,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300"
    }]
  },
  {
    id: "default-4",
    title: "Rose Gold Bouquet",
    caption: "A classic arrangement of fresh, romantic red roses. 🌹",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-bouquet-of-red-roses-42217-large.mp4",
    productName: "Enchanted Rose Arrangement",
    productPrice: 1049,
    productId: "default-roses",
    productImage: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=300",
    products: [{
      id: "default-roses",
      name: "Enchanted Rose Arrangement",
      price: 1049,
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=300"
    }]
  },
  {
    id: "default-5",
    title: "Personalized Morning",
    caption: "Start your day with customized quotes and high-quality mugs. ☀️",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-personalized-mug-with-a-heart-42313-large.mp4",
    productName: "House of Orchids",
    productPrice: 2899,
    productId: "default-orchids",
    productImage: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=300",
    products: [{
      id: "default-orchids",
      name: "House of Orchids",
      price: 2899,
      image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=300"
    }]
  }
];

interface Reel {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  productId: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  displayOrder?: number;
}

// Single Reel Card Component
const ReelCard: React.FC<{
  reel: Reel;
  globalMuted: boolean;
  toggleGlobalMute: () => void;
  onOpenFullscreen: () => void;
}> = ({ reel, globalMuted, toggleGlobalMute, onOpenFullscreen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = globalMuted;
    }
  }, [globalMuted]);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (videoRef.current) {
      try {
        videoRef.current.muted = globalMuted;
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Autoplay prevented:", err);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?reel=${reel.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard! 🔗");
  };

  const handleProductClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (product.id.startsWith("default-")) {
      toast.info(`Mock Navigation: Navigating to default product ${product.name}`);
      return;
    }
    const productSlug = product.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || product.id;
    navigate(`/product/${productSlug}`, { state: { id: product.id } });
  };

  return (
    <div
      className="group relative aspect-[9/16] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-zinc-950 border border-zinc-200/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenFullscreen}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300"
        loop
        playsInline
        muted={globalMuted}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 opacity-80 z-10" />

      {/* Video controls header (floating top bar) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Fullscreen Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenFullscreen();
          }}
          className="p-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
          title="Fullscreen"
        >
          <Maximize2 size={15} />
        </button>

        {/* Action icons right (mute & share) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleGlobalMute();
            }}
            className="p-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
          >
            {globalMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/60 transition-colors shadow-sm"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* Play/Pause Button center overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleTogglePlay}
          className="p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/35 transition-transform duration-300 hover:scale-110 shadow-lg"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>

      {/* Title overlay in top left */}
      <div className="absolute top-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-xs uppercase tracking-widest text-white/95 font-semibold drop-shadow-md">
          {reel.title || "Story"}
        </span>
      </div>

      {/* Product badge card at the bottom */}
      {(() => {
        const productList = reel.products || (reel.productId ? [{
          id: reel.productId,
          name: reel.productName || "",
          price: reel.productPrice || 0,
          image: reel.productImage || ""
        }] : []);
        
        if (productList.length === 0) return null;

        if (productList.length === 1) {
          const product = productList[0];
          return (
            <div
              onClick={(e) => handleProductClick(e, product)}
              className="absolute bottom-3 left-3 right-3 bg-white/70 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl flex items-center justify-between shadow-lg hover:bg-white/85 transition-all duration-300 z-20"
            >
              <div className="flex items-center min-w-0 flex-1">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100"}
                  alt={product.name}
                  className="w-10 h-10 rounded-xl object-cover shadow-sm bg-gray-100 flex-shrink-0"
                />
                <div className="min-w-0 ml-2.5 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 truncate max-w-[100px] sm:max-w-[120px]">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-gray-700 font-bold mt-0.5">₹{product.price}</p>
                </div>
              </div>
              <div className="p-1.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors shadow-sm ml-2 shrink-0">
                <ShoppingBag size={13} />
              </div>
            </div>
          );
        }

        // Multiple products linked - horizontal swiping capsules list
        return (
          <div
            className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar w-[calc(100%-24px)] z-20 pb-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {productList.map((product, idx) => (
              <div
                key={product.id || idx}
                onClick={(e) => handleProductClick(e, product)}
                className="flex-shrink-0 snap-start snap-always w-[85%] bg-white/75 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex items-center justify-between shadow-lg hover:bg-white/90 transition-all duration-300"
              >
                <div className="flex items-center min-w-0 flex-1">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100"}
                    alt={product.name}
                    className="w-9 h-9 rounded-xl object-cover shadow-sm bg-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0 ml-2.5 flex-1">
                    <h4 className="text-[10px] font-bold text-gray-900 truncate max-w-[80px] sm:max-w-[100px]">
                      {product.name}
                    </h4>
                    <p className="text-[9px] text-gray-700 font-bold mt-0.5">₹{product.price}</p>
                  </div>
                </div>
                <div className="p-1 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors shadow-sm ml-2 shrink-0">
                  <ShoppingBag size={11} />
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
};

// Main Carousel Reels Component
const ReelsSection: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [globalMuted, setGlobalMuted] = useState(true);
  const [activeViewerIndex, setActiveViewerIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync mute state with localstorage
  useEffect(() => {
    const cachedMute = localStorage.getItem("reels_muted");
    if (cachedMute !== null) {
      setGlobalMuted(cachedMute === "true");
    }
  }, []);

  const toggleGlobalMute = () => {
    const newMuted = !globalMuted;
    setGlobalMuted(newMuted);
    localStorage.setItem("reels_muted", String(newMuted));
  };

  // Fetch reels from Firestore with real-time updates
  useEffect(() => {
    const reelsRef = collection(db, "reels");
    const unsubscribe = onSnapshot(
      reelsRef,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Reel[];

        // Sort by display order
        const sorted = fetched.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

        // Use custom ones if Firestore is empty
        if (sorted.length > 0) {
          setReels(sorted);
        } else {
          setReels(DEFAULT_REELS);
        }
      },
      (error) => {
        console.error("Error fetching reels from Firestore:", error);
        setReels(DEFAULT_REELS);
      }
    );

    return () => unsubscribe();
  }, []);

  // Check URL query parameters for direct reel links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reelParam = params.get("reel");
    if (reelParam && reels.length > 0) {
      const matchIndex = reels.findIndex((r) => r.id === reelParam);
      if (matchIndex !== -1) {
        setActiveViewerIndex(matchIndex);
      }
    }
  }, [reels]);

  // Carousel scroll helpers
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth / 2.5; // Estimated card size + gap
      const offset = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-8 md:py-16 bg-zinc-50 border-y border-gray-200">
      <div className="max-w-[90vw] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-4 px-4 md:px-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-['Jost']">
              Joyful Gifting Stories
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 font-semibold tracking-widest mt-1 uppercase">
              Swipe and discover the art of gifting
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel / Card List */}
        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory flex gap-4 md:gap-6 no-scrollbar pb-6 px-4 md:px-8 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="w-[68vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] xl:w-[17.5vw] flex-shrink-0 snap-start"
            >
              <ReelCard
                reel={reel}
                globalMuted={globalMuted}
                toggleGlobalMute={toggleGlobalMute}
                onOpenFullscreen={() => setActiveViewerIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {activeViewerIndex !== null && (
        <FullscreenReelsViewer
          reels={reels}
          initialIndex={activeViewerIndex}
          onClose={() => setActiveViewerIndex(null)}
        />
      )}
    </div>
  );
};

export default ReelsSection;
