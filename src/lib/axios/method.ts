import instance from "./instance";
import { ENDPOINTS } from "./endpoints";
import { MenuItem } from "../../types/menu";

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
} as const;
