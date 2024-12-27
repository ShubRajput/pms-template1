import { create } from 'zustand';
import { MenuItem } from '../data/menuData';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      total: state.total - (state.items.find((i) => i.id === itemId)?.price ?? 0),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      const priceDiff = (quantity - item.quantity) * item.price;
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total + priceDiff,
      };
    }),
}));