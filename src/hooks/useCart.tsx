import { create } from 'zustand';
import { MenuItem } from '../data/menuData';
import { API } from '../lib/axios/method';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (data: { sessionToken: string; dishId: string; quantity: number }) => Promise<any>;
  removeFromCart: (data: { sessionToken: string; itemId: string }) => Promise<any>;
  fetchCart: (sessionToken: string) => Promise<void>;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,

  fetchCart: async (sessionToken) => {
    console.log("Triggered");
  
    try {
      const response = await API.cart.fetchFromCart({ sessionToken });
      if (!response?.data?.cart) {
        console.warn("Cart data is missing in the response");
        return;
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

  addToCart: async ({ sessionToken, dishId, quantity }) => {
    try {
      const response = await API.cart.addToCart({
        sessionToken,
        dishId: dishId,
        quantity: quantity.toString(),
      });

      // Return the response so it can be used in the component
      return response;
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error; // Re-throw the error to be caught by the component
    }
  },

  removeFromCart: async ({ sessionToken, itemId }) => {
    try {
      const response = await API.cart.removeFromCart({
        sessionToken,
        dishId: itemId,
      });

      return response
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },
}));