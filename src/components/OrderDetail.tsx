import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase/firebaseconfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { convertFirebaseTimestampToDate } from "@/lib/utils";
import { onAuthStateChanged } from "firebase/auth";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setIsAuthenticated(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const orderDocRef = doc(db, "users", user.uid, "orders", orderId);
          const orderDoc = await getDoc(orderDocRef);
          const userData = await getDoc(userRef);

          setUser(userData.data());

          if (orderDoc.exists()) {
            setOrder({ id: orderDoc.id, ...orderDoc.data() });
          } else {
            setError("Order not found");
          }

          const paymentsRef = collection(db, "payments");
          const q = query(paymentsRef, where("custom_order_id", "==", orderId));
          const querySnapshot = await getDocs(q);

          let paymentData = null;
          querySnapshot.forEach((doc) => {
            paymentData = { id: doc.id, ...doc.data() };
          });

          if (paymentData) {
            console.log("Payment Data:", paymentData);
            setPaymentData(paymentData);
          } else {
            console.log("No payment found for this order.");
          }
        } catch (err) {
          console.error("Error fetching order details:", err);
          setError("Failed to load order details");
        }
      } else {
        setIsAuthenticated(false);
        setOrder(null);
        setError("Please sign in to view order details");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4 flex justify-center items-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-16 container mx-auto px-4">
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
        <Button
          onClick={() => navigate("/profile")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </Button>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  console.log("order", order);

  return (
    <div className="pt-32 pb-16 container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-900">
            Order #{order.id}
          </h1>
          <Button
            onClick={() => navigate("/profile")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Order Details
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {convertFirebaseTimestampToDate(order?.timestamp)}
                </p>
              </div>
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
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>
            <div className="space-y-6">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={
                      item.uploadedImageUrl || "https://via.placeholder.com/150"
                    }
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.name || item?.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      by {item.artistName}
                    </p>
                    <p className="text-pastel-pink font-medium mt-1">
                      ₹{item.price.toFixed(2)}
                    </p>
                    {item.quantity && (
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    )}
                    {item?.deliveryNote && (
                      <p className="text-xs text-gray-600 mt-2">
                        {item?.deliveryNote}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/get-yours")}
                  >
                    Buy Again
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping and Payment Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Details
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">{order.shippingAddress?.name}</p>
                {/* <p>
                  {order.shippingAddress?.line1}, {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state},{" "}
                  {order.shippingAddress?.pincode},{" "}
                  {order.shippingAddress?.country}
                </p> */}
                <p>
                  {order.shipping_details.address.line1},{" "}
                  {order.shipping_details.address.city},{" "}
                  {order.shipping_details.address.state},{" "}
                  {order.shipping_details.address.pincode},{" "}
                  {order.shipping_details.address.country}
                </p>
                <p>
                  Phone:{" "}
                  {order.shipping_details?.senderPhone ||
                    order?.shippingDetails?.senderPhone ||
                    order?.shippingDetails?.phone ||
                    order.shipping_details.address?.phone ||
                    "Not provided"}
                </p>
                {order.trackingNumber && (
                  <p>Tracking: {order.trackingNumber}</p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Details
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Payment Method: {order.paymentMethod || "Prepaid"}</p>
                <p>Subtotal: ₹{order?.subtotal}</p>
                <p>
                  Coupon Code: {paymentData?.notes?.charges?.couponCode || ""}
                </p>
                {/* <p>
                  Shipping:
                  {order.shippingCost
                    ? (order.shippingCost / 100).toFixed(2)
                    : "Free"}
                </p> */}

                <p className="font-medium">
                  Total Paid: ₹{paymentData?.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/contact-us")}
            >
              Contact Support
            </Button>
            {/* {order.status !== "Delivered" && (
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-500 hover:bg-red-50"
              >
                Cancel Order
              </Button>
            )} */}
          </div>
        </div>

        {/* Empty State Fallback */}
        {!order.items?.length && (
          <div className="mt-8 p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No items found in this order.</p>
            <Button
              className="mt-4 bg-pastel-pink hover:bg-pastel-pink/90 text-white"
              onClick={() => navigate("/get-yours")}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
