import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Doodle Caboodle?",
    answer:
      "Doodle Caboodle is your one-stop shop for heartfelt, handmade gifts. We specialize in customized portrait sketches, paintings, crochet work, pipe cleaner flowers, and more — all crafted with love and meaning.",
  },
  {
    id: 2,
    question: "How do I place an order?",
    answer: "You can go to home page and click on GET YOURS icon.",
  },
  {
    id: 3,
    question: "Can I customize the artwork?",
    answer:
      "Absolutely! Every piece is made just for you. We’re happy to personalize it your way, add your personal message you want to convey before we start making in the order section.",
  },
  {
    id: 4,
    question: "Is framing included?",
    answer: "It’s optional whether you want with frame or without.",
  },
  {
    id: 5,
    question: "What kind of photos do you need for portrait orders?",
    answer:
      "Clear, high-resolution images with good lighting are best. We prefer front-facing photos for accurate detailing. No blurry or filtered pictures, please. For more clarity visit photo guideline menu during order checkout",
  },
  {
    id: 6,
    question: "How long does it take to make a custom order?",
    answer:
      "Depending on the reference image and details, it usually takes 5–10 working days. If it’s an urgent gift, let us know — we’ll try our best to deliver on time!",
  },
  {
    id: 7,
    question: "Do you ship across India?",
    answer:
      "Yes, we ship pan-India. Shipping charges are additional and vary by location. Tracking details are provided once shipped.",
  },
  {
    id: 8,
    question: "What are your payment options?",
    answer:
      "We accept All major payment options. Full payment is required to start the process.",
  },
  {
    id: 9,
    question: "Can I return or cancel my order?",
    answer:
      "Since all products are custom-made, we do not accept cancellations or returns once the process starts. If there's any issue with your order, please contact us immediately.",
  },
  {
    id: 10,
    question: "Who creates the artwork?",
    answer:
      "Each piece is handmade by our team. We pour our hearts into every creation to make your gift truly special.",
  },
  {
    id: 11,
    question: "Can I add a small handmade note?",
    answer: "Of course! Just mention it while placing your order.",
  },
  // {
  //   id: 12,
  //   question: "Can I see work samples or reviews?",
  //   answer:
  //     "Yes! Head over to our Instagram to see previous work and the lovely messages we've received from our cherished buyers. Checkout our Works menu to see the quality output.",
  // },
];

const FAQPage = () => {
  const [openFAQ, setOpenFaq] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFaq(openFAQ === id ? null : id);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-center tracking-wide mb-8 sm:mb-12 md:mb-16 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {faqs.map((faq) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
