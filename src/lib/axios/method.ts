import instance from './instance';
import { ENDPOINTS } from './endpoints';
import { MenuItem } from '../../types/menu';

export const API = {
  menu: {
    getStarters: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.STARTER),
    getMainCourse: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.MAIN_COURSE),
    getDesserts: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.DESSERT),
    getAllMenu: () => instance.get<MenuItem[]>(ENDPOINTS.MENU.ALL_MENU),
  },
} as const;