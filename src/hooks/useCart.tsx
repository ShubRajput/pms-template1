import { create } from 'zustand';
import { MenuItem } from '../data/menuData';
import { API } from '../lib/axios/method';

interface CartItem extends MenuItem {
  quantity: number; // Each cart item includes a quantity
}

interface CartStore {
  items: CartItem[]; // List of cart items
  total: number; // Total cost of items in the cart
  addToCart: (data: { sessionToken: string; dishId: string; quantity: number }) => Promise<void>; // Function to add an item to the cart
  removeFromCart: (data: { sessionToken: string; itemId: string }) => Promise<void>; // Function to remove an item from the cart by ID
  fetchCart: (sessionToken: string) => Promise<void>; // Function to fetch the cart
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,

  // Fetch the cart from the server
  fetchCart: async (sessionToken) => {
    console.log("Triggered");
  
    try {
      const response = await API.cart.fetchFromCart({ sessionToken });
      if (!response?.data?.cart) {
        console.warn("Cart data is missing in the response");
        return; // Exit early if no cart data
      }
  
      const cartItems = response.data.cart;
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      set({
        items: cartItems,
        total,
      });
  
      console.log("Cart fetched successfully");
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  },
  
  

  // Add an item to the cart
  addToCart: async ({ sessionToken, dishId, quantity }) => {
    try {
      const res = await API.cart.addToCart({
        sessionToken,
        dishId: dishId.toString(),
        quantity: quantity.toString(),
      });
    

      // set((state) => {
      //   const existingItem = state.dishId.find((i) => i.id === itemId.id);
      //   if (existingItem) {
      //     return {
      //       items: state.items.map((i) =>
      //         i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      //       ),
      //       total: state.total + item.price * quantity,
      //     };
      //   }

      //   return {
      //     items: [...state.items, { ...item, quantity }],
      //     total: state.total + item.price * quantity,
      //   };
      // });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  },

  // Remove an item from the cart
  removeFromCart: async ({ sessionToken, itemId }) => {
    try {
      await API.cart.removeFromCart({
        sessionToken,
        dishId: itemId,
      });

      set((state) => {
        const itemToRemove = state.items.find((i) => i.id.toString() === itemId);
        if (!itemToRemove) return state;

        return {
          items: state.items.filter((i) => i.id.toString() !== itemId),
          total: state.total - itemToRemove.price * itemToRemove.quantity,
        };
      });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },

 
}));
