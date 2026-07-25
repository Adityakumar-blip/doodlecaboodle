import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Sparkles,
  Flame,
  Palette,
  Gift,
  Smile,
  Heart,
  Cake,
  PartyPopper,
  ShieldCheck,
  Instagram,
  CheckCircle2,
  Send
} from "lucide-react";
import boyDrawing from "@/assets/doodle1.png";
import girlFlowers from "@/assets/doodle2.png";
import boyCrafting from "@/assets/doodle3.png";
import childrenCrafting from "@/assets/doodle4.png";
import founder from "@/assets/founder.png";

const About = () => {
  useEffect(() => {
    // Dynamic SEO update
    document.title = "Doodle Caboodle | Handmade Gifts & Custom Portraits — India";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const descContent = "Doodle Caboodle, Pencil portraits, crochet, candles, paintings, pipe cleaner art & hampers. Handcrafted gifts that feel personal. Order from India.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descContent);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", descContent);
      document.head.appendChild(metaDesc);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFB] font-poppins text-foreground overflow-x-hidden pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[72vh] md:min-h-[78vh] flex items-center justify-center pt-16 pb-20 px-4 bg-gradient-to-b from-[#F2F1ED]/40 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            About Doodle Caboodle
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-primary mb-6 tracking-tight leading-tight">
            Gifts that feel personal. <br className="hidden sm:inline" />
            <span className="text-gray-900 font-medium">Every single one.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Some gifts are bought in five minutes and forgotten in five days. <br />
            And then there are gifts that make someone stop, hold it close, and say <span className="font-semibold text-primary">"how did you know?"</span>
          </p>
        </div>

        {/* Minimal blurred background shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Core Mission Callout */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto bg-white border border-neutral-100/60 rounded-3xl p-8 sm:p-12 shadow-sm text-center relative">
          <p className="text-lg sm:text-xl md:text-2xl text-primary font-medium leading-relaxed italic">
            "We are a handmade gifting brand from India, creating personalised, handcrafted gifts that carry real emotion. Every product we make is built around one person, one moment, and one feeling — the feeling that someone truly cared enough to create something just for you."
          </p>
        </div>
      </section>

      {/* How It All Started */}
      <section className="py-24 px-4 bg-white border-t border-b border-neutral-100/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-2 inline-block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
              How It All Started
            </h2>
            <div className="h-0.5 w-12 bg-accent mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-28">
            {/* Part 1 */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">Phase 01</span>
                  <div className="h-px bg-neutral-100 flex-grow"></div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  A Simple Pencil & A Lot of Love
                </h3>
                <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Doodle Caboodle began with a simple pencil and a lot of love. What started as custom pencil portraits — hand-drawn, deeply personal — quickly grew into something bigger.
                  </p>
                  <p>
                    We realised that people weren't just looking for a product. They were looking for a way to express what words sometimes can't. A way to say: <span className="font-semibold text-primary">"I see you. I know you. This was made for you."</span>
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
                <div className="bg-[#FAF9F5] border border-neutral-100 rounded-3xl p-6 shadow-sm w-full max-w-[280px]">
                  <img
                    src={boyDrawing}
                    alt="Pencil drawing beginnings"
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Part 2 */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="bg-[#FAF9F5] border border-neutral-100 rounded-3xl p-6 shadow-sm w-full max-w-[280px]">
                  <img
                    src={girlFlowers}
                    alt="Expanding the products"
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">Phase 02</span>
                  <div className="h-px bg-neutral-100 flex-grow"></div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Growing Our Craft
                </h3>
                <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    So we grew. We added crochet gifts, hand-poured candles, original paintings, pipe cleaner art, and thoughtfully curated hampers.
                  </p>
                  <p>
                    Each creation is handcrafted with the exact same care and intention that went into that very first portrait.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 3 */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">Phase 03</span>
                  <div className="h-px bg-neutral-100 flex-grow"></div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Small Means Personal
                </h3>
                <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    One year later, we are still a small, passionate team — and that's exactly how we like it.
                  </p>
                  <p>
                    Because small means personal. Small means every order gets our full attention. Small means the gift you receive was made by hands that cared.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
                <div className="bg-[#FAF9F5] border border-neutral-100 rounded-3xl p-6 shadow-sm w-full max-w-[280px]">
                  <img
                    src={boyCrafting}
                    alt="Small team focus"
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Handmade philosophy section */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="bg-[#F2F1ED]/30 border border-neutral-200/50 rounded-3xl p-8 sm:p-16 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-3 inline-block">
              Our Belief
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-8 leading-tight tracking-tight">
              "In a world full of mass-produced everything, <br className="hidden sm:inline" />
              handmade means someone slowed down for you."
            </h2>
            <div className="h-px w-16 bg-neutral-200 mx-auto mb-8"></div>
            
            <div className="grid md:grid-cols-2 gap-8 text-left text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                It means time, thought, and genuine care went into every detail. When you gift something handmade, you're not just giving a product, you're giving a piece of someone's creativity and effort. That's what makes it land differently. That's what makes it memorable.
              </p>
              <p>
                At Doodle Caboodle, every item is made by hand, made with intention, and made to feel personal, because that's the only kind of gift worth giving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Make Grid */}
      <section className="py-24 px-4 bg-white border-t border-b border-neutral-100/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-2 inline-block">
              Products
            </span>
            <h2 className="text-3xl font-semibold text-primary tracking-tight">
              What We Make
            </h2>
            <div className="h-0.5 w-12 bg-accent mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Pencil className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Custom Pencil Portraits
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Our signature offering. Hand-drawn pencil portraits crafted from your photos, of people, couples, families, and pets. A timeless, personalised gift for birthdays, anniversaries, and milestones. No two portraits are ever the same.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Crochet Gifts
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Soft, handmade, and full of warmth. Our crochet collection includes personalised keepsakes and decorative pieces, each one crocheted by hand with attention to every stitch.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Hand-Poured Candles
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Scented candles made with care, perfect for gifting and home decor. Clean, calming, and crafted to create a mood. A thoughtful gift that brings warmth to any space.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Original Paintings
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                From portraits to abstract art, our handpainted pieces are one-of-a-kind artworks that make a statement. A gift that doubles as decor, personal, beautiful, and lasting.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Smile className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Pipe Cleaner Art
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Quirky, creative, and completely handmade, our pipe cleaner art pieces are tiny works of art that bring a smile to anyone's face. Unique gifts for people who love something different.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#FCFCFB] border border-neutral-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-5">
                <Gift className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Curated Hampers
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Can't pick just one? Our handcrafted gift hampers bring together our best products in a beautifully assembled package, perfect for birthdays, festivals, Diwali and celebrations of all kinds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Make Gifts For */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-2 inline-block">
            Moments
          </span>
          <h2 className="text-3xl font-semibold text-primary tracking-tight">
            Who We Make Gifts For
          </h2>
          <div className="h-0.5 w-12 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <Cake className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Birthdays</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Make them feel truly seen on their special day.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <Heart className="w-4.5 h-4.5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Anniversaries</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Celebrate love with something as lasting as the memory.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Weddings</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                A handcrafted gift they'll treasure forever.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <Send className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Farewells</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Send someone off with something personal and heartfelt.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <PartyPopper className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Festivals</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Diwali, Raksha Bandhan, Christmas, Valentine's Day and more.
              </p>
            </div>
          </div>

          {/* Item 6 */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-sm transition-all duration-300 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 text-sm">
              <Smile className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary text-base mb-1">Just Because</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Because sometimes the best gifts need no occasion at all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-4 bg-white border-t border-b border-neutral-100/60">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 order-2 md:order-1">
              <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-2 inline-block">
                Creator
              </span>
              <h2 className="text-3xl font-semibold text-primary mb-6 tracking-tight">
                Hey, I'm Gaurav Kamal
              </h2>
              
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  I'm the person behind <strong>Doodle Caboodle</strong>. I've been into sketching since college — especially portraits. I've always loved making handmade gifts, even as a kid.
                </p>
                <p>
                  Along the way, I explored different creative paths and ended up working as a VFX artist on big time Bollywood and South Indian projects, including Disney and DC.
                </p>
                <p>
                  I keep exploring new things, but one thing stays constant: my love for art, crafts, and meaningful gifting. Doodle Caboodle is my way of turning emotions into something you can hold close forever.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="text-base font-medium text-accent font-kalam">- Gaurav Kamal</span>
                <span className="text-xs text-gray-400">Founder & Lead Artist</span>
              </div>
            </div>

            <div className="md:col-span-4 order-1 md:order-2 flex justify-center">
              <div className="relative group max-w-[200px] w-full">
                <div className="overflow-hidden rounded-2xl bg-white border border-neutral-200 p-2 shadow-sm">
                  <img
                    src={founder}
                    alt="Gaurav Kamal - Founder"
                    className="w-full h-64 object-cover rounded-xl transition-all duration-500 group-hover:scale-103"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
            Our Promise to You
          </h2>
          <div className="h-0.5 w-8 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Promise 1 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Every product is 100% handmade
            </span>
          </div>

          {/* Promise 2 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Fully personalised to your requirements
            </span>
          </div>

          {/* Promise 3 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Made with quality materials & care
            </span>
          </div>

          {/* Promise 4 */}
          <div className="flex items-center gap-3 bg-white border border-neutral-100 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Delivered safely across India
            </span>
          </div>

          {/* Promise 5 */}
          <div className="sm:col-span-2 flex items-center justify-center gap-3 bg-primary/5 border border-primary/10 p-4 rounded-xl max-w-md mx-auto w-full">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-primary font-semibold text-sm sm:text-base">
              Customer satisfaction at our heart
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 pt-8 px-4 text-center max-w-4xl mx-auto">
        <div className="bg-[#F2F1ED]/30 border border-neutral-200/50 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary mb-4 tracking-tight">
            Let's Create Something Special
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Whether you have a specific idea in mind or need help finding the perfect gift, we are here to bring it to life.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xs sm:max-w-md mx-auto">
            <a
              href="https://www.instagram.com/doodlecaboodle.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" /> DM us on Instagram
            </a>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-neutral-200 hover:bg-neutral-50 text-primary font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-sm"
            >
              Browse Collections
            </Link>
          </div>

          <div className="mt-10 text-xs text-gray-400 font-semibold tracking-wider uppercase">
            Doodle Caboodle — Gifts that feel personal.
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
