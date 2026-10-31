import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <h2>🍲 Addis Eats</h2>

      <p>Bringing the taste of Ethiopian food closer to you.</p>

      <div>
        <Link href="/">Home</Link>
        {" · "}
        <Link href="/menu">Menu</Link>
        {" · "}
        <Link href="/cart">Cart</Link>
      </div>

      <p>© {new Date().getFullYear()} Addis Eats</p>
    </footer>
  );
}
