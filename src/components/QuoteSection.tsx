import React from "react";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const QuoteSection = () => {
  const { configurations } = useSelector((state: any) => state.configuration);
  return (
    <section className="py-6 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl md:max-w-4xl mx-auto text-center">
          <div className="mb-8 md:mb-10 flex items-center justify-center">
            <div className="h-[1px] w-12 md:w-16 bg-pastel-pink"></div>
            <div className="mx-3 md:mx-4 text-pastel-pink">✦</div>
            <div className="h-[1px] w-12 md:w-16 bg-pastel-pink"></div>
          </div>

          <blockquote className="relative px-4 md:px-0">
            <p className="text-xl md:text-4xl lg:text-5xl font-playfair leading-relaxed mb-6 md:mb-8 italic">
              {configurations.length > 0
                ? `"${configurations[0].quote}"`
                : "Art enables us to find ourselves and lose ourselves at the same time."}
            </p>

            <footer className="font-medium flex flex-col items-center">
              <Separator className="w-12 md:w-16 mb-3 md:mb-4 bg-pastel-pink/50" />
              <cite className="not-italic text-lg md:text-xl">
                —{" "}
                {configurations.length > 0
                  ? configurations[0].author
                  : "Thomas Merton"}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
