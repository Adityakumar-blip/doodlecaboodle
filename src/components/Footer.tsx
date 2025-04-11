import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <a
              href="/"
              className="text-2xl font-playfair font-bold text-gray-900 mb-4 inline-block"
            >
              Doodle<span className="text-pastel-blue">Caboodle</span>
            </a>
            <p className="text-gray-600 mb-4 max-w-xs">
              Discover unique artwork from independent artists around the world.
              Our curated collection features original paintings, prints,
              sculptures and more.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Facebook size={18} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Instagram size={18} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Twitter size={18} className="text-gray-700" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-playfair font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Paintings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Photography
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Digital Art
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Sculptures
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Limited Editions
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-playfair font-bold text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Artists
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Become an Artist
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 Doodlecaboodle. All rights reserved.
            </p>
            <div className="flex items-center">
              <img
                src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
                alt="Visa"
                className="h-6 mr-4"
              />
              <img
                src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg"
                alt="Mastercard"
                className="h-6 mr-4"
              />
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
                alt="PayPal"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
