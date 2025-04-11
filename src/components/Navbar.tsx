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
  EllipsisVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [pincode, setPincode] = useState<string>("");
  const [userLocation, setUserLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");
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

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to toggle location modal
  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  // Function to handle pincode submission
  const handlePincodeSubmit = (e) => {
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

  // useEffect(() => {
  //   const getCurrentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setCoordinates({ lat: latitude, lng: longitude });
  //           // fetchLocationDetails(latitude, longitude);
  //         },
  //         (err) => {
  //           setError(`Error getting location: ${err.message}`);
  //         }
  //       );
  //     } else {
  //       setError("Geolocation is not supported by this browser.");
  //     }
  //   };
  //   getCurrentLocation();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLocationModalOpen(true);
    }, 5000);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#101014]/90 backdrop-blur-md shadow-sm py-2"
            : "bg-[#101014] py-4 "
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl md:text-3xl font-playfair font-bold text-gray-900"
            >
              Doodle<span className="text-pastel-pink">Caboodle</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-white hover:text-pastel-pink transition-colors font-medium"
            >
              Home
            </a>

            <a
              href="/creators"
              className="text-white hover:text-pastel-pink transition-colors font-medium"
            >
              Artists
            </a>
            <a
              href="/about"
              className="text-white hover:text-pastel-pink transition-colors font-medium"
            >
              About
            </a>
          </nav> */}

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-pastel-pink transition-colors">
              <Search size={20} />
            </button>
            <button
              className="text-white hover:text-pastel-pink transition-colors relative"
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
            <button className="text-white hover:text-pastel-pink transition-colors">
              <User size={20} />
            </button>
            <button
              className="text-white hover:text-pastel-pink transition-colors relative"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
            <button className="text-white">
              <EllipsisVertical size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white hover:text-pastel-pink transition-colors relative mr-4"
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
            <button
              className="text-white hover:text-pastel-pink transition-colors relative mr-4"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
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
            <a
              href="#"
              className="text-white hover:text-pastel-pink transition-colors font-medium py-2"
            >
              Home
            </a>
            <div className="relative py-2">
              <button className="flex items-center text-white hover:text-pastel-pink transition-colors font-medium">
                Shop by Category <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="py-1">
                    <a
                      href="#"
                      className="block text-white hover:text-pastel-pink transition-colors"
                    >
                      {category.name}
                    </a>
                    <div className="pl-4 mt-1 space-y-1">
                      {category.subcategories.map((subcat, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block text-gray-600 text-sm hover:text-pastel-pink transition-colors py-1"
                        >
                          {subcat}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="#"
              className="text-white hover:text-pastel-pink transition-colors font-medium py-2"
            >
              Artists
            </a>
            <a
              href="#"
              className="text-white hover:text-pastel-pink transition-colors font-medium py-2"
            >
              About
            </a>
            <div className="flex space-x-4 pt-2">
              <button className="text-white hover:text-pastel-pink transition-colors">
                <Search size={20} />
              </button>
              <button className="text-white hover:text-pastel-pink transition-colors">
                <User size={20} />
              </button>
            </div>
          </nav>
        </div>

        {/* Category Navigation Menu - Desktop */}
        <div className="hidden md:block container pl-0 pt-4">
          <div className="flex ">
            {categories.map((category, index) => (
              <div key={index} className="relative group px-4">
                <div className="flex items-center gap-2">
                  <button className="text-white hover:text-pastel-pink py-2 transition-colors font-medium">
                    {category.name}
                  </button>
                  <ChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180"
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <div className="mb-2">
                      <span
                        className={`inline-block h-3 w-3 rounded-full ${category.color} mr-2`}
                      ></span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ul className="space-y-2 ">
                      {category.subcategories.map((subcat, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href="#"
                            className="block text-white hover:text-pastel-pink hover:bg-pastel-pink/10 rounded px-2 py-1 transition-colors"
                          >
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                  className="block text-sm font-medium text-white mb-1"
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
    </>
  );
};

export default Navbar;
