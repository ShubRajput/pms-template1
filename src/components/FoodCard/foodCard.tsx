import { Star } from 'lucide-react';

interface FoodCardProps {
  image: string;
  title: string;
  rating: number;
  onClick: () => void;
}

const FoodCard = ({ image, title, rating, onClick }: FoodCardProps) => {
  return (
    <div
      className="bg-white rounded-3xl shadow-lg p-6 transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-xl font-semibold">{rating}</span>
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
    </div>
  );
};

export default FoodCard;