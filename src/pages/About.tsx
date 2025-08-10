import boyDrawing from "@/assets/doodle1.png";
import girlFlowers from "@/assets/doodle2.png";
import boyCrafting from "@/assets/doodle3.png";
import childrenCrafting from "@/assets/doodle4.png";
import founder from "@/assets/founder.png";

const About = () => {
  return (
    <div className="min-h-screen doodle-background font-kalam font-story text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-story-accent mb-8 font-handwritten">
            Our Story
          </h1>
        </div>

        {/* First Story Section */}
        <div className="flex items-center justify-between mb-20 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <img
              src={boyDrawing}
              alt="Boy drawing at desk"
              className="w-64 h-64 object-contain mx-auto"
            />
          </div>
          <div className="w-full  lg:w-2/3 lg:pl-12 text-center lg:text-center">
            <p className="text-lg leading-relaxed text-story-accent">
              At DoodleCaboodle, our story begins with a feeling,
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              the kind you had as a child,
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              making something by hand for someone you love.
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              A card for Maa. A sketch for Papa.
            </p>
          </div>
        </div>

        {/* Second Story Section */}
        <div className="flex items-center justify-between mb-20 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-2/3 lg:pr-12 text-center lg:text-center order-2 lg:order-1">
            <p className="text-lg leading-relaxed text-story-accent">
              A tiny bunch of flowers,
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              passed to a friend in school — with care and joy.
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              We never forgot that feeling.
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              We just grew up — and found a way to keep it blooming.
            </p>
          </div>
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 order-1 lg:order-2">
            <img
              src={girlFlowers}
              alt="Girl with flowers"
              className="w-64 h-64 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Third Story Section */}
        <div className="flex items-center justify-between mb-20 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <img
              src={boyCrafting}
              alt="Boy crafting"
              className="w-64 h-64 object-contain mx-auto"
            />
          </div>
          <div className="w-full lg:w-2/3 lg:pl-12 text-center lg:text-center">
            <p className="text-lg leading-relaxed text-story-accent">
              DoodleCaboodle was founded
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              to bring that handmade warmth into today's world.
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              A space where every creation
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              is thoughtful, handcrafted, and full of emotion.
            </p>
          </div>
        </div>

        {/* Fourth Story Section */}
        <div className="flex items-center justify-between mb-20 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-2/3 lg:pr-12 text-center lg:text-center order-2 lg:order-1">
            <p className="text-lg leading-relaxed text-story-accent">
              From pencil portraits to personalized gifts, every piece
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              we make is a little reminder that effort still matters,
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              that love can be felt in paper and paint,
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-2">
              and that handmade gifts still speak the loudest. ❤
            </p>
            <p className="text-lg leading-relaxed text-story-accent mt-4 font-medium">
              Art is more than art. It's a piece of heart — from our hands to
              yours.
            </p>
          </div>
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 order-1 lg:order-2">
            <img
              src={childrenCrafting}
              alt="Children crafting together"
              className="w-64 h-64 object-contain mx-auto"
            />
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-neutral-300 rounded-2xl p-8 mt-16">
          <div className="flex items-start justify-between flex-wrap lg:flex-nowrap gap-8">
            <div className="w-full lg:w-2/3">
              <p className="text-base leading-relaxed text-story-accent mb-2">
                <strong>Hey, I'm Gaurav Kamal,</strong>
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-4">
                the person behind Doodle Caboodle.
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                I've been into sketching since college - especially portraits.
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                I've always loved making handmade gifts, even as a kid.
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                Along the way, I explored different creative paths
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                and ended up working as a VFX artist on big time
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                Bollywood and South Indian projects, including Disney and DC.
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                I keep exploring new things,
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                but one thing stays constant: my love for art, crafts, and
                meaningful gifting.
              </p>
              <p className="text-base leading-relaxed text-story-accent mb-2">
                Doodle Caboodle is my way of turning emotions
              </p>
              <p className="text-base leading-relaxed text-story-accent">
                into something you can hold close forever."
              </p>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="w-48 h-56 bg-gray-200 rounded-lg flex items-center justify-center">
                <img
                  src={founder}
                  alt="Gaurav Kamal - Founder"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
