import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="welcome">WELCOME TO ADDIS EATS</p>

          <h1>
            Taste Ethiopia,
            <span> One Bite at a Time</span>
          </h1>

          <p className="hero-text">
            Discover delicious Ethiopian dishes made with traditional flavors
            and served with love.
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="primary-button">
              Explore Menu
            </Link>

            <Link to="/cart" className="secondary-button">
              View Cart
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/image/ethiopian-food.jpg" alt="Ethiopian food" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🍽️</div>
          <h3>Authentic Food</h3>
          <p>Traditional Ethiopian dishes prepared with rich flavors.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fresh & Fast</h3>
          <p>Fresh meals prepared and served with care.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h3>Made With Love</h3>
          <p>Bringing the taste of Ethiopia to your table.</p>
        </div>
      </section>
    </div>
  );
}
