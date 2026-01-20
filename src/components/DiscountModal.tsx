import React, { useState, useEffect } from "react";

const DiscountModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const couponCode = "DC20";

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

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const copyToClipboard = async () => {
    await loadConfettiScript();
    navigator.clipboard.writeText(couponCode);
    setCopied(true);

    // Trigger confetti
    (window as any).confetti?.({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Hide message after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-white text-black rounded-2xl shadow-lg max-w-md w-full p-8 text-center relative">
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Welcome message */}
        <p className="text-lg font-kalam text-gray-700 mb-6">
          We’re thrilled to have you here.
          <br />
          Enjoy <strong>20% OFF</strong> on your
          first portrait! + <strong> Free Shipping</strong> on all products.
        </p>

        {/* Coupon code */}
        <h1 className="text-4xl font-semibold font-poppins tracking-wider mb-3">
          {couponCode}
        </h1>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="text-lg text-white bg-black px-3 py-1 rounded-sm hover:underline"
        >
          Copy
        </button>

        {/* Success message */}
        {copied && (
          <p className="mt-2 text-green-600 text-sm font-medium">
            Coupon code copied!
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscountModal;
