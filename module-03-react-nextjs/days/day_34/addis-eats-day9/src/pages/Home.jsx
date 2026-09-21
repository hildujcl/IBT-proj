import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">AUTHENTIC ETHIOPIAN FOOD</span>

          <h1>
            Taste Ethiopia,
            <span> delivered to you.</span>
          </h1>

          <p>
            Authentic Ethiopian dishes. Fresh ingredients. Right to your door.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu
            <span>→</span>
          </Link>
        </div>

        <div className="hero-image">
          <div className="hero-circle"></div>

          <img src="/images/hero-food.jpg" alt="Ethiopian food" />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🛵</div>

          <div>
            <h3>Fast Delivery</h3>
            <p>Fresh & hot</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">◉</div>

          <div>
            <h3>Authentic Flavors</h3>
            <p>Traditional recipes</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">♢</div>

          <div>
            <h3>Secure Payment</h3>
            <p>100% safe</p>
          </div>
        </div>
      </section>
    </>
  );
}
