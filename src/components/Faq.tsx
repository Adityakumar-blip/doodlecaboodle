import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/firebase/firebaseconfig";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFAQ, setOpenFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      const fetchedFAQs = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        }))
        .filter((faq: any) => faq.status === "active") as FAQ[];
      setFaqs(fetchedFAQs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenFaq(openFAQ === id ? null : id);
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-center tracking-wide mb-8 sm:mb-12 md:mb-16 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading FAQs...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-center tracking-wide mb-8 sm:mb-12 md:mb-16 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {faqs.length === 0 ? (
            <div className="text-center text-gray-600 text-base sm:text-lg">
              No FAQs available at the moment.
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="mb-4 border-b border-gray-200">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center py-3 sm:py-4 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg md:text-lg font-medium text-gray-700 uppercase tracking-widest font-sans">
                    {faq.question}
                  </span>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg py-3 sm:py-4 pr-4 sm:pr-8 leading-relaxed font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
