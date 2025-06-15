import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  Bookmark,
  MessageCircle,
  Bell,
  Eye,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";

const UserProfile = () => {
  const { user } = useUser();

  console.log("user", user.user.displayName);

  // Initialize user data with Firebase user and default values for missing fields
  const [userData, setUserData] = useState({
    id: user?.uid || "",
    name: user?.user?.displayName || "User",
    email: user?.email || "",
    phone: user?.phoneNumber || "", // Firebase may provide phoneNumber if set
    avatar: user?.photoURL || "https://via.placeholder.com/150", // Default avatar if none
    bio: "", // Default empty, fetch from Firestore if available
    address: "", // Default empty, fetch from Firestore if available
    preferences: {
      favoriteMediums: ["Paintings", "Mixed Media", "Digital Art"], // Default
      priceRange: "$100 - $5000", // Default
      notificationPreferences: {
        email: true,
        sms: false,
        app: true,
      },
    },
  });

  // Mock data for orders (unchanged)
  const [orders, setOrders] = useState([
    {
      id: "ORD-2025-0123",
      date: "April 10, 2025",
      total: 2599,
      status: "Delivered",
      items: [
        {
          id: 2,
          name: "Sunset Dreams",
          artist: "John Smith",
          price: 2599,
          image:
            "https://images.unsplash.com/photo-1620221730414-5e976c63c2da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ],
    },
    {
      id: "ORD-2025-0089",
      date: "March 28, 2025",
      total: 3999,
      status: "Processing",
      items: [
        {
          id: 3,
          name: "Urban Perspective",
          artist: "Maria Garcia",
          price: 3999,
          image:
            "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ],
    },
  ]);

  // Mock data for wishlist (unchanged)
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

  // Mock data for recently viewed (unchanged)
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

  // Form state for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  // Update userData when Firebase user changes
  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        id: user.uid,
        name: user?.user?.displayName || "User",
        email: user.user?.email || "",
        phone: user.user?.phoneNumber || prev.phone,
        avatar: user.photoURL || prev.avatar,
      }));
      setFormData((prev) => ({
        ...prev,
        id: user.uid,
        name: user.displayName || "User",
        email: user.email || "",
        phone: user.phoneNumber || prev.phone,
        avatar: user.photoURL || prev.avatar,
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update Firebase user profile (displayName and photoURL)
      await user.updateProfile({
        displayName: formData.name,
        photoURL: formData.avatar,
      });

      // Update local state
      setUserData(formData);
      setIsEditing(false);

      // If you store additional fields (bio, address, preferences) in Firestore, update them here
      // Example (uncomment if using Firestore):
      /*
      import { doc, setDoc } from "firebase/firestore";
      import { db } from "@/firebase"; // Your Firebase config
      await setDoc(doc(db, "users", user.uid), {
        bio: formData.bio,
        address: formData.address,
        preferences: formData.preferences,
      }, { merge: true });
      */
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle preference toggles
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

    // If using Firestore, update preferences
    // Example (uncomment if using Firestore):
    /*
    import { doc, updateDoc } from "firebase/firestore";
    import { db } from "@/firebase";
    await updateDoc(doc(db, "users", user.uid), {
      "preferences.notificationPreferences": updatedPreferences.notificationPreferences,
    });
    */
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
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
                        disabled // Email updates may require Firebase-specific handling
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
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
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
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-28 h-28 rounded-full object-cover mb-4"
                    />
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
                          {userData.address || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div>
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
                        {userData.preferences.favoriteMediums.map(
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
                      <p className="text-sm text-gray-600">
                        Preferred price range: {userData.preferences.priceRange}
                      </p>
                    </div>

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
                        onClick={() => {
                          // Assuming you have Firebase auth imported
                          // import { signOut } from "firebase/auth";
                          // import { auth } from "@/firebase";
                          // signOut(auth);
                        }}
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
                        userData.preferences.notificationPreferences.email
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
                      checked={userData.preferences.notificationPreferences.sms}
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
                      checked={userData.preferences.notificationPreferences.app}
                      onChange={() => toggleNotificationPreference("app")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pastel-pink rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-pink"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs (unchanged) */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <Heart size={16} className="mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="viewed"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <Eye size={16} className="mr-2" />
                  Recently Viewed
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-pastel-pink/10 data-[state=active]:text-pastel-pink"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab (unchanged) */}
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
                              <h4 className="font-medium text-gray-900">
                                Order #{order.id}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Placed on {order.date}
                              </p>
                            </div>
                            <div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center space-x-4"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    by {item.artist}
                                  </p>
                                  <p className="text-pastel-pink font-medium mt-1">
                                    ${(item.price / 100).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                            <div>
                              <p className="font-medium">
                                Total: ${(order.total / 100).toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Track Order
                              </Button>
                              <Button
                                className="bg-pastel-pink hover:bg-pastel-pink/90 text-white"
                                size="sm"
                              >
                                Buy Again
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

              {/* Wishlist Tab (unchanged) */}
              <TabsContent value="wishlist" className="mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-medium">Your Wishlist</h3>
                    <p className="text-gray-600 text-sm">
                      Art pieces you've saved for later
                    </p>
                  </div>
                  <div className="p-6">
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className="flex space-x-4 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                by {item.artist}
                              </p>
                              <p className="text-pastel-pink font-medium mt-1">
                                ${(item.price / 100).toFixed(2)}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  className="bg-pastel-pink hover:bg-pastel-pink/90 text-white text-xs py-1"
                                  size="sm"
                                >
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs py-1"
                                  onClick={() => removeFromWishlist(item.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Heart
                          size={48}
                          className="mx-auto text-gray-400 mb-4"
                        />
                        <p className="text-gray-600">Your wishlist is empty.</p>
                        <Button className="mt-4 bg-pastel-pink hover:bg-pastel-pink/90 text-white">
                          Explore Artwork
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Recently Viewed Tab (unchanged) */}
              <TabsContent value="viewed" className="mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-medium">Recently Viewed</h3>
                    <p className="text-gray-600 text-sm">
                      Artwork you've viewed recently
                    </p>
                  </div>
                  <div className="p-6">
                    {recentlyViewed.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentlyViewed.map((item) => (
                          <div
                            key={item.id}
                            className="flex space-x-4 p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                by {item.artist}
                              </p>
                              <p className="text-pastel-pink font-medium mt-1">
                                ${(item.price / 100).toFixed(2)}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  className="bg-pastel-pink hover:bg-pastel-pink/90 text-white text-xs py-1"
                                  size="sm"
                                >
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs py-1"
                                >
                                  <Heart size={14} className="mr-1" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">
                          You haven't viewed any artwork yet.
                        </p>
                        <Button className="mt-4 bg-pastel-pink hover:bg-pastel-pink/90 text-white">
                          Browse Collection
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab (unchanged except for address reference) */}
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
                        Password
                      </h4>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Payment Methods
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 rounded-md p-2 mr-3">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect
                                  x="3"
                                  y="5"
                                  width="18"
                                  height="14"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M3 10H21"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-xs text-gray-500">
                                Expires 12/26
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                          >
                            <Edit size={16} />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          className="h-full flex items-center justify-center"
                        >
                          + Add Payment Method
                        </Button>
                      </div>
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
                            >
                              <Edit size={16} />
                            </Button>
                          </div>
                          <p className="font-medium">Home</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {userData.name}
                            <br />
                            {userData.address || "Not provided"}
                          </p>
                          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="h-full flex items-center justify-center"
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
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-red-500 mb-2">
                        Danger Zone
                      </h4>
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

        {/* Art Recommendations (unchanged) */}
        <div className="col-span-1 lg:col-span-3 mt-8">
          <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">
            Recommended For You
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <img
                  src={`https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydHdvcmt8ZW58MHx8MHx8fDA%3D`}
                  alt={`Artwork ${item}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium text-gray-900">
                    {
                      [
                        "Autumn Reflections",
                        "Midnight Whispers",
                        "Urban Dreams",
                        "Serene Waters",
                      ][item - 1]
                    }
                  </h4>
                  <p className="text-sm text-gray-600">
                    by{" "}
                    {
                      [
                        "Emily Chen",
                        "Marcus Taylor",
                        "Sofia Rodriguez",
                        "James Wilson",
                      ][item - 1]
                    }
                  </p>
                  <p className="text-pastel-pink font-medium mt-1">
                    ${[159, 229, 189, 199][item - 1]}.99
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="bg-pastel-pink hover:bg-pastel-pink/90 text-white flex-1"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm" className="p-0 h-8 w-8">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
