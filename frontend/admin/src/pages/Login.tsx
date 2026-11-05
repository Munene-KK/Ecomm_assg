import { UseTitle } from "../components/UseTitle";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import "../css/login.css";
import type { SubmitEvent } from "react";
import Logo from "../assets/logo.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAdmin } from "../context/adminInfoContext";
import { API } from "../components/API";
import { useNavigate } from "react-router-dom";
const Login = () => {
  //set title
  UseTitle("Login");

  const [showOrHide, setShowOrHide] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { setAdmin } = useAdmin();
  const navigate = useNavigate();

  //toogle password
  const handleTogglePassword = () => {
    setShowOrHide((prev) => !prev);
  };
  //handle log in func
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.length || !password || !password.length) {
      toast.error("All required");
    }
    try {
      const response = await API.post("/admins/login", { email, password });
      const admin = response.data.admin;
      const token = response.data.token;
      setAdmin({
        fullname: admin.fullname,
        email: admin.email,
        role: admin.role,
        token: token,
        _id: admin._id.toString(),
        status: admin.status,
        activate: admin.activate,
      });
      if (admin.role === "Administrator" && admin.activate) {
        navigate("/admin/Dashboard");
      } else if (admin.role !== "Administrator" && admin.activate) {
        navigate("/manager/Dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  //disbale/enable button
  const canSave = Boolean(email) && Boolean(password);
  return (
    <section className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Welcome back, Admin</h2>
        <div className="image">
          <img src={Logo} alt="Infinyte logo" width={100} height={100} />
        </div>
        <article>
          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </article>
        <article>
          <label>Password</label>
          <input
            type={showOrHide ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toogle-password" onClick={handleTogglePassword}>
            {showOrHide ? <IoMdEye /> : <BiSolidHide />}
          </span>
        </article>
        <button
          disabled={!canSave}
          style={{ cursor: !canSave ? "not-allowed" : "pointer" }}
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default Login;
