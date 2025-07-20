import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import logo from "@/assets/logo-doodle.svg";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-20">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <a
              href="/"
              className="text-2xl font-playfair font-bold text-gray-900 mb-4 inline-block"
            >
              {/* Doodle<span className="text-pastel-blue">Caboodle</span> */}
              <img src={logo} className="w-10 h-10" alt="doodlecaboodle" />
            </a>
            <p className="text-gray-600 mb-4 max-w-xs">
              We’d love to be a small part of your big moments. Whether it’s a
              gift, a story, or just a hello — our inbox is always open, and our
              hearts always full.
            </p>
            <div className="flex space-x-4">
              <a
                target="_blank"
                href="https://www.facebook.com/doodlecaboodle.in"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Facebook size={18} className="text-gray-700" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/doodlecaboodle.in/"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Instagram size={18} className="text-gray-700" />
              </a>
              <a
                target="_blank"
                href="https://x.com/doodle_cabo0dle"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Twitter size={18} className="text-gray-700" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/doodle-caboodle/"
                className="bg-pastel-blue hover:bg-pastel-purple transition-colors p-2 rounded-full"
              >
                <Linkedin size={18} className="text-gray-700" />
              </a>
            </div>
          </div>

          {/* Shop */}
          {/* <div className="mb-6 pl-20 md:mb-0">
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
          </div> */}

          {/* About */}
          <div className="mb-6  md:mb-0">
            <h3 className="font-playfair font-bold text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-pastel-pink"
                >
                  Our Story
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Artists
                </a>
              </li> */}
              {/* <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Exhibitions
                </a>
              </li> */}
              {/* <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Gift Cards
                </a>
              </li> */}
              {/* <li>
                <a href="#" className="text-gray-600 hover:text-pastel-pink">
                  Become an Artist
                </a>
              </li> */}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="text-gray-600 hover:text-pastel-pink">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping-and-refund"
                  className="text-gray-600 hover:text-pastel-pink"
                >
                  Shipping & Refund
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-600 hover:text-pastel-pink"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-pastel-pink"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/service-terms"
                  className="text-gray-600 hover:text-pastel-pink"
                >
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
              {/* <img
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
              /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
