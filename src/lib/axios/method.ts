import instance from "./instance";
import { ENDPOINTS } from "./endpoints";
import { MenuItem } from "../../types/menu";

export interface Item {
  name: string;
  quantity: number;
  price: number;
  dishId: string;
  itemId: string;
}

export const API = {
  menu: {
    getStarters: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.STARTER),
    getMainCourse: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.MAIN_COURSE),
    getDesserts: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.DESSERT),
    getAllMenu: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.ALL_MENU),
  },
  session: {
    getSession: (data: { tableNumber: string }) =>
      instance.post(
        ENDPOINTS.SESSION.GETSESSION,
        { tableNumber: data.tableNumber } // Ensure data is properly structured
      ),
  },
  cart: {
    addToCart: (data: {
      sessionToken: string;
      dishId: string;
      quantity: string;
    }) =>
      instance.post(ENDPOINTS.CART.ADDTOCART, {
        sessionToken: data.sessionToken,
        dishId: data.dishId,
        quantity: data.quantity,
      }),
    removeFromCart: (data: { sessionToken: string; dishId: string }) =>
      instance.post(ENDPOINTS.CART.REMOVEFROMCART, {
        sessionToken: data.sessionToken,
        dishId: data.dishId,
      }),
    fetchFromCart: (data: { sessionToken: string }) =>
      instance.post(ENDPOINTS.CART.FETCHFROMCART, {
        sessionToken: data.sessionToken,
      }),
  },
  orders: {
    placeorder: (data: {
      sessionToken: string;
      items: Item[];
      total: number;
    }) => {
      instance.post(ENDPOINTS.ORDERS.PLACEORDER, {
        sessionToken: data.sessionToken,
        items: data.items,
        total: data.total,
        
      });
    },
  },
} as const;
