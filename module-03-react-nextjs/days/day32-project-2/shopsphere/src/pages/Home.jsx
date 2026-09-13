import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h2>Welcome to ShopSphere</h2>

        <p>Discover great products at great prices.</p>

        <Link to="/products">Shop Now</Link>
      </div>

      <section className="promo">
        <h2>Special Promotion</h2>

        <p>Find amazing products across electronics, clothing, and beauty.</p>

        <Link to="/categories">Explore Categories</Link>
      </section>

      <section className="page">
        <h2>Featured Products</h2>

        <p>Browse our collection and find something you love.</p>

        <Link to="/products">View All Products</Link>
      </section>
    </section>
  );
}

export default Home;
