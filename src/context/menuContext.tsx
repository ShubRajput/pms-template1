// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// src/context/AppContext.tsx
interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface AppState {
  starterMenu: MenuItem[];
  setStarterMenu: (items: MenuItem[]) => void;
  mainCourceMenu: MenuItem[];
  setMainCourceMenu: (items: MenuItem[]) => void;
  dessertMenu: MenuItem[];
  setDessertMenu: (items: MenuItem[]) => void;
  allMenu: MenuItem[];
  setAllMenu: (items: MenuItem[]) => void;
}

// Create the context with an initial value
const AppContext = createContext<AppState | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [starterMenu, setStarterMenu] = useState<MenuItem[]>([]);
  const [mainCourceMenu, setMainCourceMenu] = useState<MenuItem[]>([]);
  const [dessertMenu, setDessertMenu] = useState<MenuItem[]>([]);
  const [allMenu, setAllMenu] = useState<MenuItem[]>([]);

  return (
    <AppContext.Provider value={{ starterMenu, setStarterMenu, mainCourceMenu, setMainCourceMenu, dessertMenu, setDessertMenu, allMenu, setAllMenu }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const menuContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
