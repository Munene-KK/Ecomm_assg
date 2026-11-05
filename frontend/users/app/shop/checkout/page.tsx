"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/Components/API";
import { useProducts, type Product } from "@/Context/ProductContext";
import { useUser } from "@/Context/UserContext";
import "../../../css/checkout.css";

const CheckoutContent = () => {
  const { user, setUser } = useUser();
  const { products } = useProducts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const directProductId = searchParams.get("product");

  const [county, setCounty] = useState("");
  const [station, setStation] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [router, user]);

  const items = useMemo(() => {
    if (!user) return [];

    if (directProductId) {
      const product = products.find((item) => item._id === directProductId);
      return product ? [{ product, quantity: 1 }] : [];
    }

    return user.shoppingCart
      .map((item) => {
        const rawProduct = item.product as unknown;
        const product =
          typeof rawProduct === "string"
            ? products.find((entry) => entry._id === rawProduct)
            : (rawProduct as Product | null);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter(
        (item): item is { product: Product; quantity: number } => Boolean(item),
      );
  }, [directProductId, products, user]);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !items.length) {
      setError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await API.post("/orders/checkout", {
        userID: user._id,
        shipping: {
          county,
          station,
          phone: phone || user.phoneNumber,
          notes,
          paymentMethod,
        },
      });

      setUser({ ...user, shoppingCart: [] });
      router.push(`/auth/account?checkout=success&order=${response.data.order._id}`);
    } catch (err) {
      console.error(err);
      setError("We could not place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <main className="checkout-page empty-state">
        <p>
          Please <Link href="/auth/login">login</Link> to continue checkout.
        </p>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Complete your order</h2>
          <div className="field-row">
            <label>
              Full name
              <input defaultValue={user.fullname} readOnly />
            </label>
            <label>
              Email
              <input defaultValue={user.email} readOnly />
            </label>
          </div>
          <div className="field-row">
            <label>
              County
              <input
                value={county}
                onChange={(event) => setCounty(event.target.value)}
                placeholder="Nairobi"
                required
              />
            </label>
            <label>
              Station
              <input
                value={station}
                onChange={(event) => setStation(event.target.value)}
                placeholder="Westlands"
                required
              />
            </label>
          </div>
          <div className="field-row">
            <label>
              Phone number
              <input
                value={phone || user.phoneNumber}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="07xx xxx xxx"
                required
              />
            </label>
            <label>
              Payment method
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option>Cash on delivery</option>
                <option>Mpesa</option>
                <option>Card</option>
              </select>
            </label>
          </div>
          <label>
            Delivery notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Any special delivery instructions?"
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="checkout-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Place order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Order summary</h3>
          {items.map(({ product, quantity }) => (
            <div className="summary-item" key={product._id}>
              <div>
                <strong>{product.name}</strong>
                <span>Qty: {quantity}</span>
              </div>
              <span>
                Ksh.{(product.price * quantity).toLocaleString("en-US")}
              </span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <strong>Ksh.{total.toLocaleString("en-US")}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<main className="checkout-page empty-state"><p>Loading checkout...</p></main>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
