"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ContextValue {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const DataContext = createContext<ContextValue | undefined>(undefined);

export interface Props {
  children: ReactNode;
}

export const ProductInfo = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <DataContext.Provider value={{ products, setProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductInfo provider");
  }
  return context;
};
