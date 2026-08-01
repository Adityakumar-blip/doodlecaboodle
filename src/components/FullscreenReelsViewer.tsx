import React, { useEffect, useRef, useState } from "react";
import { X, Volume2, VolumeX, Heart, Share2, ShoppingBag, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
}

interface FullscreenReelsViewerProps {
  reels: Reel[];
  initialIndex: number;
  onClose: () => void;
}

// Single Reel Slide Component
const FullscreenReelSlide: React.FC<{
  reel: Reel;
  isActive: boolean;
  globalMuted: boolean;
  toggleMute: () => void;
  onClose: () => void;
}> = ({ reel, isActive, globalMuted, toggleMute, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const navigate = useNavigate();

  // Load random seed count for likes
  useEffect(() => {
    setLikesCount(Math.floor(Math.random() * 200) + 45);
  }, []);

  // Handle play/pause based on active slide state
  useEffect(() => {
    const handlePlayState = async () => {
      if (!videoRef.current) return;
      if (isActive) {
        try {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = globalMuted;
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error("Autoplay prevented:", err);
          setIsPlaying(false);
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setProgress(0);
      }
    };

    handlePlayState();
  }, [isActive]);

  // Sync global volume state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = globalMuted;
    }
  }, [globalMuted]);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Double tap to like
  let lastTap = 0;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      handleLike();
    }
    lastTap = now;
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 800);
    } else {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/?reel=${reel.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied! Share it with your friends. 🔗");
  };

  const handleShopNow = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    onClose(); // Close fullscreen modal
    if (product.id.startsWith("default-")) {
      toast.info(`Mock Navigation: Redirecting to default product ${product.name}`);
      return;
    }
    const productSlug = product.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || product.id;
    navigate(`/product/${productSlug}`, { state: { id: product.id } });
  };

  return (
    <div
      onClick={handleDoubleTap}
      className="w-full h-full relative flex items-center justify-center bg-zinc-950"
    >
      {/* Background/Blurred Video for filler on wide monitors */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 hidden md:block">
        <video
          src={reel.videoUrl}
          className="w-full h-full object-cover"
          muted
          loop
          autoPlay
        />
      </div>

      {/* Video Content */}
      <div className="relative w-full h-full max-w-[480px] bg-black flex items-center justify-center shadow-2xl overflow-hidden">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="w-full h-full object-contain cursor-pointer z-0"
          loop
          playsInline
          onClick={handleTogglePlay}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Video Duration Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            className="h-full bg-red-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top Controls: Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-black/60 transition-colors shadow-md z-30"
          aria-label="Close viewer"
        >
          <X size={20} />
        </button>

        {/* Play/Pause state splash overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none cursor-pointer"
            onClick={handleTogglePlay}
          >
            <div className="p-5 bg-black/55 rounded-full text-white/80 animate-ping">
              <ShoppingBag size={36} />
            </div>
          </div>
        )}

        {/* Huge Heart Double Tap Animation */}
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <Heart
              size={120}
              className="text-red-500 fill-red-500 drop-shadow-2xl animate-bounce scale-110 opacity-90 transition-transform"
            />
          </div>
        )}

        {/* Side Icons Floating Panel (Right side) */}
        <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
          {/* Like / Heart Action */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleLike}
              className="p-3 bg-black/45 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/60 transition-all shadow-md group active:scale-95"
            >
              <Heart
                size={22}
                className={`transition-all duration-300 group-hover:scale-115 ${
                  isLiked ? "text-red-500 fill-red-500" : "text-white"
                }`}
              />
            </button>
            <span className="text-[10px] text-white font-bold mt-1.5 drop-shadow-md">
              {likesCount}
            </span>
          </div>

          {/* Volume Mute/Unmute Action */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleMute}
              className="p-3 bg-black/45 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/60 transition-all shadow-md active:scale-95"
            >
              {globalMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
            <span className="text-[10px] text-white font-bold mt-1.5 drop-shadow-md">
              Sound
            </span>
          </div>

          {/* Share Action */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleShare}
              className="p-3 bg-black/45 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/60 transition-all shadow-md active:scale-95"
            >
              <Share2 size={22} />
            </button>
            <span className="text-[10px] text-white font-bold mt-1.5 drop-shadow-md">
              Share
            </span>
          </div>
        </div>

        {/* Details Card (Bottom overlay) */}
        <div className="absolute bottom-4 left-4 right-16 z-20 flex flex-col gap-3">
          {/* Reel Caption */}
          <div className="text-white drop-shadow-md">
            <h3 className="text-sm font-black tracking-wide uppercase">
              @{reel.title || "doodlecaboodle"}
            </h3>
            <p className="text-xs font-medium text-zinc-150 leading-relaxed mt-1 line-clamp-2">
              {reel.caption}
            </p>
          </div>

          {/* Product link badge - Swiping mini-carousel for multiple items */}
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
                  onClick={(e) => handleShopNow(e, product)}
                  className="bg-white/10 backdrop-blur-lg border border-white/15 p-2.5 rounded-2xl flex items-center justify-between shadow-lg hover:bg-white/18 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center min-w-0 flex-1 mr-2">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100"}
                      alt={product.name}
                      className="w-10 h-10 rounded-xl object-cover shadow-sm bg-gray-900 border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0 ml-2.5">
                      <h4 className="text-xs font-black text-white truncate max-w-[120px]">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-green-300 font-extrabold mt-0.5">₹{product.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleShopNow(e, product)}
                    className="px-3.5 py-1.5 bg-white text-zinc-950 font-bold text-[10px] tracking-wider uppercase rounded-xl hover:bg-zinc-100 transition-colors shadow-sm flex-shrink-0"
                  >
                    Shop Now
                  </button>
                </div>
              );
            }

            // Multiple products - horizontal swipe list
            return (
              <div className="w-full">
                <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {productList.map((product, index) => (
                    <div
                      key={product.id || index}
                      onClick={(e) => handleShopNow(e, product)}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 p-2 rounded-xl flex items-center justify-between shadow-lg hover:bg-black/55 transition-all duration-300 cursor-pointer snap-start snap-always w-[185px] shrink-0"
                    >
                      <div className="flex items-center min-w-0 flex-1 mr-1.5">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=60"}
                          alt={product.name}
                          className="w-8 h-8 rounded-lg object-cover shadow-sm bg-gray-900 border border-white/10 flex-shrink-0"
                        />
                        <div className="min-w-0 ml-2">
                          <h4 className="text-[10px] font-bold text-white truncate max-w-[75px]">
                            {product.name}
                          </h4>
                          <p className="text-[9px] text-green-300 font-extrabold mt-0.5">₹{product.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleShopNow(e, product)}
                        className="px-2 py-1 bg-white text-zinc-950 font-bold text-[8px] tracking-wider uppercase rounded-lg hover:bg-zinc-100 transition-colors shrink-0"
                      >
                        Shop
                      </button>
                    </div>
                  ))}
                </div>
                <div className="text-[8px] text-white/50 text-right mt-1 font-semibold tracking-wider uppercase px-1">
                  Swipe left to view more products ➔
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

// Main Modal Container
const FullscreenReelsViewer: React.FC<FullscreenReelsViewerProps> = ({
  reels,
  initialIndex,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [globalMuted, setGlobalMuted] = useState(true);

  // Sync global volume state with localstorage
  useEffect(() => {
    const cachedMute = localStorage.getItem("reels_muted");
    if (cachedMute !== null) {
      setGlobalMuted(cachedMute === "true");
    }
  }, []);

  const toggleMute = () => {
    const newMute = !globalMuted;
    setGlobalMuted(newMute);
    localStorage.setItem("reels_muted", String(newMute));
  };

  // Scroll to the selected reel on initial load
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const height = container.clientHeight;
      container.scrollTo({ top: initialIndex * height, behavior: "auto" });
      setActiveIndex(initialIndex);
    }
  }, [initialIndex, reels]);

  // Handle scroll snap to detect the active video index
  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeIndex && index >= 0 && index < reels.length) {
        setActiveIndex(index);
      }
    }
  };

  // Quick arrow keys support for desktop scrolling
  const handleScrollTo = (direction: "up" | "down") => {
    if (containerRef.current) {
      const container = containerRef.current;
      const height = container.clientHeight;
      const offset = direction === "up" ? -height : height;
      container.scrollBy({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex justify-center items-center select-none overflow-hidden animate-fade-in">
      {/* Desktop side scroll cues */}
      <div className="absolute left-8 hidden lg:flex flex-col gap-4 text-white/50 z-30">
        <button
          onClick={() => handleScrollTo("up")}
          disabled={activeIndex === 0}
          className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900 transition-colors shadow-lg"
          aria-label="Previous reel"
        >
          <ArrowUp size={20} />
        </button>
        <button
          onClick={() => handleScrollTo("down")}
          disabled={activeIndex === reels.length - 1}
          className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900 transition-colors shadow-lg"
          aria-label="Next reel"
        >
          <ArrowDown size={20} />
        </button>
      </div>

      {/* Snap Scrollable Slide Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reels.map((reel, index) => (
          <div key={reel.id} className="w-full h-full snap-start snap-always flex-shrink-0">
            <FullscreenReelSlide
              reel={reel}
              isActive={index === activeIndex}
              globalMuted={globalMuted}
              toggleMute={toggleMute}
              onClose={onClose}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenReelsViewer;
