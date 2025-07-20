import React from "react";
import photo from "@/assets/photoguide02.png";
import frame from "@/assets/breakdown.png";

const PhotoGuidelines: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo Guidelines Section */}
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <img
              src={photo} // Replace with actual image URL
              alt="Photo Guidelines"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair text-gray-800 mb-6">
              Photo Guidelines
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>In Focus
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Good Lighting
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Clear and
                High-Resolution
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>No Heavy Filters or
                Edits
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Eye Level Angle
              </li>
            </ul>
            <p className="mt-4 text-gray-500">
              Follow these tips for stunning sketches!
            </p>
          </div>
        </div>

        {/* Frame Breakdown Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-8">
            <img
              src={frame} // Replace with actual image URL
              alt="Frame Breakdown"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair text-gray-800 mb-6">
              Frame Breakdown
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Frame: Sturdy outer
                structure to hold the photo securely.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Polycarbonate
                Sheet: Protective transparent layer to shield the photo.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Mounting: Support
                layer to align and elevate the photo.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Sketch: The artwork
                or photo being framed.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-800">•</span>Mdf Base: Solid
                base for stability and durability.
              </li>
            </ul>
            <p className="mt-4 text-gray-500">
              In a nutshell, these details ensure your memories are preserved
              beautifully!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGuidelines;
