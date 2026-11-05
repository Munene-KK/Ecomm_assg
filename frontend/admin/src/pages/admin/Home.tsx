import NavBar from "../../components/admin/NavBar";
import { useAdmin } from "../../context/adminInfoContext";
import { UseTitle } from "../../components/UseTitle";
import { Navigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { API } from "../../components/API";
import { useEffect, useState } from "react";
import "../../css/products/home.css";
import ProductDetails from "../../components/ProductDetails";

const Home = () => {
  UseTitle("Home");
  const { products, setProducts } = useProducts();
  const [loading, setLoading] = useState<boolean>(true);
  const { admin } = useAdmin();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <main>
      {admin && admin.role === "Administrator" ? (
        <main>
          <NavBar />
          <section className="products-home">
            {loading ? (
              <p className="loading"></p>
            ) : products && products.length ? (
              products.map((product) => (
                <ProductDetails key={product._id} product={product} />
              ))
            ) : (
              <p>No products yet</p>
            )}
          </section>
        </main>
      ) : (
        <Navigate to="/" replace />
      )}
    </main>
  );
};

export default Home;
