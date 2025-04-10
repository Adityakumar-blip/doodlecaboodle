import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-4"
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
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium"
          >
            Home
          </a>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-gray-700 hover:text-pastel-pink">
                  Shop by Category
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-blue"></span>
                      <span>Paintings</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-green"></span>
                      <span>Photography</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-yellow"></span>
                      <span>Sculptures</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-peach"></span>
                      <span>Prints</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-purple"></span>
                      <span>Drawings</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-pink"></span>
                      <span>Digital Art</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-blue"></span>
                      <span>Mixed Media</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-pastel-pink/20"
                    >
                      <span className="h-2 w-2 rounded-full bg-pastel-green"></span>
                      <span>Collage</span>
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a
            href="/creators"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium"
          >
            Artists
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium"
          >
            Exhibitions
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium"
          >
            About
          </a>
        </nav>

        {/* Desktop Action Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-pastel-pink transition-colors">
            <Search size={20} />
          </button>
          <button className="text-gray-700 hover:text-pastel-pink transition-colors">
            <User size={20} />
          </button>
          <button className="text-gray-700 hover:text-pastel-pink transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
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
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium py-2"
          >
            Home
          </a>
          <div className="relative py-2">
            <button className="flex items-center text-gray-700 hover:text-pastel-pink transition-colors font-medium">
              Shop by Category <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="pl-4 mt-2 space-y-2">
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Paintings
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Photography
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Sculptures
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Prints
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Drawings
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Digital Art
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Mixed Media
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-pastel-pink transition-colors py-1"
              >
                Collage
              </a>
            </div>
          </div>
          <a
            href="#"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium py-2"
          >
            Artists
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium py-2"
          >
            Exhibitions
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-pastel-pink transition-colors font-medium py-2"
          >
            About
          </a>
          <div className="flex space-x-4 pt-2">
            <button className="text-gray-700 hover:text-pastel-pink transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-pastel-pink transition-colors">
              <User size={20} />
            </button>
            <button className="text-gray-700 hover:text-pastel-pink transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-pastel-pink text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
