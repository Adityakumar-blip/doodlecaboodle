// src/components/ArtistCard.tsx
import { Artist } from "@/data/dummyArtist";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // Using the portfolio array from the provided data
  const portfolioItems = artist.portfolio || [];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  return (
    <div
      onClick={() => navigate(`/artists/${artist.id}`)}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-red-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Artist Logo/Avatar */}
        <div className="w-full md:w-[20%] flex justify-center py-4">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={artist.profileImage}
              alt={`${artist.name} profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Artist Info */}
        <div className="w-full md:w-[80%] p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{artist.name}</h2>
              <p className="text-gray-600 flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {artist.location}
              </p>
              {/* <div className="mt-1 flex items-center">
                <span
                  className={`h-2 w-2 rounded-full ${
                    artist.isAvailable ? "bg-green-500" : "bg-gray-400"
                  } mr-2`}
                ></span>
                <span className="text-sm">
                  {artist.isAvailable ? "Available now" : "Not available"}
                </span>
              </div> */}
            </div>

            <div>
              {artist.isPro && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
          </div>
          {portfolioItems.length > 0 && (
            <div className="mt-4 relative z-2">
              <div className="overflow-hidden rounded-lg h-40">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      Math.floor(currentSlide / 3) * 100
                    }%)`,
                  }}
                >
                  {portfolioItems.map((item, index) => (
                    <div key={item.id} className="w-1/3 flex-shrink-0 px-1">
                      <div className="h-40 relative rounded overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                          <p className="text-sm font-medium truncate">
                            {item.title}
                          </p>
                          <p className="text-xs">{item.category}</p>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-r"
                disabled={currentSlide === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-l"
                disabled={currentSlide >= portfolioItems.length - 3}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Carousel Indicators */}
              {/* <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1">
                {Array.from({
                  length: Math.ceil(portfolioItems.length / 3),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i * 3)}
                    className={`h-2 w-2 rounded-full ${
                      Math.floor(currentSlide / 3) === i
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div> */}
            </div>
          )}
          {/* Portfolio Indicator */}
          <div className="mt-4 flex items-center">
            <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex justify-center items-center text-xs font-bold mr-2">
              {artist.completedProjects}
            </div>
            <span className="text-sm text-gray-600">
              Artwork on doodlecaboodle
            </span>
            {artist.reviewsLink && (
              <a
                href={artist.reviewsLink}
                className="ml-2 text-blue-500 text-sm flex items-center"
              >
                Read Reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
