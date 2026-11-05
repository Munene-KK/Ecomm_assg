import { GiShoppingCart } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa6";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchProducts from "../SearchProducts";
const NavBar = () => {
  return (
    <section>
      <header className="admin-navbar">
        <article className="hero">
          <Link to="/admin/Dashboard" className="link">
            <h2>
              Infinyte
              <GiShoppingCart className="logo" />
            </h2>
          </Link>
          <SearchProducts />
        </article>
        <nav>
          <span>
            <Link to="/admin/orders" className="link">
              <FaCartArrowDown />
              Orders
            </Link>
          </span>
          <span>
            <Link className="link" to="/products/create">
              <BsFillCartPlusFill />
              &nbsp; New Product
            </Link>
          </span>
          <span>
            <Link to="/manage/users" className="link">
              <FaUsersGear />
              Users
            </Link>
          </span>
          <span>
            <Link className="link" to="/manange/account">
              <FaUser /> Account
            </Link>
          </span>
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
