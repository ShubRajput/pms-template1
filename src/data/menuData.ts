export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  export interface MenuCategory {
    id: number;
    title: string;
    image: string;
    rating: number;
    items: MenuItem[];
  }
  
  export const menuData: MenuCategory[] = [
    {
      id: 1,
      title: "Starters",
      image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-4.0.3",
      rating: 5,
      items: [
        {
          id: 1,
          name: "Masala Papad",
          price: 80,
          description: "Crispy papad topped with onions, tomatoes, and Indian spices"
        },
        {
          id: 2,
          name: "Nagli Papad",
          price: 90,
          description: "Traditional finger millet papad served with chutney"
        },
        {
          id: 3,
          name: "Chana Roast",
          price: 120,
          description: "Roasted chickpeas tossed in aromatic Indian spices"
        }
      ]
    },
    {
      id: 2,
      title: "Main Course",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3",
      rating: 4.5,
      items: [
        {
          id: 4,
          name: "Butter Chicken",
          price: 280,
          description: "Tender chicken in rich tomato-based curry with butter and cream"
        },
        {
          id: 5,
          name: "Paneer Tikka Masala",
          price: 240,
          description: "Grilled cottage cheese in spiced tomato gravy"
        },
        {
          id: 6,
          name: "Dal Makhani",
          price: 220,
          description: "Black lentils slow-cooked with butter and cream"
        }
      ]
    },
    {
      id: 3,
      title: "Desserts",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3",
      rating: 4.8,
      items: [
        {
          id: 7,
          name: "Gulab Jamun",
          price: 120,
          description: "Deep-fried milk solids soaked in sugar syrup"
        },
        {
          id: 8,
          name: "Rasmalai",
          price: 140,
          description: "Soft cottage cheese dumplings in saffron-flavored milk"
        },
        {
          id: 9,
          name: "Kheer",
          price: 110,
          description: "Traditional rice pudding with nuts and cardamom"
        }
      ]
    }
  ];