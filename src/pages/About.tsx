import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  HeartHandshake,
  Brush,
  GalleryHorizontal,
  PaintBucket,
  Sparkles,
  CircleDot,
  Target,
  Lightbulb,
  Users,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BrushStroke from "@/components/BrushStroke";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-pastel-gray/30 overflow-hidden"
      ref={containerRef}
    >
      <Navbar />

      <div className="relative pt-24 pb-20">
        {/* Path that follows the whole page */}
        <BrushStroke />

        {/* Floating artistic elements */}
        <div className="fixed top-[20%] right-[5%] animate-float opacity-30">
          <div className="w-16 h-16 rounded-full bg-pastel-pink"></div>
        </div>
        <div
          className="fixed top-[40%] left-[8%] animate-float opacity-30"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-20 h-20 rounded-full bg-pastel-blue"></div>
        </div>
        <div
          className="fixed bottom-[20%] right-[10%] animate-float opacity-30"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-24 h-24 rounded-full bg-pastel-yellow"></div>
        </div>
        <div className="fixed top-[60%] left-[5%] animate-rotate-slow opacity-20">
          <Brush size={40} className="text-pink-400" />
        </div>
        <div
          className="fixed top-[15%] right-[15%] animate-rotate-slow opacity-20"
          style={{ animationDelay: "5s" }}
        >
          <PaintBucket size={30} className="text-purple-400" />
        </div>

        {/* Hero section */}
        <section className="relative max-w-4xl mx-auto px-6 py-16 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-bold text-5xl md:text-6xl mb-6 relative inline-block">
              Our Artistic Journey
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-pastel-blue rounded-full"></div>
            </h1>
            <p className="text-xl text-gray-700 mt-6 mb-8">
              The colorful story behind DoodleCaboodle and how our art came to
              life.
            </p>
          </motion.div>
        </section>

        {/* Origin story */}
        <section className="relative bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-2 bg-pastel-yellow p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-pastel-peach h-64 flex items-center justify-center">
                      <Palette size={100} className="text-pink-400" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2 relative">
                  <CircleDot className="absolute -top-10 -left-10 text-pastel-purple w-20 h-20 opacity-20" />
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    The Spark of Creativity
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    DoodleCaboodle began as a simple spark of joy during those
                    quiet evenings when the world slowed down. As an artist with
                    a deep love for vibrant colors and whimsical designs, I
                    found myself creating pieces that brought smiles to those
                    around me.
                  </p>
                  <p className="text-lg text-gray-700">
                    What started as a personal creative outlet quickly blossomed
                    into something more when friends and family began requesting
                    custom pieces to brighten their own spaces.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Early Days section - NEW */}
        {/* <section className="relative bg-pastel-yellow/30 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform -rotate-1 bg-pastel-blue p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-pastel-orange h-64 flex items-center justify-center">
                      <Lightbulb size={100} className="text-amber-400" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    The Early Doodles
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    In the beginning, I worked from a tiny corner of my
                    apartment, with just a few brushes and paints. My earliest
                    designs were simple but heartfelt - cheerful greeting cards,
                    small canvas paintings, and illustrated bookmarks.
                  </p>
                  <p className="text-lg text-gray-700">
                    Those first creations taught me the most important lesson:
                    art doesn't need to be complex to be meaningful. Sometimes
                    the simplest doodle can capture exactly what words cannot
                    express.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Middle story section */}
        <section className="relative bg-pastel-blue/30 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-2 bg-pastel-green p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-pastel-purple h-64 flex items-center justify-center">
                      <Brush size={100} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    From Passion to Purpose
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Each product in our collection tells a unique story,
                    inspired by moments of everyday magic and childlike wonder.
                    Every brush stroke carries an intention, every color choice
                    reflects an emotion.
                  </p>
                  <p className="text-lg text-gray-700">
                    I believe art should be accessible and bring joy to everyday
                    life. That's why DoodleCaboodle focuses on creating pieces
                    that are not just beautiful to look at, but also functional
                    and meaningful to incorporate into your daily routines.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Growth & Challenges - NEW */}
        <section className="relative bg-pastel-purple/20 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform -rotate-2 bg-pastel-pink p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-pastel-green h-64 flex items-center justify-center">
                      <Target size={100} className="text-teal-500" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Growth & Challenges
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    As word spread about DoodleCaboodle, the demand grew,
                    presenting both exciting opportunities and unexpected
                    challenges. Learning to balance creativity with business
                    practicalities became my new artistic journey.
                  </p>
                  <p className="text-lg text-gray-700">
                    Each challenge became a chance to innovate - exploring new
                    techniques, experimenting with different materials, and
                    finding sustainable ways to bring more art into more homes.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Behind DoodleCaboodle - NEW */}
        <section className="relative bg-pastel-orange/20 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                The Team Behind DoodleCaboodle
              </h2>
              <p className="text-lg text-gray-700">
                Meet the creative minds who bring our artistic vision to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-52 bg-pastel-pink/30 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Star className="text-pink-500" size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-pastel-pink font-medium mb-3">
                    Founder & Lead Artist
                  </p>
                  <p className="text-gray-700">
                    The creative heart behind DoodleCaboodle with a background
                    in fine arts and a lifelong passion for bringing color to
                    everyday objects.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-52 bg-pastel-blue/30 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Brush className="text-blue-500" size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    Michael Chen
                  </h3>
                  <p className="text-sm text-pastel-blue font-medium mb-3">
                    Production Artist
                  </p>
                  <p className="text-gray-700">
                    A skilled illustrator who brings detailed precision to our
                    designs and manages the production process of our
                    handcrafted items.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-52 bg-pastel-green/30 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <PaintBucket className="text-green-500" size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    Emma Rodriguez
                  </h3>
                  <p className="text-sm text-pastel-green font-medium mb-3">
                    Color Specialist
                  </p>
                  <p className="text-gray-700">
                    Our color theory expert who creates our signature palettes
                    and ensures every product maintains our distinctive vibrant
                    aesthetic.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-52 bg-pastel-purple/30 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <HeartHandshake className="text-purple-500" size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    David Wilson
                  </h3>
                  <p className="text-sm text-pastel-purple font-medium mb-3">
                    Community Manager
                  </p>
                  <p className="text-gray-700">
                    The friendly face of DoodleCaboodle who manages our
                    workshops, customer relations, and builds connections within
                    our community.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-52 bg-pastel-yellow/30 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Sparkles className="text-yellow-500" size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">
                    Olivia Kim
                  </h3>
                  <p className="text-sm text-pastel-yellow font-medium mb-3">
                    Creative Director
                  </p>
                  <p className="text-gray-700">
                    Our visionary who oversees new product development and
                    ensures everything we create stays true to our artistic
                    mission.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community Connection - NEW */}
        <section className="relative bg-pastel-green/30 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-1 bg-pastel-orange p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-pastel-blue h-64 flex items-center justify-center">
                      <Users size={100} className="text-indigo-400" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Building a Creative Community
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    One of the most rewarding aspects of this journey has been
                    connecting with other artists and art lovers. Through
                    workshops, markets, and online sharing, DoodleCaboodle has
                    grown into a community of color-loving, joy-seeking
                    creatives.
                  </p>
                  <p className="text-lg text-gray-700">
                    Your stories about how our art has brightened your homes,
                    offices, and special moments continue to inspire new
                    creations and push our artistic boundaries.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="relative bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                Our Artistic Values
              </h2>
              <p className="text-lg text-gray-700">
                The principles that guide our creative process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-pastel-yellow to-pastel-orange/50 shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                  <Sparkles className="text-amber-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Joyful Creativity</h3>
                <p className="text-gray-700">
                  We create with the intention of bringing smiles and
                  brightening spaces with playful designs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-pastel-blue to-pastel-purple/50 shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                  <HeartHandshake className="text-pink-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Heartfelt Quality</h3>
                <p className="text-gray-700">
                  Every piece is crafted with care and attention to detail,
                  ensuring quality that lasts.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-pastel-green to-pastel-blue/50 shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                  <GalleryHorizontal className="text-green-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Artistic Connection</h3>
                <p className="text-gray-700">
                  Our art aims to create connections and bring a touch of whimsy
                  to everyday life.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Artist section */}
        <section className="relative bg-pastel-pink/30 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-full overflow-hidden shadow-xl border-4 border-white w-64 h-64 mx-auto">
                  <div className="bg-pastel-peach h-full w-full flex items-center justify-center">
                    <Palette size={80} className="text-pink-500" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Meet the Artist
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Hi there! I'm Sarah, the creative heart and hands behind
                    DoodleCaboodle. With a background in fine arts and a
                    lifelong passion for doodling, I've always found joy in
                    transforming blank canvases into colorful stories.
                  </p>
                  <p className="text-lg text-gray-700">
                    My inspiration comes from everyday moments of wonder,
                    nature's patterns, and the simple joy of mixing colors. Each
                    piece in the DoodleCaboodle collection carries a piece of my
                    story, and I hope they'll become part of yours too.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Future Vision - NEW */}
        {/* <section className="relative bg-pastel-blue/20 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-2 bg-pastel-yellow p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-br from-pastel-purple to-pastel-blue h-64 flex items-center justify-center">
                      <Sparkles size={100} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="p-2">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Our Colorful Future
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Looking ahead, DoodleCaboodle is expanding into new artistic
                    territories - larger art pieces, collaborative collections,
                    and community art initiatives that bring people together
                    through creativity.
                  </p>
                  <p className="text-lg text-gray-700">
                    We're committed to sustainable art practices, using
                    eco-friendly materials wherever possible and finding
                    innovative ways to reduce our environmental footprint while
                    maximizing our artistic impact.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Contact/Join section */}
        <section className="relative py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-pastel-yellow via-pastel-pink to-pastel-blue p-1 rounded-xl"
            >
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-4">
                  Join Our Artistic Journey
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Follow along as we continue to create, inspire, and bring more
                  color into the world.
                </p>
                <a
                  href="https://doodlecaboodle.netlify.app/shop"
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Explore Our Collection
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
