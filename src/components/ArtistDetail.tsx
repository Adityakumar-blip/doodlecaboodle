import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import WorkCard from "./Ourworkcard";

// Define interfaces
interface Artist {
  id: string;
  bio: string;
  createdAt: { seconds: number; nanoseconds: number };
  email: string;
  name: string;
  phone: string;
  socialLinks: string[];
  status: string;
  updatedAt: { seconds: number; nanoseconds: number };
  artType?: string;
  bannerImage?: string;
  profileImage?: string;
  location?: string;
  services?: string[];
  specializesIn?: string;
}

interface Work {
  id: string;
  imageUrl: string;
  title: string;
  artistName: string;
  price: number;
  category: string;
  // Add other fields as needed
}

// Placeholder WorkCard component (update as per your actual WorkCard implementation)
interface WorkCardProps extends Work {
  props: Work;
}

const ArtistDetail: React.FC = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch artist data and their works from Firestore
  useEffect(() => {
    const fetchArtistAndWorks = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch artist data
        const artistDoc = doc(db, "artists", id);
        const artistSnapshot = await getDoc(artistDoc);

        if (artistSnapshot.exists()) {
          setArtist({ id, ...artistSnapshot.data() } as Artist);
        } else {
          setArtist(null);
        }

        // Fetch works from ourworks collection where artistId matches
        const worksQuery = query(
          collection(db, "ourworks"),
          where("artistId", "==", id)
        );
        const worksSnapshot = await getDocs(worksQuery);
        const worksData = worksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Work[];

        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setArtist(null);
        setWorks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistAndWorks();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

  const Specializes = artist?.specializesIn.split(",");

  return (
    <div className={`min-h-screen ${getArtistBackground()}`}>
      {/* Header/Banner */}
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            artist.bannerImage ||
            "https://images.unsplash.com/photo-1541663097887-ae5703cf56d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
          })`,
        }}
      >
        <div className="bg-black bg-opacity-40 h-full flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex  items-center">
              <div className="h-32 w-32 rounded-full bg-transparent p-1">
                <img
                  src={artist.profileImage || "https://via.placeholder.com/150"}
                  alt={`${artist.name} profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-3xl font-bold">{artist.name}</h1>
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
            <div className="rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About the Artist</h2>
              <p className="text-gray-700 mb-4">{artist.bio}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Specializes in:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Specializes?.map((service, index) => (
                    <span
                      key={index}
                      className="border border-gray-500 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  )) || (
                    <span className="text-gray-500">No services listed</span>
                  )}
                </div>
              </div>

              <button className="w-full bg-pastel-peach text-black py-2 px-4 rounded transition-colors">
                Message Artist
              </button>
            </div>
          </div>

          {/* Right Column - Portfolio */}
          <div className="md:col-span-2">
            <div className="rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Portfolio</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {works.length > 0 ? (
                  works.map((work) => (
                    <WorkCard
                      key={work.id}
                      id={work.id}
                      imageUrl={work.imageUrl}
                      title={work.title}
                      artistName={work.artistName}
                      price={work.price}
                      category={work.category}
                      props={work}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No portfolio items available</p>
                )}
              </div>

              {/* {works.length > 0 && (
                <div className="mt-6 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    View All Works
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
