"use client";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useUser } from "@/Context/UserContext";

const Navbar = () => {
  const { user } = useUser();

  const cartCount =
    user?.shoppingCart.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <header>
      <article className="logo">
        <Link href="/" className="link">
          <abbr title="Infinyte home">
            <h2>
              Infinyte <BsCart4 />
            </h2>
          </abbr>
        </Link>
      </article>
      <SearchBox />
      <nav>
        <Link href="/shop/cart" className="link ">
          <span className="cart-icon">
            <FaCartArrowDown />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </span>
          Cart
        </Link>
        <div className="auth-user">
          <Link href="/auth/account" className="link">
            <FaUser />
            Account
          </Link>

          <div className="auth">
            {user ? (
              <Link className="link-auth" href="/auth/account">
                {user.fullname}
              </Link>
            ) : (
              <Link className="link-auth" href="/auth/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
