import React, { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Thank you for your message! We'll get back to you soon. 💕");
    }, 1500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("doodlecaboodle08@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email");
    }
  };

  const socialLinks = [
    {
      icon: Instagram,
      url: "https://www.instagram.com/doodlecaboodle.in/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: Facebook,
      url: "https://www.facebook.com/doodlecaboodle.in",
      label: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      icon: Twitter,
      url: "https://x.com/doodle_cabo0dle",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/company/doodle-caboodle/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-gray-800 tracking-wide mb-6">
            Connect with Us
          </h1>
          <p className="text-center text-gray-600 uppercase tracking-widest text-sm mb-6">
            We'd love to hear from you
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Whether it's about a gift, a story, or just a friendly hello — our
              inbox is always open, and our hearts are always full.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Social Links & Contact Info */}
          <div className=" w-full bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg lg:sticky lg:top-20 h-fit">
            <h3 className="font-playfair text-xl text-gray-800 mb-4">
              Get in Touch
            </h3>
            {/* Social Media Section */}
            <div className="mb-6">
              <h4 className="text-lg text-gray-700 mb-3">Follow Us</h4>
              <ul className="text-gray-600 text-sm space-y-2">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 hover:text-gray-800 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                      <span>{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Direct Email Section */}
            <div>
              <h4 className="text-lg text-gray-700 mb-3">Direct Email</h4>
              <div className="flex items-center gap-3 p-4 bg-white/80 rounded-lg border border-gray-200 hover:border-gray-300 w-full overflow-hidden">
                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <span className="font-mono text-gray-700 truncate">
                  doodlecaboodle08@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 min-w-[40px]"
                  title="Copy email"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2 text-center">
                  Email copied to clipboard! 📋
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-2/3 w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <h3 className="font-playfair text-xl text-gray-800 mb-6">
              Write to Us
            </h3>
            <div className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 text-gray-700 transition-colors ${
                    focusedField === "name" ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  Name
                </label>
                <div
                  className={`relative flex items-center rounded-lg border transition-all duration-300 ${
                    focusedField === "name"
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-200 bg-white/80 hover:border-gray-300"
                  }`}
                >
                  <User
                    className={`w-5 h-5 ml-4 transition-colors ${
                      focusedField === "name"
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full py-3 px-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 text-gray-700 transition-colors ${
                    focusedField === "email" ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  Email
                </label>
                <div
                  className={`relative flex items-center rounded-lg border transition-all duration-300 ${
                    focusedField === "email"
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-200 bg-white/80 hover:border-gray-300"
                  }`}
                >
                  <Mail
                    className={`w-5 h-5 ml-4 transition-colors ${
                      focusedField === "email"
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full py-3 px-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 text-gray-700 transition-colors ${
                    focusedField === "message"
                      ? "text-gray-800"
                      : "text-gray-600"
                  }`}
                >
                  Message
                </label>
                <div
                  className={`relative flex items-start rounded-lg border transition-all duration-300 ${
                    focusedField === "message"
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-200 bg-white/80 hover:border-gray-300"
                  }`}
                >
                  <MessageSquare
                    className={`w-5 h-5 ml-4 mt-3 transition-colors ${
                      focusedField === "message"
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="w-full py-3 px-4 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="Share your thoughts or questions"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`w-full flex items-center justify-center py-3 px-6 text-white font-medium rounded-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-900 hover:shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Send Message
                    <Send className="w-5 h-5" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
