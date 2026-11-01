import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          Addis<span>Eats</span> ♡
        </Link>

        <nav className="navigation">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/kitchen">Kitchen</Link>
        </nav>

        <div className="header-actions">
          <Link href="/signin" className="button button-secondary">
            Sign in
          </Link>

          <Link href="/signup" className="button">
            Join us
          </Link>
        </div>
      </div>
    </header>
  );
}
