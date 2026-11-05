import type { Metadata } from "next";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "../css/globals.css";
import { ProductInfo } from "../Context/ProductContext";
import { UserInfo } from "@/Context/UserContext";

export const metadata: Metadata = {
  title: "Home | Infinyte",
  description: "Oficial infinyte home page for all users with account or not",
  keywords:
    "infinyte electronics tv smartphones iphone itel samsumg buy electronics best electronics sttore in kenya",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ProductInfo>
          <UserInfo>
            <Navbar />
            {children}
            <Footer />
          </UserInfo>
        </ProductInfo>
      </body>
    </html>
  );
}
