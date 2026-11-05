import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Home from "./pages/admin/Home";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Account from "./pages/Account";
import Users from "./pages/admin/Users";
import HomeManager from "./pages/manager/HomeManager";
import Orders from "./pages/admin/Orders";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/Dashboard" element={<Home />} />
        <Route path="/manager/Dashboard" element={<HomeManager />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/update/:id" element={<UpdateProduct />} />
        <Route path="/manange/account" element={<Account />} />
        <Route path="/manage/users" element={<Users />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
