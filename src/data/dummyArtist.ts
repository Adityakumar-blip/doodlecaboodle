export interface WorkItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Artist {
  id: string;
  name: string;
  profileImage: string;
  bannerImage: string;
  location: string;
  isAvailable: boolean;
  isPro: boolean;
  services: string[];
  completedProjects: number;
  reviewsLink?: string;
  email: string;
  phone?: string;
  bio: string;
  artType: "painter" | "photographer" | "sculptor" | "digital" | "other";
  rating?: number;
  portfolio?: WorkItem[];
  reviews?: Review[];
}

export const dummyArtists: Artist[] = [
  {
    id: "1",
    name: "Opedia Studio",
    profileImage:
      "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "Dhaka, Bangladesh",
    isAvailable: true,
    isPro: true,
    services: [
      "Branding Services",
      "Logo Design",
      "Stationery Design",
      "Website Design",
      "App Design",
    ],
    completedProjects: 125,
    reviewsLink: "#reviews",
    email: "contact@opediastudio.com",
    phone: "+880 1234 567890",
    bio: "Opedia Studio is a creative design agency specialized in branding and digital design. With over 5 years of experience, we've helped businesses of all sizes establish their visual identity and digital presence.",
    artType: "digital",
    rating: 4.8,
    portfolio: [
      {
        id: "p1",
        title: "Minimalist Logo",
        imageUrl:
          "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Logo Design",
      },
      {
        id: "p2",
        title: "LYNORA Brand Identity",
        imageUrl:
          "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Branding",
      },
      {
        id: "p3",
        title: "YePay App Interface",
        imageUrl:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "App Design",
      },
      {
        id: "p4",
        title: "PETALIA Flower Shop",
        imageUrl:
          "https://images.unsplash.com/photo-1558526473-bae08350ec5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Branding",
      },
      {
        id: "p5",
        title: "YOSENA Wellness",
        imageUrl:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Logo Design",
      },
      {
        id: "p6",
        title: "Corporate Identity Package",
        imageUrl:
          "https://images.unsplash.com/photo-1571867724990-a6c18ea7b6f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Stationery Design",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "John Smith",
        userImage:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Opedia Studio delivered exceptional branding work for our startup. Their attention to detail and creative approach truly set them apart.",
        date: "March 15, 2025",
      },
      {
        id: "r2",
        userName: "Sarah Johnson",
        userImage:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 4,
        comment:
          "Great experience working with Opedia. They were responsive and delivered the project on time.",
        date: "February 28, 2025",
      },
    ],
  },
  {
    id: "2",
    name: "Artisan Colors",
    profileImage:
      "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "New York, USA",
    isAvailable: true,
    isPro: false,
    services: [
      "Oil Painting",
      "Watercolor",
      "Canvas Art",
      "Portrait",
      "Abstract Art",
    ],
    completedProjects: 47,
    reviewsLink: "#reviews",
    email: "contact@artisancolors.com",
    phone: "+1 212 456 7890",
    bio: "I'm Amanda Chen, the artist behind Artisan Colors. With a passion for vibrant colors and emotional expression, I create pieces that aim to capture moments of joy and reflection. My work has been exhibited in galleries across New York and online.",
    artType: "painter",
    rating: 4.9,
    portfolio: [
      {
        id: "p1",
        title: "Sunset Horizon",
        imageUrl:
          "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Oil Painting",
      },
      {
        id: "p2",
        title: "Urban Dreams",
        imageUrl:
          "https://images.unsplash.com/photo-1577083552782-4500626be2a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Abstract Art",
      },
      {
        id: "p3",
        title: "Mountain Stream",
        imageUrl:
          "https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Watercolor",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alex Wong",
        userImage:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Amanda's watercolor techniques are incredible. The piece I purchased looks even better in person than online.",
        date: "April 2, 2025",
      },
    ],
  },
  {
    id: "3",
    name: "Lens Perspective",
    profileImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "London, UK",
    isAvailable: false,
    isPro: true,
    services: [
      "Portrait Photography",
      "Landscape",
      "Event Coverage",
      "Commercial",
      "Fine Art Prints",
    ],
    completedProjects: 89,
    reviewsLink: "#reviews",
    email: "michael@lensperspective.com",
    phone: "+44 20 1234 5678",
    bio: "Michael Robinson is a professional photographer with over 10 years of experience capturing moments that tell powerful stories. Specializing in portrait and landscape photography, Michael's work has been featured in multiple publications including National Geographic and Vogue.",
    artType: "photographer",
    rating: 4.7,
    portfolio: [
      {
        id: "p1",
        title: "Mountain Twilight",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Landscape",
      },
      {
        id: "p2",
        title: "Urban Portrait",
        imageUrl:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Portrait",
      },
      {
        id: "p3",
        title: "Corporate Event",
        imageUrl:
          "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Event",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Emma Thompson",
        userImage:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Michael captured our wedding beautifully. His eye for detail and ability to catch candid moments is exceptional.",
        date: "March 20, 2025",
      },
      {
        id: "r2",
        userName: "David Clark",
        userImage:
          "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 4,
        comment: "Great portrait session. Professional and creative.",
        date: "January 15, 2025",
      },
    ],
  },
  {
    id: "4",
    name: "Stone Creations",
    profileImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1544963151-fb45005b0b7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "Rome, Italy",
    isAvailable: true,
    isPro: true,
    services: [
      "Marble Sculpture",
      "Stone Carving",
      "Monuments",
      "Garden Sculptures",
      "Custom Orders",
    ],
    completedProjects: 32,
    reviewsLink: "#reviews",
    email: "info@stonecreations.com",
    phone: "+39 06 1234 5678",
    bio: "Stone Creations is led by master sculptor Elena Rossi. With a heritage rooted in Italian sculpting traditions, we create timeless pieces that blend classical techniques with contemporary vision. Each sculpture is handcrafted with attention to detail and artistic excellence.",
    artType: "sculptor",
    rating: 4.9,
    portfolio: [
      {
        id: "p1",
        title: "Harmony in Marble",
        imageUrl:
          "https://images.unsplash.com/photo-1545993273-9f2525f7ebc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Marble Sculpture",
      },
      {
        id: "p2",
        title: "Garden Angel",
        imageUrl:
          "https://images.unsplash.com/photo-1588611911587-7bc8fdd389ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Garden Sculptures",
      },
      {
        id: "p3",
        title: "Modern Abstract",
        imageUrl:
          "https://images.unsplash.com/photo-1577083553180-732e5d4b2d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Abstract Sculpture",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Robert Miller",
        userImage:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Elena created a custom piece for our garden that exceeded all expectations. True artistry.",
        date: "February 10, 2025",
      },
    ],
  },
  {
    id: "5",
    name: "Digital Dreams",
    profileImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "Tokyo, Japan",
    isAvailable: true,
    isPro: true,
    services: [
      "Digital Illustration",
      "Concept Art",
      "Character Design",
      "NFT Art",
      "Animation",
    ],
    completedProjects: 118,
    reviewsLink: "#reviews",
    email: "hello@digitaldreams.jp",
    phone: "+81 3 1234 5678",
    bio: "Digital Dreams is a creative studio founded by Takashi Yamamoto, specializing in digital art that merges traditional Japanese aesthetics with futuristic themes. Our work spans from commercial illustrations to concept art for gaming companies and original NFT collections.",
    artType: "digital",
    rating: 4.8,
    portfolio: [
      {
        id: "p1",
        title: "Neo Tokyo",
        imageUrl:
          "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Digital Illustration",
      },
      {
        id: "p2",
        title: "Cyber Samurai",
        imageUrl:
          "https://images.unsplash.com/photo-1614729373246-42ec3ed2041d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Character Design",
      },
      {
        id: "p3",
        title: "Ethereal Landscapes",
        imageUrl:
          "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Concept Art",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Lisa Chen",
        userImage:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Incredible talent and vision. The character designs created for our game received amazing feedback from our audience.",
        date: "March 28, 2025",
      },
      {
        id: "r2",
        userName: "James Wilson",
        userImage:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 4,
        comment:
          "Fast turnaround and excellent communication throughout the project.",
        date: "April 5, 2025",
      },
    ],
  },
  {
    id: "6",
    name: "Ceramic Wonders",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bannerImage:
      "https://images.unsplash.com/photo-1565193298434-6c51a447c7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    location: "Portland, USA",
    isAvailable: false,
    isPro: false,
    services: [
      "Pottery",
      "Ceramic Art",
      "Functional Ceramics",
      "Workshops",
      "Custom Orders",
    ],
    completedProjects: 56,
    reviewsLink: "#reviews",
    email: "maya@ceramicwonders.com",
    bio: "I'm Maya Jackson, a ceramic artist creating functional and decorative pottery inspired by nature and organic forms. Each piece is handcrafted in my Portland studio using traditional techniques combined with contemporary design sensibilities.",
    artType: "other",
    rating: 4.7,
    portfolio: [
      {
        id: "p1",
        title: "Ocean Wave Vase Set",
        imageUrl:
          "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Pottery",
      },
      {
        id: "p2",
        title: "Terra Dinnerware",
        imageUrl:
          "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Functional Ceramics",
      },
      {
        id: "p3",
        title: "Abstract Wall Art",
        imageUrl:
          "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "Ceramic Art",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Thomas Green",
        userImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5,
        comment:
          "Maya's pottery is absolutely stunning. I ordered a custom dinnerware set and couldn't be happier with the result.",
        date: "January 22, 2025",
      },
    ],
  },
];

export const getArtistById = (id: string): Artist | undefined => {
  return dummyArtists.find((artist) => artist.id === id);
};
