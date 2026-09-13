import { Link } from "react-router-dom";

function Categories() {
  const categories = ["Electronics", "Clothing", "Beauty"];

  return (
    <section className="page">
      <h2>Product Categories</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${category}`}
            className="category-card"
          >
            <h3>{category}</h3>

            <p>Explore our {category.toLowerCase()} products.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
