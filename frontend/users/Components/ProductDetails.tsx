import { Product } from "../Context/ProductContext";
import Link from "next/link";

interface Props {
  product: Product;
}
const ProductDetails = ({ product }: Props) => {
  return (
    <Link className="link product-card" href={`/shop/buy/${product._id}`}>
      <figure>
        <img
          src={product.image}
          alt={product.name}
          width={240}
          height={220}
          loading="lazy"
        />
        <figcaption>{product.name}</figcaption>
        <p className="product-description">{product.description}</p>
        <p className="price">
          Ksh.{product.price.toLocaleString("en-US")}
          <span className="product-status">{product.status}</span>
        </p>
      </figure>
    </Link>
  );
};

export default ProductDetails;
