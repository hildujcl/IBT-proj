import Link from "next/link";
import "./globals.css";
import CartCount from "@/components/CartCount";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food delivered to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-emerald-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-xl">
                🍲
              </span>
              <span>Addis Eats</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-3 text-sm font-medium sm:gap-6">
              <Link href="/" className="text-slate-700 hover:text-emerald-700">
                Home
              </Link>

              <Link
                href="/menu"
                className="text-slate-700 hover:text-emerald-700"
              >
                Menu
              </Link>

              <Link href="/cart" className="flex items-center">
                Cart
                <CartCount />
              </Link>

              <Link
                href="/checkout"
                className="hidden text-slate-700 hover:text-emerald-700 sm:block"
              >
                Checkout
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-slate-200 bg-emerald-950">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-white/80">
            <p className="font-semibold text-white">🍲 Addis Eats</p>
            <p className="mt-2">
              Authentic Ethiopian food, delivered with love.
            </p>
            <p className="mt-4 text-xs text-white/50">© 2026 Addis Eats</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
