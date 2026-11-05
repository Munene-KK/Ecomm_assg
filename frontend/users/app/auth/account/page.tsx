"use client";

import { API } from "@/Components/API";
import { useUser, type User } from "@/Context/UserContext";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import "../../../css/account.css";

interface FieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  type?: string;
}

const Field = ({
  label,
  value,
  onChange,
  editable = true,
  type = "text",
}: FieldProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <article className="account-field">
      <div className="field-head">
        <label>{label}</label>
        {editable && (
          <button
            type="button"
            className={editing ? "pencil active" : "pencil"}
            onClick={() => setEditing((prev) => !prev)}
            aria-label={`Edit ${label}`}
          >
            <FaPencilAlt />
          </button>
        )}
      </div>
      <input
        type={type}
        value={value}
        readOnly={!editing}
        className={editing ? "editing" : ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </article>
  );
};

const AccountForm = ({ user }: { user: User }) => {
  const { setUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fullname, setFullname] = useState<string>(user.fullname);
  const [email, setEmail] = useState<string>(user.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber ?? "");
  const [county, setCounty] = useState<string>(user.location?.county ?? "");
  const [station, setStation] = useState<string>(user.location?.station ?? "");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(`/users/${user._id}/orders`);
        setOrders(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [user._id]);

  const hasChanges =
    fullname !== user.fullname ||
    email !== user.email ||
    phoneNumber !== (user.phoneNumber ?? "") ||
    county !== (user.location?.county ?? "") ||
    station !== (user.location?.station ?? "");

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      const res = await API.patch(`/users/${user._id}`, {
        fullname,
        email,
        phoneNumber,
        location: { county, station },
      });
      setUser({ ...user, ...(res.data.user ?? res.data) });
      setMessage("Changes saved");
    } catch (err) {
      console.log(err);
      setMessage("Could not save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await API.patch(`/users/logout/${user._id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  const checkoutSuccess = searchParams.get("checkout") === "success";

  return (
    <section className="account-card">
      <Field label="User ID" value={user.userID} editable={false} />
      <Field label="Full Name" value={fullname} onChange={setFullname} />
      <Field label="Email" value={email} onChange={setEmail} type="email" />
      <Field
        label="Phone Number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        type="tel"
      />
      <Field label="County" value={county} onChange={setCounty} />
      <Field label="Station" value={station} onChange={setStation} />

      {message && <p className="account-message">{message}</p>}
      {checkoutSuccess && (
        <p className="account-success">
          Your order was placed successfully. We have sent a confirmation email.
        </p>
      )}

      {hasChanges && (
        <button
          className="account-save"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      )}

      <button className="account-logout" onClick={handleLogout}>
        Logout
      </button>

      <div className="orders-panel">
        <h4>Recent orders</h4>
        {orders.length === 0 ? (
          <p>No orders yet. Start shopping to create one.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <span>#{String(order._id).slice(-6)}</span>
                <span>{order.status}</span>
                <strong>Ksh.{Number(order.total).toLocaleString("en-US")}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

const AccountContent = () => {
  const { user } = useUser();

  return (
    <main className="account-page">
      <h3>My Account</h3>
      {user ? (
        <AccountForm user={user} />
      ) : (
        <p>
          Please <Link href="/auth/login">login</Link> to view your account.
        </p>
      )}
    </main>
  );
};

const AccountPage = () => {
  return (
    <Suspense fallback={<main className="account-page"><p>Loading account...</p></main>}>
      <AccountContent />
    </Suspense>
  );
};

export default AccountPage;
