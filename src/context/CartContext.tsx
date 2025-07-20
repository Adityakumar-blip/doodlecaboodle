import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/firebase/firebaseconfig";

// Define the CartItem interface
export interface CartItem {
  id: string;
  artworkId: string;
  title: string;
  artistName: string;
  price: number;
  quantity: number;
  size: {
    name: string;
    width: number;
    height: number;
    length: number;
    unit: string;
    priceAdjustment: number;
  };
  uploadedImageUrl: string;
  timestamp: number;
  userId?: string; // Optional userId for Firebase storage
}

// Define the CartContext interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  syncLocalCartToFirebase: (userId: string) => Promise<void>;
  isLoading: boolean;
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Create the CartContext with default values
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  setCartItems: () => {},
  syncLocalCartToFirebase: async () => {},
  isLoading: true,
  isCartOpen: false,
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
});

// Utility to manage local storage
const LOCAL_STORAGE_KEY = "tempCart";

const getLocalCart = (): CartItem[] => {
  const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

const setLocalCart = (items: CartItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getLocalCart());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const auth = getAuth();

  // Monitor authentication state and sync cart
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(true);

      if (user) {
        // User is signed in, fetch from Firebase
        const userCartRef = collection(db, `users/${user.uid}/cart`);
        const unsubscribeSnapshot = onSnapshot(
          userCartRef,
          (snapshot) => {
            const items: CartItem[] = [];
            snapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() } as CartItem);
            });
            setCartItems(items);
            // Clear local storage after syncing
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setIsLoading(false);
          },
          (error) => {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
          }
        );

        // Sync any local cart items to Firebase
        const localItems = getLocalCart();
        if (localItems.length > 0) {
          syncLocalCartToFirebase(user.uid);
        }

        return () => unsubscribeSnapshot();
      } else {
        // User is not signed in, use local storage
        setCartItems(getLocalCart());
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Add item to cart
  const addToCart = async (item: CartItem) => {
    if (isLoading) {
      throw new Error(
        "Authentication state is still loading. Please try again."
      );
    }

    try {
      if (currentUser) {
        console.log("current user", currentUser);
        console.log("iteem", item);
        // Add to Firebase under user-specific cart
        const cartItemWithUser = {
          ...item,
          title: item?.artistName,
          userId: currentUser.uid,
          timestamp: Date.now(),
        };
        await addDoc(
          collection(db, `users/${currentUser.uid}/cart`),
          cartItemWithUser
        );
        // onSnapshot will update cartItems automatically
      } else {
        // Add to local storage for unauthenticated users
        const newItem = {
          ...item,
          id: `${item.artworkId}-${Date.now()}`,
          timestamp: Date.now(),
        };
        const updatedItems = [...cartItems, newItem];
        setCartItems(updatedItems);
        setLocalCart(updatedItems);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw new Error("Failed to add item to cart");
    }
  };

  // Sync local cart items to Firebase after user signs in
  const syncLocalCartToFirebase = async (userId: string) => {
    try {
      const localItems = getLocalCart();
      if (localItems.length === 0) return;

      const userCartRef = collection(db, `users/${userId}/cart`);
      for (const item of localItems) {
        const cartItemWithUser = { ...item, userId, timestamp: Date.now() };
        await addDoc(userCartRef, cartItemWithUser);
      }
      // Clear local storage after syncing
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      // onSnapshot will update cartItems
    } catch (error) {
      console.error("Error syncing local cart to Firebase:", error);
      throw new Error("Failed to sync cart to Firebase");
    }
  };

  // Cart open/close functions
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        syncLocalCartToFirebase,
        isLoading,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
