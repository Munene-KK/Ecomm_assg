import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

const SearchProducts = () => {
  const [search, setSearch] = useState<string>("");
  const { products } = useProducts();
  const filterSearch = products.filter(
    (product) =>
      product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      product.description
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      product.category.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <aside style={{ display: search.length > 0 ? "block" : "none" }}>
        {search &&
          search.length > 1 &&
          filterSearch.map((product) => (
            <Link
              key={product._id}
              className="search-results link"
              to={`/products/update/${product._id}`}
            >
              <article className="search-details">
                <p>{product.description.substring(0, 25)}...</p>
                <p className="price">
                  {product.price.toLocaleString("en-US")} &nbsp; &nbsp;{" "}
                  {product.status}
                </p>
              </article>
              <img
                src={product.image}
                alt={product.name}
                width={40}
                height={50}
              />
            </Link>
          ))}
      </aside>
    </div>
  );
};

export default SearchProducts;
