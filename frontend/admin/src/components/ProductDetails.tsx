import { Link } from "react-router-dom";
import { BsFillCartDashFill } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Props {
  product: Product;
}
const ProductDetails = ({ product }: Props) => {
  return (
    <figure>
      <img
        src={product.image}
        alt={product.name}
        width={250}
        height={300}
        loading="lazy"
      />
      <figcaption>{product.description.substring(0, 20)}...</figcaption>
      <p className="price">
        {product.price.toLocaleString("en-US")} &nbsp;&nbsp; {product.status}
      </p>
      <article className="products-actions">
        <p>
          <button className="delete-product">
            <BsFillCartDashFill /> &nbsp; Delete
          </button>
        </p>
        <Link to={`/products/update/${product._id}`} className="link">
          <button className="update-product">
            <FaCartArrowDown />
            &nbsp; Update
          </button>
        </Link>
      </article>
    </figure>
  );
};

export default ProductDetails;
