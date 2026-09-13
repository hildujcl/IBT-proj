import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        return response.json();
      })
      .then((data) => {
        const selectedProduct = data.find((item) => item.id === id);

        if (!selectedProduct) {
          throw new Error("Product not found");
        }

        setProduct(selectedProduct);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="message">Loading product...</p>;
  }

  if (error) {
    return (
      <section className="page">
        <p className="message error">{error}</p>

        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  return (
    <section className="product-details page">
      <button onClick={() => navigate(-1)}>← Go Back</button>

      <div className="details-content">
        <img src={product.image} alt={product.title} />

        <div>
          <p>{product.category}</p>

          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <p>⭐ {product.rating}</p>

          <h2>{product.price} ETB</h2>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
