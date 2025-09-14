import {
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { uploadImagesToCloudinary } from "@/lib/UplaodCloudinary";
import { db } from "@/firebase/firebaseconfig";

const ReviewModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Stores Cloudinary URL
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Stores local preview URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(1);
        setRating(0);
        setHoverRating(0);
        setReviewText("");
        setName("");
        setEmail("");
        setUploadedImage(null);
        setImagePreview(null);
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return rating > 0;
      case 2:
        return reviewText.trim().length > 0;
      case 3:
        return name.trim().length > 0 && email.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create a local preview URL for instant display
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Upload image to Cloudinary in the background
        const imageUrl = await uploadImagesToCloudinary(file);
        setUploadedImage(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
        // Clear preview if upload fails
        setImagePreview(null);
      }
    }
  };

  // Clean up preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Add review to Firebase Firestore
      await addDoc(collection(db, "reviews"), {
        rating,
        reviewText,
        name,
        email,
        image: uploadedImage,
        isPublished: false,
        isActive: false,
        createdAt: new Date(),
      });
      setIsSubmitting(false);
      setIsSuccess(true);

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setIsSubmitting(false);
      alert("Failed to submit review. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            {currentStep > 1 && !isSuccess && (
              <button
                onClick={prevStep}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {isSuccess ? "Thank You!" : "Write a Review"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="px-6 py-3">
            <div className="flex items-center space-x-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep ? "bg-black" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Review Submitted!
              </h3>
              <p className="text-gray-600">
                Thank you for your feedback. Your review will be published soon.
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Rating */}
              {currentStep === 1 && (
                <div className="text-center space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      How was your experience?
                    </h3>
                    <p className="text-gray-600">
                      Rate your overall satisfaction
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transform hover:scale-110 transition-transform"
                      >
                        <Star
                          size={40}
                          fill={
                            star <= (hoverRating || rating)
                              ? "#FFD600"
                              : "transparent"
                          }
                          color={
                            star <= (hoverRating || rating)
                              ? "#FFD600"
                              : "#D1D5DB"
                          }
                        />
                      </button>
                    ))}
                  </div>

                  {rating > 0 && (
                    <p className="text-lg font-semibold text-gray-700 animate-in fade-in duration-300">
                      {rating === 5
                        ? "Excellent!"
                        : rating === 4
                        ? "Very Good!"
                        : rating === 3
                        ? "Good!"
                        : rating === 2
                        ? "Fair"
                        : "Poor"}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Review Text */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Tell us more
                    </h3>
                    <p className="text-gray-600">
                      Share details about your experience
                    </p>
                  </div>

                  <div>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="What did you love about your portrait? Any specific details you'd like to highlight?"
                      rows={6}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500 mt-2">
                      {reviewText.length}/500 characters
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Info */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Your Information
                    </h3>
                    <p className="text-gray-600">
                      Let others know who this review is from
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll verify your purchase before publishing the review
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Photo Upload (Optional) */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Add a Photo
                    </h3>
                    <p className="text-gray-600">
                      Share an image of your portrait (optional)
                    </p>
                  </div>

                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Uploaded review preview"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setUploadedImage(null);
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="block">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                          <Camera
                            size={48}
                            className="mx-auto text-gray-400 mb-4"
                          />
                          <p className="text-gray-600 mb-2">
                            Tap to upload a photo
                          </p>
                          <p className="text-sm text-gray-500">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex space-x-3">
              {currentStep < totalSteps ? (
                <>
                  <button
                    onClick={() => onClose()}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Star size={16} />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
