import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-content">
        <p className="category">{product.category}</p>

        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <p>⭐ {product.rating}</p>

        <h3>{product.price} ETB</h3>

        <div className="card-buttons">
          <Link to={`/products/${product.id}`}>View Details</Link>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
