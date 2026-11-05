"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import { API } from "@/Components/API";
import CategoriesNav from "@/Components/Categories";
import ProductDetails from "@/Components/ProductDetails";
import { Product, useProducts } from "@/Context/ProductContext";
import { useUser } from "@/Context/UserContext";
import "../../../../css/buyPage.css";

export default function BuyPageClient({ buy }: { buy: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oneProduct, setProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { products, setProducts } = useProducts();
  const { user, setUser } = useUser();
  const router = useRouter();

  const cartCount =
    user?.shoppingCart.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  useEffect(() => {
    if (!buy) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${buy}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [buy]);

  useEffect(() => {
    if (products.length > 0) return;

    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [products.length, setProducts]);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (!oneProduct) return;
    setIsAdding(true);
    try {
      const res = await API.patch(`/users/cart/${user._id}`, {
        productID: oneProduct._id,
        quantity: 1,
      });
      setUser({ ...user, shoppingCart: res.data.shoppingCart });
    } catch (err) {
      console.log(err);
    } finally {
      setIsAdding(false);
    }
  };

  const recommendedProducts = useMemo(() => {
    if (!oneProduct) return [];

    const others = products.filter((product) => product._id !== oneProduct._id);
    const sameCategory = others.filter(
      (product) =>
        product.category.toLocaleLowerCase() ===
        oneProduct.category.toLocaleLowerCase(),
    );

    return (sameCategory.length > 0 ? sameCategory : others).slice(0, 8);
  }, [oneProduct, products]);

  return (
    <main className="buy-page">
      <CategoriesNav />
      <aside className="oneproduct-container">
        {isLoading ? (
          <p className="loading"></p>
        ) : oneProduct ? (
          <article className="oneproduct">
            <div>
              <img
                src={oneProduct.image}
                alt={oneProduct.name}
                width={400}
                height={300}
              />
            </div>
            <div className="describe">
              <div>
                <h4>Description</h4>
                {oneProduct.description}
              </div>
              <p className="price">
                Ksh.{oneProduct.price.toLocaleString("en-US")} &nbsp; &nbsp;
                &nbsp; &nbsp;
                {oneProduct.status}
              </p>
              <div className="actions">
                <Link
                  href={`/shop/checkout?product=${oneProduct._id}`}
                  className="link buy-now"
                >
                  Buy now
                </Link>
                <button
                  className="link add-to-cart"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  <span className="cart-icon">
                    <FaCartPlus />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </span>
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </article>
        ) : (
          <p>Product not found</p>
        )}
      </aside>
      <section className="recommendations-section">
        <h3 className="like">You might also like</h3>
        <section className="category">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <ProductDetails key={product._id} product={product} />
            ))
          ) : (
            <p>No similar products available right now.</p>
          )}
        </section>
      </section>
    </main>
  );
}
