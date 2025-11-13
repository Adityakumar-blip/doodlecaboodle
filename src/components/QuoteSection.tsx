import React from "react";
import { Separator } from "@/components/ui/separator";

const QuoteSection = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10 flex items-center justify-center">
            <div className="h-[1px] w-16 bg-pastel-pink"></div>
            <div className="mx-4 text-pastel-pink">✦</div>
            <div className="h-[1px] w-16 bg-pastel-pink"></div>
          </div>

          <blockquote className="relative">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 absolute -top-8 -left-4 text-pastel-pink/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg> */}

            <p className="text-3xl md:text-4xl lg:text-5xl font-playfair leading-relaxed mb-8 italic">
              "Art enables us to find ourselves and lose ourselves at the same
              time."
            </p>

            <footer className="font-medium flex flex-col items-center">
              <Separator className="w-16 mb-4 bg-pastel-pink/50" />
              <cite className="not-italic text-xl">— Thomas Merton</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
