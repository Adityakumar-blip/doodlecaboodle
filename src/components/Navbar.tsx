import React, { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  ChevronDown,
  MapPin,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./Cart";
import { auth, db } from "@/firebase/firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/CategorySlice";
import { AppDispatch, RootState } from "@/store/store";
import { CartContext } from "@/context/CartContext";
import logo from "@/assets/logo-doodle.svg";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories: categoryData } = useSelector(
    (state: RootState) => state.categories
  );
  const { cartItems, isCartOpen, toggleCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [pincode, setPincode] = useState<string>("");
  const [userLocation, setUserLocation] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loginButtonHovered, setLoginButtonHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Firebase Authentication State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          const userData = {
            name: user.displayName || "",
            email: user.email || "",
            phone: "",
            address: {
              line1: "",
              city: "",
              state: "",
              pincode: "",
              country: "India",
            },
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await setDoc(userDocRef, userData);
          setUserData(userData);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Disable body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        isMenuDropdownOpen &&
        target &&
        !document.querySelector(".menu-dropdown-container")?.contains(target)
      ) {
        setIsMenuDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, [isMenuDropdownOpen]);

  const toggleMenuDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuDropdownOpen(!isMenuDropdownOpen);
    if (!isMenuDropdownOpen) {
      setIsOpen(false);
    }
  };

  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setUserLocation(pincode);
      setIsLocationModalOpen(false);
      if (isAuthenticated && auth.currentUser) {
        setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            address: {
              pincode: pincode.trim(),
              updatedAt: Date.now(),
            },
          },
          { merge: true }
        );
      }
    } else {
      alert("Please enter a valid 6-digit pincode");
    }
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuDropdownOpen(false);
      setIsOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white shadow-sm py-2" // Removed backdrop-blur-md to avoid transparency issues
            : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl md:text-3xl font-playfair font-bold text-gray-900"
            >
              <img
                src={logo}
                className="w-6 md:w-10 h-6 md:h-10"
                alt="doodlecaboodle"
              />
            </a>
          </div>

          <div className="flex-1 hidden md:block max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for art..."
                className={cn(
                  "w-full px-4 py-2 rounded-full border border-gray-300",
                  "focus:outline-none focus:ring-2 focus:ring-pastel-pink",
                  "bg-pastel-pink/10 text-gray-900 placeholder-gray-500",
                  "transition-all duration-300 hover:shadow-md"
                )}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 text-pastel-pink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button className="text-gray-700 hidden md:block hover:text-pastel-pink transition-colors">
                <a href="/profile">
                  <User size={20} />
                </a>
              </button>
            ) : (
              <p
                className="font-semibold cursor-pointer"
                onClick={handleLoginClick}
              >
                Login
              </p>
            )}

            <button
              className="text-black hover:text-pastel-pink transition-colors relative"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              <span className="absolute text-white -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>

            <div className="menu-dropdown-container hidden md:block relative">
              <button
                className="text-gray-700 hover:text-pastel-pink transition-colors"
                onClick={toggleMenuDropdown}
                aria-label="Menu options"
              >
                <MoreVertical size={20} />
              </button>

              {isMenuDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                  <div className="py-2">
                    <a
                      href="/"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      Home
                    </a>
                    <a
                      href="/about"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      About
                    </a>
                    <a
                      href="/photo-guideline"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      Photo Guidelines
                    </a>
                    {isAuthenticated ? (
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-pastel-pink font-medium hover:bg-pastel-pink/10"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLoginClick}
                          className="block w-full text-left px-4 py-2 text-pastel-pink font-medium hover:bg-pastel-pink/10"
                        >
                          Login / Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 text-gray-700 focus:outline-none md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm !bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out", // Added !bg-white to force opaque background
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ backgroundColor: "#ffffff" }} // Inline style as a fallback to ensure opacity
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} className="w-8 h-8" alt="doodlecaboodle" />
              <span className="text-xl font-playfair font-bold text-gray-900">
                DoodleCaboodle
              </span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-pastel-pink"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="/"
              className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
            >
              About
            </a>
            {isAuthenticated && (
              <a
                href="/profile"
                className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
              >
                Profile
              </a>
            )}
            <div className="pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-black border py-3 px-4 rounded-lg font-medium"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Logout
                  </span>
                </button>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="w-full py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Login / Sign Up ✨
                  </span>
                </Button>
              )}
            </div>
          </nav>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {categoryData.length > 1 && (
          <div className="hidden md:block container pl-0 pt-4">
            <div className="flex">
              {categoryData?.map((category, index) => (
                <div key={index} className="relative group px-4">
                  <div className="flex items-center gap-2">
                    <button className="text-black hover:text-pastel-pink py-2 transition-colors font-medium">
                      {category.name}
                    </button>
                    <ChevronDown
                      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => toggleCart()} />

      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsLocationModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 shadow-xl z-10 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Set Your Location</h3>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePincodeSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Enter your pincode for delivery information
                </label>
                <input
                  type="text"
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit pincode"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                  maxLength={6}
                />
              </div>

              {userLocation && (
                <p className="text-sm text-gray-600 mb-4">
                  Current location: {userLocation}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  variant="outline"
                  className="border-gray-300 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
                >
                  Save Location
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
};

export default Navbar;
