import React, { useState, useEffect } from "react";
import { cn, convertFirebaseTimestampToDate } from "@/lib/utils";
import {
  User,
  Heart,
  Package,
  Settings,
  LogOut,
  Edit,
  ArrowLeft,
  Upload,
  ShoppingBag,
  Palette,
  Bell,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { auth, db } from "@/firebase/firebaseconfig";
import {
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import {
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Initialize user data state
  const [userData, setUserData] = useState({
    id: user?.uid || "",
    name: user?.displayName || "User",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    avatar: user?.photoURL || "https://via.placeholder.com/150",
    bio: "",
    address: {
      line1: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    preferences: {
      favoriteMediums: ["Paintings", "Mixed Media", "Digital Art"],
      priceRange: "$100 - $5000",
      notificationPreferences: {
        email: true,
        sms: false,
        app: true,
      },
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setIsAuthenticated(true);
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            const updatedUserData = {
              id: user.uid,
              name: user.displayName || data.name || "User",
              email: user.email || data.email || "",
              phone: user.phoneNumber || data.phone || "",
              avatar:
                user.photoURL ||
                data.avatar ||
                "https://via.placeholder.com/150",
              bio: data.bio || "",
              address: data.address || {
                line1: "",
                city: "",
                state: "",
                pincode: "",
                country: "India",
              },
              preferences: data.preferences || {
                favoriteMediums: ["Paintings", "Mixed Media", "Digital Art"],
                priceRange: "$100 - $5000",
                notificationPreferences: {
                  email: true,
                  sms: false,
                  app: true,
                },
              },
            };

            setUserData(updatedUserData);
            setFormData(updatedUserData);
          } else {
            // Create new user document if it doesn't exist
            const newUserData = {
              id: user.uid,
              name: user.displayName || "User",
              email: user.email || "",
              phone: user.phoneNumber || "",
              avatar: user.photoURL || "https://via.placeholder.com/150",
              bio: "",
              address: {
                line1: "",
                city: "",
                state: "",
                pincode: "",
                country: "India",
              },
              preferences: {
                favoriteMediums: ["Paintings", "Mixed Media", "Digital Art"],
                priceRange: "$100 - $5000",
                notificationPreferences: {
                  email: true,
                  sms: false,
                  app: true,
                },
              },
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            await setDoc(userDocRef, newUserData);
            setUserData(newUserData);
            setFormData(newUserData);
          }

          // Fetch orders from subcollection
          const ordersCollectionRef = query(
            collection(db, "users", user.uid, "orders")
            // orderBy("timestamp", "desc")
          );

          const ordersSnapshot = await getDocs(ordersCollectionRef);
          const ordersData = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("order data", ordersData);
          setOrders(ordersData);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
        }
      } else {
        setIsAuthenticated(false);
        setUserData({
          id: "",
          name: "User",
          email: "",
          phone: "",
          avatar: "https://via.placeholder.com/150",
          bio: "",
          address: {
            line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
          },
          preferences: {
            favoriteMediums: ["Paintings", "Mixed Media", "Digital Art"],
            priceRange: "$100 - $5000",
            notificationPreferences: {
              email: true,
              sms: false,
              app: true,
            },
          },
        });
        setOrders([]);
        setError("Please sign in to view your profile");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // State for orders
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [error, setError] = useState("");

  // Mock data for wishlist and recently viewed
  const [wishlist, setWishlist] = useState([
    {
      id: 4,
      name: "Coastal Breeze",
      artist: "Emma Wilson",
      price: 1799,
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 5,
      name: "Abstract Thoughts",
      artist: "Robert Chen",
      price: 3299,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 6,
      name: "Geometric Balance",
      artist: "Alex Morgan",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      id: 7,
      name: "Midnight Journey",
      artist: "Sarah Patel",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 8,
      name: "Forest Dreams",
      artist: "Daniel Lewis",
      price: 2199,
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Handle password change submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordForm.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordForm.newPassword);
      setPasswordSuccess("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      setPasswordError("Failed to update password: " + err.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (user) {
        // Update Firebase Auth profile
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.avatar,
        });

        // Update Firestore user document
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            avatar: formData.avatar,
            bio: formData.bio,
            address: formData.address,
            preferences: formData.preferences,
            updatedAt: Date.now(),
          },
          { merge: true }
        );

        // Update local state
        setUserData(formData);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  // Handle notification preference toggles
  const toggleNotificationPreference = async (type) => {
    const updatedPreferences = {
      ...userData.preferences,
      notificationPreferences: {
        ...userData.preferences.notificationPreferences,
        [type]: !userData.preferences.notificationPreferences[type],
      },
    };
    setUserData({
      ...userData,
      preferences: updatedPreferences,
    });
    setFormData({
      ...formData,
      preferences: updatedPreferences,
    });

    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          "preferences.notificationPreferences":
            updatedPreferences.notificationPreferences,
          updatedAt: Date.now(),
        });
      } catch (err) {
        console.error("Error updating preferences:", err);
        setError("Failed to update notification preferences");
      }
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to sign out");
    }
  };

  return (
    <div className="pt-32 pb-16 container mx-auto px-4">
      <div className="mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">
            My Profile
          </h1>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Shopping
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <img
                        src={formData.avatar}
                        alt={formData.name}
                        className="w-28 h-28 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-pastel-pink text-white rounded-full p-1"
                      >
                        <Upload size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="address.line1"
                        value={formData.address.line1}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                        maxLength={6}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Favorite Mediums (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="preferences.favoriteMediums"
                        value={formData.preferences.favoriteMediums?.join(", ")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferences: {
                              ...formData.preferences,
                              favoriteMediums: e.target.value
                                .split(",")
                                .map((item) => item.trim()),
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range
                      </label>
                      <input
                        type="text"
                        name="preferences.priceRange"
                        value={formData.preferences.priceRange}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferences: {
                              ...formData.preferences,
                              priceRange: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="submit"
                        className="bg-pastel-pink hover:bg-pastel-pink/90 text-white flex-1"
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ ...userData });
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-col items-left mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {userData.name}
                    </h2>
                    <p className="text-gray-600">{userData.email}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Contact Information
                      </h3>
                      <div className="text-gray-600 space-y-2">
                        <p>{userData.phone || "Not provided"}</p>
                        <p className="text-sm">
                          {userData.address.line1
                            ? `${userData.address.line1}, ${userData.address.city}, ${userData.address.state}, ${userData.address.pincode}, ${userData.address.country}`
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    {/* <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        About Me
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {userData.bio || "No bio available"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Art Preferences
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {userData.preferences.favoriteMediums?.map(
                          (medium, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pastel-pink/10 text-pastel-pink"
                            >
                              <Palette size={12} className="mr-1" />
                              {medium}
                            </span>
                          )
                        )}
                      </div>
                    </div> */}

                    <div className="pt-2 flex justify-between">
                      <Button
                        className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                        onClick={handleSignOut}
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  Notification Preferences
                </h3>
                <Bell size={18} className="text-gray-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        userData.preferences.notificationPreferences?.email
                      }
                      onChange={() => toggleNotificationPreference("email")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SMS notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        userData.preferences.notificationPreferences?.sms
                      }
                      onChange={() => toggleNotificationPreference("sms")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">App notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        userData.preferences.notificationPreferences?.app
                      }
                      onChange={() => toggleNotificationPreference("app")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-medium">Your Orders</h3>
                    <p className="text-gray-600 text-sm">
                      Track, return, or buy items again
                    </p>
                  </div>
                  <div>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-6 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium font-poppins text-gray-900">
                                Order #{order.id}
                              </h4>
                              {/* <p className="text-sm text-gray-600">
                                Placed on{" "}
                                {convertFirebaseTimestampToDate(
                                  order?.timestamp
                                )}
                              </p> */}
                            </div>
                            {/* <div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div> */}
                          </div>
                          <div className="space-y-4">
                            {order?.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-4"
                              >
                                <img
                                  src={
                                    item.uploadedImageUrl ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    by {item.artistName}
                                  </p>
                                  <p className="text-pastel-pink font-medium mt-1">
                                    ₹{item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                            <div>
                              {/* <p className="font-medium">
                                Total: ${(order.total / 100).toFixed(2)}
                              </p> */}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Track Order
                              </Button>
                              <Button
                                className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
                                size="sm"
                                onClick={() => navigate(`/order/${order.id}`)}
                              >
                                Order Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Package
                          size={48}
                          className="mx-auto text-gray-400 mb-4"
                        />
                        <p className="text-gray-600">
                          You haven't placed any orders yet.
                        </p>
                        <Button className="mt-4 bg-pastel-pink hover:bg-pastel-pink/90 text-white">
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-gray-600 text-sm">
                      Manage your account preferences
                    </p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Change Password
                      </h4>
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-4"
                      >
                        {passwordError && (
                          <div className="p-3 bg-red-100 text-red-700 rounded-md">
                            {passwordError}
                          </div>
                        )}
                        {passwordSuccess && (
                          <div className="p-3 bg-green-100 text-green-700 rounded-md">
                            {passwordSuccess}
                          </div>
                        )}
                        <div>
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <Input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
                          >
                            Update Password
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-gray-300 text-gray-700"
                            onClick={() =>
                              setPasswordForm({
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              })
                            }
                          >
                            Clear
                          </Button>
                        </div>
                      </form>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Addresses
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 relative">
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 h-8 w-8 p-0"
                              onClick={() => setIsEditing(true)}
                            >
                              <Edit size={16} />
                            </Button>
                          </div>
                          <p className="font-medium">Home</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {userData.name}
                            <br />
                            {userData.address.line1
                              ? `${userData.address.line1}, ${userData.address.city}, ${userData.address.state}, ${userData.address.pincode}, ${userData.address.country}`
                              : "Not provided"}
                          </p>
                          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="h-full flex items-center justify-center border-gray-300 text-gray-700"
                          onClick={() => setIsEditing(true)}
                        >
                          + Add Address
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Privacy & Data
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-900">
                              Data sharing for recommendations
                            </p>
                            <p className="text-xs text-gray-500">
                              Allow us to use your browsing history to show
                              personalized art recommendations
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={true}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-900">
                              Marketing communications
                            </p>
                            <p className="text-xs text-gray-500">
                              Receive emails about new art collections and
                              special offers
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={true}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-900">Cookie preferences</p>
                            <p className="text-xs text-gray-500">
                              Manage your cookie settings
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-700"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-500 hover:bg-red-50"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
