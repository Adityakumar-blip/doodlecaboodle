import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-center tracking-wide mb-6 text-gray-800">
          Privacy Policy
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
                <a href="#policy" className="hover:text-gray-800">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#what-we-collect" className="hover:text-gray-800">
                  1. What We Collect
                </a>
              </li>
              <li>
                <a href="#how-we-use" className="hover:text-gray-800">
                  2. How We Use Your Information
                </a>
              </li>
              <li>
                <a href="#how-we-share" className="hover:text-gray-800">
                  3. How We Share Information
                </a>
              </li>
              <li>
                <a href="#your-rights" className="hover:text-gray-800">
                  4. Your Rights & Choices
                </a>
              </li>
              <li>
                <a href="#data-retention" className="hover:text-gray-800">
                  5. Data Retention
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-gray-800">
                  6. Security
                </a>
              </li>
              <li>
                <a href="#children" className="hover:text-gray-800">
                  7. Children’s Privacy
                </a>
              </li>
              <li>
                <a href="#changes" className="hover:text-gray-800">
                  8. Changes to This Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-800">
                  9. Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content - Scrollable */}
          <div className="lg:w-2/3 w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="prose prose-gray max-w-none">
              <h2
                id="policy"
                className="font-playfair text-2xl text-gray-800 mb-4"
              >
                Privacy Policy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to Doodle Caboodle (“we,” “us,” or “our”). This Privacy
                Policy explains how we collect, use, and protect your personal
                information when you visit www.doodlecaboodle.com (the “Site”),
                place orders for our customized gifts, or interact with any of
                our services (collectively, the “Services”). By using our
                Services, you agree to the terms outlined below.
              </p>

              <h2
                id="what-we-collect"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                1. What We Collect
              </h2>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Information You Provide
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Order Details:</strong> Name, shipping/billing
                  address, email, phone number, and payment info (processed
                  securely via Razorpay).
                </li>
                <li>
                  <strong>Customization Data:</strong> Photos, text, and
                  preferences for personalized gifts like portrait sketches or
                  handmade crafts.
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password, and
                  security details (if an account is created).
                </li>
                <li>
                  <strong>Communication:</strong> Messages, feedback, or
                  inquiries sent through email, forms, or social media.
                </li>
              </ul>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Automatically Collected Data
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Usage Data:</strong> IP address, device/browser type,
                  pages visited, and actions on the Site (via cookies).
                </li>
                <li>
                  <strong>Analytics:</strong> Non-identifiable behavioral data
                  to improve user experience (e.g., via Google Analytics).
                </li>
              </ul>
              <h3 className="text-lg text-gray-700 mt-4 mb-2">
                Third-Party Sources
              </h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Razorpay:</strong> Order and payment details (refer to
                  Razorpay’s Privacy Policy).
                </li>
                <li>
                  <strong>Payment Processors:</strong> We do not store full card
                  details; secure processing is done via third parties.
                </li>
                <li>
                  <strong>Social Media:</strong> Interactions on platforms like
                  Instagram or Facebook (subject to their privacy terms).
                </li>
              </ul>

              <h2
                id="how-we-use"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                2. How We Use Your Information
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Order Fulfillment:</strong> To process, customize, and
                  deliver your handmade gifts.
                </li>
                <li>
                  <strong>Design Collaboration:</strong> To personalize products
                  using your uploaded content.
                </li>
                <li>
                  <strong>Customer Support:</strong> To respond to your queries,
                  edits, or service needs.
                </li>
                <li>
                  <strong>Marketing:</strong> To send updates on offers, new
                  launches, or gifting tips (unsubscribe anytime).
                </li>
                <li>
                  <strong>Security:</strong> To detect fraud and protect user
                  data.
                </li>
                <li>
                  <strong>Service Improvement:</strong> To analyze trends and
                  enhance features, designs, and performance.
                </li>
              </ul>

              <h2
                id="how-we-share"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                3. How We Share Information
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We only share your data when necessary:
              </p>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>With Service Providers:</strong>
                </li>
                <ul className="list-circle pl-5 space-y-1">
                  <li>Payment processing (e.g., Razorpay).</li>
                  <li>Shipping and logistics partners.</li>
                  <li>Website and analytics support.</li>
                </ul>
                <li>
                  <strong>For Legal Compliance:</strong> If required by law or
                  court order.
                </li>
                <li>
                  <strong>In Business Transfers:</strong> In a merger or
                  acquisition, your data may transfer to new owners.
                </li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                We do not sell your personal information.
              </p>

              <h2
                id="your-rights"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                4. Your Rights & Choices
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Access/Correction:</strong> Request a copy of your
                  data or correct it.
                </li>
                <li>
                  <strong>Deletion:</strong> Request data deletion (except when
                  needed for legal/accounting reasons).
                </li>
                <li>
                  <strong>Marketing Opt-Out:</strong> Unsubscribe via links in
                  emails anytime.
                </li>
                <li>
                  <strong>Cookies:</strong> You may block cookies via browser
                  settings (may limit site functionality).
                </li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed">
                To exercise these rights, email us at:{" "}
                <a
                  href="mailto:doodlecaboodle08@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  doodlecaboodle08@gmail.com
                </a>
                .
              </p>

              <h2
                id="data-retention"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                5. Data Retention
              </h2>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Orders:</strong> 3 years (for accounting/legal
                  compliance).
                </li>
                <li>
                  <strong>Custom Designs:</strong> 1 year unless deletion is
                  requested.
                </li>
                <li>
                  <strong>Accounts:</strong> Until you close your account or
                  request deletion.
                </li>
              </ul>

              <h2
                id="security"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                6. Security
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We implement standard security practices to protect your data,
                including encryption, limited access, and secure transactions.
                However, no method of transmission over the internet is 100%
                secure.
              </p>

              <h2
                id="children"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                7. Children’s Privacy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our services are not directed at children under 16. We do not
                knowingly collect data from minors. If we learn that a child has
                submitted personal information, we will delete it promptly.
              </p>

              <h2
                id="changes"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                8. Changes to This Policy
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We may update this policy periodically. Significant changes will
                be communicated via email or banners on the Site. The latest
                version will always be posted here with an updated date.
              </p>

              <h2
                id="contact"
                className="font-playfair text-2xl text-gray-800 mt-8 mb-4"
              >
                9. Contact Us
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                For questions, custom requests, or privacy-related concerns,
                reach out to us:
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

export default PrivacyPolicy;
