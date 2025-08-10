import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const EmptyCart = () => {
  const navigate = useNavigate();
  const { toggleCart } = useContext(CartContext);
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
      <Button
        onClick={() => {
          navigate("/artwork-browse");
          toggleCart();
        }}
        className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
      >
        Explore Artwork
      </Button>
    </motion.div>
  );
};

export default EmptyCart;
