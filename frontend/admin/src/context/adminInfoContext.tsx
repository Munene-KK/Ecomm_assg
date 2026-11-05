import { createContext, useContext, useState, type ReactNode } from "react";
interface userInfo {
  fullname: string;
  email: string;
  role: string;
  token: string;
  _id: string;
  status: boolean;
  activate: boolean;
}
interface CotextValue {
  admin: userInfo | null;
  setAdmin: (admin: userInfo | null) => void;
}
const DataContext = createContext<CotextValue | undefined>(undefined);
//childern types
interface Props {
  children: ReactNode;
}

const AdminInfoContext = ({ children }: Props) => {
  const [admin, setAdmin] = useState<userInfo | null>(null);
  return (
    <DataContext.Provider value={{ admin, setAdmin }}>
      {children}
    </DataContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("No data available!");
  return context;
};
export default AdminInfoContext;
