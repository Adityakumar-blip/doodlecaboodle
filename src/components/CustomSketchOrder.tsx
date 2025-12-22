import React, { useState, useEffect, useContext } from "react";
import {
  Upload,
  Plus,
  Info,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Camera,
  Palette,
  Ruler,
  Users,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "@/context/CartContext";

import photoguide from "@/assets/photoguide02.png";
import A5 from "@/assets/A5.png";
import A4 from "@/assets/A4.jpg";
import { uploadImagesToCloudinary } from "@/lib/UplaodCloudinary";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import { Value } from "@radix-ui/react-select";

interface OrderDetails {
  paperSize: string;
  numberOfFaces: number;
  background: string;
  artworkType?: string;
  image: File | null;
  frame: string | null;
}

interface PaperSize {
  value: string;
  label: string;
  price: number;
  originalPrice: number;
  offerPrice: number;
  description: string;
  processingTime: string;
  image?: any;
  deliveryNote?: any;
}

interface BackgroundOption {
  value: string;
  label: string;
  price: number;
  description: string;
}

interface FrameOption {
  value: string;
  label: string;
  price: number;
}

interface Guideline {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface Size {
  value: string;
  label: string;
  priceAdjustment: number;
}

interface CartItem {
  id: string;
  artworkId: string;
  title: string;
  artistName: string;
  price: number;
  quantity: number;
  size: Size;
  uploadedImageUrl: string;
  timestamp: number;
  frame: string | null;
  deliveryNote?: any;
  categoryId?: string;
}

const CustomSketchOrder: React.FC = () => {
  const { cartItems, addToCart, setCartItems, toggleCart } =
    useContext(CartContext);
  const { state } = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    paperSize: "A4",
    numberOfFaces: 1,
    background: "white",
    artworkType: "sketch",
    image: null,
    frame: null,
  });
  const [price, setPrice] = useState<number>(0);
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);

  // 🔹 Reset guideline flag on page refresh
useEffect(() => {
  localStorage.removeItem("photoGuidelinesShown");
}, []);


  const artworkId: string = `artwork-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const artworkType = [
    {
      id: "sketch",
      name: "Pencil Sketch",
      value: "sketch",
    },
    // {
    //   id: "painting",
    //   name: "Painting",
    //   value: "painting",
    // },
  ];

  const paperSizes: PaperSize[] = [
    {
      value: "A5",
      label: "A5",
      price: 1499,
      originalPrice: 1999,
      offerPrice: 999,
      description: "148×210mm (5.8×8.3in)",
      processingTime: "2-3 days",
      image: A5,
      deliveryNote: `Custom sketches are hand-drawn by our artists.
Processing time is 2-3 days (excluding shipping).
We’ll notify you once your artwork is ready to ship via WhatsApp and email.`,
    },
    {
      value: "A4",
      label: "A4",
      price: 2499,
      originalPrice: 2999,
      offerPrice: 1999,
      description: "210×297mm (8.3×11.7in)",
      processingTime: "3-4 days",
      image: A4,
      deliveryNote: `Custom sketches are hand-drawn by our artists.
Processing time is 3–4 days (excluding shipping).
We’ll notify you once your artwork is ready to ship via WhatsApp and email.`,
    },
    {
      value: "A3",
      label: "A3",
      price: 3499,
      originalPrice: 4199,
      offerPrice: 2999,
      description: "297×420mm (11.7×16.5in)",
      processingTime: "4-5 days",
      image: "",
      deliveryNote: `Custom sketches are hand-drawn by our artists.
