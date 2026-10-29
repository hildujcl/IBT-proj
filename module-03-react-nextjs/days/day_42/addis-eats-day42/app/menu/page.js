import Link from "next/link";
import { Suspense } from "react";
import { getSession } from "@/lib/session";


async function UserNavigation() {
  const session = await getSession();

  return (
    <div className="nav-links">
      <Link href="/menu">Menu</Link>

      {session ? (
        <>
          <Link href="/orders">My Orders</Link>

          {session.role === "staff" && <Link href="/kitchen">Kitchen</Link>}

          <form action="/api/signout" method="POST">
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="container">
      <nav className="navbar">
        <Link href="/" className="logo">
          Addis Eats
        </Link>

        <Suspense fallback={<p>Loading navigation...</p>}>
          <UserNavigation />
        </Suspense>
      </nav>

      <section className="hero">
        <p className="eyebrow">WELCOME TO ADDIS EATS</p>

        <h1>Authentic Ethiopian food, made with love.</h1>

        <p>
          Explore your favorite Ethiopian dishes and enjoy a simple, convenient
          ordering experience.
        </p>

        <Link href="/menu" className="button">
          Explore Our Menu
        </Link>
      </section>
    </main>
  );
}
