import React from "react";

const ShippingAndRefundPolicy = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-center tracking-wide mb-6 text-gray-800">
          Shipping and Refund Policy
        </h1>
        <p className="text-center text-gray-600 uppercase tracking-widest text-sm mb-12">
          Last Updated: July 03, 2025
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Static on large screens */}
          <div className="lg:w-1/3 w-full bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg lg:sticky lg:top-20 h-fit">
            <h3 className="font-playfair text-xl text-gray-800 mb-4">
              Table of Contents
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>
                <a href="#shipping-refund" className="hover:text-gray-800">
                  Shipping and Refund Policy
                </a>
              </li>
              <li>
                <a href="#order-processing" className="hover:text-gray-800">
                  1. Order Processing and Dispatch
                </a>
              </li>
              <li>
                <a href="#shipping-policy" className="hover:text-gray-800">
                  2. Shipping Policy Details
                </a>
              </li>
              <li>
                <a href="#refund-policy" className="hover:text-gray-800">
                  3. Refund and Compensation Policy
                </a>
              </li>
              <li>
                <a href="#free-gift" className="hover:text-gray-800">
                  4. Free Gift Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-800">
                  5. Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content - Scrollable */}
          <div className="lg:w-2/3 w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="prose prose-gray max-w-none">
              <h2
                id="shipping-refund"
                className="font-playfair text-2xl text-gray-800 mb-4"
              >
                Shipping and Refund Policy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to Doodle Caboodle (“we,” “us,” or “our”). This Shipping
                and Refund Policy outlines how we process, ship, and handle
                refunds for orders placed on www.doodlecaboodle.com (the
                “Site”). By using our Services, you agree to the terms outlined
                below.
              </p>

              <h2
                id="order-processing"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                1. Order Processing and Dispatch
              </h2>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Processing Time
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  Orders are typically processed and dispatched within 6-9
                  working days.
                </li>
                <li>
                  Our working hours are 10:30 AM to 6:00 PM (Monday to
                  Saturday).
                </li>
              </ul>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Delivery Timeline
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  Standard delivery within India is expected within 5-15
                  business days, excluding Sundays and public holidays.
                </li>
                <li>
                  For urgent delivery needs, customers must inform our team in
                  advance for prioritization. Failure to do so will be
                  considered the customer's responsibility, and no cancellations
                  will be accepted due to delays.
                </li>
              </ul>

              <h2
                id="shipping-policy"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                2. Shipping Policy Details
              </h2>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Combined Shipment
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All products in an order are shipped together in one shipment.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Delivery Partners
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Orders are packed and handed over to trusted delivery partners
                who deliver the package to the provided address.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Shipping Charges
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Within India:</strong> Shipping charges are calculated
                  at the time of billing. We offer free shipping for select
                  products. Note: A shipping fee may still apply for certain
                  states due to logistical constraints.
                </li>
                <li>
                  <strong>Non-Refundable Fees:</strong> A non-refundable
                  shipping fee is charged for all prepaid orders. If a customer
                  rejects delivery, the fee will not be refunded.
                </li>
                <li>
                  <strong>Additional Charges:</strong> Some areas, particularly
                  in Northeast India or outskirt areas, may require an extra
                  shipping charge. Customers will be contacted in such cases.
                </li>
              </ul>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">Packaging</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Products are securely packed with bubble wrap and additional
                packaging for fragile items to ensure they arrive in perfect
                condition.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Shipping Locations
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Doodle Caboodle ships throughout India.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Shipping Delay Policy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Doodle Caboodle shall not be held liable for any delays in
                shipping beyond our control, particularly those caused by
                third-party courier services.
              </p>

              <h2
                id="refund-policy"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                3. Refund and Compensation Policy
              </h2>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                No Refunds on Personalized Orders
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                As each gift is custom-made using your provided photos, names,
                or personal messages, we are unable to offer refunds under the
                following circumstances:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Change of mind after placing the order.</li>
                <li>
                  Incorrect details provided by the customer (e.g., spelling
                  mistakes, wrong photo).
                </li>
                <li>
                  Minor artistic variations, as each item is handmade and may
                  differ slightly from digital previews.
                </li>
              </ul>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Replacements for Damaged or Wrong Items
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer a free replacement in the following cases:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>The product is physically damaged in transit.</li>
                <li>You received the wrong product or personalization.</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                Conditions for replacements:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>You must notify us within 24 hours of delivery.</li>
                <li>Share clear unboxing videos of the damage or issue.</li>
                <li>
                  The product must be unused and in its original packaging.
                </li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                After verification, a new item will be created and shipped at no
                additional cost.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Late Deliveries
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We aim to meet all delivery timelines, but delays caused by
                courier partners or natural events are not eligible for
                compensation. If your delivery is significantly delayed due to
                our error, please reach out at{" "}
                <a
                  href="mailto:doodlecaboodle08@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  doodlecaboodle08@gmail.com
                </a>
                , and we’ll review the case with care.
              </p>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                How to Request a Replacement or Compensation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Email us at{" "}
                <a
                  href="mailto:doodlecaboodle08@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  doodlecaboodle08@gmail.com
                </a>{" "}
                with:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Your order ID.</li>
                <li>A brief description of the issue.</li>
                <li>Clear video proof of damage or mismatch.</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                We respond within 1–2 business days.
              </p>

              <h2
                id="free-gift"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                4. Free Gift Policy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                At Doodle Caboodle, we love surprising you with free gifts on
                special offers! However, in rare cases where the displayed free
                gift is out of stock, we reserve the right to replace it with an
                equivalent value product without delaying your order. This
                ensures that your main order dispatch is never held up due to
                free gift availability.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thank you for understanding and supporting our commitment to
                smooth and joyful deliveries! 💛
              </p>

              <h2
                id="contact"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                5. Contact Us
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                For any queries regarding shipping, refunds, or our Services,
                please reach out to us:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-none pl-5 space-y-2">
                <li>
                  📧 Email:{" "}
                  <a
                    href="mailto:doodlecaboodle08@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    doodlecaboodle08@gmail.com
                  </a>
                </li>
                <li>❤️ Doodle Caboodle – Gifting Emotion Through Art</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingAndRefundPolicy;
