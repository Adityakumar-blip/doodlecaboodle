import React, { useState, useEffect } from "react";
import { X, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-poppins font-medium text-gray-900">
            {item.name}
          </h4>
          <p className="text-xs text-gray-500">{item.artist}</p>
          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm font-medium">₹{item.price}</span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-pastel-pink hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 px-4"
    >
      <div className="w-32 h-32 bg-pastel-pink/10 rounded-full flex items-center justify-center mb-6">
        <ShoppingCart size={52} className="text-pastel-pink/80" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 text-center mb-6">
        Looks like you haven't added any artwork to your cart yet.
      </p>
      <Button className="bg-pastel-pink hover:bg-pastel-pink/90 text-white">
        Explore Artwork
      </Button>
    </motion.div>
  );
};

const Cart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Close cart when clicking escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="text-lg font-medium font-nunito text-gray-900 flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Your Cart
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-pastel-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length > 0 ? (
                <div className="p-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCart />
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="font-medium">₹{calculateTotal()}</span>
                </div>
                <Button className="w-full bg-pastel-pink hover:bg-pastel-pink/90 text-white">
                  Checkout
                </Button>
                <button
                  onClick={onClose}
                  className="w-full text-center mt-3 text-gray-500 hover:text-gray-700 text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
