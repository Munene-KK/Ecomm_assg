"use client";
import { API } from "@/Components/API";
import { useUser } from "@/Context/UserContext";
import { useProducts, type Product } from "@/Context/ProductContext";
import Link from "next/link";
import { useMemo, useState } from "react";
import "../../../css/cart.css";

const CartPage = () => {
  const { user, setUser } = useUser();
  const { products } = useProducts();
  const [busyId, setBusyId] = useState<string>("");

  // resolve every cart item to a full product, whether populated or just an id
  const items = useMemo(() => {
    if (!user) return [];
    return user.shoppingCart
      .map((item) => {
        const raw = item.product as Product | string;
        const product =
          typeof raw === "string" ? products.find((p) => p._id === raw) : raw;
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((item): item is { product: Product; quantity: number } =>
        Boolean(item),
      );
  }, [user, products]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleRemove = async (productID: string) => {
    if (!user) return;
    setBusyId(productID);
    try {
      const res = await API.delete(`/users/cart/${user._id}/${productID}`);
      setUser({ ...user, shoppingCart: res.data.shoppingCart });
    } catch (err) {
      console.log(err);
    } finally {
      setBusyId("");
    }
  };

  const handleIncrease = async (productID: string) => {
    if (!user) return;
    setBusyId(productID);
    try {
      const res = await API.patch(`/users/cart/${user._id}`, {
        productID,
        quantity: 1,
      });
      setUser({ ...user, shoppingCart: res.data.shoppingCart });
    } catch (err) {
      console.log(err);
    } finally {
      setBusyId("");
    }
  };

  if (!user) {
    return (
      <main className="cart-page">
        <p>
          Please <Link href="/auth/login">login</Link> to view your cart.
        </p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h3>Your Cart ({items.length})</h3>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/">Continue shopping</Link>
        </p>
      ) : (
        <>
          <section className="cart-items">
            {items.map(({ product, quantity }) => (
              <article key={product._id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={80}
                />
                <div className="cart-info">
                  <h4>{product.name}</h4>
                  <p>Ksh.{product.price.toLocaleString("en-US")}</p>
                  <div className="cart-qty">
                    <span>Qty: {quantity}</span>
                    <button
                      onClick={() => handleIncrease(product._id)}
                      disabled={busyId === product._id}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="cart-subtotal">
                  Ksh.{(product.price * quantity).toLocaleString("en-US")}
                </p>
                <button
                  className="cart-remove"
                  onClick={() => handleRemove(product._id)}
                  disabled={busyId === product._id}
                >
                  {busyId === product._id ? "Please wait..." : "Remove"}
                </button>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <p>
              Total: <strong>Ksh.{total.toLocaleString("en-US")}</strong>
            </p>
            <Link href="/shop/checkout" className="link buy-now">
              Checkout
            </Link>
          </aside>
        </>
      )}
    </main>
  );
};

export default CartPage;
