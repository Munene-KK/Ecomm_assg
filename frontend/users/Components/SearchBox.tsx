"use client";
import { useState, type SubmitEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { useProducts } from "../Context/ProductContext";
import { useRouter } from "next/navigation";
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { products } = useProducts();
  const navigate = useRouter();

  const searchedProduct = products.filter(
    (product) =>
      product.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      product.description
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      product.category
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()),
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) {
      return;
    }
    navigate.push(`/shop/search/${searchTerm}`);
    setSearchTerm("");
  };
  const handleBuy = (id: string) => {
    navigate.push(`/shop/buy/${id}`);
    setSearchTerm("");
  };
  return (
    <article className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchTerm}
          placeholder="I am looking for, tv iphone..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FiSearch />
        </button>
      </form>
      <article
        className="results-container"
        style={{ display: searchTerm ? "block" : "none" }}
      >
        {searchTerm &&
          searchTerm.length > 0 &&
          searchedProduct.map((product) => (
            <aside
              key={product._id}
              className="search-results"
              onClick={() => handleBuy(product._id)}
            >
              <div>
                <p>{product.description.substring(0, 20)}...</p>
                <p className="price">
                  {product.price.toLocaleString("en-US")} &nbsp;{" "}
                  {product.status}
                </p>
              </div>
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={66}
                />
              </div>
            </aside>
          ))}
      </article>
    </article>
  );
};

export default SearchBox;
