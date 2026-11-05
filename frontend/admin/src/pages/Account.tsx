import NavBar from "../components/admin/NavBar";
import { Navigate, useNavigate } from "react-router-dom";
import { UseTitle } from "../components/UseTitle";
import { useAdmin } from "../context/adminInfoContext";
import { useProducts } from "../context/ProductsContext";
import { API } from "../components/API";
import "../css/account.css";
import toast from "react-hot-toast";
const Account = () => {
  UseTitle("Acount");
  const { admin, setAdmin } = useAdmin();
  const { setProducts } = useProducts();
  const navigate = useNavigate();
  const initial = admin?.role.charAt(0);
  const handleLogout = async () => {
    try {
      await API.post("/admins/logout");
      toast.success("Logged out");
    } catch (err) {
      console.log(err);
    } finally {
      setAdmin(null);
      setProducts([]);
      navigate("/");
    }
  };
  return (
    <section>
      {admin ? (
        <section>
          <NavBar />
          <article className="profile-container">
            <div className="profile-container">
              <p className="profile">{initial}</p>
              <p className="role">{admin.role}</p>
              <div className="detail">
                <p>
                  Name: <strong>{admin.fullname}</strong>
                </p>
                <p>
                  Email: <strong> {admin.email}</strong>
                </p>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </article>
        </section>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </section>
  );
};

export default Account;
