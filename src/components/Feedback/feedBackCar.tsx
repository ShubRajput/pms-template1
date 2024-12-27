import React from 'react';
import { Star } from 'lucide-react';

interface FeedbackCardProps {
  name: string;
  image: string;
  rating: number;
  comment: string;
}

const FeedbackCard = ({ name, image, rating, comment }: FeedbackCardProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

export default FeedbackCard;