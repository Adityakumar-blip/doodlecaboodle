import React, { useState, useEffect } from "react";
import { Palette, Users, Shield } from "lucide-react";

export default function CustomInfo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Palette,
      number: "50K+",
      label: "Custom Artworks Created",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      number: "500+",
      label: "Talented Artists Worldwide",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      number: "100%",
      label: "Satisfaction Guarantee",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="w-full bg-transparent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-story-accent font-handwritten">
            Why DoodleCaboodle?
          </h2>
          <p className="mt-2 text-base text-story-accent font-kalam">
            Handcrafted art, made with care — the little details that make a
            gift unforgettable.
          </p>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-4 py-6 rounded-lg transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${stat.color} mb-3 shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black font-kalam">
                    {stat.number}
                  </h3>
                  <p className="mt-1 text-sm text-story-accent font-handwritten">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
