"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product } from "./ProductContext";

export interface Location {
  county: string;
  station: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  userID: string;
  active: boolean;
  role: string;
  phoneNumber: string;
  location: Location;
  shoppingCart: CartItem[];
}

interface ContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<ContextValue | undefined>(undefined);

export interface Props {
  children: ReactNode;
}

export const UserInfo = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserInfo provider");
  }
  return context;
};
