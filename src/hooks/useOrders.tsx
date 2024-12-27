import { create } from 'zustand';
import { Order, OrderStatus } from '../types/orders';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'status' | 'time'>) => void;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

export const useOrders = create<OrderStore>((set) => ({
  orders: [
    {
      id: 1,
      items: ['Butter Chicken', 'Naan'],
      total: 450,
      status: 'not_ready',
      time: '2:30 PM'
    },
    {
      id: 2,
      items: ['Paneer Tikka', 'Roti'],
      total: 350,
      status: 'preparing',
      time: '2:45 PM'
    }
  ],
  addOrder: (order) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          ...order,
          status: 'not_ready',
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        }
      ]
    })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    }))
}));