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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase/firebaseconfig";
import WorkCard from "./Ourworkcard";
import axios from "axios";

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
}

// Placeholder WorkCard component
interface WorkCardProps extends Work {
  props: Work;
}

const PaintingArtistDetail: React.FC = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = getAuth();

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
          collection(db, "products"),
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

  // Handle message sending
  const handleSendMessage = async () => {
    const user = auth.currentUser;

    if (!user) {
      setError("Please log in to send a message");
      return;
    }

    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    setIsSending(true);
    setError("");

    // Create HTML message template
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f8f8; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Message from DoodleCaboodle</h2>
          </div>
          <div class="content">
            <h3>Hello ${artist?.name || "Artist"},</h3>
            <p>You have received a new message from ${
              user.displayName || user.email
            }:</p>
            <p style="background-color: #f8f8f8; padding: 15px; border-left: 4px solid #4a90e2;">
              ${message}
            </p>
            <p>Please respond to the user directly at ${user.email}.</p>
          </div>
          <div class="footer">
            <p>This is an automated message from the Art Platform</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await axios.post("https://email-service-app.onrender.com/email/send", {
        to: "doodlecaboodle08@gmail.com",
        subject: `New Message from ${user.displayName || user.email}`,
        html: htmlMessage,
      });
      setShowMessageModal(false);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

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

  const Specializes = artist?.specializesIn?.split(",");

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
            <div className="flex items-center">
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

              <button
                className="w-full bg-pastel-peach text-black py-2 px-4 rounded transition-colors"
                onClick={() => setShowMessageModal(true)}
              >
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
                      isClickable={false}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No portfolio items available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Message {artist.name}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setShowMessageModal(false);
                  setMessage("");
                  setError("");
                }}
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pastel-peach text-black rounded hover:bg-opacity-80"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintingArtistDetail;
