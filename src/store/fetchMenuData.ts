import { API } from "../lib/axios/method";

export const fetchStartersMenuData = async () => {
  try {
    const response = await API.menu.getStarters();

    return response.menuItems;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchMainCourseMenuData = async () => {
  try {
    const mainCourse = await API.menu.getMainCourse();
    return mainCourse.menuItems;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchDessertsMenuData = async () => {
  try {
    const desserts = await API.menu.getDesserts();
    return desserts.menuItems;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAllMenu = async () => {
  try {
    const menu = await API.menu.getAllMenu();
    return menu.menuItems
  } catch (error) {
    console.log(error);
    return [];
  }
}
