import { useState, type SubmitEvent } from "react";
import { UseTitle } from "../components/UseTitle";
import { useAdmin } from "../context/adminInfoContext";
import { Navigate } from "react-router-dom";
import NavBar from "../components/admin/NavBar";
import "../css/products/create.products.css";
import { BiSolidCartAdd } from "react-icons/bi";
import toast from "react-hot-toast";
import { API } from "../components/API";

const CreateProduct = () => {
  UseTitle("New Product");
  const { admin } = useAdmin();
  const [name, setProductName] = useState<string>("");
  const [price, setProductPrice] = useState<string>("");
  const [image, setProductImage] = useState<string>("");
  const [description, setProductDescription] = useState<string>("");
  const [category, setProductCategory] = useState<string>("");

  const canSave =
    Boolean(name) &&
    Boolean(price) &&
    Boolean(image) &&
    Boolean(description) &&
    Boolean(category);
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: Number(price),
      image,
      description,
      category,
    };
    if (!newProduct) {
      toast.error("All filds are required.");
    }
    try {
      await API.post("/products/create", newProduct);
      toast.success("Product Created");
      //clear the inputs
      // setProductName("");
      // setProductPrice("");
      // setProductImage("");
      // setProductCategory("");
      // setProductDescription("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <section>
      {admin ? (
        <section>
          <NavBar />
          <section className="add-products-form">
            <form onSubmit={handleSubmit}>
              <h2>Add a new product</h2>
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
                <BiSolidCartAdd /> Add Product
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

export default CreateProduct;
