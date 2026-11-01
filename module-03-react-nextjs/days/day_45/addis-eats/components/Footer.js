import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h2>Addis Eats ♡</h2>

          <p>
            Bringing the taste of Ethiopia closer to you.
            <br />
            Delicious food, made with love.
          </p>
        </div>

        <div>
          <h3>Explore</h3>

          <p>
            <Link href="/">Home</Link>
          </p>

          <p>
            <Link href="/menu">Our Menu</Link>
          </p>

          <p>
            <Link href="/cart">Your Cart</Link>
          </p>
        </div>

        <div>
          <h3>Account</h3>

          <p>
            <Link href="/signin">Sign in</Link>
          </p>

          <p>
            <Link href="/signup">Create account</Link>
          </p>
        </div>
      </div>

      <div className="container">
        <p>
          © {new Date().getFullYear()} Addis Eats. Made with love in Ethiopia.
        </p>
      </div>
    </footer>
  );
}
