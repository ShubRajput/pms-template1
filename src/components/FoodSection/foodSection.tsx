import FoodCard from "../FoodCard/foodCard";
import MenuModal from "../menuModel/menuModel";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { fetchAllMenu } from "../../store/fetchMenuData";


const FoodSection = () => {
  const { allMenu, setAllMenu } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menu = await fetchAllMenu();
        setAllMenu(menu); // Set menu data into context
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchData();
  }, [setAllMenu]);

  // Image mapping for categories
  const categoryImages: Record<string, string> = {
    starter: "https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-4.0.3",
    main_course: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3",
    dessert: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3",
  };

  // Find items for the selected category
  const selectedCategoryData = allMenu.filter(
    (item) => item.category === selectedCategory
  );

  const handleCardClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Wake Up Early,
            <br />
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

        {/* Render food categories dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
          {allMenu
            .reduce((categories, item) => {
              // Group by category
              if (!categories.includes(item.category)) {
                categories.push(item.category);
              }
              return categories;
            }, [])
            .map((category) => (
              <FoodCard
                key={category}
                image={categoryImages[category] || "https://via.placeholder.com/150"} // Default placeholder if no image
                title={category}
                rating={5} // Placeholder rating, replace if available
                onClick={() => handleCardClick(category)}
              />
            ))}
        </div>
      </div>

      {/* Show menu items in modal */}
      {selectedCategory && selectedCategoryData.length > 0 && (
        <MenuModal
          isOpen={true}
          onClose={handleCloseModal}
          items={selectedCategoryData}
          title={selectedCategory}
        />
      )}
    </section>
  );
};

export default FoodSection;
