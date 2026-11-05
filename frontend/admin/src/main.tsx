import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import AdminInfoContext from "./context/adminInfoContext.tsx";
import ProductInfo from "./context/ProductsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminInfoContext>
      <ProductInfo>
        <App />
      </ProductInfo>
    </AdminInfoContext>
  </StrictMode>,
);
