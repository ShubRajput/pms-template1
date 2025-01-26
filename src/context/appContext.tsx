import React, { createContext, useContext, useState, ReactNode } from "react";

// Define menu item and context state interfaces
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

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

interface AppState {
  // Menu states
  starterMenu: MenuItem[];
  setStarterMenu: (items: MenuItem[]) => void;
  mainCourceMenu: MenuItem[];
  setMainCourceMenu: (items: MenuItem[]) => void;
  dessertMenu: MenuItem[];
  setDessertMenu: (items: MenuItem[]) => void;
  allMenu: MenuItem[];
  setAllMenu: (items: MenuItem[]) => void;

  // Session states
  sessionToken: string | null;
  setSessionToken: (token: string) => void;

  // Cart state
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

// Create the context
const AppContext = createContext<AppState | undefined>(undefined);

// Unified provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Menu states
  const [starterMenu, setStarterMenu] = useState<MenuItem[]>([]);
  const [mainCourceMenu, setMainCourceMenu] = useState<MenuItem[]>([]);
  const [dessertMenu, setDessertMenu] = useState<MenuItem[]>([]);
  const [allMenu, setAllMenu] = useState<MenuItem[]>([]);

  // Session state
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        starterMenu,
        setStarterMenu,
        mainCourceMenu,
        setMainCourceMenu,
        dessertMenu,
        setDessertMenu,
        allMenu,
        setAllMenu,
        sessionToken,
        setSessionToken,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


// Hook to use the unified context
export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
