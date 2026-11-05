"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API } from "../Components/API";
import { useProducts } from "../Context/ProductContext";
import ProductDetails from "../Components/ProductDetails";
import "../css/homePage.css";
import CategoriesNav from "@/Components/Categories";

export default function Home() {
  const { products, setProducts } = useProducts();
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <main className="home-page">
      <section className="hero-banner">
        <div className="hero-copy">
          <p className="eyebrow">Electronics for everyday use</p>
          <h1>Find your next device</h1>
          <p>
            Browse phones, laptops, TVs and more, then order the products you
            need online.
          </p>
          <div className="cta-row">
            <Link href="#shop" className="primary-btn">
              Shop products
            </Link>
            <Link href="/auth/signup" className="secondary-btn">
              Create an account
            </Link>
          </div>
        </div>
      </section>

      <section className="value-section">
        <h2>How Infinyte creates value</h2>
        <div className="value-grid">
          <article>
            <h3>Revenue</h3>
            <p>
              Revenue comes from the margin on products sold and any applicable
              delivery fees.
            </p>
          </article>
          <article>
            <h3>For customers</h3>
            <p>
              Customers can browse products, compare options and place orders
              without visiting multiple shops.
            </p>
          </article>
          <article>
            <h3>For the business</h3>
            <p>
              A shared online catalog makes products available to more buyers
              and keeps orders in one place.
            </p>
          </article>
        </div>
      </section>

      <CategoriesNav />
      <section id="shop" className="categorys">
        <h2 className="shop-heading">Shop products</h2>
        {isLoading ? (
          <p className="loading"></p>
        ) : (
          <article className="category">
            {products.map((product) => (
              <ProductDetails key={product._id} product={product} />
            ))}
          </article>
        )}
      </section>
    </main>
  );
}
