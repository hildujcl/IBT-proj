import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <nav className="navbar">
        <Link href="/" className="brand">
          <span className="brand-icon">🍓</span>
          <span>Addis Eats</span>
        </Link>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <Link href="/track/AE-1042" className="nav-track">
            Track order
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">✨ GOOD FOOD. HAPPY MOMENTS.</span>

          <h1>
            Your favorite food,
            <span> on its way.</span>
          </h1>

          <p>
            From our kitchen to your doorstep. Follow your delivery journey and
            stay updated every step of the way.
          </p>

          <div className="hero-actions">
            <Link href="/track/AE-1042" className="primary-button">
              Track your order <span>→</span>
            </Link>

            <a href="#how-it-works" className="secondary-button">
              Discover more
            </a>
          </div>

          <div className="hero-note">
            <span>💗</span>
            Made with love in Addis Ababa
          </div>
        </div>

        <div className="hero-visual">
          <div className="decor decor-one">✿</div>
          <div className="food-card">
            <div className="food-emoji">🍱</div>
            <span className="food-label">Freshly prepared</span>
            <h3>Delicious moments</h3>
            <p>Your next favorite meal is almost there!</p>
            <div className="food-card-bottom">
              <span>♡ Made with care</span>
              <span>🇪🇹 Addis</span>
            </div>
          </div>
          <div className="floating-card">
            <span className="floating-icon">🛵</span>
            <div>
              <strong>On the way!</strong>
              <small>Your delivery is moving</small>
            </div>
          </div>
          <div className="decor decor-two">♡</div>
        </div>
      </section>

      <section className="features" id="how-it-works">
        <div className="section-heading">
          <span className="eyebrow">A LITTLE MORE CONVENIENCE</span>
          <h2>Every delivery, a little sweeter.</h2>
          <p>
            Enjoy a simple way to follow your food from the restaurant to your
            door.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon pink">📍</div>
            <h3>Follow the journey</h3>
            <p>
              View the courier and delivery destination on an interactive map.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon peach">💌</div>
            <h3>Stay in the loop</h3>
            <p>Follow order progress with simulated live status updates.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon lavender">📄</div>
            <h3>Keep your records</h3>
            <p>
              Download order history and select a CSV file for basic validation.
            </p>
          </article>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="eyebrow">YOUR ORDER IS WAITING</span>
          <h2>Let's follow something delicious.</h2>
          <p>Try our sample order and explore the tracker.</p>
        </div>

        <Link href="/track/AE-1042" className="primary-button">
          Explore tracking <span>→</span>
        </Link>
      </section>

      <footer className="footer">
        <Link href="/" className="brand">
          <span className="brand-icon">🍓</span>
          <span>Addis Eats</span>
        </Link>
        <p>Made with ♡ in Addis Ababa.</p>
        <span>© 2026 Addis Eats Demo</span>
      </footer>
    </main>
  );
}
