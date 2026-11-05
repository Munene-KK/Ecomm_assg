import { useEffect, useState, type SubmitEvent } from "react";
import { UseTitle } from "../components/UseTitle";
import { useAdmin } from "../context/adminInfoContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/admin/NavBar";
import "../css/products/create.products.css";
import { FaCartArrowDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { API } from "../components/API";

const UpdateProduct = () => {
  UseTitle("Update Product");
  const { admin } = useAdmin();
  const [name, setProductName] = useState<string>("");
  const [price, setProductPrice] = useState<string>("");
  const [image, setProductImage] = useState<string>("");
  const [description, setProductDescription] = useState<string>("");
  const [category, setProductCategory] = useState<string>("");
  const [status, setProductStatus] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams();
  //fetchproduct details...
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProductName(response.data.name);
        setProductPrice(response.data.price);
        setProductImage(response.data.image);
        setProductDescription(response.data.description);
        setProductCategory(response.data.category);
        setProductStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const canSave =
    Boolean(name) &&
    Boolean(price) &&
    Boolean(image) &&
    Boolean(description) &&
    Boolean(category) &&
    Boolean(status);
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: Number(price),
      image,
      description,
      category,
      status,
    };
    if (!newProduct) {
      toast.error("All filds are required.");
    }
    try {
      await API.patch(`/products/update/${id}`, newProduct);
      toast.success("Product Updated");
      //clear the inputs
      setProductName("");
      setProductPrice("");
      setProductImage("");
      setProductCategory("");
      setProductDescription("");
      setProductStatus("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      if (admin?.role === "Administrator" && admin?.activate) {
        navigate("/admin/Dashboard");
      } else if (admin?.role !== "Administrator" && admin?.activate) {
        navigate("/manager/Dashboard");
      } else {
        navigate("/");
      }
    }
  };
  return (
    <section>
      {admin ? (
        <section>
          <NavBar />
          <section className="add-products-form">
            <form onSubmit={handleSubmit}>
              <h2>Update product</h2>
              <article>
                <label htmlFor="product-name">Product name</label>
                <input
                  type="text"
                  placeholder="Laptop"
                  value={name}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </article>

              <article>
                <label htmlFor="product-price">Product price</label>
                <input
                  type="number"
                  placeholder="1200"
                  value={price}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </article>

              <article>
                <label htmlFor="product-image">Product image</label>
                <input
                  type="url"
                  placeholder="https://getimage.com"
                  value={image}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </article>

              <article>
                <label htmlFor="product-image">Product status</label>
                <input
                  type="text"
                  placeholder="sold out"
                  value={status}
                  onChange={(e) => setProductStatus(e.target.value)}
                />
              </article>

              <article>
                <label htmlFor="product-description">Product description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Lenovo thinpad 256 GB SSD 16GB RAM"
                  value={description}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </article>

              <article>
                <label htmlFor="product">Product category</label>
                <input
                  type="text"
                  placeholder="Electronics"
                  value={category}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
              </article>
              <button
                disabled={!canSave}
                type="submit"
                style={{ cursor: canSave ? "pointer" : "not-allowed" }}
              >
                <FaCartArrowDown /> Update Product
              </button>
            </form>
          </section>
        </section>
      ) : (
        <Navigate to="/" replace />
      )}
    </section>
  );
};

export default UpdateProduct;
