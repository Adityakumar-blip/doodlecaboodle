import { useEffect, useRef } from "react";

const BrushStroke = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (pathRef.current) {
        // Calculate how much of the path to show based on scroll position
        const scrollPercentage =
          window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const pathLength = pathRef.current.getTotalLength();
        const drawLength = pathLength * Math.min(scrollPercentage * 1.5, 1);
        // Update the path drawing
        pathRef.current.style.strokeDashoffset = String(
          pathLength - drawLength
        );
      }
    };

    // Initial setup for the path
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = String(pathLength);
      pathRef.current.style.strokeDashoffset = String(pathLength);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-2">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M80,120 
             C150,90 180,200 120,240 
             S30,280 100,350 
             C180,410 240,350 260,420 
             C290,520 390,480 450,400 
             S540,280 650,320 
             C760,360 780,480 720,550 
             C650,630 540,600 600,500 
             C660,400 780,380 860,450 
             C940,520 980,420 1050,380
             S1180,280 1250,350
             C1320,420 1280,530 1180,570
             C1080,610 1150,670 1240,690
             S1400,670 1480,600
             C1560,530 1620,450 1700,480"
          stroke="#FEC6A1"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="1"
          className="transition-all duration-100 ease-out"
        />
      </svg>
    </div>
  );
};

export default BrushStroke;
