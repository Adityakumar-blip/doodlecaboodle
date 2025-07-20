import React from "react";

const TermsOfService = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-center tracking-wide mb-6 text-gray-800">
          Terms and Conditions
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
                <a href="#terms" className="hover:text-gray-800">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#acceptance" className="hover:text-gray-800">
                  1. Acceptance of Terms
                </a>
              </li>
              <li>
                <a href="#use-of-services" className="hover:text-gray-800">
                  2. Use of Services
                </a>
              </li>
              <li>
                <a href="#orders-and-payments" className="hover:text-gray-800">
                  3. Orders and Payments
                </a>
              </li>
              <li>
                <a href="#customization" className="hover:text-gray-800">
                  4. Customization and Intellectual Property
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-gray-800">
                  5. Shipping and Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-gray-800">
                  6. Returns and Refunds
                </a>
              </li>
              <li>
                <a href="#user-conduct" className="hover:text-gray-800">
                  7. User Conduct
                </a>
              </li>
              <li>
                <a href="#limitation" className="hover:text-gray-800">
                  8. Limitation of Liability
                </a>
              </li>
              <li>
                <a href="#termination" className="hover:text-gray-800">
                  9. Termination
                </a>
              </li>
              <li>
                <a href="#governing-law" className="hover:text-gray-800">
                  10. Governing Law
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-800">
                  11. Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content - Scrollable */}
          <div className="lg:w-2/3 w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="prose prose-gray max-w-none">
              <h2
                id="terms"
                className="font-playfair text-2xl text-gray-800 mb-4"
              >
                Terms and Conditions
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to Doodle Caboodle (“we,” “us,” or “our”). These Terms
                and Conditions govern your use of www.doodlecaboodle.com (the
                “Site”) and any services, including the purchase of customized
                gifts, provided by us (collectively, the “Services”). By
                accessing or using our Services, you agree to be bound by these
                Terms and Conditions.
              </p>

              <h2
                id="acceptance"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                By accessing the Site or using our Services, you confirm that
                you are at least 18 years old (or have parental consent if under
                18) and agree to these Terms and Conditions. If you do not
                agree, please do not use our Services.
              </p>

              <h2
                id="use-of-services"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                2. Use of Services
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  You may use the Services only for lawful purposes and in
                  accordance with these Terms.
                </li>
                <li>
                  You agree to provide accurate, current, and complete
                  information when placing orders or creating an account.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities under your
                  account.
                </li>
              </ul>

              <h2
                id="orders-and-payments"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                3. Orders and Payments
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Order Placement:</strong> All orders are subject to
                  acceptance and availability. We reserve the right to refuse or
                  cancel orders at our discretion.
                </li>
                <li>
                  <strong>Pricing:</strong> Prices are listed in INR and are
                  subject to change without notice. All prices include
                  applicable taxes unless otherwise stated.
                </li>
                <li>
                  <strong>Payment:</strong> Payments are processed securely via
                  Razorpay. You agree to provide valid payment information and
                  authorize us to charge the total amount for your order.
                </li>
                <li>
                  <strong>Order Confirmation:</strong> You will receive an email
                  confirmation upon successful order placement. This does not
                  guarantee fulfillment until processing is complete.
                </li>
              </ul>

              <h2
                id="customization"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                4. Customization and Intellectual Property
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>User-Submitted Content:</strong> By uploading photos,
                  text, or other materials for customization, you confirm that
                  you own or have the right to use such content and grant us a
                  non-exclusive, royalty-free license to use it for creating
                  your order.
                </li>
                <li>
                  <strong>Our Designs:</strong> All designs, sketches, and
                  crafts created by Doodle Caboodle remain our intellectual
                  property. You may not reproduce, distribute, or modify them
                  without our permission.
                </li>
                <li>
                  <strong>Content Restrictions:</strong> You agree not to submit
                  content that is unlawful, offensive, or infringes on
                  third-party rights.
                </li>
              </ul>

              <h2
                id="shipping"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                5. Shipping and Delivery
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Shipping:</strong> We ship to addresses provided
                  during checkout. Shipping times and costs vary based on
                  location and product type.
                </li>
                <li>
                  <strong>Delivery Delays:</strong> We are not responsible for
                  delays caused by third-party couriers, customs, or unforeseen
                  circumstances (e.g., natural disasters).
                </li>
                <li>
                  <strong>Damaged Goods:</strong> If your order arrives damaged,
                  contact us within 24 hours of Delivery.
                </li>
              </ul>

              <h2
                id="returns"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                6. Returns and Refunds
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Customized Products:</strong> Due to their
                  personalized nature, customized products are non-returnable
                  unless defective or incorrect.
                </li>
                <li>
                  <strong>Defective Products:</strong> If a product is defective
                  or not as ordered, contact us within 7 days for a replacement
                  or refund.
                </li>
                <li>
                  <strong>Refund Process:</strong> Refunds, if approved, will be
                  processed within 14 days to the original payment method.
                </li>
              </ul>

              <h2
                id="user-conduct"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                7. User Conduct
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                You agree not to:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  Use the Services for any illegal or unauthorized purpose.
                </li>
                <li>
                  Attempt to gain unauthorized access to our systems or
                  networks.
                </li>
                <li>
                  Interfere with the functionality of the Site or Services.
                </li>
              </ul>

              <h2
                id="limitation"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                8. Limitation of Liability
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                To the fullest extent permitted by law, Doodle Caboodle is not
                liable for any indirect, incidental, or consequential damages
                arising from your use of the Services, including but not limited
                to loss of data, profits, or business opportunities.
              </p>

              <h2
                id="termination"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                9. Termination
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We reserve the right to suspend or terminate your access to the
                Services at our discretion, particularly if you violate these
                Terms or engage in fraudulent activity.
              </p>

              <h2
                id="governing-law"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                10. Governing Law
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                These Terms are governed by the laws of India. Any disputes will
                be resolved in the courts of [Your City], India.
              </p>

              <h2
                id="contact"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                11. Contact Us
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                For questions, concerns, or support regarding these Terms,
                please contact us:
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

export default TermsOfService;
