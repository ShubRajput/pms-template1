export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
