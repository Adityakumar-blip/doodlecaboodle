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
import logo from "@/assets/LOGO.svg";
import { useNavigate } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import { fetchMenus } from "@/store/slices/MenuSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { categories: categoryData } = useSelector(
    (state: RootState) => state.categories
  );
  const { menus } = useSelector((state: RootState) => state.menus);
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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

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
    dispatch(fetchMenus());
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

  const handleCategoryClick = (category: any) => {
    setIsOpen(false); // Close mobile menu
    if (category?.name === "Portrait") {
      navigate("/portraits");
    } else {
      navigate(`/${category?.name?.toLowerCase().replace(/\s+/g, "-")}`, { state: { id: category?.id } });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div
          className={cn(
            "w-full transition-all duration-300 bg-primary text-primary-foreground flex items-center relative z-20 h-16",
            scrolled ? "shadow-md" : ""
          )}
        >
          <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 block"
            >
              {/* <img
                src={logo}
                className="w-10 md:w-12 h-10 md:h-12"
                alt="doodlecaboodle"
              /> */}
              <div className="w-12 md:w-14 lg:w-16">
                <img
                  src={logo}
                  alt="doodlecaboodle"
                  className="w-full h-auto"
                />
              </div>
            </a>
          </div>

          {/* <div className="flex-1 hidden md:block max-w-md mx-4">
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
          </div> */}

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button className="text-primary-foreground hidden md:block hover:text-pastel-pink transition-colors">
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
              <ShoppingBag size={18} className="text-white" />
              <span className="absolute text-primary font-semibold -top-1 -right-1 bg-accent text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>

            <div className="menu-dropdown-container hidden md:block relative">
              <button
                className="text-gray-700 hover:text-pastel-pink transition-colors"
                onClick={toggleMenuDropdown}
                aria-label="Menu options"
              >
                <MoreVertical size={20} className="text-primary-foreground" />
              </button>

              {isMenuDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-primary-foreground shadow-lg rounded-md z-50">
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
                      href="/best-sellers"
                      className="block px-4 py-2 text-gray-700 hover:text-pastel-pink hover:bg-pastel-pink/10"
                    >
                      Best Sellers
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
                          className="block w-full text-left px-4 py-2 text-primary font-medium hover:bg-primary/10"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLoginClick}
                          className="block w-full text-left px-4 py-2 text-primary font-medium hover:bg-primary/10"
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
              className="ml-2 text-white focus:outline-none md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm !bg-white shadow-2xl z-50 bg-primary-foreground transition-transform duration-300 ease-in-out overflow-y-auto", // Added overflow-y-auto for scrolling
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <a href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  className="w-10 h-10 invert"
                  alt="doodlecaboodle"
                />
                <span className="text-xl mt-1 font-playfair font-bold text-gray-900">
                  Doodle Caboodle
                </span>
              </div>
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

            {/* Categories Section in Mobile */}
            {menus.length > 0 && (
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <div className="space-y-1">
                  {/* Filter root level menus */}
                  {menus
                    .filter((m) => !m.parentId)
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((menu) => (
                      <div key={menu.id} className="space-y-1">
                        <button
                          onClick={() => {
                            const hasChildren = menus.some(m => m.parentId === menu.id);
                            if (hasChildren) {
                              setExpandedMenus(prev => ({
                                ...prev,
                                [menu.id]: !prev[menu.id]
                              }));
                            } else {
                              navigate(`/${menu.slug.replace(/\s+/g, "-")}`, { state: { id: menu.id, isMenu: true } });
                              setIsOpen(false);
                            }
                          }}
                          className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-800 hover:text-primary transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-gray-50"
                        >
                          {menu.name}
                          {menus.some((m) => m.parentId === menu.id) && (
                            <ChevronDown 
                              size={18} 
                              className={cn(
                                "text-gray-400 transition-transform duration-300",
                                expandedMenus[menu.id] && "rotate-180"
                              )} 
                            />
                          )}
                        </button>
                        
                        {/* Mobile Sub-menus (Collapsible) */}
                        <div className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          expandedMenus[menu.id] ? "max-h-[1000px] opacity-100 mb-2" : "max-h-0 opacity-0"
                        )}>
                          {menus
                            .filter((m) => m.parentId === menu.id)
                            .sort((a, b) => a.displayOrder - b.displayOrder)
                            .map((child) => (
                              <div key={child.id} className="ml-4 border-l-2 border-gray-50">
                                <button
                                  onClick={() => {
                                    const hasGrandChildren = menus.some(m => m.parentId === child.id);
                                    if (hasGrandChildren) {
                                      setExpandedMenus(prev => ({
                                        ...prev,
                                        [child.id]: !prev[child.id]
                                      }));
                                    } else {
                                      navigate(`/${child.slug.replace(/\s+/g, "-")}`, { state: { id: child.id, isMenu: true } });
                                      setIsOpen(false);
                                    }
                                  }}
                                  className="flex items-center justify-between w-full text-left text-base font-medium text-gray-600 hover:text-primary transition-colors duration-200 py-2.5 pl-4 pr-2"
                                >
                                  {child.name}
                                  {menus.some((m) => m.parentId === child.id) && (
                                    <ChevronDown 
                                      size={16} 
                                      className={cn(
                                        "text-gray-400 transition-transform duration-300",
                                        expandedMenus[child.id] && "rotate-180"
                                      )} 
                                    />
                                  )}
                                </button>
                                
                                {/* Level 3 (Collapsible) */}
                                <div className={cn(
                                  "overflow-hidden transition-all duration-300 ease-in-out",
                                  expandedMenus[child.id] ? "max-h-[500px] opacity-100 pb-2" : "max-h-0 opacity-0"
                                )}>
                                  {menus
                                    .filter((m) => m.parentId === child.id)
                                    .sort((a, b) => a.displayOrder - b.displayOrder)
                                    .map((grandChild) => (
                                      <button
                                        key={grandChild.id}
                                        onClick={() => {
                                          navigate(`/${grandChild.slug.replace(/\s+/g, "-")}`, { state: { id: grandChild.id, isMenu: true } });
                                          setIsOpen(false);
                                        }}
                                        className="block w-full text-left text-sm font-medium text-gray-400 hover:text-primary transition-colors duration-200 py-1.5 pl-8 pr-2"
                                      >
                                        {grandChild.name}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <a
              href="/best-sellers"
              className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
            >
              Best Sellers
            </a>
            <a
              href="/about"
              className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
            >
              About
            </a>
            <a
              href="/photo-guideline"
              className="text-lg font-medium text-gray-900 hover:text-pastel-pink transition-colors duration-200"
            >
              Photo Guidelines
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

        {menus.length > 0 && (
          <div className="relative z-10">
            <CategoryBar />
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

      <style>{`
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