Processing time is 4-5 days (excluding shipping).
We’ll notify you once your artwork is ready to ship via WhatsApp and email.`,
    },
  ];

  const backgroundOptions: BackgroundOption[] = [
    {
      value: "white",
      label: "White Background",
      price: 0,
      description: "Clean white backdrop",
    },
    {
      value: "black",
      label: "Black Background",
      price: 0,
      description: "Solid black backdrop",
    },
  ];

  const frameOptions: FrameOption[] = [
    { value: "black", label: "Black Frame", price: 0 },
    { value: "white", label: "White Frame", price: 0 },
  ];

  const calculatePrice = (): void => {
    let basePrice: number = 0;
    const selectedPaper = paperSizes.find(
      (p) => p.value === orderDetails.paperSize
    );
    if (selectedPaper) {
      basePrice = selectedPaper.price;
      if (orderDetails.numberOfFaces === 2) {
        // 2 faces pricing
        basePrice += orderDetails.paperSize === "A5" ? 500 : 700;
      } else if (orderDetails.numberOfFaces > 2) {
        // 3 or more faces pricing
        const additionalFaces = orderDetails.numberOfFaces - 1;
        const additionalFacePrice = orderDetails.paperSize === "A5" ? 300 : 500;
        basePrice += additionalFaces * additionalFacePrice;
      }
    }

    const framePrice: number =
      orderDetails.frame && orderDetails.paperSize === "A5"
        ? 70
        : orderDetails.frame && orderDetails.paperSize === "A4"
        ? 100
        : orderDetails.frame && orderDetails.paperSize === "A3"
        ? 150
        : 0;

    setPrice(basePrice + framePrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [orderDetails]);

  const handleInputChange = (
    name: keyof OrderDetails,
    value: string | number | null
  ): void => {
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("File size should be less than 100MB");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Please upload a JPEG or PNG image");
        return;
      }
      setOrderDetails((prev) => ({ ...prev, image: file }));
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
    }
  };

  const nextStep = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number): void => {
    setCurrentStep(stepIndex);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "productCategories")
        );
        const fetchedCategories: { id: string; name: string }[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data?.name) {
            fetchedCategories.push({
              id: doc.id,
              name: data.name,
            });
          }
        });

        // ✅ Filter by "Portrait" or "Sketch"
        const filtered = fetchedCategories.filter((cat) =>
          /portrait|sketch/i.test(cat.name)
        );

        setCategories(filtered);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddToCart = async (): Promise<void> => {
    if (!orderDetails.image || !orderDetails.paperSize || !artworkId) return;

    setIsAddingToCart(true);
    try {
      const imageUrl = await uploadImagesToCloudinary(orderDetails.image);

      const selectedSize = paperSizes.find(
        (p) => p.value === orderDetails.paperSize
      );
      let basePrice = selectedSize ? selectedSize.price : 0;
      if (orderDetails.numberOfFaces === 2) {
        basePrice += orderDetails.paperSize === "A5" ? 500 : 700;
      } else if (orderDetails.numberOfFaces > 2) {
        const additionalFaces = orderDetails.numberOfFaces - 1;
        const additionalFacePrice = orderDetails.paperSize === "A5" ? 300 : 500;
        basePrice += additionalFaces * additionalFacePrice;
      }
      const framePrice =
        orderDetails.frame && orderDetails.paperSize === "A5"
          ? 70
          : orderDetails.frame && orderDetails.paperSize === "A4"
          ? 100
          : orderDetails.frame && orderDetails.paperSize === "A3"
          ? 150
          : 0;
      const adjustedPrice = basePrice + framePrice;

      const deliveryNote = paperSizes.filter(
        (paper) => paper.value === orderDetails.paperSize
      );

      const cartItem: CartItem = {
        id: `${artworkId}-${Date.now()}`,
        artworkId,
        title: `Custom Sketch (${orderDetails.paperSize})`,
        price: adjustedPrice,
        quantity,
        artistName: "",
        size: {
          value: orderDetails.paperSize,
          label: selectedSize?.label || orderDetails.paperSize,
          priceAdjustment: selectedSize.price,
        },
        uploadedImageUrl: imageUrl,
        timestamp: Date.now(),
        frame: orderDetails.frame,
        deliveryNote: deliveryNote[0].deliveryNote,
        categoryId: categories[0]?.id || state,
      };

      await addToCart(cartItem as any);
      setCartItems([cartItem as any]);

      setShowUploadSection(false);
      setOrderDetails((prev) => ({ ...prev, image: null, frame: null }));
      setQuantity(1);
      setIsAddedToCart(true);
      toggleCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setUploadError("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const guidelines: Guideline[] = [
    {
      icon: <Camera className="w-4 h-4" />,
      title: "High Resolution",
      description: "Minimum 1000x1000px for best quality",
    },
    {
      icon: <Upload className="w-4 h-4" />,
      title: "File Format",
      description: "JPEG or PNG",
    },
    {
      icon: <Palette className="w-4 h-4" />,
      title: "Good Lighting",
      description: "Well-lit area",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Clear Faces",
      description: "All faces clearly visible",
    },
  ];

  const ArtworkStep: React.FC = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
          Artwork Type
        </h3>
        <p className="text-black-500 text-sm sm:text-base">
          Choose your preferred type
        </p>
      </div>
      <div className="space-y-3">
        {artworkType.map((size) => (
          <motion.div
            key={size.value}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              orderDetails.artworkType === size.value
                ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
                : "border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => handleInputChange("artworkType", size.value)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                  {size.name}
                </h4>
              </div>
              <div className="text-right">
                {orderDetails.artworkType === size.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PaperSizeStep: React.FC = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
          Paper Size
        </h3>
        <p className="text-black-500 text-sm sm:text-base">
          Choose your preferred format
        </p>
      </div>
      <div className="space-y-3">
        {paperSizes.map((size) => (
          <motion.div
            key={size.value}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              orderDetails.paperSize === size.value
                ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
                : "border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => handleInputChange("paperSize", size.value)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-black-800 text-sm sm:text-base">
                  {size.label}
                </h4>
                <p className="text-xs sm:text-sm text-black-500">
                  {size.description} • {size.processingTime}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  ₹{size.price}
                </p>
                {orderDetails.paperSize === size.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const NumberOfFacesStep: React.FC = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-black-800 mb-2">
          Number of Faces
        </h3>
        <p className="text-black-500 text-sm sm:text-base">
          How many people in the sketch?
        </p>
      </div>
      <div className="bg-[hsl(38deg_55.07%_81.42%)] p-4 sm:p-6 rounded-lg">
        <div className="flex items-center justify-center space-x-4 sm:space-x-6">
          <button
            onClick={() =>
              handleInputChange(
                "numberOfFaces",
                Math.max(1, orderDetails.numberOfFaces - 1)
              )
            }
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-blue-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <motion.div
            key={orderDetails.numberOfFaces}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-light text-black-800 mb-1">
              {orderDetails.numberOfFaces}
            </div>
            <div className="text-xs sm:text-sm text-black-500">
              {orderDetails.numberOfFaces === 1 ? "Face" : "Faces"}
            </div>
          </motion.div>
          <button
            onClick={() =>
              handleInputChange("numberOfFaces", orderDetails.numberOfFaces + 1)
            }
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-blue-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs sm:text-sm text-black-500">
            {orderDetails.numberOfFaces === 1
              ? `Base price`
              : orderDetails.numberOfFaces === 2
              ? `₹${
                  orderDetails.paperSize === "A5" ? 500 : 700
                }/additional face`
              : `₹${
                  orderDetails.paperSize === "A5" ? 300 : 500
                }/additional face`}
          </p>
          {orderDetails.numberOfFaces > 1 && (
            <span className="inline-block bg-accent text-blue-600 px-2 py-1 rounded text-xs mt-2">
              Group Order
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const BackgroundStep: React.FC = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
          Background
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Choose background style
        </p>
      </div>
      <div className="space-y-3">
        {backgroundOptions.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              orderDetails.background === option.value
                ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
                : "border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => handleInputChange("background", option.value)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                  {option.label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {option.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  Free
                </p>
                {orderDetails.background === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const FrameStep: React.FC = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
          Frame
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Choose frame option
        </p>
      </div>
      <div className="space-y-3">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            orderDetails.frame === null
              ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
              : "border-gray-200 hover:border-blue-200"
          }`}
          onClick={() => handleInputChange("frame", null)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                No Frame
              </h4>
              <p className="text-xs sm:text-sm text-gray-500">Sketch only</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800 text-sm sm:text-base">
                Free
              </p>
              {orderDetails.frame === null && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        {frameOptions.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              orderDetails.frame === option.value
                ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
                : "border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => handleInputChange("frame", option.value)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                  {option.label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {orderDetails.paperSize === "A5"
                    ? "₹70"
                    : orderDetails.paperSize === "A4"
                    ? "₹100"
                    : "₹150"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {orderDetails.paperSize === "A5"
                    ? "₹70"
                    : orderDetails.paperSize === "A4"
                    ? "₹100"
                    : "₹150"}
                </p>
                {orderDetails.frame === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ImageUploadStep: React.FC = () => {
    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files?.[0];
    //   if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    //     setOrderDetails({ image: file });
    //     setUploadError(null);
    //   } else {
    //     setUploadError("Please upload a valid JPEG or PNG image");
    //   }
    // };

    const handleRemoveImage = () => {
      setOrderDetails((prev) => ({ ...prev, image: null }));
      setUploadError(null);
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">
            Reference Image
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Upload your photo
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <label
            className={`flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
              orderDetails.image
                ? "border-blue-300 bg-[hsl(38deg_55.07%_81.42%)]"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {orderDetails.image ? (
                <>
                  <img
                    src={URL.createObjectURL(orderDetails.image)}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain rounded-lg p-2"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 sm:py-6">
                  <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mb-3" />
                  <p className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
                    Click to upload
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    JPEG or PNG
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
            />
          </label>
        </motion.div>
        {uploadError && (
          <p className="text-red-500 text-xs sm:text-sm">{uploadError}</p>
        )}
        <button
          onClick={() => setShowGuidelines(true)}
          className="w-full py-2 sm:py-3 px-4 bg-[hsl(38deg_55.07%_81.42%)] text-gray-700 rounded-lg font-medium hover:bg-[hsl(38deg_55.07%_81.42%)] transition-colors flex items-center justify-center text-sm sm:text-base"
        >
          <Info className="w-4 h-4 mr-2" />
          Photo Guidelines
        </button>
      </div>
    );
  };

  // Only 4 steps now, step 4 and 5 commented out
  const steps: Step[] = [
    {
      id: 0,
      title: "Artwork",
      description: "Type",
      icon: <Palette className="w-4 h-4" />,
      component: <ArtworkStep />,
    },
    {
      id: 1,
      title: "Size",
      description: "Paper format",
      icon: <Ruler className="w-4 h-4" />,
      component: <PaperSizeStep />,
    },
    {
      id: 2,
      title: "Faces",
      description: "How many",
      icon: <Users className="w-4 h-4" />,
      component: <NumberOfFacesStep />,
    },
    // {
    //   id: 3,
    //   title: "Background",
    //   description: "Style choice",
    //   icon: <Palette className="w-4 h-4" />,
    //   component: <BackgroundStep />,
    // },
    // {
    //   id: 4,
    //   title: "Frame",
    //   description: "Frame option",
    //   icon: <Ruler className="w-4 h-4" />,
    //   component: <FrameStep />,
    // },
    {
      id: 5,
      title: "Upload",
      description: "Reference photo",
      icon: <Camera className="w-4 h-4" />,
      component: <ImageUploadStep />,
    },
  ];

  useEffect(() => {
  const isLastStep = currentStep === steps.length - 1;

  if (isLastStep) {
    const alreadyShown = localStorage.getItem("photoGuidelinesShown");

    if (!alreadyShown) {
      setTimeout(() => {
        setShowGuidelines(true);
        localStorage.setItem("photoGuidelinesShown", "true");
      }, 200);
    }
  }
}, [currentStep, steps.length]);
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPaperSize = paperSizes.find(
    (p) => p.value === orderDetails.paperSize
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goToCart = () => {
    // Redirect to cart page (adjust the path based on your routing)
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">
            Custom Sketch Order
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Create your personalized sketch
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all duration-200 ${
                        index === currentStep
                          ? "bg-primary text-white"
                          : completedSteps.includes(index)
                          ? "bg-accent text-gray-600"
                          : "bg-accent text-black"
                      }`}
                      onClick={() => goToStep(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {completedSteps.includes(index) &&
                      index !== currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 sm:w-12 h-px mx-2 sm:mx-3 text-black ${
                          completedSteps.includes(index)
                            ? "bg-blue-200"
                            : "bg-accent"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  {steps[currentStep].title} • {steps[currentStep].description}
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-6 sm:p-8 mb-6 sm:mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {steps[currentStep].component}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 w-full sm:w-auto ${
                    currentStep === 0
                      ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                      : "bg-primary text-gray-700 hover:bg-accent"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors w-full sm:w-auto"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={isAddedToCart ? toggleCart : handleAddToCart}
                    disabled={
                      (!orderDetails.image || isAddingToCart) && !isAddedToCart
                    }
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 w-full sm:w-auto ${
                      isAddedToCart
                        ? "bg-pastel-peach text-white"
                        : orderDetails.image && !isAddingToCart
                        ? "bg-primary text-white hover:bg-blue-500"
                        : "bg-gray-200 text-black cursor-not-allowed"
                    }`}
                  >
                    {isAddedToCart ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Go to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[500px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[hsl(38deg_55.07%_81.42%)] border border-gray-100 rounded-lg p-4 sm:p-6 sticky top-4 sm:top-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4 text-md sm:text-lg">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      Paper Size ({orderDetails.paperSize})
                    </span>
                    <button
                      onClick={openModal}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="View paper size container"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                  <span className="text-gray-800">
                    ₹{currentPaperSize?.price}
                  </span>
                </div>
                {orderDetails.numberOfFaces === 2 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Surcharge (2 faces)</span>
                    <span className="text-gray-800">
                      ₹{orderDetails.paperSize === "A5" ? 500 : 700}
                    </span>
                  </div>
                )}
                {orderDetails.numberOfFaces > 2 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">
                      Additional Faces ({orderDetails.numberOfFaces - 1})
                    </span>
                    <span className="text-gray-800">
                      ₹
                      {(orderDetails.numberOfFaces - 1) *
                        (orderDetails.paperSize === "A5" ? 300 : 500)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Background</span>
                  <span className="text-gray-800">Free</span>
                </div>
                {orderDetails.frame && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">
                      Frame ({orderDetails.frame})
                    </span>
                    <span className="text-gray-800">
                      ₹
                      {orderDetails.paperSize === "A5"
                        ? 70
                        : orderDetails.paperSize === "A4"
                        ? 100
                        : 150}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    Total
                  </span>
                  <motion.span
                    key={price}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-lg sm:text-xl font-medium text-gray-800"
                  >
                    ₹{price.toFixed(2)}
                  </motion.span>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 p-3 bg-white rounded border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 leading-relaxed">
                  Custom sketches are hand-drawn by our artists. Processing time
                  is {currentPaperSize?.processingTime} (excluding shipping).
                </p>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {orderDetails.paperSize} Paper Size
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-center mb-4">
                      <img
                        src={currentPaperSize?.image}
                        alt={`${orderDetails.paperSize} paper size container`}
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {orderDetails.paperSize} Paper Size
                      </h3>
                      <p className="text-gray-600 text-sm">
                        This is how your sketch will look in the{" "}
                        {orderDetails.paperSize}.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showGuidelines && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-medium text-black-800">
                      Photo Guidelines
                    </h2>
                    <button
                      onClick={() => setShowGuidelines(false)}
                      className="text-black-400 hover:text-black-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {guidelines.map((guideline, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                          {guideline.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-black-800 text-sm">
                            {guideline.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-black-500 mt-0.5">
                            {guideline.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowGuidelines(false)}
                    className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors text-sm sm:text-base"
                  >
                    Got it
                  </button>
                </div>

                <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 sm:p-6">
                  <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <img
                      src={photoguide}
                      alt="Photography guidelines illustration"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSketchOrder;
