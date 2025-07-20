import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Brush, Gift, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import BrushStroke from "@/components/BrushStroke";

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      ref={containerRef}
    >
      <Navbar />

      <div className="relative pt-24 pb-20">
        {/* Subtle decorative brush stroke */}
        {/* <BrushStroke className="absolute top-0 left-0 w-full opacity-10" /> */}

        {/* Floating luxurious elements */}
        <div className="fixed top-[15%] right-[5%] animate-float opacity-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700"></div>
        </div>
        <div
          className="fixed top-[50%] left-[5%] animate-float opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700"></div>
        </div>
        <div
          className="fixed bottom-[10%] right-[10%] animate-rotate-slow opacity-15"
          style={{ animationDelay: "3s" }}
        >
          <Sparkles size={30} className="text-amber-600" />
        </div>

        {/* Hero Section */}
        <section className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
              A Timeless Craft
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-24 h-1 bg-amber-600"></div>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              At DoodleCaboodle, every creation is a heartfelt story,
              handcrafted with love and care.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="relative bg-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <div className="bg-gradient-to-br from-emerald-50 to-amber-50 h-80 flex items-center justify-center">
                    <Heart size={120} className="text-amber-600 opacity-80" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="relative">
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    At DoodleCaboodle, our story begins with a feeling — the
                    kind you had as a child, making something by hand for
                    someone you love. A card for Maa. A sketch for Papa. A tiny
                    doodle passed to a friend in school, folded with care and
                    joy.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We never forgot that feeling. We just grew up — and found a
                    way to keep it alive.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    DoodleCaboodle was founded to bring that handmade warmth
                    into today’s world. A space where every creation is
                    thoughtful, handcrafted, and full of emotion.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    From pencil portraits to personalized gifts, every piece we
                    make is a little reminder that effort still matters, that
                    love can be felt in paper and paint, and that handmade gifts
                    still speak the loudest. This is more than art. It’s a piece
                    of heart — from our hands to yours.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="relative bg-gray-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Gaurav continues to lead the brand with heart, imagination, and
                a deep belief that every meaningful gift deserves to be created
                — and remembered — with love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <div className="relative rounded-full overflow-hidden shadow-2xl border-4 border-amber-100">
                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 h-80 w-full flex items-center justify-center">
                  <Brush size={100} className="text-amber-600" />
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Gaurav
                </h3>
                <p className="text-sm text-amber-600 font-medium">
                  Founder & Creative Director
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-20 bg-gradient-to-r from-amber-50 to-emerald-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white p-1 rounded-xl shadow-lg"
            >
              <div className="bg-gradient-to-r from-amber-600 to-emerald-600 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-bold text-white mb-4">
                  Discover the Art of Gifting
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Explore our collection of handcrafted artworks and
                  personalized gifts, each created with love and care.
                </p>
                <a
                  href="https://doodlecaboodle.netlify.app/shop"
                  className="inline-block bg-white text-amber-600 font-medium px-8 py-4 rounded-full shadow-md hover:shadow-xl hover:bg-amber-100 transition-all duration-300"
                >
                  Explore Artworks
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
