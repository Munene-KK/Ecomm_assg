import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
interface Product {
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
interface contextValue {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}
const DataContext = createContext<contextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const ProductInfo = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <DataContext.Provider value={{ products, setProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("No data provided!");
  return context;
};

export default ProductInfo;
