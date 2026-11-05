"use client";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import "../../../css/auth.css";
import Link from "next/link";
import axios from "axios";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/Context/UserContext";
import { API } from "@/Components/API";

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await API.post("/users/login", { email, password });
      setUser(res.data.user ?? res.data);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("status:", err.response?.status);
        console.log("data:", err.response?.data);
        setError(err.response?.data?.error || err.message);
      } else {
        console.log(err);
        setError("Login failed. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-form">
      <form onSubmit={handleSubmit}>
        <aside>
          <h3>Welcome back, Login</h3>
          <Image
            src={Logo}
            alt="infinyte logo"
            width={80}
            height={70}
            className="image"
          />
        </aside>
        <article>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </article>
        <article>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="showpwd"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ display: password ? "block" : "none" }}
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </article>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="other-options">
          <div className="or-actions">
            <p className="rule"></p>
            <p>or</p>
            <p className="rule"></p>
          </div>
          <div className="options-links">
            <p>
              Dont have an account? <Link href="/auth/signup">Sign up</Link>
            </p>
            <p>
              Need help? <a href="mailto:hello@infinyte.store">Contact support</a>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Loginpage;
