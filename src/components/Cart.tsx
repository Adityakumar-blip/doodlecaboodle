import React, { useState, useEffect, useContext } from "react";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseconfig";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { toast } from "sonner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CheckoutForm from "./CheckoutForm";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import {
  generateOrderEmailHTML,
  generateThankYouEmailHTML,
} from "@/lib/SendOrderEmail";

interface CartItem {
  id: string;
  price: number;
  quantity: number;
  image: string;
  name: string;
  [key: string]: any;
}

interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  timestamp: number;
  status: string;
  couponCode?: string;
  personalNote?: string;
}

interface Coupon {
  code: string;
  type: "delivery" | "packaging" | "other";
  discountValue?: number;
  discountType?: "percentage" | "fixed";
  status: "active" | "inactive";
  validFrom: any;
  validUntil: any;
}

const Cart = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [personalNote, setPersonalNote] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [userDetails, setUserDetails] = useState<any>({
    name: "",
    email: "",
    senderPhone: "",
    receiverPhone: "",
    address: {
      line1: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  // Load confetti script dynamically
  const loadConfettiScript = () => {
    return new Promise((resolve, reject) => {
      if ((window as any).confetti) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
      script.onload = () => resolve(true);
      script.onerror = () =>
        reject(new Error("Failed to load confetti script"));
      document.body.appendChild(script);
    });
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    if ((window as any).confetti) {
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F472B6", "#4ADE80", "#60A5FA"],
      });
    }
  };

  // Check authentication status, fetch user details, and sync local storage cart
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        // Set user details
        setUserDetails((prev: any) => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || "",
        }));
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserDetails((prev: any) => ({
            ...prev,
            senderPhone: data.senderPhone || "",
            address: data.address || {
              line1: "",
              city: "",
              state: "",
              pincode: "",
              country: "India",
            },
          }));
        }

        // Sync local storage cart to Firebase
        const localCart = localStorage.getItem("cartItems");
        if (localCart) {
          try {
            const parsedItems = JSON.parse(localCart);
            if (Array.isArray(parsedItems) && parsedItems.length > 0) {
              const cartRef = collection(db, "users", user.uid, "cart");
              const addToFirebase = parsedItems.map((item: CartItem) =>
                setDoc(doc(cartRef, item.id), {
                  ...item,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image || "",
                  name: item.name || "",
                })
              );
              await Promise.all(addToFirebase);
              // Clear local storage after syncing
              localStorage.removeItem("cartItems");
              toast.success("Cart synced with your account");
            }
          } catch (error) {
            console.error("Error syncing cart to Firebase:", error);
            toast.error("Failed to sync cart with your account");
          }
        }
      } else {
        // Load cart from local storage for non-authenticated users
        const localCart = localStorage.getItem("cartItems");
        if (localCart) {
          try {
            const parsedItems = JSON.parse(localCart);
            setCartItems(parsedItems);
          } catch (error) {
            console.error("Error parsing local storage cart:", error);
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
        setCouponCode("");
        setAppliedCoupon(null);
        setPersonalNote("");
        setWordCount(0);
      }
    });
    return () => unsubscribe();
  }, [auth, setCartItems]);

  // Fetch cart items from Firebase for authenticated users
  useEffect(() => {
    if (isAuthenticated === null || !isAuthenticated || !auth.currentUser)
      return;

    const q = query(collection(db, "users", auth.currentUser.uid, "cart"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: CartItem[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as CartItem);
        });
        setCartItems(items as any);
      },
      (error) => {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items");
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated, auth.currentUser, setCartItems]);

  // Remove item from Firebase or local storage
  const removeFromCart = async (id: string) => {
    if (isAuthenticated && auth.currentUser) {
      // Remove from Firebase
      try {
        const cartRef = collection(db, "users", auth.currentUser.uid, "cart");
        const q = query(cartRef, where("id", "==", id));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(
            doc(db, "users", auth.currentUser.uid, "cart", docSnapshot.id)
          );
        });
        setCartItems(cartItems.filter((item) => item.id !== id));
        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart");
      }
    } else {
      // Remove from local storage
      try {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Error removing item from local storage:", error);
        toast.error("Failed to remove item from cart");
      }
    }
  };

  // Validate and apply coupon with confetti animation
  const applyCoupon = async () => {
    try {
      await loadConfettiScript(); // Ensure confetti script is loaded
      const couponsRef = collection(db, "coupons");
      const q = query(couponsRef, where("code", "==", couponCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAppliedCoupon(null);
        toast.error("Coupon not found");
        return;
      }

      const couponDoc = querySnapshot.docs[0];
      const couponData = couponDoc.data() as Coupon;

      const currentTime = new Date().getTime();
      const validFrom = (couponData.validFrom as Timestamp).toDate().getTime();
      const validUntil = (couponData.validUntil as Timestamp)
        .toDate()
        .getTime();

      const isCouponValid =
        couponData.status === "active" &&
        validFrom <= currentTime &&
        validUntil >= currentTime;

      if (isCouponValid) {
        setAppliedCoupon({
          ...couponData,
          code: couponCode,
          validFrom: new Date(validFrom),
          validUntil: new Date(validUntil),
        });
        toast.success(`Coupon "${couponCode}" applied successfully!`);
        triggerConfetti(); // Trigger confetti animation on successful coupon application
      } else {
        setAppliedCoupon(null);
        toast.error("Invalid or expired coupon");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Failed to apply coupon");
      setAppliedCoupon(null);
    }
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Handle personal note input and word count
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const currentWordCount = words.length;

    if (currentWordCount <= 250) {
      setPersonalNote(text);
      setWordCount(words.length);
    } else {
      toast.error("Personal note cannot exceed 250 words");
    }
  };

  // Calculate charges based on coupon type
  const calculateCharges = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    let deliveryCharges = 0;
    let packagingCharges = 50;
    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.type === "delivery") {
        deliveryCharges = 0;
      } else if (appliedCoupon.type === "packaging") {
        packagingCharges = 0;
      } else if (
        appliedCoupon.type === "other" &&
        appliedCoupon.discountValue
      ) {
        if (appliedCoupon.discountType === "percentage") {
          discount = (subtotal * appliedCoupon.discountValue) / 100;
        } else if (appliedCoupon.discountType === "fixed") {
          discount = appliedCoupon.discountValue;
        }
      }
    }

    const total = Math.max(0, subtotal + deliveryCharges - discount);

    return {
      subtotal: subtotal.toFixed(2),
      deliveryCharges: deliveryCharges.toFixed(2),
      // packagingCharges: packagingCharges.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  // Close cart or modal when clicking escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showNoteModal) {
          setShowNoteModal(false);
        } else if (showCheckoutForm) {
          setShowCheckoutForm(false);
        } else if (showLoginForm) {
          setShowLoginForm(false);
        } else if (showSignupForm) {
          setShowSignupForm(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, showNoteModal, showCheckoutForm, showLoginForm, showSignupForm]);

  // Prevent scrolling when cart is open
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

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  };

  // Handle opening personal note modal
  const handleOpenNoteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNoteModal(true);
  };

  // Handle closing personal note modal
  const handleCloseNoteModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowNoteModal(false);
  };

  // const checkoutBaseUrl = "https://paymentandshipping.onrender.com";
  const checkoutBaseUrl = "https://paymentandshipping-vke7.onrender.com";
  const checkoutBaseUrlLocal = "http://localhost:1990";

  // Handle checkout with Razorpay and save order history
  const handleCheckout = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      axios.get("https://email-service-app.onrender.com/");
      await loadRazorpayScript();

      const charges = calculateCharges();

      const response = await axios.post(
        `${checkoutBaseUrl}/api/payment/create-order`,
        {
          amount: parseFloat(charges.total),
          receipt: `order_${Date.now()}`,
          notes: {
            userId: auth.currentUser.uid,
            shippingDetails: userDetails,
            cartItems,
            charges: {
              subtotal: charges.subtotal,
              deliveryCharges: charges.deliveryCharges,
              packagingCharges: charges.packagingCharges ?? "",
              discount: charges.discount,
              couponCode: appliedCoupon?.code,
              personalNote,
            },
          },
        },
        { timeout: 10000 }
      );

      const { order_id, amount, currency, key } = response.data;

      const options = {
        key,
        amount,
        currency,
        name: "DoodleCaboodle",
        description: "Purchase of Artwork",
        order_id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(
              `${checkoutBaseUrl}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { timeout: 8000 }
            );

            if (verifyResponse.data.success) {
              const order: Order = {
                orderId: response.razorpay_order_id,
                items: cartItems as any,
                total: parseFloat(charges.total),
                timestamp: Date.now(),
                status: "completed",
                couponCode: appliedCoupon?.code ?? "",
                personalNote,
              };

              // await setDoc(
              //   doc(db, "users", auth.currentUser.uid, "orders", order.orderId),
              //   order
              // );

              const cartRef = collection(
                db,
                "users",
                auth.currentUser.uid,
                "cart"
              );
              const snapshot = await getDocs(cartRef);
              const deletePromises = snapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
              );
              await Promise.all(deletePromises);

              await setDoc(doc(db, "users", auth.currentUser.uid), {
                ...userDetails,
                updatedAt: Date.now(),
              });

              // await axios.post(
              //   "https://email-service-app.onrender.com/email/send",
              //   {
              //     to: "doodlecaboodle08@gmail.com",
              //     subject: `New Order Received - ${order.orderId}`,
              //     html: generateOrderEmailHTML(order, userDetails),
              //   }
              // );

              // await axios.post(
              //   "https://email-service-app.onrender.com/email/send",
              //   {
              //     to: "doodlecaboodle08@gmail.com",
              //     subject: `Thank you for your order - ${order.orderId}`,
              //     html: generateThankYouEmailHTML(order, userDetails),
              //   }
              // );

              navigate(`/order/${verifyResponse?.data?.custom_order_id}`);

              setCartItems([]);
              setCouponCode("");
              setAppliedCoupon(null);
              setPersonalNote("");
              setWordCount(0);
              toast.success("Order placed successfully!");
              setShowCheckoutForm(false);
              onClose();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.log("Error verifying payment:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: "#2222",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", () => {
        setLoading(false);
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      setShowCheckoutForm(true);
    } else {
      setShowLoginForm(true);
    }
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setShowLoginForm(false);
    setShowCheckoutForm(true);
  };

  // Handle signup success
  const handleSignupSuccess = () => {
    setShowSignupForm(false);
    setShowCheckoutForm(true);
  };

  // Navigate to signup
  const handleNavigateToSignup = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  // Navigate to login
  const handleNavigateToLogin = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  // Handle main backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowCheckoutForm(false);
      setShowLoginForm(false);
      setShowSignupForm(false);
      setShowNoteModal(false);
      onClose();
    }
  };

  const charges = calculateCharges();

  return (
    <>
      {/* Main Cart Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={handleBackdropClick}
          />
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Your Cart
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-gray-200 text-gray-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </h2>
              <button
                onClick={() => {
                  setShowCheckoutForm(false);
                  setShowLoginForm(false);
                  setShowSignupForm(false);
                  setShowNoteModal(false);
                  onClose();
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {showLoginForm ? (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onNavigateToSignup={handleNavigateToSignup}
                />
              ) : showSignupForm ? (
                <SignupForm
                  onSignupSuccess={handleSignupSuccess}
                  onNavigateToLogin={handleNavigateToLogin}
                />
              ) : showCheckoutForm ? (
                <CheckoutForm
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  onProceed={handleCheckout}
                  loading={loading}
                />
              ) : cartItems.length > 0 ? (
                <div className="p-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                  {/* Coupon Input */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Apply Coupon
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                        disabled={loading || appliedCoupon !== null}
                      />
                      {appliedCoupon ? (
                        <Button
                          onClick={removeCoupon}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={applyCoupon}
                          disabled={loading || !couponCode}
                          className="bg-gray-800 hover:bg-gray-900 text-white text-sm"
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {appliedCoupon && (
                      <p className="mt-2 text-sm text-green-600">
                        Coupon {appliedCoupon.code} applied (
                        {appliedCoupon.type === "delivery"
                          ? "Free Delivery"
                          : appliedCoupon.type === "packaging"
                          ? "Free Packaging"
                          : appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.discountValue}% off`
                          : `₹${appliedCoupon.discountValue} off`}
                        )
                      </p>
                    )}
                  </div>
                  {/* Personal Note Section */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        Personal Note
                      </h3>
                      <button
                        onClick={handleOpenNoteModal}
                        className="text-xs text-gray-600 hover:text-gray-800 underline transition-colors"
                      >
                        {personalNote ? "Edit" : "Add"}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showNoteModal && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                            <textarea
                              value={personalNote}
                              onChange={handleNoteChange}
                              placeholder="Add a personal note with your order (up to 250 words)..."
                              className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm resize-none"
                              autoFocus
                            />
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">
                                {wordCount}/250 words
                              </span>
                              {wordCount > 250 && (
                                <span className="text-red-500 font-medium">
                                  Word limit exceeded
                                </span>
                              )}
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleCloseNoteModal}
                                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleCloseNoteModal}
                                disabled={wordCount > 250}
                                className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {personalNote && !showNoteModal && (
                      <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                        <span className="font-medium">Note:</span> "
                        {personalNote.slice(0, 50)}
                        {personalNote.length > 50 ? "..." : ""}"
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <EmptyCart />
              )}
            </div>

            {/* Footer */}
            {!showCheckoutForm &&
              !showLoginForm &&
              !showSignupForm &&
              cartItems.length > 0 && (
                <div className="border-t border-gray-100 p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Price Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-600">
                          ₹{charges.subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Charges</span>
                        <span className="text-gray-600">
                          {charges.deliveryCharges === "0.00"
                            ? "Free"
                            : `₹${charges.deliveryCharges}`}
                        </span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Packaging Charges</span>
                        <span className="text-gray-600">
                          {charges.packagingCharges === "0.00"
                            ? "Free"
                            : `₹${charges.packagingCharges}`}
                        </span>
                      </div> */}
                      {appliedCoupon && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Coupon Discount</span>
                          <span className="text-green-600">
                            -₹{charges.discount}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium pt-2 border-t border-gray-200 text-sm">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">₹{charges.total}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm"
                    onClick={handleProceedToCheckout}
                    disabled={loading || isAuthenticated === null}
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                  <button
                    onClick={() => {
                      setShowCheckoutForm(false);
                      setShowLoginForm(false);
                      setShowSignupForm(false);
                      setShowNoteModal(false);
                      onClose();
                    }}
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
