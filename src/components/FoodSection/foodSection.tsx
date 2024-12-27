import FoodCard from '../FoodCard/foodCard';
import MenuModal from '../menuModel/menuModel';
import { menuData } from '../../data/menuData';
import { useState } from 'react';

const FoodSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
    const handleCardClick = (categoryId: number) => {
      setSelectedCategory(categoryId);
    };
  
    const handleCloseModal = () => {
      setSelectedCategory(null);
    };
  
    const selectedCategoryData = menuData.find(category => category.id === selectedCategory);
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Wake Up Early,<br />
              Eat Fresh & Healthy
            </h2>
            <div className="flex justify-center">
              <svg className="w-32 h-8" viewBox="0 0 128 32">
                <path
                  d="M0 16L32 0L64 16L96 0L128 16L96 32L64 16L32 32L0 16Z"
                  fill="#FCD34D"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
            {menuData.map((category) => (
              <FoodCard
                key={category.id}
                image={category.image}
                title={category.title}
                rating={category.rating}
                onClick={() => handleCardClick(category.id)}
              />
            ))}
          </div>
        </div>
        
        {selectedCategoryData && (
          <MenuModal
            isOpen={true}
            onClose={handleCloseModal}
            items={selectedCategoryData.items}
            title={selectedCategoryData.title}
          />
        )}
      </section>
    );
  };
  
  export default FoodSection;