import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../../components/admin/NavBar";
import { UseTitle } from "../../components/UseTitle";
import { API } from "../../components/API";
import { useAdmin } from "../../context/adminInfoContext";
import "../../css/orders.css";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  shipping: {
    county: string;
    station: string;
    phone: string;
    notes: string;
  };
  createdAt: string;
}

const Orders = () => {
  UseTitle("Orders");
  const { admin } = useAdmin();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin?.token) return;

    const fetchOrders = async () => {
      try {
        const response = await API.get<Order[]>("/admins/orders", {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setOrders(response.data);
      } catch {
        toast.error("Could not load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [admin]);

  if (!admin || admin.role !== "Administrator" || !admin.activate) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="admin-orders-page">
      <NavBar />
      <section className="admin-orders">
        <h1>Customer orders</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="admin-order-list">
            {orders.map((order) => (
              <article className="admin-order" key={order._id}>
                <header className="admin-order-heading">
                  <div>
                    <h2>Order #{order._id.slice(-8)}</h2>
                    <p>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <strong className="admin-order-status">{order.status}</strong>
                </header>

                <div className="admin-order-customer">
                  <p><strong>{order.customerName}</strong></p>
                  <p>{order.email}</p>
                  <p>{order.shipping.phone}</p>
                  <p>
                    {[order.shipping.station, order.shipping.county]
                      .filter(Boolean)
                      .join(", ") || "No delivery location provided"}
                  </p>
                </div>

                <ul className="admin-order-items">
                  {order.items.map((item, index) => (
                    <li key={`${item.name}-${index}`}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>
                        Ksh.{(item.price * item.quantity).toLocaleString("en-US")}
                      </span>
                    </li>
                  ))}
                </ul>

                {order.shipping.notes && (
                  <p className="admin-order-notes">
                    Delivery notes: {order.shipping.notes}
                  </p>
                )}

                <footer className="admin-order-total">
                  <span>{order.paymentMethod}</span>
                  <strong>Ksh.{order.total.toLocaleString("en-US")}</strong>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;
