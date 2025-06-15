import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  MapPin,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./Cart";

import logo from "@/assets/logomark1.svg";
import logo2 from "@/assets/doodle.png";
import { useUser } from "@/context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/CategorySlice";
import { AppDispatch, RootState } from "@/store/store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories: categoryData } = useSelector(
    (state: RootState) => state.categories
  );
  const { user, isAuthenticated, logout, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [pincode, setPincode] = useState<string>("");
  const [userLocation, setUserLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, []);

  console.log("category data", categoryData);

  // Add user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on your auth logic
  const [loginButtonHovered, setLoginButtonHovered] = useState(false);

  const [cartItems, setCartItems] = useState([
    // Example items - remove these or make empty array for truly empty cart
    {
      id: 1,
      name: "Abstract Harmony",
      artist: "Jane Doe",
      price: 1999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1729974354505-edb5855eb876?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVybmFsJTIwaGFybW9ueXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Sunset Dreams",
      artist: "John Smith",
      price: 2599,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1620221730414-5e976c63c2da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1bnNldCUyMGRyZWFtc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ]);

  // Category data structure with subcategories
  const categories = [
    {
      name: "Paintings",
      color: "bg-pastel-blue",
      subcategories: [
        "Abstract",
        "Landscape",
        "Portrait",
        "Still Life",
        "Modern",
        "Contemporary",
      ],
    },
    {
      name: "Photography",
      color: "bg-pastel-green",
      subcategories: [
        "Black & White",
        "Nature",
        "Street",
        "Portrait",
        "Documentary",
        "Conceptual",
      ],
    },
    {
      name: "Sculptures",
      color: "bg-pastel-yellow",
      subcategories: [
        "Bronze",
        "Marble",
        "Clay",
        "Wood",
        "Metal",
        "Mixed Materials",
      ],
    },
    {
      name: "Prints",
      color: "bg-pastel-peach",
      subcategories: [
        "Limited Edition",
        "Open Edition",
        "Screen Prints",
        "Linocuts",
        "Etchings",
        "Digital Prints",
      ],
    },
    {
      name: "Drawings",
      color: "bg-pastel-purple",
      subcategories: [
        "Pencil",
        "Charcoal",
        "Ink",
        "Pastel",
        "Colored Pencil",
        "Crayon",
      ],
    },
    {
      name: "Digital Art",
      color: "bg-pastel-pink",
      subcategories: [
        "2D Digital",
        "3D Renders",
        "Digital Painting",
        "AI Generated",
        "Pixel Art",
        "Vector Art",
      ],
    },
    {
      name: "Mixed Media",
      color: "bg-pastel-blue",
      subcategories: [
        "Collage",
        "Assemblage",
        "Textile Art",
        "Paper Art",
        "Found Objects",
        "Installation",
      ],
    },
    {
      name: "Collage",
      color: "bg-pastel-green",
      subcategories: [
        "Paper",
        "Digital",
        "Photo",
        "Fabric",
        "3D Collage",
        "Mixed Materials",
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close dropdown menu when clicking outside
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

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to toggle menu dropdown
  const toggleMenuDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuDropdownOpen(!isMenuDropdownOpen);
    // Close other open menus if any
    if (!isMenuDropdownOpen) {
      setIsOpen(false);
    }
  };

  // Function to toggle location modal
  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  // Function to handle pincode submission
  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate the pincode
    if (pincode.trim().length === 6) {
      setUserLocation(pincode);
      setIsLocationModalOpen(false);
    } else {
      // Handle invalid pincode
      alert("Please enter a valid 6-digit pincode");
    }
  };

  // Function to handle login click
  const handleLoginClick = () => {
    // Navigate to login page or open login modal
    window.location.href = "/login"; // or your login route
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
            : "bg-white py-4 "
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl md:text-3xl font-playfair font-bold text-gray-900"
            >
              {/* Doodle<span className="text-pastel-pink">Caboodle</span> */}
              <img src={logo} className="w-10 h-10" alt="doodlecaboodle" />
            </a>
          </div>

          <div>
            <img src={logo2} className="w-20 h-30" alt="doodlecaboodle" />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pastel-pink transition-colors">
              <Search size={20} />
            </button>
            <button
              className="text-black hover:text-pastel-pink transition-colors relative"
              onClick={toggleLocationModal}
              aria-label="Set location"
            >
              <MapPin size={20} />
              {userLocation && (
                <span className="absolute -top-1 -right-1 bg-pastel-blue text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  ✓
                </span>
              )}
            </button>

            {/* User Icon or Login Button */}
            {isAuthenticated ? (
              <button className="text-gray-700 hover:text-pastel-pink transition-colors">
                <a href="/profile">
                  <User size={20} />
                </a>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={handleLoginClick}
                  onMouseEnter={() => setLoginButtonHovered(true)}
                  onMouseLeave={() => setLoginButtonHovered(false)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform",
                    "bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue",
                    "text-white shadow-lg hover:shadow-xl",
                    "hover:scale-105 active:scale-95",
                    "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-pastel-pink before:via-pastel-purple before:to-pastel-blue",
                    "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20",
                    loginButtonHovered ? "animate-pulse" : ""
                  )}
                >
                  <span className="relative text-black z-10 flex items-center gap-1">
                    <Sparkles
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        loginButtonHovered ? "rotate-12 scale-110" : ""
                      )}
                    />
                    Login
                    <span
                      className={cn(
                        "inline-block transition-transform duration-300",
                        loginButtonHovered ? "translate-x-1" : ""
                      )}
                    >
                      ✨
                    </span>
                  </span>

                  {/* Floating particles effect */}
                  {loginButtonHovered && (
                    <>
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></span>
                      <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping opacity-75 animation-delay-150"></span>
                      <span className="absolute top-0 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-75 animation-delay-300"></span>
                    </>
                  )}
                </button>

                {/* Tooltip */}
                {loginButtonHovered && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap animate-fade-in">
                    Join our art community!
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                  </div>
                )}
              </div>
            )}

            <button
              className="text-black hover:text-pastel-pink transition-colors relative"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>

            {/* Three Dot Menu - Both desktop and mobile */}
            <div className="menu-dropdown-container relative">
              <button
                className="text-gray-700 hover:text-pastel-pink transition-colors"
                onClick={toggleMenuDropdown}
                aria-label="Menu options"
              >
                <MoreVertical size={20} />
              </button>

              {/* Menu Dropdown */}
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
                      href="/artists"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      Artists
                    </a>
                    <a
                      href="/about"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      About
                    </a>
                    {!isAuthenticated && (
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

            {/* Mobile Menu Button - Now only visible on very small screens */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 text-gray-700 focus:outline-none md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } bg-white py-4 px-4 shadow-md`}
        >
          <nav className="flex flex-col space-y-4">
            {/* Mobile Login Button */}
            {!isAuthenticated && (
              <div className="pb-4 border-b border-gray-100">
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    Login to Explore Art ✨
                  </span>
                </button>
              </div>
            )}

            <div className="relative py-2">
              <button className="flex items-center text-black hover:text-pastel-pink transition-colors font-medium">
                Shop by Category <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                {categoryData.map((category, index) => (
                  <div key={index} className="py-1">
                    <a
                      href="#"
                      className="block text-black hover:text-pastel-pink transition-colors"
                    >
                      {category.name}
                    </a>
                    {/* <div className="pl-4 mt-1 space-y-1">
                      {category.subcategories.map((subcat, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block text-gray-600 text-sm hover:text-pastel-pink transition-colors py-1"
                        >
                          {subcat}
                        </a>
                      ))}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Category Navigation Menu - Desktop */}
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
                  {/* <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <div className="mb-2">
                      <span
                        className={`inline-block h-3 w-3 rounded-full ${category.color} mr-2`}
                      ></span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcat, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href="#"
                            className="block text-black hover:text-pastel-pink hover:bg-pastel-pink/10 rounded px-2 py-1 transition-colors"
                          >
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Location Modal */}
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

      {/* Add required CSS for animations */}
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
