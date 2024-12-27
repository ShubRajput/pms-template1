export type OrderStatus = 'not_ready' | 'preparing' | 'ready' | 'served';

export interface Order {
  id: number;
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
}