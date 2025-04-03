
import React from 'react';
import { Heart } from 'lucide-react';

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  artistName: string;
  price: string;
  category: string;
}

const ArtworkCard = ({ imageUrl, title, artistName, price, category }: ArtworkCardProps) => {
  return (
    <div className="art-card group">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart size={18} className="text-gray-700 hover:text-pink-500 transition-colors" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
            <div className="bg-pastel-yellow inline-block px-2 py-0.5 rounded text-xs mb-1">{category}</div>
            <h3 className="font-playfair font-medium line-clamp-1">{title}</h3>
            <p className="text-sm opacity-80">{artistName}</p>
          </div>
        </div>
      </div>
      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900 font-playfair">{title}</h3>
            <p className="text-sm text-gray-600">{artistName}</p>
          </div>
          <div className="text-right">
            <span className="font-medium text-gray-900">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
