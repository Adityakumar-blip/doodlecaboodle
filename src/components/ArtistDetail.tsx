import { Artist, getArtistById } from "@/data/dummyArtist";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArtistDetail: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artist = getArtistById(id || "");

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">Artist not found</h1>
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/artists")}
        >
          Back to Artists
        </button>
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (!artist) {
  //   return (
  //     <div className="container mx-auto px-4 py-10 text-center">
  //       <h1 className="text-2xl font-bold">Artist not found</h1>
  //     </div>
  //   );
  // }

  // Determine the background style based on artist type
  const getArtistBackground = () => {
    switch (artist.artType) {
      case "painter":
        return "bg-gradient-to-r from-yellow-100 to-red-100";
      case "photographer":
        return "bg-gradient-to-r from-blue-100 to-purple-100";
      case "sculptor":
        return "bg-gradient-to-r from-gray-100 to-gray-200";
      case "digital":
        return "bg-gradient-to-r from-green-100 to-blue-100";
      default:
        return "bg-gradient-to-r from-gray-100 to-white";
    }
  };

  return (
    <div className={`min-h-screen ${getArtistBackground()}`}>
      {/* Header/Banner */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${artist.bannerImage})` }}
      >
        <div className="bg-black bg-opacity-40 h-full flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-end">
              <div className="h-24 w-24 rounded-full bg-white p-1">
                <img
                  src={artist.profileImage}
                  alt={`${artist.name} profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-3xl font-bold">{artist.name}</h1>
                <p className="flex items-center mt-1">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Artist Info */}
          <div className="md:col-span-1">
            <div className=" rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About the Artist</h2>
              <p className="text-gray-700 mb-4">{artist.bio}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Specializes in:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artist.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Contact:</h3>
                <p className="text-gray-700">{artist.email}</p>
                {artist.phone && (
                  <p className="text-gray-700">{artist.phone}</p>
                )}
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Get a Quote
              </button> */}
            </div>
          </div>

          {/* Right Column - Portfolio */}
          <div className="md:col-span-2">
            <div className=" rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Portfolio</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artist.portfolio?.map((work, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold">{work.title}</h3>
                      <p className="text-sm text-gray-600">{work.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              {artist.portfolio && artist.portfolio.length > 0 && (
                <div className="mt-6 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View All Works
                  </button>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            {/* <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Reviews</h2>
                <span className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill={
                        i < Math.floor(artist.rating || 0)
                          ? "currentColor"
                          : "none"
                      }
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-700">
                    {artist.rating?.toFixed(1)}
                  </span>
                </span>
              </div>

              {artist.reviews?.map((review, index) => (
                <div
                  key={index}
                  className={`${
                    index > 0 ? "border-t border-gray-200 pt-4" : ""
                  } mb-4`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{review.userName}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill={i < review.rating ? "currentColor" : "none"}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}

              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  See All Reviews
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
