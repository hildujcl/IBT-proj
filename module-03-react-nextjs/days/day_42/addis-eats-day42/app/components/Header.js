import Link from "next/link";
import { getSession } from "@/lib/session";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <span className="brand-icon">🍲</span>
          <span>Addis Eats</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>

          {session ? (
            <>
              {session.role === "customer" && (
                <>
                  <Link href="/checkout">Checkout</Link>
                  <Link href="/orders">My Orders</Link>
                </>
              )}

              {session.role === "staff" && <Link href="/kitchen">Kitchen</Link>}

              <span className="user-badge">
                {session.role === "staff" ? "Staff" : "Customer"}
              </span>

              <SignOutButton />
            </>
          ) : (
            <Link href="/signin" className="nav-signin">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
