import Link from "next/link";
import { menuItems } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="container">
      <nav className="navbar">
        <Link href="/" className="logo">
          Addis Eats
        </Link>

        <div className="nav-links">
          <Link href="/menu">Full Menu</Link>
          <Link href="/signin">Sign In</Link>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">AUTHENTIC ETHIOPIAN CUISINE</p>
        <h1>A taste of Ethiopia, delivered with love.</h1>
        <p>
          Discover traditional Ethiopian favorites, prepared with care and ready
          for you to explore.
        </p>
        <Link href="/menu" className="button">
          Explore Full Menu
        </Link>
      </section>

      <section className="home-menu">
        <p className="eyebrow">FRESH FROM OUR KITCHEN</p>
        <h2>Popular Dishes</h2>

        <div className="menu-grid">
          {menuItems.slice(0, 3).map((item) => (
            <article className="dish-card" key={item.id}>
              <img src={item.image} alt={item.name} className="dish-image" />

              <div className="dish-content">
                <p className="eyebrow">{item.category}</p>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="dish-price">{item.price} ETB</p>

                <Link href={`/menu/${item.id}`} className="button">
                  View Dish
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link href="/menu" className="button">
          View All Dishes
        </Link>
      </section>
    </main>
  );
}
